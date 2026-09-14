package com.class10hub.jarvis

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.view.View
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.CookieManager
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import org.json.JSONObject

/* The smart browser for arena.ai.
   ALWAYS opens a fresh, empty chat — no previous messages.
   Automation = injected JS: find the chat input, type the message, send it,
   then watch the page until the AI's reply stops changing -> "work done". */
class ArenaWebActivity : Activity() {

  private lateinit var web: WebView
  private lateinit var status: TextView
  private lateinit var statusDot: View
  private lateinit var confirmCard: LinearLayout
  private lateinit var draftText: TextView
  private var pendingDraft: String? = null
  private var pendingAfterLoad: String? = null
  private var retries = 0
  private var nullRetries = 0
  private var watchOn = false
  private val main = Handler(Looper.getMainLooper())
  private var watchTimeout: Runnable? = null

  companion object {
    var front: ArenaWebActivity? = null
    fun open(c: Context, spoken: String) {
      val i = Intent(c, ArenaWebActivity::class.java)
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      i.putExtra("spoken", spoken)
      c.startActivity(i)
    }
  }

  /* ---------------- automation JS ---------------- */
  private val JS_TYPE = """
    (function(){
      var TEXT = __TEXT__;
      var ta = document.querySelector('form textarea') || document.querySelector('textarea');
      if (!ta) { var best=null,ms=0; document.querySelectorAll('[contenteditable="true"]').forEach(function(e){
        var r = e.getBoundingClientRect(); var s = r.width*r.height; if (s>ms){ms=s;best=e;} }); ta = best; }
      if (!ta) return 'NO_INPUT';
      ta.focus();
      if (ta.tagName === 'TEXTAREA') {
        var set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
        set.call(ta, TEXT);
      } else { ta.textContent = TEXT; }
      ta.dispatchEvent(new Event('input', {bubbles:true}));
      ta.dispatchEvent(new Event('change', {bubbles:true}));
      return 'TYPED';
    })();
  """.trimIndent()

  private val JS_SEND = """
    (function(){
      var TEXT = __TEXT__;
      var ta = document.querySelector('form textarea') || document.querySelector('textarea');
      if (!ta) { var best=null,ms=0; document.querySelectorAll('[contenteditable="true"]').forEach(function(e){
        var r = e.getBoundingClientRect(); var s = r.width*r.height; if (s>ms){ms=s;best=e;} }); ta = best; }
      if (!ta) return 'NO_INPUT';
      ta.focus();
      if (ta.tagName === 'TEXTAREA') {
        var set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
        set.call(ta, TEXT);
      } else { ta.textContent = TEXT; }
      ta.dispatchEvent(new Event('input', {bubbles:true}));
      ta.dispatchEvent(new Event('change', {bubbles:true}));
      var form = ta.closest ? ta.closest('form') : null;
      var btn = null;
      if (form) { btn = form.querySelector('button[type="submit"]'); if (!btn) { var bs = form.querySelectorAll('button'); if (bs.length) btn = bs[bs.length-1]; } }
      if (!btn) { var all = document.querySelectorAll('button'); for (var i = all.length-1; i >= 0; i--) {
        var lab = ((all[i].getAttribute('aria-label')||'') + ' ' + (all[i].textContent||'')).toLowerCase();
        if (lab.indexOf('send') >= 0 || lab.indexOf('submit') >= 0) { btn = all[i]; break; } } }
      if (btn) { btn.click(); return 'SENT_BTN'; }
      if (form) { try { form.requestSubmit(); return 'SENT_FORM'; } catch (e) {} }
      try {
        var ke = function(type){ return new KeyboardEvent(type, {key:'Enter', code:'Enter', keyCode:13, which:13, bubbles:true, cancelable:true}); };
        ta.dispatchEvent(ke('keydown')); ta.dispatchEvent(ke('keyup'));
        return 'SENT_ENTER';
      } catch (e) { return 'NO_BTN'; }
    })();
  """.trimIndent()

  private val JS_WATCH = """
    (function(){
      if (window.__jd) { try { clearInterval(window.__jd); } catch (e) {} }
      window.__last = -1; window.__stable = 0; window.__changed = false;
      window.__jd = setInterval(function(){
        try {
          var len = document.body ? document.body.innerText.length : 0;
          if (len === window.__last) {
            window.__stable++;
            var need = window.__changed ? 6 : 12;
            if (window.__stable >= need) { clearInterval(window.__jd); window.__jd = null; JarvisBridge.onWorkDone(); }
          } else {
            if (window.__last >= 0) window.__changed = true;
            window.__last = len; window.__stable = 0;
          }
        } catch (e) {}
      }, 1500);
    })();
  """.trimIndent()

  inner class Bridge {
    @JavascriptInterface fun onWorkDone() { runOnUiThread { onWorkDoneUi() } }
  }

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(b: Bundle?) {
    super.onCreate(b)
    P.init(this)
    window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    front = this
    buildUi()
    web.addJavascriptInterface(Bridge(), "JarvisBridge")
    web.settings.apply {
      javaScriptEnabled = true
      domStorageEnabled = true
      databaseEnabled = true
      setSupportZoom(false)
      mediaPlaybackRequiresUserGesture = false
      allowFileAccess = false
      allowContentAccess = false
      /* real Chrome UA (no WebView token) — so Google login works */
      userAgentString = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36"
    }
    CookieManager.getInstance().setAcceptCookie(true)
    CookieManager.getInstance().setAcceptThirdPartyCookies(web, true)
    web.webViewClient = object : WebViewClient() {
      override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        val d = pendingAfterLoad
        if (d != null) {
          pendingAfterLoad = null
          main.postDelayed({ proposeDraft(d) }, 900)
        }
      }
    }
    route(intent?.getStringExtra("spoken"))
  }

  override fun onNewIntent(i: Intent) {
    super.onNewIntent(i)
    route(i.getStringExtra("spoken"))
  }

  /* ALWAYS a fresh, empty chat */
  private fun route(spoken: String?) {
    val s = spoken?.trim()?.lowercase() ?: ""
    val msg = CommandCenter.hasMessage(s)
    when {
      msg -> {
        pendingAfterLoad = CommandCenter.extractMsg(spoken!!)
        web.loadUrl("https://arena.ai")
        setStatus("Opening a new chat…", C_BUSY)
      }
      else -> {
        web.loadUrl("https://arena.ai")
        setStatus("New chat — say: ask Arena, followed by your message", C_OK)
      }
    }
  }

  private fun newChat() {
    pendingAfterLoad = null
    web.loadUrl("https://arena.ai")
    setStatus("New empty chat.", C_OK)
  }

  /* ---------------- draft + confirm + send ---------------- */
  fun proposeDraft(text: String) {
    front = this
    retries = 0
    pendingDraft = text
    setStatus("Typing your message…", C_BUSY)
    web.evaluateJavascript(JS_TYPE.replace("__TEXT__", JSONObject.quote(text))) { v ->
      val r = v?.trim('"')
      if (r == "TYPED") showConfirm(text)
      else if (r == "NO_INPUT") {
        if (retries < 8) {
          retries++
          setStatus("Looking for the chat box… ($retries/8)", C_BUSY)
          main.postDelayed({ proposeDraft(text) }, 1500)
        } else {
          setStatus("Could not find the chat box.", C_ERR)
          say(this, "I could not find the chat box. Please open a chat and try again.", "चैट बॉक्स नहीं मिला। कृपया चैट खोलकर फिर कोशिश करें।")
          TaskRunner.onTaskDone(this, quiet = true)
        }
      }
    }
  }

  private fun showConfirm(msg: String) {
    nullRetries = 0
    draftText.text = msg
    confirmCard.visibility = View.VISIBLE
    say(this, "Message ready. Say send to confirm, or cancel.", "संदेश तैयार है। भेजने के लिए 'भेजो' कहें, रोकने के लिए 'रद्द'।") {
      main.postDelayed({ confirmListen(msg) }, 250)
    }
  }

  private fun confirmListen(msg: String) {
    Speech.listen(this) { r ->
      val a = r?.lowercase()
      when {
        a == null -> {
          nullRetries++
          if (nullRetries >= 3) {
            nullRetries = 0
            say(this, "Use the buttons below — send or cancel.", "नीचे के बटन इस्तेमाल करें — भेजें या रद्द।")
          } else {
            say(this, "I did not hear that. Say send or cancel.", "सुनाई नहीं दिया। 'भेजो' या 'रद्द' कहें।") { confirmListen(msg) }
          }
        }
        a.contains("send") || a.contains("yes") || a.contains("haan") || a.contains("bhejo") || a.contains("bhej do") ||
          a.contains("okay") || a.contains("ok") || a.contains("sure") || a.contains("भेजो") || a.contains("भेज दो") ||
          a.contains("हाँ") || a.contains("हां") || a.contains("ठीक") || a.contains("बिल्कुल") -> doSend(msg)
        a.contains("cancel") || a.contains("no") || a.contains("nahi") || a.contains("stop") || a.contains("ruko") ||
          a.contains("रद्द") || a.contains("नहीं") || a.contains("रुको") || a.contains("मत") -> {
          confirmCard.visibility = View.GONE
          setStatus("Cancelled.", C_ERR)
          say(this, "Cancelled.", "रद्द कर दिया।")
          TaskRunner.onTaskDone(this, quiet = true)
        }
        else -> say(this, "Send or cancel?", "भेजें या रद्द?") { confirmListen(msg) }
      }
    }
  }

  private fun doSend(msg: String) {
    confirmCard.visibility = View.GONE
    setStatus("Sending…", C_BUSY)
    web.evaluateJavascript(JS_SEND.replace("__TEXT__", JSONObject.quote(msg))) { v ->
      val r = v?.trim('"')
      if (r == "SENT_BTN" || r == "SENT_FORM" || r == "SENT_ENTER") {
        setStatus("Sent — waiting for the reply…", C_BUSY)
        say(this, "Sent. Waiting for the reply.", "भेज दिया। उत्तर की प्रतीक्षा कर रहा हूँ।")
        startWatch()
      } else if (r == "NO_INPUT") {
        main.postDelayed({ proposeDraft(msg) }, 1200)
      } else {
        setStatus("Send button not found — press it once.", C_ERR)
        say(this, "I could not find the send button. Please press it once.", "सेंड बटन नहीं मिला। कृपया एक बार दबा दें।")
        TaskRunner.onTaskDone(this, quiet = true)
      }
    }
  }

  private fun startWatch() {
    watchOn = true
    web.evaluateJavascript(JS_WATCH, null)
    watchTimeout?.let { main.removeCallbacks(it) }
    watchTimeout = Runnable {
      if (watchOn) {
        watchOn = false
        setStatus("No reply detected — please check.", C_ERR)
        say(this, "I could not detect a reply. Please check the screen.", "उत्तर का पता नहीं चला। कृपया स्क्रीन देख लें।")
        TaskRunner.onTaskDone(this, quiet = true)
      }
    }
    main.postDelayed(watchTimeout!!, 5 * 60 * 1000)
  }

  private fun onWorkDoneUi() {
    if (!watchOn) return
    watchOn = false
    watchTimeout?.let { main.removeCallbacks(it) }
    setStatus("Reply received.", C_OK)
    say(this, "The reply has arrived.", "उत्तर आ गया है।")
    TaskRunner.onTaskDone(this, quiet = false)
  }

  /* ---------------- UI (light, labs-style) ---------------- */
  private val C_OK = Color.parseColor("#188038")
  private val C_BUSY = Color.parseColor("#1A73E8")
  private val C_ERR = Color.parseColor("#D93025")

  private fun dp(d: Int): Int = (d * resources.displayMetrics.density).toInt()

  private fun rounded(color: Int, radius: Int, stroke: Int? = null): GradientDrawable {
    return GradientDrawable().apply {
      setColor(color)
      cornerRadius = dp(radius).toFloat()
      stroke?.let { setStroke(dp(1), it) }
    }
  }

  private fun setStatus(text: String, color: Int) {
    status.text = text
    status.setTextColor(color)
    statusDot.setBackgroundColor(color)
  }

  @SuppressLint("SetJavaScriptEnabled")
  private fun buildUi() {
    val root = FrameLayout(this)
    root.setBackgroundColor(Color.WHITE)
    val col = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }

    /* top bar */
    val bar = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; setBackgroundColor(Color.WHITE); setPadding(dp(8), dp(6), dp(8), dp(6)) }
    fun tb(label: String, cb: () -> Unit): Button = Button(this).apply {
      text = label; textSize = 14f; setAllCaps(false)
      setTextColor(Color.parseColor("#111827"))
      background = rounded(Color.parseColor("#F1F3F4"), 999)
      setOnClickListener { cb() }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f).apply { setMargins(dp(3), 0, dp(3), 0) }
    }
    bar.addView(tb("←") { if (web.canGoBack()) web.goBack() else finish() })
    bar.addView(tb("⟳") { web.reload() })
    bar.addView(tb("＋ New chat") { newChat() })
    col.addView(bar)

    val line = View(this).apply { setBackgroundColor(Color.parseColor("#E8EAF0")); layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, dp(1)) }
    col.addView(line)

    web = WebView(this)
    web.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f)
    col.addView(web)

    /* status strip */
    val strip = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL; setBackgroundColor(Color.parseColor("#F8F9FA")); setPadding(dp(14), dp(10), dp(14), dp(12)) }
    statusDot = View(this).apply {
      background = rounded(C_OK, 999)
      layoutParams = LinearLayout.LayoutParams(dp(8), dp(8)).apply { marginEnd = dp(8) }
    }
    strip.addView(statusDot)
    status = TextView(this).apply {
      setTextColor(Color.parseColor("#5F6368")); textSize = 13f
    }
    strip.addView(status, LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f))
    col.addView(strip)
    root.addView(col, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))

    /* confirm card */
    confirmCard = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      background = rounded(Color.WHITE, 24, Color.parseColor("#E8EAF0"))
      setPadding(dp(18), dp(16), dp(18), dp(18))
      visibility = View.GONE
    }
    val cap = TextView(this).apply {
      text = Str.pick("MESSAGE READY", "संदेश तैयार")
      setTextColor(Color.parseColor("#1A73E8")); textSize = 11f; typeface = Typeface.DEFAULT_BOLD; letterSpacing = 0.12f
    }
    confirmCard.addView(cap)
    draftText = TextView(this).apply {
      setTextColor(Color.parseColor("#111827")); textSize = 16f; setPadding(0, dp(8), 0, dp(14))
    }
    confirmCard.addView(draftText)
    val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
    val by = Button(this).apply {
      text = Str.pick("Send", "भेजें"); textSize = 15f; setAllCaps(false); typeface = Typeface.DEFAULT_BOLD
      setTextColor(Color.WHITE)
      background = rounded(Color.parseColor("#111827"), 999)
      setOnClickListener { doSend(pendingDraft ?: draftText.text.toString()) }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f).apply { setMargins(0, 0, dp(5), 0) }
    }
    val bn = Button(this).apply {
      text = Str.pick("Cancel", "रद्द करें"); textSize = 15f; setAllCaps(false)
      setTextColor(Color.parseColor("#5F6368"))
      background = rounded(Color.parseColor("#F1F3F4"), 999)
      setOnClickListener {
        confirmCard.visibility = View.GONE
        setStatus("Cancelled.", C_ERR)
        TaskRunner.onTaskDone(this@ArenaWebActivity, quiet = true)
      }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f).apply { setMargins(dp(5), 0, 0, 0) }
    }
    row.addView(by); row.addView(bn)
    confirmCard.addView(row)
    root.addView(confirmCard, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.BOTTOM).apply { setMargins(dp(14), 0, dp(14), dp(14)) })

    setContentView(root)
  }

  override fun onBackPressed() {
    if (web.canGoBack()) web.goBack() else super.onBackPressed()
  }

  override fun onDestroy() {
    if (front === this) front = null
    watchTimeout?.let { main.removeCallbacks(it) }
    super.onDestroy()
  }
}
