package com.class10hub.jarvis

import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import android.os.BatteryManager
import android.provider.AlarmClock
import android.provider.ContactsContract
import android.hardware.camera2.CameraManager
import java.net.URLEncoder
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/* Executes ONE device command. Understands natural, casual speech in pure
   English OR pure Hindi — however you say it ("abbe chrome kholo", "please
   open Chrome", "क्रोम खोल दो ना"). Token-based: filler words are stripped,
   the remaining words are the subject. */
object Exec {

  var lastApp: String? = null   /* context: last app we opened (for "search X" routing) */

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

  /* ---------- token helpers (word-safe for Devanagari too) ---------- */
  private fun toks(low: String): List<String> =
    low.split(Regex("[\\s\\p{Punct}\\u0964\\u0965]+")).filter { it.isNotBlank() }

  private fun strip(low: String, words: Set<String>): String =
    toks(low).filter { it !in words }.joinToString(" ")

  /* casual / rude / polite filler words — however you talk, they are ignored */
  private val FILLERS = setOf(
    "abbe", "abe", "abey", "oye", "oy", "o", "bhai", "bhaiya", "yaar", "yar", "jara", "zara",
    "please", "plz", "plzz", "plzzz", "jaldi", "quick", "quickly", "fast", "now", "abhi",
    "hi", "to", "na", "nah", "the", "a", "an", "mujhe", "mera", "jarvis", "assistant", "bot",
    "ना", "ही", "तो", "अभी", "जरा", "ज़रा", "कृपया", "भाई", "यार", "मुझे", "जार्विस", "असिस्टेंट")

  /* every "open" verb form, EN + HI */
  private val OPEN_WORDS = setOf(
    "open", "opens", "opened", "opening", "khol", "kholo", "kholu", "khole", "kholna", "kholni", "khulja", "khul",
    "launch", "start", "started", "chalu", "chalao", "chala", "chalana", "run", "karo", "kar", "kr", "krke",
    "do", "dena", "dede", "de", "ja", "jao",
    "खोलो", "खोल", "खोलिए", "खोलना", "खुल", "खुलजा", "चलाओ", "चला", "चलाना", "चालू", "शुरू", "दो", "दीजिए", "करो", "कर", "जाओ")

  private val SEARCH_WORDS = setOf(
    "search", "khojo", "khoj", "dhoondo", "dhundo", "dhoondo", "dhoondh", "khojo",
    "खोजो", "खोजिए", "खोज", "ढूँढो", "ढूंढो", "ढूंढ")

  private val SEARCH_STRIP = FILLERS + OPEN_WORDS + SEARCH_WORDS + setOf(
    "google", "ggl", "pe", "par", "mein", "me", "on", "in", "at", "youtube", "yt", "you", "tube",
    "video", "gaana", "gana", "song", "batao", "dikha", "dikhao", "kya", "hai", "ka", "ki", "ke",
    "it", "for", "of", "up",
    "गूगल", "पर", "में", "से", "क्या", "है", "यूट्यूब", "वीडियो", "गाना", "बताओ", "दिखाओ", "का", "की", "के")

  private val YT_STRIP = FILLERS + OPEN_WORDS + SEARCH_WORDS + setOf(
    "youtube", "yt", "you", "tube", "pe", "par", "mein", "me", "on", "in", "video", "gaana", "gana", "song",
    "play", "laga", "lagao", "dikhao", "kya", "hai", "ka", "ki", "ke",
    "यूट्यूब", "पर", "में", "से", "वीडियो", "गाना", "चलाओ", "लगाओ", "क्या", "है", "का", "की", "के")

  private val GESTURE_WORDS = setOf(
    "scroll", "swipe", "niche", "neeche", "nicheee", "upar", "up", "down", "back", "piche", "peeche", "home",
    "recent", "recents", "notification", "notifications", "notif",
    "नीचे", "ऊपर", "वापस", "पीछे", "होम", "रीसेंट", "नोटिफिकेशन")

  private val CALL_STRIP = setOf(
    "call", "calls", "calling", "dial", "phone", "lagao", "lag", "karo", "kar", "kr", "ko", "se", "mila",
    "jarvis", "up", "on", "do", "a", "make", "please", "abbe", "yaar", "bhai",
    "कॉल", "फ़ोन", "फोन", "लगाओ", "लगा", "डायल", "करो", "को", "से", "जार्विस", "कर", "कीजिए", "कृपया")

  fun execute(c: Context, t: String): Boolean {
    val low = t.trim().lowercase(Locale.ROOT)
    if (low.isEmpty()) return false
    val tk = toks(low)

    /* ---------- torch ---------- */
    if (tk.any { it in setOf("torch", "flashlight", "flash", "टॉर्च", "फ्लैश", "मशाल") }) {
      val off = tk.any { it in setOf("off", "band", "bujha", "बंद", "बुझा") }
      return torch(c, !off)
    }

    /* ---------- volume ---------- */
    if (tk.any { it in setOf("volume", "awaaz", "awaz", "वॉल्यूम", "आवाज़", "आवाज") }) {
      val am = c.getSystemService(Context.AUDIO_SERVICE) as AudioManager
      when {
        tk.any { it in setOf("full", "max", "100", "पूरी", "पूरा") } ->
          am.setStreamVolume(AudioManager.STREAM_MUSIC, am.getStreamMaxVolume(AudioManager.STREAM_MUSIC), 1)
        tk.any { it in setOf("down", "lower", "reduce", "decrease", "mute", "kam", "कम", "घटाओ", "घटा", "मूक") } ->
          am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_LOWER, 1)
        else -> am.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_RAISE, 1)
      }
      say(c, "Done.", "ठीक है।")
      return true
    }

    /* ---------- battery ---------- */
    if (tk.any { it in setOf("battery", "बैटरी", "चार्ज") }) {
      val bm = c.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      val pct = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
      say(c, "Battery is at $pct percent.", "बैटरी $pct प्रतिशत है।")
      return true
    }

    /* ---------- time / date ---------- */
    if (tk.any { it in setOf("time", "समय") } || low.contains("कितने बजे") || low.contains("kitne baje")) {
      say(c, "It is " + SimpleDateFormat("h:mm a", Locale.US).format(Date()) + ".",
             "अभी " + SimpleDateFormat("h:mm a", Locale.US).format(Date()) + " हुए हैं।")
      return true
    }
    if (tk.any { it in setOf("date", "तारीख", "तारीख़") } || low.contains("आज का दिन")) {
      say(c, "Today is " + SimpleDateFormat("d MMMM yyyy", Locale.US).format(Date()) + ".",
             "आज " + SimpleDateFormat("d MMMM yyyy", Locale.US).format(Date()) + " है।")
      return true
    }

    /* ---------- gestures: scroll / swipe / back / home / recents ---------- */
    val g = tk.firstOrNull { it in GESTURE_WORDS }
    if (g != null) {
      if (!GestureService.on()) {
        say(c, "Please enable Jarvis under Settings, Accessibility. Then I can scroll.",
               "कृपया सेटिंग्स में एक्सेसिबिलिटी से जार्विस को चालू करें। तब मैं स्क्रॉल कर पाऊँगा।")
        return true
      }
      val gs = GestureService.inst ?: return false
      when {
        g == "swipe" -> {
          val left = tk.any { it in setOf("left", "bayen", "baye", "बाएं", "बाएँ") }
          gs.swipe(left)
        }
        g in setOf("back", "piche", "peeche", "वापस", "पीछे") -> gs.global(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_BACK)
        g in setOf("home", "होम") -> gs.global(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_HOME)
        g in setOf("recent", "recents", "रीसेंट") -> gs.global(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_RECENTS)
        g in setOf("notification", "notifications", "notif", "नोटिफिकेशन") -> gs.global(android.accessibilityservice.AccessibilityService.GLOBAL_ACTION_NOTIFICATIONS)
        g in setOf("upar", "up", "ऊपर") -> gs.scroll(false)
        g in setOf("niche", "neeche", "नीचे") -> gs.scroll(true)
        else -> gs.scroll(true)
      }
      return true
    }

    /* ---------- timer ---------- */
    if (tk.any { it in setOf("timer", "stopwatch", "टाइमर") }) {
      val m = Regex("(\\d+)\\s*(minute|min|minut|mint|second|sec|hour|hr|मिनट|सेकंड|घंटा|घंटे)").find(low)
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
    if (tk.any { it in setOf("alarm", "अलारम", "अलार्म") }) {
      val m = Regex("(\\d{1,2})(?::(\\d{2}))?\\s*(am|pm)?").find(low.replace(Regex("(\\d)\\s*(?:baje|बजे)"), "$1"))
      if (m != null) {
        var h = m.groupValues[1].toIntOrNull() ?: return false
        val min = m.groupValues[2].toIntOrNull() ?: 0
        val ap = m.groupValues[3]
        if (ap == "pm" && h < 12) h += 12
        if (ap == "am" && h == 12) h = 0
        if (tk.any { it in setOf("shaam", "raat", "शाम", "रात") } && h < 12 && ap.isEmpty()) h += 12
        return try {
          c.startActivity(Intent(AlarmClock.ACTION_SET_ALARM).apply {
            putExtra(AlarmClock.EXTRA_HOUR, h)
            putExtra(AlarmClock.EXTRA_MINUTES, min)
            putExtra(AlarmClock.EXTRA_MESSAGE, "Jarvis")
            putExtra(AlarmClock.EXTRA_SKIP_UI, true)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          })
          say(c, "Alarm set for $h:${min.toString().padStart(2, '0')}.",
                 "$h:${min.toString().padStart(2, '0')} बजे का अलार्म लग गया।")
          true
        } catch (_: Exception) { false }
      }
      say(c, "For what time?", "कितने बजे का अलार्म?")
      return false
    }

    /* ---------- youtube (APP, never the website) ---------- */
    if (tk.any { it in setOf("youtube", "yt", "यूट्यूब") }) {
      val q = strip(low, YT_STRIP)
      return if (q.isNotBlank()) youtubeSearch(c, q)
      else openApp(c, "youtube").also { say(c, "Opening YouTube.", "यूट्यूब खोल रहा हूँ।") }
    }

    /* ---------- search (context aware) ---------- */
    if (tk.any { it in SEARCH_WORDS }) {
      val q = strip(low, SEARCH_STRIP)
      if (q.isBlank()) { say(c, "What should I search?", "क्या खोजूँ?"); return false }
      return when {
        lastApp == "com.google.android.youtube" -> youtubeSearch(c, q)
        ArenaWebActivity.front != null -> ArenaWebActivity.front!!.searchInWeb(q)
        else -> openUrl(c, "https://www.google.com/search?q=" + URLEncoder.encode(q, "UTF-8"))
      }
    }

    /* ---------- direct URL (open site — in Arena browser if it is in front, else Chrome) ---------- */
    val um = Regex("(?:https?://)?(?:www\\.)?([a-z0-9][a-z0-9-]*(?:\\.[a-z0-9-]+)*\\.[a-z]{2,})(?:/(\\S*))?").find(low)
    if (um != null && (low.contains(".") || low.contains("dot"))) {
      val host = um.groupValues[1]
      val path = um.groupValues[2]
      if (!host.contains("jarvis")) {
        val f = ArenaWebActivity.front
        if (f != null) { f.loadSite("https://$host/" + path); return true }
        return openUrl(c, "https://$host/" + path)
      }
    }

    /* ---------- call ---------- */
    if (tk.any { it in setOf("call", "dial", "कॉल") } || low.contains("फ़ोन लगाओ") || low.contains("फोन लगाओ")) {
      return call(c, low)
    }

    /* ---------- open app (however you phrased it) ---------- */
    val hasOpenVerb = tk.any { it in OPEN_WORDS }
    val subject = strip(low, FILLERS + OPEN_WORDS)
    if (subject.isNotBlank() && (hasOpenVerb || tk.size <= 3)) {
      val ok = openApp(c, subject)
      if (ok) say(c, "Opening it.", "खोल रहा हूँ।")
      else say(c, "That app was not found.", "यह ऐप नहीं मिला।")
      return ok
    }

    say(c, "I did not understand that command. Open the Jarvis app for examples.",
           "यह आदेश समझ नहीं आया। उदाहरण के लिए जार्विस ऐप खोलिए।")
    return false
  }

  /* YouTube APP search with graceful fallbacks */
  private fun youtubeSearch(c: Context, q: String): Boolean {
    say(c, "Searching on YouTube.", "यूट्यूब पर खोज रहा हूँ।")
    val enc = URLEncoder.encode(q, "UTF-8")
    val i1 = Intent(Intent.ACTION_SEARCH).setPackage("com.google.android.youtube")
      .putExtra("query", q).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    try { c.startActivity(i1); lastApp = "com.google.android.youtube"; return true } catch (_: Exception) {}
    val i2 = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.youtube.com/results?search_query=$enc"))
      .setPackage("com.google.android.youtube").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    try { c.startActivity(i2); lastApp = "com.google.android.youtube"; return true } catch (_: Exception) {}
    return openUrl(c, "https://www.youtube.com/results?search_query=$enc")
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
          lastApp = pkg
          return true
        }
      }
    }
    /* fallback: fuzzy match against EVERY launchable app label */
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
        lastApp = best.activityInfo.packageName
        true
      } else false
    } catch (_: Exception) { false }
  }

  fun openUrl(c: Context, url: String): Boolean {
    say(c, "Opening.", "खोल रहा हूँ।")
    return try {
      val i = Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      try { i.setPackage("com.android.chrome"); c.startActivity(i); lastApp = "com.android.chrome" }
      catch (_: Exception) { i.setPackage(null); c.startActivity(i) }
      true
    } catch (_: Exception) { false }
  }

  private fun call(c: Context, low: String): Boolean {
    if (c.checkSelfPermission(android.Manifest.permission.READ_CONTACTS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
      say(c, "Please grant the Contacts permission in the Jarvis app.",
             "कृपया जार्विस ऐप में संपर्क (Contacts) की अनुमति दें।")
      return false
    }
    val name = strip(low, CALL_STRIP)
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
      if (bestNum.isBlank()) {
        say(c, "No contact named $name was found.", "संपर्कों में $name नाम का कोई व्यक्ति नहीं मिला।")
        return false
      }
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
