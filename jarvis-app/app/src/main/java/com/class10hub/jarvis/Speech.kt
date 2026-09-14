package com.class10hub.jarvis

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import android.Manifest
import android.content.pm.PackageManager
import java.util.Locale
import java.util.concurrent.ConcurrentHashMap

/* Voice in + voice out. Google speech engine (Hinglish ok) + Android TTS. */
object Speech {
  private var tts: TextToSpeech? = null
  private var ttsReady = false
  private val main = Handler(Looper.getMainLooper())
  private var rec: SpeechRecognizer? = null
  private val pending = ConcurrentHashMap<String, () -> Unit>()

  fun initTts(c: Context) {
    if (tts != null) return
    tts = TextToSpeech(c.applicationContext) { st ->
      ttsReady = st == TextToSpeech.SUCCESS
      if (ttsReady) {
        tts?.setOnUtteranceProgressListener(object : android.speech.tts.UtteranceProgressListener() {
          override fun onDone(id: String?) { val cb = pending.remove(id); if (cb != null) main.post { cb() } }
          override fun onError(id: String?) { val cb = pending.remove(id); if (cb != null) main.post { cb() } }
          override fun onStart(id: String?) {}
        })
      }
    }
  }

  private fun applyLang() {
    try {
      val l = Locale.forLanguageTag(P.lang)
      val r = tts?.setLanguage(l)
      if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) tts?.setLanguage(Locale("en", "IN"))
    } catch (_: Exception) {}
  }

  fun speak(c: Context, text: String, then: (() -> Unit)? = null) {
    initTts(c)
    val id = "u" + System.nanoTime()
    if (then != null) pending[id] = then
    main.postDelayed({
      try {
        if (ttsReady) {
          applyLang()
          tts?.speak(text, TextToSpeech.QUEUE_FLUSH, Bundle(), id)
        } else {
          pending.remove(id)
          if (then != null) main.postDelayed(then, 300)
        }
      } catch (_: Exception) {
        pending.remove(id)
        if (then != null) main.postDelayed(then, 300)
      }
    }, 60)
  }

  fun listen(c: Context, onResult: (String?) -> Unit) {
    if (c.checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
      speak(c, "Pehle microphone ki permission do")
      onResult(null)
      return
    }
    try { rec?.destroy() } catch (_: Exception) {}
    rec = null
    val r = SpeechRecognizer.createSpeechRecognizer(c.applicationContext)
    rec = r
    r.setRecognitionListener(object : RecognitionListener {
      override fun onResults(b: Bundle) {
        val t = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)?.firstOrNull()
        cleanup()
        main.post { onResult(t) }
      }
      override fun onError(e: Int) { cleanup(); main.post { onResult(null) } }
      override fun onRmsChanged(v: Float) {}
      override fun onBufferReceived(b: ByteArray) {}
      override fun onPartialResults(p: Bundle) {}
      override fun onEvent(i: Int, b: Bundle) {}
      override fun onReadyForSpeech(b: Bundle) {}
      override fun onEndOfSpeech() {}
      override fun onBeginningOfSpeech() {}
    })
    val i = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
      putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
      putExtra(RecognizerIntent.EXTRA_LANGUAGE, P.lang)
      putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
      putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, false)
    }
    r.startListening(i)
  }

  private fun cleanup() {
    try { rec?.destroy() } catch (_: Exception) {}
    rec = null
  }
}
