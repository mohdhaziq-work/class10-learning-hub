package com.class10hub.jarvis

import android.content.Context

/* The brain: spoken text (pure English OR pure Hindi, any phrasing) -> what to do.
   When the Arena browser is in front, most speech becomes MESSAGE DICTATION:
   segments append to the draft until you say "send". Nothing is removed
   unless you explicitly ask ("remove bye"). */
object CommandCenter {
  const val FAILED = 0
  const val INSTANT = 1   /* done immediately */
  const val PENDING = 2   /* arena flow — completes later via TaskRunner.onTaskDone */

  fun handle(c: Context, raw: String) { execute(c, raw) }

  fun execute(c: Context, raw: String): Int {
    val t = raw.trim()
    val low = t.lowercase()

    /* ---------- control words ---------- */
    if (low in setOf("stop", "cancel", "cancel all", "stop everything") || low.contains("रुक जाओ") || low.contains("रुको") ||
        low.startsWith("बंद करो") || low.startsWith("रद्द")) {
      TaskRunner.clear()
      say(c, "Alright. All tasks cancelled.", "ठीक है। सभी काम रद्द कर दिए।")
      return INSTANT
    }
    if (low in setOf("next", "next task", "skip") || low.contains("अगला") || low.contains("आगे बढ़ो")) {
      say(c, "Starting the next task.", "अगला काम शुरू करता हूँ।")
      TaskRunner.runNext(c)
      return INSTANT
    }
    if (low in setOf("status", "what is the status", "how many tasks") || low.contains("स्थिति") || low.contains("कितने काम")) {
      val q = TaskRunner.queue()
      say(c,
        if (q.isEmpty()) "No pending tasks." else "${q.size} tasks pending. Current: " + q.first(),
        if (q.isEmpty()) "कोई काम बाकी नहीं है।" else "${q.size} काम बाकी हैं। अभी: " + q.first())
      return INSTANT
    }

    /* ---------- task chain ---------- */
    if (low.startsWith("task") || low.startsWith("plan") || low.startsWith("first") ||
        low.startsWith("टास्क") || low.startsWith("काम") || low.startsWith("पहले")) {
      val parts = splitChain(t)
      if (parts.size >= 2) {
        TaskRunner.set(parts)
        say(c, "${parts.size} tasks queued. Starting the first one.", "${parts.size} काम कतार में लग गए। पहला शुरू करता हूँ।") {
          TaskRunner.runNext(c)
        }
        return PENDING
      }
    }

    /* ---------- open arena (when not already open) ---------- */
    if (low.contains("arena") || low.contains("एरीना") || low.contains("अरेना")) {
      if (ArenaWebActivity.front == null) {
        ArenaWebActivity.open(c, t)
        return if (hasMessage(low)) PENDING else INSTANT
      }
      /* already open — handled by the dictation block below */
    }

    /* ---------- Arena in front: continuous dictation ---------- */
    val f2 = ArenaWebActivity.front
    if (f2 != null) {
      when {
        isSendCmd(low) -> { f2.sendNow(); return PENDING }
        isClearCmd(low) -> { f2.clearDraft(true); return INSTANT }
        isReadCmd(low) -> { f2.readDraft(); return INSTANT }
        isNewChatCmd(low) -> { f2.newChat(); return INSTANT }
        removeTarget(low) != null -> { f2.removeFromDraft(removeTarget(low)!!); return INSTANT }
        hasMessage(low) -> { f2.appendDraft(extractMsg(t)); return PENDING }
        (low.contains("arena") || low.contains("एरीना") || low.contains("अरेना")) && looksLikeCommand(low) -> {
          /* "open arena" while it is already open = fresh chat */
          f2.newChat(); return INSTANT
        }
        !looksLikeCommand(low) -> { f2.appendDraft(extractMsg(t)); return PENDING }
      }
    }

    /* ---------- single device command ---------- */
    val ok = Exec.execute(c, t)
    return if (ok) INSTANT else FAILED
  }

  /* ---------- dictation command recognizers ---------- */
  private val SEND_CMDS = setOf(
    "send", "send it", "send karo", "send kar do", "send message", "send now", "send kar", "bhejo", "bhej do", "bhej", "bhej de",
    "भेजो", "भेज दो", "भेजिए", "send message karo")

  fun isSendCmd(low: String): Boolean =
    low in SEND_CMDS || (low.startsWith("send") && low.length <= 14)

  fun isClearCmd(low: String): Boolean =
    low in setOf("clear", "clear all", "clear the draft", "clear draft", "new draft", "sab hata do", "sab hatao",
                 "poora hata do", "sab mita do", "सब मिटाओ", "सब हटाओ", "साफ़ करो", "साफ करो", "पूरा हटा दो", "ड्राफ्ट साफ़ करो")

  fun isReadCmd(low: String): Boolean =
    low in setOf("read", "read it", "read the draft", "read draft", "what is written", "what did i say",
                 "kya likha hai", "kya likha", "क्या लिखा है", "ड्राफ्ट पढ़ो", "पढ़ो")

  fun isNewChatCmd(low: String): Boolean =
    low in setOf("new chat", "naya chat", "start a new chat", "fresh chat", "नई चैट", "नया चैट")

  /* "remove bye" / "bye hatao" / "delete bye" / "bye हटाओ" -> "bye" */
  fun removeTarget(low: String): String? {
    val t = low.split(Regex("[\\s\\p{Punct}]+")).filter { it.isNotBlank() }
    if (t.size < 2) return null
    val first = setOf("remove", "delete", "hatao", "hata", "hataa", "mitao", "mita", "डिलीट",
                      "मिटाओ", "मिटा", "हटाओ", "हटा", "हटाइए")
    val last = setOf("hatao", "hata", "hataa", "mitao", "mita", "हटाओ", "हटा", "मिटाओ", "मिटा", "remove", "delete")
    val tail = setOf("karo", "kar", "do", "de", "करो", "कर", "दो")
    var target: List<String>? = null
    if (t[0] in first) target = t.drop(1)
    else if (t[t.size - 1] in last) target = t.dropLast(1)
    if (target == null) return null
    target = target.dropLastWhile { it in tail }
    val joined = target.joinToString(" ").trim()
    return if (joined.isEmpty()) null else joined
  }

  fun splitChain(s: String): List<String> {
    var t = s.trim()
    t = t.replaceFirst(Regex("^(?:task|tasks|plan|टास्क|काम)\\s*(?:banao|bana|list|queue|बनाओ|बनाइए|करो)?\\s*[:\\-]?\\s*", RegexOption.IGNORE_CASE), "")
    t = t.replaceFirst(Regex("^(?:first|पहले)\\s+", RegexOption.IGNORE_CASE), "")
    return t.split(Regex("\\s*(?:,|;|then|phir|fir|uske baad|iske baad|और फिर|फिर|उसके बाद)\\s*", RegexOption.IGNORE_CASE))
      .map { it.trim() }
      .filter { it.isNotEmpty() }
  }

  fun hasMessage(low: String): Boolean =
    low.contains("likho") || low.contains("likh do") || low.contains("write") || low.contains("type") ||
    low.contains("poochho") || low.contains("poocho") || low.contains("pucho") || low.contains("ask") ||
    low.contains("message") || (low.contains("send") && low.contains("arena")) ||
    low.contains("लिखो") || low.contains("लिखिए") || low.contains("लिख दो") || low.contains("पूछो") || low.contains("पूछिए")

  fun extractMsg(spoken: String): String {
    val low = spoken.lowercase()
    val markers = listOf(
      "arena pe likho:", "arena par likho:", "arena mein likho:", "arena me likho:", "arena likho:",
      "ask arena:", "arena ask:", "write on arena:", "arena write:", "tell arena:", "arena tell:",
      "arena pe poochho:", "arena par poochho:", "arena poochho:", "arena pucho:",
      "एरीना पर लिखो:", "एरीना लिखो:", "अरेना पर लिखो:", "अरेना लिखो:",
      "एरीना से पूछो:", "एरीना को बोलो:", "एरीना पर पूछो:",
      "एरीना पर लिखो", "एरीना लिखो", "अरेना पर लिखो", "अरेना लिखो", "एरीना से पूछो", "एरीना पर पूछो",
      "write:", "ask:", "likho:", "poochho:", "लिखो:", "लिखिए:", "पूछो:", "पूछिए:",
      "write", "ask", "likho", "poochho", "लिखो", "पूछो")
    for (k in markers) {
      val i = low.indexOf(k)
      if (i >= 0 && spoken.length > i + k.length) return spoken.substring(i + k.length).trim()
    }
    return spoken.trim()
  }

  fun looksLikeCommand(low: String): Boolean =
    low.contains("open") || low.contains("kholo") || low.contains("khol") || low.contains("खोलो") || low.contains("खोल") ||
    low.contains("call") || low.contains("dial") || low.contains("कॉल") || low.contains("अलार्म") ||
    low.contains("alarm") || low.contains("timer") || low.contains("टाइमर") || low.contains("torch") || low.contains("टॉर्च") ||
    low.contains("flash") || low.contains("फ्लैश") || low.contains("search") || low.contains("खोजो") || low.contains("ढूँढो") ||
    low.contains("khojo") || low.contains("dhoondo") || low.contains("volume") || low.contains("वॉल्यूम") ||
    low.contains("battery") || low.contains("बैटरी") || low.contains("youtube") || low.contains("यूट्यूब") ||
    low.contains("google") || low.contains("गूगल") || low.contains("next") || low.contains("अगला") ||
    low.contains("stop") || low.contains("रुको") || low.contains("status") || low.contains("स्थिति") ||
    low.contains("task") || low.contains("टास्क") || low.contains("time") || low.contains("समय") ||
    low.contains("date") || low.contains("तारीख") || low.contains("scroll") || low.contains("swipe") ||
    low.contains("niche") || low.contains("upar") || low.contains("नीचे") || low.contains("ऊपर") ||
    low.contains("back") || low.contains("home") || low.contains("होम") || low.contains("notification") ||
    low.contains("new chat") || low.contains("नई चैट") || low.contains("arena") || low.contains("एरीना")
}
