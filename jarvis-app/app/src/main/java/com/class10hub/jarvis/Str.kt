package com.class10hub.jarvis

/* Every spoken line exists in clean English AND pure Hindi — no mixed language. */
object Str {
  fun isHi(): Boolean = P.lang.startsWith("hi")
  fun pick(en: String, hi: String): String = if (isHi()) hi else en
}

fun say(c: android.content.Context, en: String, hi: String, then: (() -> Unit)? = null) {
  Speech.speak(c, Str.pick(en, hi), then)
}
