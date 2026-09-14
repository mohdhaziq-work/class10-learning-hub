package com.class10hub.jarvis

import android.content.Context
import android.os.Handler
import android.os.Looper

/* Task queue — "first X, then Y". When one finishes (instant OR arena work-done),
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

  fun display(): String {
    val q = P.queue
    val sb = StringBuilder()
    current?.let { sb.append("▶ ").append(it).append("\n") }
    if (q.isEmpty() && current == null) return "Empty — no pending tasks."
    q.forEachIndexed { i, s -> sb.append(i + 1).append(". ").append(s).append("\n") }
    return sb.toString().trim()
  }

  fun runNext(c: Context) {
    val q = P.queue.toMutableList()
    val nxt = q.removeFirstOrNull()
    if (nxt == null) {
      current = null
      say(c, "No pending tasks.", "कोई काम बाकी नहीं है।")
      return
    }
    P.queue = q
    current = nxt
    when (CommandCenter.execute(c, nxt)) {
      CommandCenter.INSTANT -> main.postDelayed({ onTaskDone(c, quiet = false) }, 900)
      CommandCenter.FAILED -> {
        say(c, "That task could not be done. Skipping it.", "यह काम नहीं हो पाया। इसे छोड़ रहा हूँ।")
        main.postDelayed({ onTaskDone(c, quiet = true) }, 900)
      }
      CommandCenter.PENDING -> { /* arena flow will call onTaskDone when the AI finishes */ }
    }
  }

  /* called by ArenaWebActivity when the AI's reply is complete (or by the next button) */
  fun onTaskDone(c: Context, quiet: Boolean) {
    current = null
    val more = P.queue.isNotEmpty()
    if (more) {
      if (!quiet) say(c, "Task complete. Starting the next one.", "काम पूरा हुआ। अगला शुरू करता हूँ।") { TaskRunner.runNext(c) }
      else main.postDelayed({ TaskRunner.runNext(c) }, 600)
    } else {
      if (!quiet) say(c, "Task complete. The queue is now empty.", "काम पूरा हुआ। अब कोई काम बाकी नहीं है।")
    }
  }
}
