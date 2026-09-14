package com.class10hub.jarvis

import android.content.Context

/* The brain: spoken text -> decide what to do (chain? arena? device command?). */
object CommandCenter {
  const val FAILED = 0
  const val INSTANT = 1   /* done immediately */
  const val PENDING = 2   /* arena flow — completes later via TaskRunner.onTaskDone */

  fun handle(c: Context, raw: String) { execute(c, raw) }

  fun execute(c: Context, raw: String): Int {
    val t = raw.trim()
    val low = t.lowercase()

    /* ---------- control words ---------- */
    if (low in setOf("stop", "ruko", "band karo", "cancel", "cancel karo", "khatam", "khatam karo")) {
      TaskRunner.clear()
      Speech.speak(c, "Theek hai, saare kaam cancel kar diye")
      return INSTANT
    }
    if (low in setOf("next", "agla", "agla kaam", "next kaam", "aage badho", "skip")) {
      Speech.speak(c, "Agla kaam shuru karta hoon")
      TaskRunner.runNext(c)
      return INSTANT
    }
    if (low in setOf("status", "kitne kaam", "kitne kaam bache", "queue", "kya chal raha hai", "kya chal raha he")) {
      val q = TaskRunner.queue()
      Speech.speak(c, if (q.isEmpty()) "Koi kaam pending nahi" else "${q.size} kaam pending hain. Abhi: " + q.first())
      return INSTANT
    }

    /* ---------- task chain ---------- */
    if (low.startsWith("task") || low.startsWith("kaam") || low.startsWith("plan") || low.startsWith("pehle")) {
      val parts = splitChain(t)
      if (parts.size >= 2) {
        TaskRunner.set(parts)
        Speech.speak(c, "${parts.size} kaam queue mein lag gaye. Pehla shuru karta hoon.") {
          TaskRunner.runNext(c)
        }
        return PENDING
      }
    }

    /* ---------- arena ---------- */
    if (low.contains("arena")) {
      val front = ArenaWebActivity.front
      if (front != null && hasMessage(low)) {
        front.proposeDraft(extractMsg(t))
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
    t = t.replaceFirst(Regex("^(?:task|kaam|plan|tasks|kaamo)\\s*(?:banao|banana hai|banani hai|karo|list|queue)?\\s*[:\\-]?\\s*", RegexOption.IGNORE_CASE), "")
    t = t.replaceFirst(Regex("^pehle\\s+", RegexOption.IGNORE_CASE), "")
    return t.split(Regex("\\s*(?:,|;|phir|fir|then|uske baad|iske baad|aur phir)\\s*", RegexOption.IGNORE_CASE))
      .map { it.trim() }
      .filter { it.isNotEmpty() }
  }

  fun hasMessage(low: String): Boolean =
    low.contains("likho") || low.contains("likh do") || low.contains("likh") || low.contains("bolo:") ||
    low.contains("poochho") || low.contains("poocho") || low.contains("pucho") || low.contains("pucho") ||
    low.contains("ask") || low.contains("message") || low.contains("send") && low.contains("arena")

  fun extractMsg(spoken: String): String {
    val low = spoken.lowercase()
    for (k in listOf("arena pe likho:", "arena par likho:", "arena mein likho:", "arena me likho:", "arena likho:",
                     "arena pe bolo:", "arena par bolo:", "arena mein bolo:", "arena me bolo:", "arena bolo:",
                     "arena pe poochho:", "arena par poochho:", "arena mein poochho:", "arena pe pucho:", "arena pucho:",
                     "arena pe likho", "arena par likho", "arena mein likho", "arena me likho", "arena likho",
                     "arena pe bolo", "arena par bolo", "arena mein bolo", "arena me bolo", "arena bolo",
                     "arena pe poochho", "arena par poochho", "arena pe pucho", "arena poochho", "arena pucho",
                     "likho:", "bolo:", "poochho:", "pucho:", "likho", "bolo", "poochho", "pucho", "ask")) {
      val i = low.indexOf(k)
      if (i >= 0 && spoken.length > i + k.length) return spoken.substring(i + k.length).trim()
    }
    return spoken.trim()
  }

  private fun looksLikeCommand(low: String): Boolean =
    low.contains("kholo") || low.contains("khol") || low.contains("open") || low.contains("chalao") ||
    low.contains("call") || low.contains("alarm") || low.contains("timer") || low.contains("torch") ||
    low.contains("flash") || low.contains("search") || low.contains("volume") || low.contains("battery") ||
    low.contains("kitne baje") || low.contains("time kya") || low.contains("next") || low.contains("stop") ||
    low.contains("status") || low.contains("youtube") || low.contains("google pe") || low.contains("task")
}
