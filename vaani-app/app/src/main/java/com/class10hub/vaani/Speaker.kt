package com.class10hub.vaani

import android.content.Context
import android.os.Handler
import android.os.Looper
import android.speech.tts.TextToSpeech
import java.util.Locale

/* Single TTS voice for the whole app — Hindi if the phone has it, else English. */
object Speaker {
  private var tts: TextToSpeech? = null
  private var appCtx: Context? = null
  private val main = Handler(Looper.getMainLooper())

  fun init(ctx: Context) {
    appCtx = ctx.applicationContext
    if (tts != null) return
    val app = appCtx ?: return
    tts = TextToSpeech(app) { st ->
      if (st == TextToSpeech.SUCCESS) {
        val r = try { tts?.setLanguage(Locale("hi", "IN")) } catch (e: Exception) { TextToSpeech.LANG_NOT_SUPPORTED }
        if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) {
          try { tts?.setLanguage(Locale("en", "IN")) } catch (_: Exception) { }
        }
      }
    }
  }

  fun speak(s: String) {
    if (s.isBlank()) return
    if (tts == null) init(appCtx ?: return)
    main.post {
      try {
        tts?.setSpeechRate(1.0f)
        tts?.speak(s, TextToSpeech.QUEUE_FLUSH, null, "v" + System.currentTimeMillis())
      } catch (_: Exception) { }
    }
  }
}
