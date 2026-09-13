package com.class10hub.caster

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import org.webrtc.DefaultVideoDecoderFactory
import org.webrtc.DefaultVideoEncoderFactory
import org.webrtc.EglBase
import org.webrtc.IceCandidate
import org.webrtc.MediaConstraints
import org.webrtc.PeerConnection
import org.webrtc.PeerConnectionFactory
import org.webrtc.ScreenCapturerAndroid
import org.webrtc.SdpObserver
import org.webrtc.SessionDescription
import org.webrtc.SurfaceTextureHelper
import org.webrtc.VideoSource
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.concurrent.thread

/* Screen Cast sender service — captures the device screen (MediaProjection),
   encodes with WebRTC (H.264/VP8 hardware) and streams peer-to-peer to the
   TV/laptop browser page. Signaling reuses the site's /api/cast relay. */
class CastService : Service() {

  companion object {
    const val BASE = "https://class10-learning-hub.onrender.com"
    var onStatus: ((String) -> Unit)? = null
    private val main = Handler(Looper.getMainLooper())
    private var factoryInit = false
    fun status(s: String) { main.post { onStatus?.invoke(s) } }
  }

  private var pc: PeerConnection? = null
  private var factory: PeerConnectionFactory? = null
  private var capturer: ScreenCapturerAndroid? = null
  private var videoSource: VideoSource? = null
  private var eglBase: EglBase? = null
  private var running = false
  private var sid = ""
  private val http = OkHttpClient()
  private val json = "application/json; charset=utf-8".toMediaType()

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action == "STOP") { teardown(); stopSelf(); return START_NOT_STICKY }
    val s = intent?.getStringExtra("sid") ?: return START_NOT_STICKY
    val code = intent.getIntExtra("resultCode", 0)
    @Suppress("DEPRECATION")
    val data: Intent? = intent.getParcelableExtra("data")
    if (data == null) { status("Could not start — try again"); return START_NOT_STICKY }
    startInForeground()
    if (!running) {
      running = true
      sid = s
      thread(name = "cast") { runCast(s, code, data) }
    }
    return START_NOT_STICKY
  }

  private fun startInForeground() {
    val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    nm.createNotificationChannel(NotificationChannel("cast", "Screen Cast", NotificationManager.IMPORTANCE_LOW))
    val pi = PendingIntent.getActivity(this, 0, Intent(this, MainActivity::class.java), PendingIntent.FLAG_IMMUTABLE)
    val notif = Notification.Builder(this, "cast")
      .setContentTitle("Screen Cast is running")
      .setContentText("Your screen is live on the big screen")
      .setSmallIcon(android.R.drawable.ic_media_play)
      .setContentIntent(pi)
      .setOngoing(true)
      .build()
    if (Build.VERSION.SDK_INT >= 29) startForeground(1, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION)
    else startForeground(1, notif)
  }

  /* small helper: bridges async webrtc sdp callbacks into a simple latch */
  private open class SdpWait : SdpObserver {
    val latch = CountDownLatch(1)
    var sd: SessionDescription? = null
    var ok = false
    override fun onCreateSuccess(s: SessionDescription) { sd = s; latch.countDown() }
    override fun onSetSuccess() { ok = true; latch.countDown() }
    override fun onCreateFailure(error: String?) { latch.countDown() }
    override fun onSetFailure(error: String?) { latch.countDown() }
  }

  private fun post(path: String, body: JSONObject): JSONObject? {
    return try {
      val req = Request.Builder().url(BASE + path).post(body.toString().toRequestBody(json)).build()
      http.newCall(req).execute().use { r ->
        val t = r.body?.string() ?: return null
        try { JSONObject(t) } catch (e: Exception) { null }
      }
    } catch (e: Exception) { null }
  }

  private fun get(path: String): JSONObject? {
    return try {
      val req = Request.Builder().url(BASE + path).build()
      http.newCall(req).execute().use { r ->
        val t = r.body?.string() ?: return null
        try { JSONObject(t) } catch (e: Exception) { null }
      }
    } catch (e: Exception) { null }
  }

  private fun runCast(s: String, resultCode: Int, data: Intent) {
    try {
      status("Starting…")
      eglBase = EglBase.create()
      if (!factoryInit) {
        PeerConnectionFactory.initialize(
          PeerConnectionFactory.InitializationOptions.builder(applicationContext).createInitializationOptions()
        )
        factoryInit = true
      }
      factory = PeerConnectionFactory.builder()
        .setVideoEncoderFactory(DefaultVideoEncoderFactory(eglBase!!.eglBaseContext, true, true))
        .setVideoDecoderFactory(DefaultVideoDecoderFactory(eglBase!!.eglBaseContext))
        .createPeerConnectionFactory()

      capturer = ScreenCapturerAndroid(data, object : android.media.projection.MediaProjection.Callback() {
        override fun onStop() { status("Cast stopped"); stopSelf() } /* system stop chip / another projection took over */
      })
      videoSource = factory!!.createVideoSource(capturer!!.isScreencast)
      val helper = SurfaceTextureHelper.create("capture", eglBase!!.eglBaseContext)
      capturer!!.initialize(helper, applicationContext, videoSource!!.capturerObserver)

      val cfg = PeerConnection.RTCConfiguration(
        listOf(
          PeerConnection.IceServer.builder("stun:stun.l.google.com:19302").createIceServer(),
          PeerConnection.IceServer.builder("stun:stun1.l.google.com:19302").createIceServer(),
        )
      ).apply { sdpSemantics = PeerConnection.SdpSemantics.UNIFIED_PLAN }

      pc = factory!!.createPeerConnection(cfg, object : PeerConnection.Observer {
        override fun onIceCandidate(candidate: IceCandidate) {
          val body = JSONObject()
            .put("a", "sig").put("sid", s).put("from", "sender")
            .put("msgs", JSONArray().put(
              JSONObject().put("type", "cand").put("cand", JSONObject()
                .put("candidate", candidate.sdp)
                .put("sdpMid", candidate.sdpMid)
                .put("sdpMLineIndex", candidate.sdpMLineIndex))
            ))
          thread { post("/api/cast", body) }
        }
        override fun onConnectionChange(newState: PeerConnection.PeerConnectionState) {
          when (newState) {
            PeerConnection.PeerConnectionState.CONNECTED -> status("LIVE — your screen is on the big screen")
            PeerConnection.PeerConnectionState.FAILED,
            PeerConnection.PeerConnectionState.DISCONNECTED -> { status("Connection lost"); stopSelf() }
            else -> {}
          }
        }
        override fun onSignalingChange(p0: PeerConnection.SignalingState?) {}
        override fun onIceConnectionChange(p0: PeerConnection.IceConnectionState?) {}
        override fun onIceConnectionReceivingChange(p0: Boolean) {}
        override fun onIceGatheringChange(p0: PeerConnection.IceGatheringState?) {}
        override fun onIceCandidatesRemoved(p0: Array<out IceCandidate>?) {}
        override fun onAddStream(p0: org.webrtc.MediaStream?) {}
        override fun onRemoveStream(p0: org.webrtc.MediaStream?) {}
        override fun onDataChannel(p0: org.webrtc.DataChannel?) {}
        override fun onRenegotiationNeeded() {}
      })

      val track = factory!!.createVideoTrack("screen0", videoSource)
      pc!!.addTrack(track, listOf("screen"))

      /* QUALITY: lock the encoder to crisp 1080p+ screen sharing —
         12 Mbps ceiling, 4 Mbps floor, never blur the text (drop fps instead) */
      try {
        for (s in pc!!.senders) {
          val t = s.track() ?: continue
          if (t.kind() != "video") continue
          val params = s.parameters
          if (params.encodings.isEmpty()) {
            params.encodings.add(org.webrtc.RtpParameters.Encoding(null, true, null))
          }
          params.encodings[0].maxBitrateBps = 30_000_000 /* 4K-class: keeps native screen res crisp */
          params.encodings[0].minBitrateBps = 6_000_000
          params.encodings[0].maxFramerate = 60
          try {
            params.degradationPreference = org.webrtc.RtpParameters.DegradationPreference.MAINTAIN_RESOLUTION
          } catch (e: Exception) { /* older webrtc build */ }
          s.setParameters(params)
        }
      } catch (e: Exception) { /* fall back to defaults */ }

      val dm = resources.displayMetrics
      capturer!!.startCapture(dm.widthPixels, dm.heightPixels, 60) /* 60fps = the phone's real refresh — this is what makes it feel zero-delay */

      status("Connecting…")
      post("/api/cast", JSONObject().put("a", "join").put("sid", s))

      /* offer -> server */
      val w1 = SdpWait()
      pc!!.createOffer(w1, MediaConstraints().apply {
        /* no cpu-overuse downscaling — lag/judder killer */
        mandatory.add(org.webrtc.MediaConstraints.KeyValuePair("OfferToReceiveAudio", "false"))
        mandatory.add(org.webrtc.MediaConstraints.KeyValuePair("OfferToReceiveVideo", "false"))
      })
      if (!w1.latch.await(10, TimeUnit.SECONDS) || w1.sd == null) throw IllegalStateException("createOffer failed")
      val offer = w1.sd!!
      val w2 = SdpWait()
      pc!!.setLocalDescription(w2, offer)
      w2.latch.await(10, TimeUnit.SECONDS)
      post("/api/cast", JSONObject()
        .put("a", "sig").put("sid", s).put("from", "sender")
        .put("msgs", JSONArray().put(
          JSONObject().put("type", "offer").put("sdp", JSONObject()
            .put("type", "offer").put("sdp", offer.description))
        )))

      /* poll for answer + candidates */
      var after = 0
      while (running) {
        val j = get("/api/cast?sid=$s&from=sender&after=$after")
        if (j == null) { Thread.sleep(800); continue }
        if (!j.optBoolean("ok")) {
          if (j.optString("error").contains("not found")) break
          Thread.sleep(800); continue
        }
        val msgs = j.optJSONArray("msgs") ?: JSONArray()
        for (i in 0 until msgs.length()) {
          val m = msgs.getJSONObject(i)
          after = m.getInt("id")
          val msg = m.optJSONObject("msg") ?: continue
          when (msg.optString("type")) {
            "answer" -> {
              val sd = msg.getJSONObject("sdp")
              val w = SdpWait()
              pc?.setRemoteDescription(w, SessionDescription(SessionDescription.Type.fromCanonicalForm(sd.optString("type", "answer")), sd.optString("sdp")))
              w.latch.await(10, TimeUnit.SECONDS)
            }
            "cand" -> {
              val c = msg.getJSONObject("cand")
              pc?.addIceCandidate(IceCandidate(c.optString("sdpMid"), c.optInt("sdpMLineIndex"), c.optString("candidate")))
            }
            "bye" -> { running = false; status("Cast ended") }
          }
        }
        val connected = pc?.connectionState() == PeerConnection.PeerConnectionState.CONNECTED
        Thread.sleep(if (connected) 3000 else 400)
      }
      if (running) { /* normal exit via bye */ }
    } catch (e: Exception) {
      status("Error: ${e.message}")
    } finally {
      teardown()
      stopSelf()
    }
  }

  private fun teardown() {
    running = false
    if (sid.isNotEmpty()) {
      thread { post("/api/cast", JSONObject().put("a", "end").put("sid", sid).put("from", "sender")) }
    }
    try { capturer?.stopCapture() } catch (_: Exception) {}
    pc?.close(); pc = null
    videoSource?.dispose(); videoSource = null
    capturer?.dispose(); capturer = null
    factory?.dispose(); factory = null
    try { eglBase?.release() } catch (_: Exception) {}
    eglBase = null
  }

  override fun onDestroy() {
    teardown()
    super.onDestroy()
  }
}
