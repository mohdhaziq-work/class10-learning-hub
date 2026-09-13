package com.class10hub.caster

import android.app.Activity
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Bundle
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.text.InputFilter
import android.text.InputType
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {

  private lateinit var codeInput: EditText
  private lateinit var statusView: TextView
  private lateinit var startBtn: Button
  private lateinit var stopBtn: Button
  private var pendingSid: String? = null

  private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val pad = dp(26)
    val root = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      setPadding(pad, dp(64), pad, pad)
      setBackgroundColor(Color.parseColor("#0b1220"))
    }

    root.addView(TextView(this).apply {
      text = "Screen Cast"
      textSize = 27f
      setTextColor(Color.parseColor("#e8edf6"))
      typeface = Typeface.DEFAULT_BOLD
    })
    root.addView(TextView(this).apply {
      text = "Cast this phone's screen to the big screen.\n\n1. Open the TV / laptop page (the QR screen)\n2. Type its 6-letter code below\n3. Press Start — allow screen recording\n\nEverything is peer-to-peer and encrypted."
      textSize = 14f
      setTextColor(Color.parseColor("#8b98b3"))
      setLineSpacing(0f, 1.45f)
    }, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(10); bottomMargin = dp(28) })

    codeInput = EditText(this).apply {
      hint = "TV code"
      textSize = 24f
      letterSpacing = 0.25f
      gravity = Gravity.CENTER
      setTextColor(Color.parseColor("#e8edf6"))
      setHintTextColor(Color.parseColor("#5a6b8c"))
      background = GradientDrawable().apply {
        cornerRadius = dp(14).toFloat()
        setColor(Color.parseColor("#111a2c"))
        setStroke(dp(1), Color.parseColor("#1e2a44"))
      }
      setPadding(dp(14), dp(16), dp(14), dp(16))
      inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
      filters = arrayOf(InputFilter.AllCaps(), InputFilter.LengthFilter(6))
    }
    root.addView(codeInput)

    val btnBg = GradientDrawable().apply {
      cornerRadius = dp(14).toFloat()
      setColor(Color.parseColor("#1a73e8"))
    }
    val btnBg2 = GradientDrawable().apply {
      cornerRadius = dp(14).toFloat()
      setColor(Color.parseColor("#231229"))
      setStroke(dp(1), Color.parseColor("#7f1d1d"))
    }
    startBtn = Button(this).apply {
      text = "Start Casting"
      textSize = 17f
      setTextColor(Color.WHITE)
      typeface = Typeface.DEFAULT_BOLD
      background = btnBg
      setPadding(dp(16), dp(18), dp(16), dp(18))
      setOnClickListener { beginCast() }
    }
    root.addView(startBtn, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(16) })

    stopBtn = Button(this).apply {
      text = "Stop"
      textSize = 16f
      setTextColor(Color.parseColor("#fca5a5"))
      typeface = Typeface.DEFAULT_BOLD
      background = btnBg2
      visibility = android.view.View.GONE
      setOnClickListener {
        startBtn.isEnabled = true
        stopBtn.visibility = android.view.View.GONE
        statusView.text = "Cast ended"
        startService(Intent(this@MainActivity, CastService::class.java).setAction("STOP"))
      }
    }
    root.addView(stopBtn, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(12) })

    statusView = TextView(this).apply {
      text = "Ready"
      textSize = 14f
      setTextColor(Color.parseColor("#4ade80"))
      gravity = Gravity.CENTER
      setLineSpacing(0f, 1.4f)
    }
    root.addView(statusView, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(20) })

    setContentView(root)

    /* opened from the TV's link (intent://…?sid=xxxx) — pre-fill the code */
    intent?.data?.getQueryParameter("sid")?.let { s ->
      pendingSid = s.lowercase()
      codeInput.setText(pendingSid)
    }
  }

  private fun beginCast() {
    val sid = codeInput.text.toString().trim().lowercase()
    if (sid.length != 6) {
      statusView.text = "Type the 6-letter code shown on the TV"
      statusView.setTextColor(Color.parseColor("#fbbf24"))
      return
    }
    if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
      requestPermissions(arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 7)
    }
    val mpm = getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
    @Suppress("DEPRECATION")
    startActivityForResult(mpm.createScreenCaptureIntent(), 42)
  }

  @Deprecated("Deprecated in Java")
  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (requestCode != 42) return
    if (resultCode != RESULT_OK || data == null) {
      statusView.text = "Screen permission denied — try again"
      statusView.setTextColor(Color.parseColor("#fbbf24"))
      return
    }
    val sid = codeInput.text.toString().trim().lowercase()
    val svc = Intent(this, CastService::class.java)
      .putExtra("sid", sid)
      .putExtra("resultCode", resultCode)
      .putExtra("data", data)
    if (Build.VERSION.SDK_INT >= 26) startForegroundService(svc) else startService(svc)
    startBtn.isEnabled = false
    stopBtn.visibility = android.view.View.VISIBLE
    statusView.text = "Starting…"
    statusView.setTextColor(Color.parseColor("#8b98b3"))
  }

  override fun onResume() {
    super.onResume()
    CastService.onStatus = { s ->
      runOnUiThread {
        statusView.text = s
        statusView.setTextColor(if (s.startsWith("LIVE")) Color.parseColor("#4ade80") else Color.parseColor("#8b98b3"))
        if (s.startsWith("LIVE")) { stopBtn.visibility = android.view.View.VISIBLE }
        if (s.contains("ended") || s.contains("lost") || s.contains("stopped")) {
          startBtn.isEnabled = true
          stopBtn.visibility = android.view.View.GONE
        }
      }
    }
  }

  override fun onPause() {
    super.onPause()
    CastService.onStatus = null
  }
}
