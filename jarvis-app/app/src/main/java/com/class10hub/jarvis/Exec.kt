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

/* Executes ONE device command. Understands pure English AND pure Hindi. */
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
    "snapchat" to "com.snapchat.android", "zoom" to "us.zoom.videomeetings",
    "क्रोम" to "com.android.chrome", "व्हाट्सएप" to "com.whatsapp", "व्हाट्सप्प" to "com.whatsapp",
    "यूट्यूब" to "com.google.android.youtube", "इंस्टाग्राम" to "com.instagram.android",
    "टेलीग्राम" to "org.telegram.messenger", "फेसबुक" to "com.facebook.katana",
    "जीमेल" to "com.google.android.gm", "मैप" to "com.google.android.apps.maps", "नक्शा" to "com.google.android.apps.maps",
    "कैमरा" to "com.android.camera2", "कैलकुलेटर" to "com.google.android.calculator",
    "घड़ी" to "com.google.android.deskclock", "फोटो" to "com.google.android.apps.photos", "सेटिंग" to "com.android.settings"
  )

  fun execute(c: Context, t: String): Boolean {
    val low = t.trim().lowercase(Locale.ROOT)
    if (low.isEmpty()) return false

    /* ---------- torch ---------- */
    if (low.contains("torch") || low.contains("flashlight") || low.contains("flash light") || low.contains("flash") ||
        low.contains("टॉर्च") || low.contains("फ्लैश") || low.contains("मशाल")) {
      val off = low.contains("off") || low.contains("band") || low.contains("bujha") ||
                low.contains("बंद") || low.contains("बुझा")
      return torch(c, !off)
    }

    /* ---------- volume ---------- */
    if (low.contains("volume") || low.contains("awaaz") || low.contains("awaz") || low.contains("वॉल्यूम") || low.contains("आवाज़") || low.contains("आवाज")) {
      val am = c.getSystemService(Context.AUDIO_SERVICE) as AudioManager
      when {
        low.contains("full") || low.contains("max") || low.contains("100") || low.contains("पूरी") || low.contains("पूरा") ->
          am.setStreamVolume(AudioManager.STREAM_MUSIC, am.getStreamMaxVolume(AudioManager.STREAM_MUSIC), 1)
        low.contains("down") || low.contains("lower") || low.contains("reduce") || low.contains("decrease") || low.contains("mute") ||
          low.contains("कम") || low.contains("घटाओ") || low.contains("घटा") || low.contains("मूक") ->
          am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 1)
        else -> am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 1)
      }
      say(c, "Done.", "ठीक है।")
      return true
    }

    /* ---------- battery ---------- */
    if (low.contains("battery") || low.contains("बैटरी") || low.contains("चार्ज")) {
      val bm = c.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      val pct = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
      say(c, "Battery is at $pct percent.", "बैटरी $pct प्रतिशत है।")
      return true
    }

    /* ---------- time / date ---------- */
    if (low.contains("time") || low.contains("समय") || low.contains("कितने बजे") || low.contains("kitne baje")) {
      if (low.contains("what") || low.contains("kya") || low.contains("kitne") || low.contains("समय") || low.contains("बजे") || low.length < 30) {
        say(c, "It is " + SimpleDateFormat("h:mm a", Locale.US).format(Date()) + ".", "अभी " + SimpleDateFormat("h:mm a", Locale.US).format(Date()) + " हुए हैं।")
        return true
      }
    }
    if (low.contains("date") || low.contains("तारीख") || low.contains("तारीख़") || low.contains("आज का दिन")) {
      say(c, "Today is " + SimpleDateFormat("d MMMM yyyy", Locale.US).format(Date()) + ".", "आज " + SimpleDateFormat("d MMMM yyyy", Locale.US).format(Date()) + " है।")
      return true
    }

    /* ---------- timer ---------- */
    if (low.contains("timer") || low.contains("stopwatch") || low.contains("टाइमर")) {
      val m = Regex("(\\d+)\\s*(minute|min|minut|mint|second|sec|ghante|ghanta|hour|hr|मिनट|सेकंड|घंटा|घंटे)").find(low)
      if (m != null) {
        val n = m.groupValues[1].toIntOrNull() ?: 1
        val unit = m.groupValues[2]
        val secs = when {
          unit.startsWith("sec") || unit.startsWith("सेकंड") -> n
          unit.startsWith("min") || unit == "minut" || unit == "mint" || unit.startsWith("मिनट") -> n * 60
          else -> n * 3600
        }
        return try {
          c.startActivity(Intent(AlarmClock.ACTION_SET_TIMER).apply {
            putExtra(AlarmClock.EXTRA_LENGTH, secs)
            putExtra(AlarmClock.EXTRA_MESSAGE, "Jarvis")
            putExtra(AlarmClock.EXTRA_SKIP_UI, true)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          })
          say(c, "Timer set for $n $unit.", "$n $unit का टाइमर लग गया।")
          true
        } catch (_: Exception) { false }
      }
      say(c, "For how many minutes?", "कितने मिनट का टाइमर?")
      return false
    }

    /* ---------- alarm ---------- */
    if (low.contains("alarm") || low.contains("अलारम") || low.contains("अलार्म")) {
      val m = Regex("(\\d{1,2})(?::(\\d{2}))?\\s*(am|pm)?").find(low.replace(Regex("(\\d)\\s*(?:baje|बजे)"), "$1"))
      if (m != null) {
        var h = m.groupValues[1].toIntOrNull() ?: return false
        val min = m.groupValues[2].toIntOrNull() ?: 0
        val ap = m.groupValues[3]
        if (ap == "pm" && h < 12) h += 12
        if (ap == "am" && h == 12) h = 0
        if (low.contains("subah") || low.contains("सुबह")) { if (h in 1..11 && ap.isEmpty()) { /* already morning */ } }
        if (low.contains("shaam") || low.contains("शाम") || low.contains("raat") || low.contains("रात")) { if (h < 12 && ap.isEmpty()) h += 12 }
        return try {
          c.startActivity(Intent(AlarmClock.ACTION_SET_ALARM).apply {
            putExtra(AlarmClock.EXTRA_HOUR, h)
            putExtra(AlarmClock.EXTRA_MINUTES, min)
            putExtra(AlarmClock.EXTRA_MESSAGE, "Jarvis")
            putExtra(AlarmClock.EXTRA_SKIP_UI, true)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          })
          say(c, "Alarm set for $h:${min.toString().padStart(2, '0')}.", "$h:${min.toString().padStart(2, '0')} बजे का अलार्म लग गया।")
          true
        } catch (_: Exception) { false }
      }
      say(c, "For what time?", "कितने बजे का अलार्म?")
      return false
    }

    /* ---------- youtube play ---------- */
    if (low.contains("youtube") || low.contains("यूट्यूब")) {
      var q = afterFillers(low)
      q = q.replace(Regex("^(?:youtube|you tube|yt|यूट्यूब)\\s*"), "")
      q = cleanQuery(q)
      return if (q.isNotBlank()) {
        openUrl(c, "https://www.youtube.com/results?search_query=" + URLEncoder.encode(q, "UTF-8"))
      } else openApp(c, "youtube").also { say(c, "Opening YouTube.", "यूट्यूब खोल रहा हूँ।") }
    }

    /* ---------- google search ---------- */
    if (low.contains("search") || low.contains("google pe") || low.contains("google mein") || low.contains("google me") ||
        low.contains("गूगल पर") || low.contains("गूगल में") || low.contains("खोजो") || low.contains("ढूँढो") || low.contains("ढूंढो")) {
      var q = afterFillers(low)
      q = q.replace(Regex("^(?:google|ggl|गूगल)\\s*(?:pe|par|mein|me|in|on|पर|में)?\\s*"), "")
      q = q.replace(Regex("^search(?: karo| kar)?\\s*"), "")
      q = q.replace(Regex("^(?:खोजो|ढूँढो|ढूंढो)\\s*"), "")
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

    /* ---------- call ---------- */
    if (low.contains("call") || low.contains("dial") || low.contains("कॉल") || low.contains("फ़ोन लगाओ") || low.contains("फोन लगाओ")) {
      return call(c, low)
    }

    /* ---------- open app ---------- */
    if (low.contains("kholo") || low.contains("khol") || low.contains("open") || low.contains("chalao") ||
        low.contains("launch") || low.contains("start") || low.contains("खोलो") || low.contains("खोल") || low.contains("चलाओ") || low.contains("चालू करो")) {
      val subject = subjectOf(low)
      if (subject.isNotBlank()) {
        val ok = openApp(c, subject)
        if (ok) say(c, "Opening it.", "खोल रहा हूँ।")
        else say(c, "That app was not found.", "यह ऐप नहीं मिला।")
        return ok
      }
    }

    say(c, "I did not understand that command. Open the Jarvis app for examples.", "यह आदेश समझ नहीं आया। उदाहरण के लिए जार्विस ऐप खोलिए।")
    return false
  }

  /* strip command words (EN + HI) to find the subject */
  private fun subjectOf(low: String): String {
    var s = " " + low + " "
    val words = listOf("kholo", "khol do", "khol", "open karo", "open", "chalao", "chala do", "launch karo", "launch",
                       "start karo", "start", "karo", "kar do", "jara", "zara", "mujhe", "please", "plz", "app", "the", "an", "a", "do",
                       "खोलो", "खोल दो", "खोल", "चलाओ", "चला दो", "चालू करो", "करो", "कर दो", "ज़रा", "जरा", "मुझे", "ऐप", "एप", "कृपया")
    for (w in words) s = Regex("\\b" + Regex.escape(w) + "\\b").replace(s, " ")
    return s.replace(Regex("\\s+"), " ").trim()
  }

  private fun afterFillers(low: String): String {
    var s = low
    val words = listOf("pe", "par", "mein", "me", "in", "on", "se", "karo", "chalao", "play", "laga do", "laga", "lagao",
                       "video", "song", "gaana", "gana", "dikhao", "search", "khojo", "dhundo", "dhoondo", "jarvis",
                       "पर", "में", "से", "करो", "चलाओ", "लगाओ", "लगा दो", "वीडियो", "गाना", "दिखाओ", "खोजो", "ढूँढो", "जार्विस")
    for (w in words) s = Regex("\\b$w\\b").replace(s, " ")
    return s.replace(Regex("\\s+"), " ").trim()
  }

  private fun cleanQuery(q: String): String {
    var s = q
    val words = listOf("karo", "kya", "hai", "ka", "ki", "ke", "please", "plz", "jarvis", "batao", "dikha",
                       "करो", "क्या", "है", "का", "की", "के", "कृपया", "जार्विस", "बताओ", "दिखाओ")
    for (w in words) s = Regex("\\b$w\\b").replace(s, " ")
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
    say(c, "Opening.", "खोल रहा हूँ।")
    return try {
      val i = Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      try { i.setPackage("com.android.chrome"); c.startActivity(i) } catch (_: Exception) { i.setPackage(null); c.startActivity(i) }
      true
    } catch (_: Exception) { false }
  }

  private fun call(c: Context, low: String): Boolean {
    if (c.checkSelfPermission(android.Manifest.permission.READ_CONTACTS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
      say(c, "Please grant the Contacts permission in the Jarvis app.", "कृपया जार्विस ऐप में संपर्क (Contacts) की अनुमति दें।")
      return false
    }
    var name = low
    val words = listOf("call", "phone", "lagao", "dial", "karo", "ko", "se", "mila", "jarvis", "do", "a", "kar", "up", "on",
                       "कॉल", "फ़ोन", "फोन", "लगाओ", "डायल", "करो", "को", "से", "जार्विस", "उपर", "पर")
    for (w in words) name = Regex("\\b$w\\b").replace(name, " ")
    name = name.replace(Regex("\\s+"), " ").trim()
    if (name.isBlank()) { say(c, "Whom should I call?", "किसे कॉल करना है?"); return false }
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
      if (bestNum.isBlank()) { say(c, "No contact named $name was found.", "संपर्कों में $name नाम का कोई व्यक्ति नहीं मिला।"); return false }
      say(c, "Calling $bestName.", "$bestName को कॉल कर रहा हूँ।")
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
      if (done) say(c, if (on) "Torch on." else "Torch off.", if (on) "टॉर्च चालू।" else "टॉर्च बंद।")
      else say(c, "No flash was found.", "फ्लैश नहीं मिला।")
      done
    } catch (_: Exception) { false }
  }
}
