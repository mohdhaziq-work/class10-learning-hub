package com.class10hub.vaani

import android.content.Context

/* Task queue — the "kaam ki list". Survives restarts (persisted by App). */
object TaskEngine {
  class Task(val kind: String, val text: String) /* kind: "msg" = message to AI, "cmd" = voice command */

  val queue = ArrayList<Task>()
  var current: Task? = null
  var running = false
  var listMode = false /* when true, dictations get added as tasks */
  val listeners = ArrayList<() -> Unit>()

  fun changed() { listeners.forEach { try { it() } catch (_: Exception) { } } }

  fun add(t: Task) { queue.add(t); changed() }
  fun clear() { queue.clear(); current = null; running = false; listMode = false; changed() }

  fun nextTask(): Task? {
    current = if (queue.isEmpty()) null else queue.removeAt(0)
    changed()
    return current
  }
  fun doneCurrent() { current = null; changed() }

  fun queueText(): String {
    val sb = StringBuilder()
    if (running) sb.append("RUNNING\n")
    if (listMode) sb.append("LISTENING FOR TASKS\n")
    current?.let { sb.append("▶ ").append(it.text).append('\n') }
    queue.forEachIndexed { i, t -> sb.append(i + 1).append(". ").append(t.text).append('\n') }
    return sb.toString().trim().ifBlank { "Khaali — 'task banao' bol kar shuru karo" }
  }

  fun serialize(): String = queue.joinToString("\u0001") { it.kind + "\u0002" + it.text }
  fun load(s: String?) {
    queue.clear(); current = null; running = false; listMode = false
    if (s.isNullOrBlank()) return
    for (line in s.split("\u0001")) {
      val p = line.split("\u0002", limit = 2)
      if (p.size == 2 && p[1].isNotBlank()) queue.add(Task(p[0], p[1]))
    }
  }
}

/* Runs the queue: message tasks open Arena, command tasks run instantly. */
object QueueRunner {
  fun run(ctx: Context) {
    Speaker.init(ctx)
    while (TaskEngine.running) {
      val t = TaskEngine.nextTask() ?: break
      if (t.kind == "msg") { ArenaActivity.openWithTask(ctx, t.text); return }
      try { Executor.execute(ctx, Parser.parse(t.text)) } catch (_: Exception) { }
    }
    TaskEngine.running = false
    TaskEngine.changed()
    Speaker.speak("Saare kaam complete ho gaye")
  }
}
