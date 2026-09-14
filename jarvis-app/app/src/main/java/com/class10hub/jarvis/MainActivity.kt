package com.class10hub.jarvis

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.RadioButton
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
        Toast.makeText(this, "Pehle microphone ki permission do", Toast.LENGTH_LONG).show()
        return@setOnClickListener
      }
      if (!Settings.canDrawOverlays(this)) {
        Toast.makeText(this, "Pehle overlay permission do (neeche button)", Toast.LENGTH_LONG).show()
        return@setOnClickListener
      }
      val i = Intent(this, BubbleService::class.java)
      if (Build.VERSION.SDK_INT >= 26) startForegroundService(i) else startService(i)
      Toast.makeText(this, "Jarvis chalu — bubble dabao aur bolo", Toast.LENGTH_SHORT).show()
    }
    findViewById<Button>(R.id.btnStop).setOnClickListener { stopService(Intent(this, BubbleService::class.java)) }

    findViewById<Button>(R.id.btnOverlay).setOnClickListener {
      startActivity(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName")))
    }
    findViewById<Button>(R.id.btnArena).setOnClickListener { ArenaWebActivity.open(this, "kholo") }

    findViewById<RadioButton>(R.id.langHi).setOnClickListener { P.lang = "hi-IN" }
    findViewById<RadioButton>(R.id.langEn).setOnClickListener { P.lang = "en-IN" }

    findViewById<Button>(R.id.btnUnpin).setOnClickListener {
      P.pin = ""
      update()
      Toast.makeText(this, "Pin hata diya", Toast.LENGTH_SHORT).show()
    }
  }

  override fun onResume() { super.onResume(); update() }
  override fun onRequestPermissionsResult(rc: Int, perms: Array<out String>, res: IntArray) { update() }

  private fun update() {
    val mic = checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED
    val con = checkSelfPermission(Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED
    val ov = Settings.canDrawOverlays(this)
    findViewById<TextView>(R.id.permStatus).text = buildString {
      append(if (mic) "✅" else "❌").append(" Microphone (bolne ke liye)\n")
      append(if (con) "✅" else "❌").append(" Contacts (call karo bole to)\n")
      append(if (ov) "✅" else "❌").append(" Overlay (floating bubble)")
    }
    val pin = P.pin
    findViewById<TextView>(R.id.pinView).text = "📌 Pinned chat: " + if (pin.isEmpty()) "koi nahi" else pin.substringAfter("arena.ai/", pin)
    findViewById<RadioButton>(R.id.langHi).isChecked = P.lang == "hi-IN"
    findViewById<RadioButton>(R.id.langEn).isChecked = P.lang == "en-IN"
    findViewById<TextView>(R.id.queueView).text = TaskRunner.display()
  }
}
