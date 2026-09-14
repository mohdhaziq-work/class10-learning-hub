package com.class10hub.jarvis

import android.content.Context
import android.os.Handler
import android.os.Looper

/* Task queue — "pehle X, phir Y". When one finishes (instant OR arena work-done),
   the next one auto-starts. Queue survives app restart (SharedPreferences). */
object TaskRunner {
  private val main = Handler(Looper.getMainLooper())
  private var current: String? = null

  fun queue(): List<String> = P.queue

  fun set(tasks: List<String>) {
    P.queue = tasks
    current = null
  }

  fun clear() {
    P.queue = emptyList()
    current = null
  }

  fun currentTask(): String? = current

  fun display(): String {
    val q = P.queue
    val sb = StringBuilder()
    current?.let { sb.append("▶ (chalu) ").append(it).append("\n") }
    if (q.isEmpty() && current == null) return "Khaali — koi kaam pending nahi"
    q.forEachIndexed { i, s -> sb.append(i + 1).append(". ").append(s).append("\n") }
    return sb.toString().trim()
  }

  fun runNext(c: Context) {
    val q = P.queue.toMutableList()
    val nxt = q.removeFirstOrNull()
    if (nxt == null) {
      current = null
      Speech.speak(c, "Koi kaam pending nahi")
      return
    }
    P.queue = q
    current = nxt
    when (CommandCenter.execute(c, nxt)) {
      CommandCenter.INSTANT -> main.postDelayed({ onTaskDone(c, quiet = false) }, 900)
      CommandCenter.FAILED -> { Speech.speak(c, "Ye kaam nahi ho paya, skip kar raha hoon"); main.postDelayed({ onTaskDone(c, quiet = true) }, 900) }
      CommandCenter.PENDING -> { /* arena flow will call onTaskDone when the AI finishes */ }
    }
  }

  /* called by ArenaWebActivity when the AI's reply is complete (or by the next button) */
  fun onTaskDone(c: Context, quiet: Boolean) {
    current = null
    val more = P.queue.isNotEmpty()
    if (more) {
      if (!quiet) Speech.speak(c, "Kaam poora hua. Agla shuru karta hoon") { TaskRunner.runNext(c) }
      else main.postDelayed({ TaskRunner.runNext(c) }, 600)
    } else {
      if (!quiet) Speech.speak(c, "Kaam poora hua. Queue khaali hai")
    }
  }
}
