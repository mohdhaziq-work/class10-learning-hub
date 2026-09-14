package com.class10hub.jarvis

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.content.pm.ServiceInfo
import android.graphics.PixelFormat
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.ImageView
import android.widget.Toast

/* The floating mic bubble — drag it anywhere, TAP it and speak. */
class BubbleService : Service() {

  private var wm: WindowManager? = null
  private var bubble: ImageView? = null
  private var pulseOn = false
  private val main = Handler(Looper.getMainLooper())
  private val pulse = object : Runnable {
    override fun run() {
      val b = bubble ?: return
      if (pulseOn) {
        val s = 1f + 0.12f * Math.sin(System.nanoTime() / 120_000_000.0).toFloat()
        b.scaleX = s; b.scaleY = s
        b.alpha = 0.75f + 0.25f * Math.sin(System.nanoTime() / 90_000_000.0).toFloat()
        main.postDelayed(this, 33)
      } else {
        b.scaleX = 1f; b.scaleY = 1f; b.alpha = 1f
      }
    }
  }

  override fun onCreate() {
    super.onCreate()
    P.init(this)
    Speech.initTts(this)
    startFg()
    addBubble()
    say(this, "Jarvis is ready. Tap the bubble and speak.", "जार्विस तैयार है। बबल दबाकर बोलिए।")
  }

  private fun startFg() {
    if (Build.VERSION.SDK_INT >= 26) {
      val ch = NotificationChannel("jarvis", "Jarvis Assistant", NotificationManager.IMPORTANCE_LOW)
      (getSystemService(NOTIFICATION_SERVICE) as NotificationManager).createNotificationChannel(ch)
    }
    val pi = PendingIntent.getActivity(this, 0, Intent(this, MainActivity::class.java),
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    @Suppress("DEPRECATION")
    val nb = if (Build.VERSION.SDK_INT >= 26) Notification.Builder(this, "jarvis") else Notification.Builder(this)
    nb.setContentTitle("Jarvis sun raha hai")
      .setContentText("Bubble dabao aur bolo")
      .setSmallIcon(R.drawable.ic_mic)
      .setOngoing(true)
      .setContentIntent(pi)
    try {
      if (Build.VERSION.SDK_INT >= 29) startForeground(1, nb.build(), ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
      else startForeground(1, nb.build())
    } catch (_: Exception) {
      try { startForeground(1, nb.build()) } catch (_: Exception) { /* best effort */ }
    }
  }

  private fun dp(d: Int): Int = (d * resources.displayMetrics.density).toInt()

  private fun addBubble() {
    wm = getSystemService(WINDOW_SERVICE) as WindowManager
    val iv = ImageView(this)
    iv.setImageResource(R.drawable.ic_bubble)
    val params = WindowManager.LayoutParams(
      dp(56), dp(56),
      WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
      WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
      PixelFormat.TRANSLUCENT
    ).apply {
      gravity = Gravity.TOP or Gravity.START
      x = resources.displayMetrics.widthPixels - dp(68)
      y = dp(120)
    }
    var downX = 0f; var downY = 0f; var moved = false
    iv.setOnTouchListener { _, ev ->
      when (ev.actionMasked) {
        MotionEvent.ACTION_DOWN -> { downX = ev.rawX; downY = ev.rawY; moved = false; true }
        MotionEvent.ACTION_MOVE -> {
          if (Math.abs(ev.rawX - downX) > 10 || Math.abs(ev.rawY - downY) > 10) moved = true
          params.x = (ev.rawX - dp(28)).toInt()
          params.y = (ev.rawY - dp(28)).toInt()
          try { wm?.updateViewLayout(iv, params) } catch (_: Exception) {}
          true
        }
        MotionEvent.ACTION_UP -> { if (!moved) tap(); true }
        else -> false
      }
    }
    try {
      wm?.addView(iv, params)
      bubble = iv
    } catch (_: Exception) {
      Toast.makeText(this, "Overlay permission nahi hai — Jarvis app mein do", Toast.LENGTH_LONG).show()
      stopSelf()
    }
  }

  private fun tap() {
    buzz(25)
    pulseOn = true
    main.post(pulse)
    Speech.listen(this) { text ->
      pulseOn = false
      if (text.isNullOrBlank()) {
        say(this, "I did not catch that. Please try again.", "समझ नहीं आया। कृपया फिर से बोलिए।")
      } else {
        CommandCenter.handle(this, text)
      }
    }
  }

  private fun buzz(ms: Long) {
    try {
      val v = getSystemService(VIBRATOR_SERVICE) as Vibrator
      if (Build.VERSION.SDK_INT >= 26) v.vibrate(VibrationEffect.createOneShot(ms, VibrationEffect.DEFAULT_AMPLITUDE))
      else @Suppress("DEPRECATION") v.vibrate(ms)
    } catch (_: Exception) {}
  }

  override fun onDestroy() {
    pulseOn = false
    try { bubble?.let { wm?.removeView(it) } } catch (_: Exception) {}
    bubble = null
    super.onDestroy()
  }

  override fun onBind(intent: Intent?): IBinder? = null
}
