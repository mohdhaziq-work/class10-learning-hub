package com.class10hub.vaani

/* Hinglish voice-command parser. Deterministic keyword/regex matching —
   no cloud NLP, works offline-ish (voice needs net, parsing doesn't). */
object Parser {

  sealed class Cmd {
    object None : Cmd()
    class Raw(val text: String) : Cmd()
    class OpenApp(val name: String) : Cmd()
    class Call(val who: String) : Cmd()
    class Alarm(val hour: Int, val minute: Int) : Cmd()
    class Timer(val minutes: Int) : Cmd()
    class YouTube(val q: String) : Cmd()
    class Search(val q: String) : Cmd()
    class Torch(val on: Boolean) : Cmd()
    class Volume(val dir: Int) : Cmd() /* +1 up, -1 down, 2 full, 0 mute */
    object Arena : Cmd()
    object ArenaLatest : Cmd()
    object TaskList : Cmd()
    object TaskStart : Cmd()
    object TaskNext : Cmd()
    object TaskStop : Cmd()
    object TaskClear : Cmd()
    object Status : Cmd()
  }

  fun parse(input: String): Cmd {
    val t = input.lowercase().trim()
      .replace(Regex("[!?.,]+"), " ")
      .replace(Regex("\\s+"), " ")
    if (t.isBlank()) return Cmd.Raw("")

    /* ---- task queue (checked first: "shuru karo" is precious) ---- */
    if (has(t, "task banao", "list banao", "kaam ki list", "task list", "kaam list")) return Cmd.TaskList
    if (has(t, "shuru karo", "chalu karo", "chalo karo", "start queue", "queue start")) return Cmd.TaskStart
    if (t == "next" || t == "skip" || has(t, "agla kaam", "next kaam", "skip karo", "next task")) return Cmd.TaskNext
    if (has(t, "list saaf", "queue saaf", "sab kaam hatao", "task clear", "list clear", "queue clear")) return Cmd.TaskClear
    if (has(t, "ruk jao", "kaam band", "sab band karo", "stop queue", "queue stop", "sab ruk jao")) return Cmd.TaskStop
    if (has(t, "status", "kya chal raha", "kitna kaam bacha", "kitne kaam bache")) return Cmd.Status

    /* ---- torch (before generic "band karo") ---- */
    if (has(t, "torch", "flash light", "flashlight")) {
      val off = has(t, "off", "bujha", "band", "ghata", "close")
      return Cmd.Torch(!off)
    }

    /* ---- alarm ---- */
    if (t.contains("alarm")) {
      val hm = Regex("(\\d{1,2})[:.](\\d{2})").find(t)
      var h = -1; var min = 0
      if (hm != null) { h = hm.groupValues[1].toInt(); min = hm.groupValues[2].toInt() }
      else {
        val mh = Regex("(\\d{1,2}) baje?").find(t) ?: Regex("(\\d{1,2}) o ?clock").find(t)
        if (mh != null) h = mh.groupValues[1].toInt()
      }
      if (h >= 0) {
        var hour = h
        val pm = has(t, "shaam", "sandhya", "evening", "raat", "night", "pm")
        val am = has(t, "subah", "morning", "am", "dopahar", "after noon", "afternoon")
        if (pm && hour < 12) hour += 12
        if (am && hour == 12) hour = 0
        if (!pm && !am && hour < 8) hour += 0 /* "5 baje" stays morning */
        return Cmd.Alarm(Math.min(23, Math.max(0, hour)), Math.min(59, Math.max(0, min)))
      }
      return Cmd.Raw(t) /* "alarm" but no time heard */
    }

    /* ---- timer ---- */
    if (t.contains("timer")) {
      val mm = Regex("(\\d{1,3}) ?(min|minute|minutes|minut)").find(t) ?: Regex("(\\d{1,3})").find(t)
      if (mm != null) return Cmd.Timer(Math.min(600, mm.groupValues[1].toInt()))
      return Cmd.Raw(t)
    }

    /* ---- call ---- */
    if (t.startsWith("call") || has(t, "call karo", "calling karo", "phone lagao", "phone milao", "phone karo")) {
      var who = t
        .replace("phone lagao", " ").replace("phone milao", " ").replace("phone karo", " ")
        .replace("calling karo", " ").replace("call karo", " ").replace("calling", " ").replace("call", " ")
        .replace(Regex("\\b(karo|kar|ko|se|please|jaldi)\\b"), " ")
        .replace(Regex("\\s+"), " ").trim()
      return Cmd.Call(who)
    }

    /* ---- youtube ---- */
    if (t.contains("youtube")) {
      var q = t.substringAfter("youtube")
      for (p in listOf(" pe ", " par ", " mein ", " me ", " on ", " se ")) q = q.removePrefix(p.trim())
      q = stripVerbs(q)
      if (q.isBlank()) return Cmd.OpenApp("youtube")
      return Cmd.YouTube(q)
    }

    /* ---- google search ---- */
    if (t.contains("search karo") || t.contains("search kar") || t.contains("google pe") || t.contains("google par")) {
      var q = ""
      if (t.contains("search karo")) {
        val a = t.substringBefore("search karo").trim()
          .removePrefix("google pe").removePrefix("google par").trim()
        val b = t.substringAfter("search karo").trim()
        q = if (a.isNotBlank()) a else b
      } else {
        q = if (t.contains("google pe")) t.substringAfter("google pe") else t.substringAfter("google par")
        q = stripVerbs(q.trim())
      }
      if (q.isBlank()) return Cmd.Raw(t)
      return Cmd.Search(q)
    }

    /* ---- arena.ai ---- */
    if (t.contains("arena")) {
      return if (has(t, "latest", "pichli", "pichhli", "pichla", "last", "recent", "chalu wali", "chalti")) Cmd.ArenaLatest
      else Cmd.Arena
    }

    /* ---- volume ---- */
    if (has(t, "volume", "awaaz", "awaaz", "sound", "audio")) {
      if (has(t, "mute", "silent", "band")) return Cmd.Volume(0)
      if (has(t, "full", "max", "sabse", "highest", "100")) return Cmd.Volume(2)
      if (has(t, "badhao", "badha", "zyada", "jyada", "high", "loud", "up", "tezz")) return Cmd.Volume(1)
      if (has(t, "ghatao", "ghata", "kam", "low", "down", " dheere")) return Cmd.Volume(-1)
      return Cmd.Raw(t)
    }

    /* ---- open app (last: everything above may contain "kholo") ---- */
    if (has(t, "kholo", "khol do", "kholna", "khol", "open", "launch")) {
      val parts = Regex("khol do|kholo|kholna|khol|open|launch").split(t).map { it.trim() }.filter { it.isNotBlank() }
      val name = parts.firstOrNull() ?: ""
      if (name.isBlank()) return Cmd.Raw(t)
      return Cmd.OpenApp(name)
    }

    return Cmd.Raw(t)
  }

  private fun has(t: String, vararg keys: String): Boolean = keys.any { t.contains(it) || t == it }

  private fun stripVerbs(q: String): String = q.trim()
    .removeSuffix("chalao").removeSuffix("chala do").removeSuffix("laga do").removeSuffix("laga")
    .removeSuffix("play").removeSuffix("dikhao").removeSuffix("karo").removeSuffix("kholo")
    .removeSuffix("open").removeSuffix("pe").removeSuffix("par").trim()
}
