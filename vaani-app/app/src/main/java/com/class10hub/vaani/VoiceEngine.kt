package com.class10hub.vaani

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer

/* One-shot voice capture. Google's speech engine, Hindi (Hinglish-friendly) or English. */
class VoiceEngine(private val ctx: Context, private val cb: (final: String?, partial: String?, error: String?) -> Unit) {
  private var sr: SpeechRecognizer? = null

  fun start() {
    destroy()
    try {
      val r = SpeechRecognizer.createSpeechRecognizer(ctx)
      r.setRecognitionListener(object : RecognitionListener {
        override fun onReadyForSpeech(params: Bundle?) { }
        override fun onBeginningOfSpeech() { }
        override fun onRmsChanged(rmsdB: Float) { }
        override fun onBufferReceived(buffer: ByteArray?) { }
        override fun onEndOfSpeech() { }
        override fun onError(error: Int) { cb(null, null, errMsg(error)) }
        override fun onResults(results: Bundle?) {
          val list = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
          val best = list?.firstOrNull { it.isNotBlank() }
          if (best != null) cb(best, null, null) else cb(null, null, "Kuch sunayi nahi diya")
        }
        override fun onPartialResults(partialResults: Bundle?) {
          val list = partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
          val p = list?.firstOrNull()
          if (!p.isNullOrBlank()) cb(null, p, null)
        }
        override fun onEvent(eventType: Int, params: Bundle?) { }
      })
      sr = r
      val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
        putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        putExtra(RecognizerIntent.EXTRA_LANGUAGE, if (Prefs.englishMode) "en-IN" else "hi-IN")
        putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, ctx.packageName)
      }
      r.startListening(intent)
    } catch (e: Exception) {
      cb(null, null, "Speech engine nahi chala — Google app check karo")
    }
  }

  private fun errMsg(c: Int): String = when (c) {
    SpeechRecognizer.ERROR_NO_MATCH -> "Kuch samajh nahi aaya, dobara bolo"
    SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "Waqt nikal gaya, dobara bolo"
    SpeechRecognizer.ERROR_NETWORK, SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "Network problem — internet check karo"
    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Mic ki permission nahi hai"
    SpeechRecognizer.ERROR_RECOGNIZER_BUSY -> "Ek second, dobara bolo"
    SpeechRecognizer.ERROR_CLIENT -> "Thoda issue hua, dobara bolo"
    else -> "Sunne mein dikkat hui, dobara bolo"
  }

  fun destroy() {
    try { sr?.destroy() } catch (_: Exception) { }
    sr = null
  }
}
