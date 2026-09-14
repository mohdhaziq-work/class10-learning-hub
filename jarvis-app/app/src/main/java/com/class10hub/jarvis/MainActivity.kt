package com.class10hub.jarvis

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.TextView
import android.widget.Toast

class MainActivity : Activity() {

  override fun onCreate(b: Bundle?) {
    super.onCreate(b)
    P.init(this)
    setContentView(R.layout.activity_main)

    val need = mutableListOf<String>()
    if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) need.add(Manifest.permission.RECORD_AUDIO)
    if (checkSelfPermission(Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) need.add(Manifest.permission.READ_CONTACTS)
    if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) need.add(Manifest.permission.POST_NOTIFICATIONS)
    if (need.isNotEmpty()) requestPermissions(need.toTypedArray(), 7)

    findViewById<Button>(R.id.btnStart).setOnClickListener {
      if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
        requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO), 7)
        Toast.makeText(this, "Grant the microphone permission first", Toast.LENGTH_LONG).show()
        return@setOnClickListener
      }
      if (!Settings.canDrawOverlays(this)) {
        Toast.makeText(this, "Allow \u201CDisplay over other apps\u201D for Jarvis, then press Start again", Toast.LENGTH_LONG).show()
        startActivity(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName")))
        return@setOnClickListener
      }
      val i = Intent(this, BubbleService::class.java)
      if (Build.VERSION.SDK_INT >= 26) startForegroundService(i) else startService(i)
      Toast.makeText(this, "Jarvis is running — tap the bubble and speak", Toast.LENGTH_SHORT).show()
    }
    findViewById<Button>(R.id.btnStop).setOnClickListener { stopService(Intent(this, BubbleService::class.java)) }
    findViewById<Button>(R.id.btnArena).setOnClickListener { ArenaWebActivity.open(this, "") }

    findViewById<TextView>(R.id.permGesture).setOnClickListener {
      startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
    }
    findViewById<Button>(R.id.langEn).setOnClickListener { P.lang = "en-IN"; update() }
    findViewById<Button>(R.id.langHi).setOnClickListener { P.lang = "hi-IN"; update() }
  }

  override fun onResume() { super.onResume(); update() }
  override fun onRequestPermissionsResult(rc: Int, perms: Array<out String>, res: IntArray) { update() }

  private fun update() {
    val mic = checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED
    val con = checkSelfPermission(Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED
    val ov = Settings.canDrawOverlays(this)
    val gs = GestureService.on()
    row(findViewById(R.id.permMic), "Microphone", mic)
    row(findViewById(R.id.permContacts), "Contacts — for calls", con)
    row(findViewById(R.id.permOverlay), "Display over other apps", ov)
    row(findViewById(R.id.permGesture), "Accessibility — for scrolling", gs)
    findViewById<Button>(R.id.langEn).apply {
      background = getDrawable(if (P.lang == "en-IN") R.drawable.seg_on else R.drawable.seg_off)
      setTextColor(getColor(if (P.lang == "en-IN") R.color.ink else R.color.mute))
    }
    findViewById<Button>(R.id.langHi).apply {
      background = getDrawable(if (P.lang == "hi-IN") R.drawable.seg_on else R.drawable.seg_off)
      setTextColor(getColor(if (P.lang == "hi-IN") R.color.ink else R.color.mute))
    }
    val q = TaskRunner.display()
    findViewById<TextView>(R.id.queueView).text =
      if (q == "Empty — no pending tasks.") Str.pick(
        "Empty — no pending tasks.\nSay: task — first check maths on Arena, then play physics on YouTube, then call Papa.",
        "कोई काम बाकी नहीं है।\nकहें: काम — पहले एरीना पर गणित पूछो, फिर यूट्यूब पर फिजिक्स चलाओ, फिर पापा को कॉल करो।")
      else q
  }

  private fun row(v: TextView, label: String, ok: Boolean) {
    v.text = (if (ok) "\u2713  " else "\u2717  ") + label
    v.setTextColor(getColor(if (ok) R.color.ink else R.color.bad))
  }
}
