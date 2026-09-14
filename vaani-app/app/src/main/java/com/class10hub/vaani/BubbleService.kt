package com.class10hub.vaani

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.PixelFormat
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.PowerManager
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.ImageView
import android.widget.TextView

/* Floating mic bubble over every app. Tap = talk. Long-press = hide.
   Notification: Mic / Show-Hide / Exit. */
class BubbleService : Service() {

  companion object {
    const val CHAN = "vaani"
    const val ACT_MIC = "mic"
    const val ACT_TOGGLE = "toggle"
    const val ACT_EXIT = "exit"
    var instance: BubbleService? = null
    var hidden = false

    fun start(ctx: Context) {
      if (instance != null) return
      val i = Intent(ctx, BubbleService::class.java)
      if (Build.VERSION.SDK_INT >= 26) ctx.startForegroundService(i) else ctx.startService(i)
    }
    fun stop(ctx: Context) { ctx.stopService(Intent(ctx, BubbleService::class.java)) }
  }

  private var wm: WindowManager? = null
  private var bubble: ImageView? = null
  private var chip: TextView? = null
  private var voice: VoiceEngine? = null
  private val handler = Handler(Looper.getMainLooper())
  private var pulsing = false
  private val pulseRun = object : Runnable {
    override fun run() {
      val b = bubble ?: return
      if (pulsing) { b.alpha = if (b.alpha > 0.7f) 0.5f else 1f; handler.postDelayed(this, 300) }
      else b.alpha = 1f
    }
  }
  private var wl: PowerManager.WakeLock? = null

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onCreate() {
    super.onCreate()
    instance = this
    Speaker.init(this)
    notif()
    showBubble()
    TaskEngine.listeners.add { handler.post { notif() } }
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    when (intent?.action) {
      ACT_MIC -> listen()
      ACT_TOGGLE -> toggleHide()
      ACT_EXIT -> { stopSelf(); return START_NOT_STICKY }
    }
    return START_STICKY
  }

  /* ---------------- notification ---------------- */
  private fun notif() {
    val nm = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    if (Build.VERSION.SDK_INT >= 26) {
      nm.createNotificationChannel(NotificationChannel(CHAN, "Vaani bubble", NotificationManager.IMPORTANCE_LOW))
    }
    val mainPi = PendingIntent.getActivity(this, 1,
      Intent(this, MainActivity::class.java), PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
    fun act(code: Int, action: String, label: String) = PendingIntent.getService(this, code,
      Intent(this, BubbleService::class.java).setAction(action), PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
    val q = TaskEngine.queue.size
    val text = if (TaskEngine.running) "Queue chal rahi hai — " + (q + 1) + " kaam baaki"
      else if (TaskEngine.listMode) "List ban rahi hai — " + q + " kaam add hue"
      else if (hidden) "Bubble chhupa hua — Show dabao" else "Ready — bubble tap karke bolo"

    val b = if (Build.VERSION.SDK_INT >= 26) Notification.Builder(this, CHAN)
      else @Suppress("DEPRECATION") Notification.Builder(this)
    val n = b
      .setSmallIcon(R.drawable.ic_mic)
      .setContentTitle("Vaani")
      .setContentText(text)
      .setContentIntent(mainPi)
      .setOngoing(true)
      .addAction(0, "🎤", act(2, ACT_MIC, "mic"))
      .addAction(0, if (hidden) "Show" else "Hide", act(3, ACT_TOGGLE, "toggle"))
      .addAction(0, "✕", act(4, ACT_EXIT, "exit"))
      .build()
    if (Build.VERSION.SDK_INT >= 26) startForeground(1, n) else nm.notify(1, n)
    if (Build.VERSION.SDK_INT < 26) startForeground(1, n)
  }

  /* ---------------- overlay bubble ---------------- */
  private fun showBubble() {
    if (bubble != null || hidden) return
    val dp = { v: Int -> (v * resources.displayMetrics.density).toInt() }
    wm = getSystemService(WINDOW_SERVICE) as WindowManager

    val iv = ImageView(this)
    iv.setImageResource(R.drawable.ic_mic)
    iv.setBackgroundResource(R.drawable.bg_bubble)
    iv.setPadding(dp(14), dp(14), dp(14), dp(14))
    iv.scaleType = ImageView.ScaleType.FIT_CENTER

    val p = WindowManager.LayoutParams(
      WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT,
      if (Build.VERSION.SDK_INT >= 26) WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY else @Suppress("DEPRECATION") WindowManager.LayoutParams.TYPE_PHONE,
      WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
      PixelFormat.TRANSLUCENT)
    p.gravity = Gravity.TOP or Gravity.START
    p.x = resources.displayMetrics.widthPixels - dp(78)
    p.y = resources.displayMetrics.heightPixels / 4

    var dx = 0f; var dy = 0f; var px = 0; var py = 0; var moved = false; var downT = 0L
    iv.setOnTouchListener { _, ev ->
      when (ev.actionMasked) {
        MotionEvent.ACTION_DOWN -> {
          dx = ev.rawX; dy = ev.rawY; px = p.x; py = p.y; moved = false; downT = System.currentTimeMillis(); true
        }
        MotionEvent.ACTION_MOVE -> {
          val mx = ev.rawX - dx; val my = ev.rawY - dy
          if (Math.abs(mx) > 12 || Math.abs(my) > 12) moved = true
          if (moved) { p.x = px + mx.toInt(); p.y = py + my.toInt(); try { wm?.updateViewLayout(iv, p) } catch (_: Exception) { } }
          true
        }
        MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
          if (!moved && ev.actionMasked == MotionEvent.ACTION_UP) {
            if (System.currentTimeMillis() - downT > 600) toggleHide() else listen()
          }
          true
        }
        else -> false
      }
    }
    try { wm?.addView(iv, p) } catch (e: Exception) { return }
    bubble = iv

    val tv = TextView(this)
    tv.setTextColor(0xFFE8EDF6.toInt()); tv.text = "bolo…"
    tv.textSize = 13f
    tv.setBackgroundResource(R.drawable.bg_chip)
    tv.setPadding(dp(12), dp(8), dp(12), dp(8))
    tv.maxWidth = dp(280)
    val p2 = WindowManager.LayoutParams(
      WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT,
      if (Build.VERSION.SDK_INT >= 26) WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY else @Suppress("DEPRECATION") WindowManager.LayoutParams.TYPE_PHONE,
      WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
      PixelFormat.TRANSLUCENT)
    p2.gravity = Gravity.TOP or Gravity.START
    p2.x = resources.displayMetrics.widthPixels - dp(300)
    p2.y = resources.displayMetrics.heightPixels / 4 + dp(70)
    try { wm?.addView(tv, p2); tv.visibility = android.view.View.GONE } catch (_: Exception) { }
    chip = tv
  }

  private fun toggleHide() {
    if (hidden) {
      hidden = false
      showBubble()
    } else {
      hidden = true
      bubble?.let { try { wm?.removeView(it) } catch (_: Exception) { } }
      bubble = null
      chip?.let { try { wm?.removeView(it) } catch (_: Exception) { } }
      chip = null
    }
    notif()
  }

  private fun chipShow(s: String) { chip?.let { it.text = s; it.visibility = android.view.View.VISIBLE } }
  private fun chipHide() { chip?.let { it.visibility = android.view.View.GONE } }

  /* ---------------- listening ---------------- */
  private fun listen() {
    Speaker.init(this)
    if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
      Speaker.speak("Mike ki permission dena padegi")
      startActivity(Intent(this, MainActivity::class.java)
        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
      return
    }
    chipShow("suno raha hoon…")
    pulsing = true; handler.post(pulseRun)
    try {
      if (wl == null) wl = (getSystemService(POWER_SERVICE) as PowerManager)
        .newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "vaani:mic")
      wl?.acquire(60000)
    } catch (_: Exception) { }

    voice?.destroy()
    voice = VoiceEngine(this) { f, p, e ->
      if (p != null) chipShow(p)
      else if (f != null) {
        chipHide(); pulsing = false
        Router.handle(this, f)
      } else {
        chipHide(); pulsing = false
        if (e != null && e.contains("permission", ignoreCase = true)) Speaker.speak(e)
        else if (e != null) Speaker.speak(e)
      }
    }
    voice?.start()
  }

  override fun onDestroy() {
    instance = null
    pulsing = false
    handler.removeCallbacks(pulseRun)
    voice?.destroy()
    bubble?.let { try { wm?.removeView(it) } catch (_: Exception) { } }
    chip?.let { try { wm?.removeView(it) } catch (_: Exception) { } }
    bubble = null; chip = null
    try { if (wl?.isHeld == true) wl?.release() } catch (_: Exception) { }
    super.onDestroy()
  }
}
