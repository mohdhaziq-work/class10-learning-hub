package com.class10hub.vaani

import android.content.Context

/* Every recognized utterance lands here (from bubble, main screen, or queue). */
object Router {

  fun handle(ctx: Context, final: String) {
    Speaker.init(ctx)
    Prefs.lastHeard = final
    if (TaskEngine.listMode) {
      TaskEngine.add(TaskEngine.Task("msg", final.replace("\n", " ")))
      Speaker.speak(TaskEngine.queue.size.toString() + " kaam queue mein. Agla kaam bolo — ya 'shuru karo' bolein")
      return
    }
    when (val cmd = Parser.parse(final)) {
      is Parser.Cmd.Raw -> {
        val a = ArenaActivity.instance
        if (a != null && a.foreground) a.confirmFromVoice(final) /* natural speech = message when Arena is open */
        else Speaker.speak("Samajh nahi aaya — dobara boliye, ya 'help' ke liye app kholo")
      }
      is Parser.Cmd.Arena -> ArenaActivity.open(ctx)
      is Parser.Cmd.ArenaLatest -> ArenaActivity.openLatest(ctx)
      is Parser.Cmd.TaskList -> {
        TaskEngine.listMode = true
        TaskEngine.changed()
        Speaker.speak("Kaam ki list bana rahi hoon. Ek ek karke kaam boliye. Sab bolne ke baad 'shuru karo' boliye")
      }
      is Parser.Cmd.TaskStart -> { TaskEngine.listMode = false; TaskEngine.running = true; QueueRunner.run(ctx) }
      is Parser.Cmd.TaskNext -> {
        TaskEngine.doneCurrent()
        if (TaskEngine.running) QueueRunner.run(ctx) else Speaker.speak("Koi queue nahi chal rahi")
      }
      is Parser.Cmd.TaskStop -> { TaskEngine.clear(); Speaker.speak("Saare kaam rok diye, list saaf") }
      is Parser.Cmd.TaskClear -> { TaskEngine.clear(); Speaker.speak("List saaf kar di") }
      is Parser.Cmd.Status -> Speaker.speak(statusLine())
      is Parser.Cmd.OpenApp, is Parser.Cmd.Call, is Parser.Cmd.Alarm, is Parser.Cmd.Timer,
      is Parser.Cmd.YouTube, is Parser.Cmd.Search, is Parser.Cmd.Torch, is Parser.Cmd.Volume -> {
        val say = Executor.execute(ctx, cmd)
        if (say.isNotBlank()) Speaker.speak(say)
      }
      is Parser.Cmd.None -> { }
    }
    TaskEngine.changed()
  }

  private fun statusLine(): String {
    val c = TaskEngine.current
    val n = TaskEngine.queue.size
    return when {
      c != null -> "Abhi chal raha hai: " + c.text + ". Baaki " + n + " kaam hain"
      n > 0 -> n.toString() + " kaam pending hain. 'Shuru karo' bolo"
      else -> "Koi kaam pending nahi"
    }
  }
}
