package com.class10hub.vaani

import android.Manifest
import android.app.AlarmManager
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import android.media.AudioManager
import android.net.Uri
import android.os.PowerManager
import android.provider.AlarmClock
import android.provider.ContactsContract
import android.provider.Settings

/* Runs a parsed command against the system. Returns a spoken result line. */
object Executor {

  private val APPS = mapOf(
    "chrome" to "com.android.chrome", "whatsapp" to "com.whatsapp",
    "youtube" to "com.google.android.youtube", "instagram" to "com.instagram.android",
    "facebook" to "com.facebook.katana", "fb" to "com.facebook.katana",
    "gmail" to "com.google.android.gm", "mail" to "com.google.android.gm",
    "maps" to "com.google.android.apps.maps", "map" to "com.google.android.apps.maps",
    "camera" to "com.android.camera2", "settings" to "com.android.settings",
    "setting" to "com.android.settings", "play store" to "com.android.vending",
    "playstore" to "com.android.vending", "calculator" to "com.google.android.calculator",
    "photos" to "com.google.android.apps.photos", "gallery" to "com.google.android.apps.photos",
    "phone" to "com.android.dialer", "dialer" to "com.android.dialer",
    "contacts" to "com.android.contacts", "telegram" to "org.telegram.messenger",
    "spotify" to "com.spotify.music", "paytm" to "net.one97.paytm",
    "phonepe" to "com.phonepe.app", "hotstar" to "in.startv.hotstar",
    "jiohotstar" to "in.startv.hotstar"
  )

  fun execute(ctx: Context, cmd: Parser.Cmd): String {
    Speaker.init(ctx)
    return when (cmd) {
      is Parser.Cmd.OpenApp -> openApp(ctx, cmd.name)
      is Parser.Cmd.Call -> dial(ctx, cmd.who)
      is Parser.Cmd.Alarm -> setAlarm(ctx, cmd.hour, cmd.minute)
      is Parser.Cmd.Timer -> setTimer(ctx, cmd.minutes)
      is Parser.Cmd.YouTube -> open(ctx, "https://www.youtube.com/results?search_query=" + Uri.encode(cmd.q))
      is Parser.Cmd.Search -> open(ctx, "https://www.google.com/search?q=" + Uri.encode(cmd.q))
      is Parser.Cmd.Torch -> torch(ctx, cmd.on)
      is Parser.Cmd.Volume -> volume(ctx, cmd.dir)
      else -> ""
    }
  }

  private fun open(ctx: Context, url: String): String {
    return try {
      ctx.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
      "Khol diya"
    } catch (e: Exception) { "Khol nahi paya" }
  }

  private fun openApp(ctx: Context, nameRaw: String): String {
    val name = nameRaw.trim().removeSuffix("app").trim().lowercase()
    if (name.isBlank()) return "Kaunsa app kholna hai?"
    val pm = ctx.packageManager
    APPS[name]?.let { pkg ->
      pm.getLaunchIntentForPackage(pkg)?.let {
        it.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        ctx.startActivity(it)
        return "Khol diya"
      }
    }
    /* generic: search every launcher label for the spoken name */
    return try {
      val main = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
      val matches = pm.queryIntentActivities(main, 0).filter {
        try { it.loadLabel(pm).toString().lowercase().contains(name) } catch (e: Exception) { false }
      }.sortedBy { it.loadLabel(pm).toString().length }
      val best = matches.firstOrNull() ?: return "App nahi mili: $name"
      val launch = pm.getLaunchIntentForPackage(best.activityInfo.packageName)
      if (launch != null) { launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); ctx.startActivity(launch); "Khol diya: " + best.loadLabel(pm) }
      else "App nahi khul payi"
    } catch (e: Exception) { "App nahi mili: $name" }
  }

  private fun dial(ctx: Context, who: String): String {
    val digits = who.filter { it.isDigit() || it == '+' }
    if (digits.length >= 7) {
      ctx.startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + digits)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
      return "Dial screen khol diya"
    }
    if (ctx.checkSelfPermission(Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED)
      return "Contacts ki permission chahiye — Vaani app mein de do"
    val name = who.trim()
    if (name.isBlank()) return "Kisko call karna hai?"
    return try {
      val cur = ctx.contentResolver.query(
        ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
        arrayOf(ContactsContract.CommonDataKinds.Phone.NUMBER),
        ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " LIKE ?",
        arrayOf("%$name%"), null)
      var number: String? = null
      if (cur != null) { if (cur.moveToFirst()) number = cur.getString(0); cur.close() }
      if (number != null) {
        ctx.startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        "Call kar raha hoon: $name"
      } else "Contact nahi mila: $name"
    } catch (e: Exception) { "Contact dhoondhne mein dikkat" }
  }

  private fun setAlarm(ctx: Context, h: Int, m: Int): String {
    return try {
      val i = Intent(AlarmClock.ACTION_SET_ALARM).apply {
        putExtra(AlarmClock.EXTRA_HOUR, h)
        putExtra(AlarmClock.EXTRA_MINUTES, m)
        putExtra(AlarmClock.EXTRA_SKIP_UI, true)
        putExtra(AlarmClock.EXTRA_MESSAGE, "Vaani")
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      ctx.startActivity(i)
      "Alarm set: " + String.format("%02d:%02d", h, m)
    } catch (e: Exception) { "Alarm app nahi mila" }
  }

  private fun setTimer(ctx: Context, minutes: Int): String {
    return try {
      val i = Intent(AlarmClock.ACTION_SET_TIMER).apply {
        putExtra(AlarmClock.EXTRA_LENGTH, minutes * 60)
        putExtra(AlarmClock.EXTRA_SKIP_UI, true)
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      ctx.startActivity(i)
      "Timer set: $minutes minute"
    } catch (e: Exception) { "Timer app nahi mila" }
  }

  private fun torch(ctx: Context, on: Boolean): String {
    return try {
      val cm = ctx.getSystemService(Context.CAMERA_SERVICE) as CameraManager
      val id = cm.cameraIdList.firstOrNull {
        cm.getCameraCharacteristics(it).get(CameraCharacteristics.FLASH_INFO_AVAILABLE) == true
      }
      if (id == null) "Torch nahi mila"
      else { cm.setTorchMode(id, on); if (on) "Torch jala di" else "Torch bujha di" }
    } catch (e: Exception) { "Torch mein dikkat" }
  }

  private fun volume(ctx: Context, dir: Int): String {
    return try {
      val am = ctx.getSystemService(Context.AUDIO_SERVICE) as AudioManager
      when (dir) {
        2 -> { am.setStreamVolume(AudioManager.STREAM_MUSIC, am.getStreamMaxVolume(AudioManager.STREAM_MUSIC), AudioManager.FLAG_SHOW_UI); "Volume full" }
        1 -> { am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, AudioManager.FLAG_SHOW_UI); "Volume badha diya" }
        -1 -> { am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, AudioManager.FLAG_SHOW_UI); "Volume kam kar diya" }
        else -> { am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_MUTE, AudioManager.FLAG_SHOW_UI); "Mute kar diya" }
      }
    } catch (e: Exception) { "Volume mein dikkat" }
  }

  /* not voice-triggered — the battery row in MainActivity calls this */
  fun batteryWhitelist(ctx: Context) {
    return try {
      val pm = ctx.getSystemService(Context.POWER_SERVICE) as PowerManager
      if (pm.isIgnoringBatteryOptimizations(ctx.packageName)) {
        ctx.startActivity(Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        return
      }
      ctx.startActivity(Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
        Uri.parse("package:" + ctx.packageName)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
    } catch (e: Exception) {
      try { ctx.startActivity(Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)) } catch (_: Exception) { }
    }
  }
}
