package com.class10hub.jarvis

import android.content.Context

/* The brain: spoken text (pure English OR pure Hindi) -> decide what to do. */
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

    /* ---------- arena ---------- */
    if (low.contains("arena") || low.contains("एरीना") || low.contains("अरेना")) {
      val f = ArenaWebActivity.front
      if (f != null && hasMessage(low)) {
        f.proposeDraft(extractMsg(t))
        return PENDING
      }
      ArenaWebActivity.open(c, t)
      return if (hasMessage(low)) PENDING else INSTANT
    }

    /* ---------- arena open + user just dictates text = message draft ---------- */
    val f2 = ArenaWebActivity.front
    if (f2 != null && !looksLikeCommand(low)) {
      f2.proposeDraft(t)
      return PENDING
    }

    /* ---------- single device command ---------- */
    val ok = Exec.execute(c, t)
    return if (ok) INSTANT else FAILED
  }

  fun splitChain(s: String): List<String> {
    var t = s.trim()
    t = t.replaceFirst(Regex("^(?:task|tasks|plan|टास्क|काम)\\s*(?:banao|banão|bana|list|queue|बनाओ|बनाइए|करो)?\\s*[:\\-]?\\s*", RegexOption.IGNORE_CASE), "")
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
      "एरीना पर लिखो:", "एरीना पर लिखिए:", "एरीना लिखो:", "अरेना पर लिखो:", "अरेना लिखो:",
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

  private fun looksLikeCommand(low: String): Boolean =
    low.contains("open") || low.contains("kholo") || low.contains("khol") || low.contains("खोलो") || low.contains("खोल") ||
    low.contains("call") || low.contains("dial") || low.contains("कॉल") || low.contains("अलार्म") ||
    low.contains("alarm") || low.contains("timer") || low.contains("टाइमर") || low.contains("torch") || low.contains("टॉर्च") ||
    low.contains("flash") || low.contains("फ्लैश") || low.contains("search") || low.contains("खोजो") || low.contains("ढूँढो") ||
    low.contains("volume") || low.contains("वॉल्यूम") || low.contains("battery") || low.contains("बैटरी") ||
    low.contains("youtube") || low.contains("यूट्यूब") || low.contains("google") || low.contains("गूगल") ||
    low.contains("next") || low.contains("अगला") || low.contains("stop") || low.contains("रुको") ||
    low.contains("status") || low.contains("स्थिति") || low.contains("task") || low.contains("टास्क") ||
    low.contains("time") || low.contains("समय") || low.contains("date") || low.contains("तारीख")
}
