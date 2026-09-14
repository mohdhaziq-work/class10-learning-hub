package com.class10hub.jarvis

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import android.os.BatteryManager
import android.os.Build
import android.provider.AlarmClock
import android.provider.ContactsContract
import android.hardware.camera2.CameraManager
import java.net.URLEncoder
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/* Executes ONE device command (app open, call, alarm, torch, …). Returns true if done. */
object Exec {

  private val APP_PKGS = mapOf(
    "chrome" to "com.android.chrome", "google chrome" to "com.android.chrome",
    "whatsapp" to "com.whatsapp", "youtube" to "com.google.android.youtube",
    "instagram" to "com.instagram.android", "insta" to "com.instagram.android",
    "telegram" to "org.telegram.messenger", "facebook" to "com.facebook.katana",
    "gmail" to "com.google.android.gm", "mail" to "com.google.android.gm",
    "maps" to "com.google.android.apps.maps", "map" to "com.google.android.apps.maps",
    "play store" to "com.android.vending", "playstore" to "com.android.vending",
    "settings" to "com.android.settings", "setting" to "com.android.settings",
    "camera" to "com.android.camera2", "calculator" to "com.google.android.calculator",
    "clock" to "com.google.android.deskclock", "contacts" to "com.android.contacts",
    "phone" to "com.android.dialer", "dialer" to "com.android.dialer",
    "messages" to "com.google.android.apps.messaging", "sms" to "com.google.android.apps.messaging",
    "files" to "com.android.documentsui", "gallery" to "com.android.gallery3d",
    "photos" to "com.google.android.apps.photos", "spotify" to "com.spotify.music",
    "snapchat" to "com.snapchat.android", "zoom" to "us.zoom.videomeetings"
  )

  fun execute(c: Context, t: String): Boolean {
    val low = t.trim().lowercase(Locale.ROOT)
    if (low.isEmpty()) return false

    /* ---------- torch ---------- */
    if (low.contains("torch") || low.contains("flash light") || low.contains("flashlight") || low.contains("flash")) {
      val off = low.contains("off") || low.contains("band") || low.contains("bujha")
      return torch(c, !off)
    }

    /* ---------- volume ---------- */
    if (low.contains("volume") || low.contains("awaaz") || low.contains("awaz")) {
      val am = c.getSystemService(Context.AUDIO_SERVICE) as AudioManager
      when {
        low.contains("full") || low.contains("max") || low.contains("100") -> am.setStreamVolume(AudioManager.STREAM_MUSIC, am.getStreamMaxVolume(AudioManager.STREAM_MUSIC), 1)
        low.contains("kam") || low.contains("ghata") || low.contains("down") || low.contains("low") || low.contains("reduce") -> am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 1)
        else -> am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 1)
      }
      Speech.speak(c, "Theek hai")
      return true
    }

    /* ---------- battery ---------- */
    if (low.contains("battery") || low.contains("charge kitni")) {
      val bm = c.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      val pct = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
      Speech.speak(c, "Battery $pct percent hai")
      return true
    }

    /* ---------- time ---------- */
    if ((low.contains("time") && low.contains("kya")) || low.contains("kitne baje") || low.contains("samay")) {
      Speech.speak(c, "Abhi " + SimpleDateFormat("h:mm a", Locale.US).format(Date()) + " baje hai")
      return true
    }
    if (low.contains("date") || low.contains("tareekh") || low.contains("tarikh")) {
      Speech.speak(c, "Aaj " + SimpleDateFormat("d MMMM yyyy", Locale.US).format(Date()) + " hai")
      return true
    }

    /* ---------- timer (before alarm) ---------- */
    if (low.contains("timer") || low.contains("stopwatch")) {
      val m = Regex("(\\d+)\\s*(minute|min|minut|mint|second|sec|ghante|ghanta|hour|hr)").find(low)
      if (m != null) {
        val n = m.groupValues[1].toIntOrNull() ?: 1
        val unit = m.groupValues[2]
        val secs = when {
          unit.startsWith("sec") -> n
          unit.startsWith("min") || unit == "minut" || unit == "mint" -> n * 60
          else -> n * 3600
        }
        return try {
          c.startActivity(Intent(AlarmClock.ACTION_SET_TIMER).apply {
            putExtra(AlarmClock.EXTRA_LENGTH, secs)
            putExtra(AlarmClock.EXTRA_MESSAGE, "Jarvis timer")
            putExtra(AlarmClock.EXTRA_SKIP_UI, true)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          })
          Speech.speak(c, "$n $unit ka timer laga diya")
          true
        } catch (_: Exception) { false }
      }
      Speech.speak(c, "Kitne minute ka timer?")
      return false
    }

    /* ---------- alarm ---------- */
    if (low.contains("alarm")) {
      val m = Regex("(\\d{1,2})(?::(\\d{2}))?\\s*(am|pm)?").find(low.replace(Regex("(\\d)\\s*baje"), "$1"))
      if (m != null) {
        var h = m.groupValues[1].toIntOrNull() ?: return false
        val min = m.groupValues[2].toIntOrNull() ?: 0
        val ap = m.groupValues[3]
        if (ap == "pm" && h < 12) h += 12
        if (ap == "am" && h == 12) h = 0
        return try {
          c.startActivity(Intent(AlarmClock.ACTION_SET_ALARM).apply {
            putExtra(AlarmClock.EXTRA_HOUR, h)
            putExtra(AlarmClock.EXTRA_MINUTES, min)
            putExtra(AlarmClock.EXTRA_MESSAGE, "Jarvis alarm")
            putExtra(AlarmClock.EXTRA_SKIP_UI, true)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          })
          Speech.speak(c, "$h baje $min minute ka alarm laga diya")
          true
        } catch (_: Exception) { false }
      }
      Speech.speak(c, "Kitne baje ka alarm lagana hai?")
      return false
    }

    /* ---------- youtube play ---------- */
    if (low.contains("youtube")) {
      var q = afterFillers(low)
      q = q.replace(Regex("^(?:youtube|you tube|yt)\\s*"), "")
      q = cleanQuery(q)
      return if (q.isNotBlank()) {
        openUrl(c, "https://www.youtube.com/results?search_query=" + URLEncoder.encode(q, "UTF-8"))
      } else openApp(c, "youtube").also { Speech.speak(c, "YouTube khol raha hoon") }
    }

    /* ---------- google search ---------- */
    if (low.contains("search") || low.contains("google pe") || low.contains("google mein") || low.contains("google me")) {
      var q = afterFillers(low)
      q = q.replace(Regex("^(?:google|ggl)\\s*(?:pe|par|mein|me|in|on)?\\s*"), "")
      q = q.replace(Regex("^search(?: karo| kar)?\\s*"), "")
      q = cleanQuery(q)
      return if (q.isNotBlank()) {
        openUrl(c, "https://www.google.com/search?q=" + URLEncoder.encode(q, "UTF-8"))
      } else false
    }

    /* ---------- direct URL (arena.ai etc) ---------- */
    val um = Regex("(?:https?://)?(?:www\\.)?([a-z0-9][a-z0-9-]*(?:\\.[a-z0-9-]+)*\\.[a-z]{2,})(?:/(\\S*))?").find(low)
    if (um != null && (low.contains(".") || low.contains("dot"))) {
      val host = um.groupValues[1]
      val path = um.groupValues[2]
      if (!host.contains("jarvis")) {
        return openUrl(c, "https://$host/" + path)
      }
    }

    /* ---------- call (after youtube/search/url so "call of duty youtube pe" works) ---------- */
    if (low.contains("call") || low.contains("dial") || low.contains("phone lagao") || low.contains("phone mila")) {
      return call(c, low)
    }

    /* ---------- open app ---------- */
    if (low.contains("kholo") || low.contains("khol") || low.contains("open") || low.contains("chalao") || low.contains("launch") || low.contains("start")) {
      val subject = subjectOf(low)
      if (subject.isNotBlank()) {
        val ok = openApp(c, subject)
        if (ok) Speech.speak(c, "${subject.replaceFirstChar { it.uppercase() }} khol raha hoon")
        else Speech.speak(c, "$subject naam ka app nahi mila")
        return ok
      }
    }

    Speech.speak(c, "Ye command samajh nahi aayi. Help ke liye Jarvis app kholo.")
    return false
  }

  /* strip command words to find the subject (app name / person / query) */
  private fun subjectOf(low: String): String {
    var s = " " + low + " "
    for (w in listOf("kholo", "khol do", "khol", "open karo", "open", "chalao", "chala do", "launch karo", "launch",
                     "start karo", "start", "karo", "kar do", "jara", "zara", "mujhe", "please", "plz", "app", "the", "an", "a", "do")) {
      s = Regex("\\b" + Regex.escape(w) + "\\b").replace(s, " ")
    }
    return s.replace(Regex("\\s+"), " ").trim()
  }

  private fun afterFillers(low: String): String {
    var s = low
    for (w in listOf("pe", "par", "mein", "me", "in", "on", "se", "par", "karo", "chalao", "play", "laga do", "laga", "lagao",
                     "video", "song", "gaana", "gana", "dikhao", "search", "khojo", "dhundo", "dhoondo", "jarvis")) {
      s = Regex("\\b$w\\b").replace(s, " ")
    }
    return s.replace(Regex("\\s+"), " ").trim()
  }

  private fun cleanQuery(q: String): String {
    var s = q
    for (w in listOf("karo", "kya", "hai", "ka", "ki", "ke", "please", "plz", "jarvis", "batao", "dikha")) {
      s = Regex("\\b$w\\b").replace(s, " ")
    }
    return s.replace(Regex("\\s+"), " ").trim()
  }

  fun openApp(c: Context, subject: String): Boolean {
    val s = subject.trim().lowercase(Locale.ROOT)
    if (s.isBlank()) return false
    for ((k, pkg) in APP_PKGS) {
      if (s == k || s.contains(k)) {
        val i = c.packageManager.getLaunchIntentForPackage(pkg)
        if (i != null) {
          i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          c.startActivity(i)
          return true
        }
      }
    }
    /* fallback: fuzzy match against every launchable app label */
    return try {
      val pm = c.packageManager
      val all = pm.queryIntentActivities(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER), 0)
      var best: android.content.pm.ResolveInfo? = null
      var bestScore = 0
      for (ri in all) {
        val l = ri.loadLabel(pm).toString().lowercase(Locale.ROOT)
        var sc = 0
        if (l == s) sc = 100 else if (l.contains(s)) sc = 60 else if (s.contains(l) && l.length > 3) sc = 40
        if (sc > bestScore) { bestScore = sc; best = ri }
      }
      if (bestScore >= 40 && best != null) {
        c.startActivity(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
          .setClassName(best.activityInfo.packageName, best.activityInfo.name)
          .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        true
      } else false
    } catch (_: Exception) { false }
  }

  fun openUrl(c: Context, url: String): Boolean {
    Speech.speak(c, "Khol raha hoon")
    return try {
      val i = Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      try { i.setPackage("com.android.chrome"); c.startActivity(i) } catch (_: Exception) { i.setPackage(null); c.startActivity(i) }
      true
    } catch (_: Exception) { false }
  }

  private fun call(c: Context, low: String): Boolean {
    if (c.checkSelfPermission(android.Manifest.permission.READ_CONTACTS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
      Speech.speak(c, "Contacts ki permission do Jarvis app mein")
      return false
    }
    var name = low
    for (w in listOf("call", "phone", "lagao", "dial", "karo", "ko", "se", "mila", "jarvis", "do", "a", "kar")) {
      name = Regex("\\b$w\\b").replace(name, " ")
    }
    name = name.replace(Regex("\\s+"), " ").trim()
    if (name.isBlank()) { Speech.speak(c, "Kisko call karna hai?"); return false }
    return try {
      val cur = c.contentResolver.query(
        ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
        arrayOf(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME, ContactsContract.CommonDataKinds.Phone.NUMBER),
        ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " LIKE ?",
        arrayOf("%$name%"), null)
      var bestName = ""; var bestNum = ""; var bestScore = -1
      cur?.use { cu ->
        val idxN = cu.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME)
        val idxP = cu.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)
        while (cu.moveToNext()) {
          val dn = cu.getString(idxN) ?: continue
          val l = dn.lowercase(Locale.ROOT)
          var sc = -1
          if (l == name) sc = 100 else if (l.contains(name)) sc = 60 else if (name.contains(l)) sc = 40
          if (sc > bestScore) { bestScore = sc; bestName = dn; bestNum = cu.getString(idxP) ?: "" }
        }
      }
      if (bestNum.isBlank()) { Speech.speak(c, "Contacts mein $name nahi mila"); return false }
      Speech.speak(c, "$bestName ko call laga raha hoon")
      c.startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + Uri.encode(bestNum))).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
      true
    } catch (_: Exception) { false }
  }

  private fun torch(c: Context, on: Boolean): Boolean {
    return try {
      val cm = c.getSystemService(Context.CAMERA_SERVICE) as CameraManager
      var done = false
      for (id in cm.cameraIdList) {
        if (cm.getCameraCharacteristics(id).get(android.hardware.camera2.CameraCharacteristics.FLASH_INFO_AVAILABLE) != null) {
          cm.setTorchMode(id, on); done = true; break
        }
      }
      if (done) Speech.speak(c, if (on) "Torch on" else "Torch off") else Speech.speak(c, "Flash light nahi mila")
      done
    } catch (_: Exception) { false }
  }
}
