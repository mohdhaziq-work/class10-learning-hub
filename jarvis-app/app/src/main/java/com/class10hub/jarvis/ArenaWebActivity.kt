package com.class10hub.jarvis

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Color
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

/* The smart browser for arena.ai. Automation = injected JS:
   find the chat input (any chat UI), type the message, send it,
   then watch the page until the AI's reply stops changing -> "work done". */
class ArenaWebActivity : Activity() {

  private lateinit var web: WebView
  private lateinit var status: TextView
  private lateinit var confirmBar: LinearLayout
  private lateinit var draftText: TextView
  private var pendingDraft: String? = null
  private var pendingAfterLoad: String? = null
  private var retries = 0
  private var watchOn = false
  private val main = Handler(Looper.getMainLooper())
  private var watchTimeout: Runnable? = null
  private var nullRetries = 0

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

  private fun pinOrHome(): String = P.pin.ifEmpty { "https://arena.ai" }

  private fun route(spoken: String?) {
    val s = spoken?.trim()?.lowercase() ?: ""
    val msg = CommandCenter.hasMessage(s)
    when {
      s.contains("naya") || s.contains("new") -> web.loadUrl("https://arena.ai")
      s.isEmpty() || (s.contains("chat") || s.contains("latest") || s.contains("pin")) && !msg -> web.loadUrl(pinOrHome())
      msg -> { pendingAfterLoad = CommandCenter.extractMsg(spoken!!); web.loadUrl(pinOrHome()); status.text = "Chat khol ke message tayyar kar raha hoon…" }
      else -> web.loadUrl(pinOrHome())
    }
  }

  /* ---------------- draft + confirm + send ---------------- */
  fun proposeDraft(text: String) {
    front = this
    retries = 0
    pendingDraft = text
    status.text = "Message likh raha hoon…"
    web.evaluateJavascript(JS_TYPE.replace("__TEXT__", JSONObject.quote(text))) { v ->
      val r = v?.trim('"')
      if (r == "TYPED") showConfirm(text)
      else if (r == "NO_INPUT") {
        if (retries < 8) {
          retries++
          status.text = "Input dhoondh raha hoon… ($retries/8)"
          main.postDelayed({ proposeDraft(text) }, 1500)
        } else {
          status.text = "❌ Chat ka input nahi mila — chat khol ke Pin karo"
          Speech.speak(this, "Chat ka input nahi mila. Pehle chat kholo aur pin karo")
          TaskRunner.onTaskDone(this, quiet = true)
        }
      }
    }
  }

  private fun showConfirm(msg: String) {
    nullRetries = 0
    draftText.text = msg
    confirmBar.visibility = View.VISIBLE
    Speech.speak(this, "Main bhejta hoon. $msg. … Haan boliye to send, nahi to cancel") {
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
            Speech.speak(this, "Theek hai, neeche button dabao — bhejo ya cancel")
          } else {
            Speech.speak(this, "Sunai nahi diya. Haan boliye ya cancel") { confirmListen(msg) }
          }
        }
        a.contains("haan") || a.contains("yes") || a.contains("bhejo") || a.contains("send") ||
          a.contains("thik") || a.contains("theek") || a.contains("ok") || a.contains("okay") || a.contains("kar do") || a.contains("kardo") -> doSend(msg)
        a.contains("nahi") || a.contains("no") || a.contains("cancel") || a.contains("mat") || a.contains("ruko") || a.contains("band") -> {
          confirmBar.visibility = View.GONE
          status.text = "❌ Cancel kar diya"
          Speech.speak(this, "Cancel kar diya")
          TaskRunner.onTaskDone(this, quiet = true)
        }
        else -> Speech.speak(this, "Haan ya nahi?") { confirmListen(msg) }
      }
    }
  }

  private fun doSend(msg: String) {
    confirmBar.visibility = View.GONE
    status.text = "📤 Bhej raha hoon…"
    web.evaluateJavascript(JS_SEND.replace("__TEXT__", JSONObject.quote(msg))) { v ->
      val r = v?.trim('"')
      if (r == "SENT_BTN" || r == "SENT_FORM" || r == "SENT_ENTER") {
        status.text = "⏳ Bhej diya — AI ka jawab aane ka wait…"
        Speech.speak(this, "Bhej diya. Jawab ka wait karta hoon")
        startWatch()
      } else if (r == "NO_INPUT") {
        main.postDelayed({ proposeDraft(msg) }, 1200)
      } else {
        status.text = "❌ Send button nahi mila — ek baar khud dabao"
        Speech.speak(this, "Send button nahi mila. Aap ek baar dabao")
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
        status.text = "⏱ Jawab ka pata nahi chala — check kar lo"
        Speech.speak(this, "Jawab ka pata nahi chala, aap check kar lo")
        TaskRunner.onTaskDone(this, quiet = true)
      }
    }
    main.postDelayed(watchTimeout!!, 5 * 60 * 1000)
  }

  private fun onWorkDoneUi() {
    if (!watchOn) return
    watchOn = false
    watchTimeout?.let { main.removeCallbacks(it) }
    status.text = "✅ Jawab aa gaya"
    Speech.speak(this, "Jawab aa gaya")
    TaskRunner.onTaskDone(this, quiet = false)
  }

  /* ---------------- UI ---------------- */
  private fun dp(d: Int): Int = (d * resources.displayMetrics.density).toInt()

  @SuppressLint("SetJavaScriptEnabled")
  private fun buildUi() {
    val root = FrameLayout(this)
    val col = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }

    val bar = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; setBackgroundColor(Color.parseColor("#111A2C")) }
    fun tb(label: String, cb: () -> Unit): Button = Button(this).apply {
      text = label; textSize = 13f
      setOnClickListener { cb() }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
    }
    bar.addView(tb("←") { if (web.canGoBack()) web.goBack() })
    bar.addView(tb("⟳") { web.reload() })
    bar.addView(tb("🏠 Home") { web.loadUrl(pinOrHome()) })
    bar.addView(tb("📌 Pin chat") { pinNow() })
    col.addView(bar)

    web = WebView(this)
    web.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f)
    col.addView(web)

    status = TextView(this).apply {
      text = "Ready"
      setPadding(dp(12), dp(8), dp(12), dp(10))
      setTextColor(Color.parseColor("#8B98B3"))
      setBackgroundColor(Color.parseColor("#111A2C"))
      textSize = 12.5f
    }
    col.addView(status)
    root.addView(col, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))

    confirmBar = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      setBackgroundColor(Color.parseColor("#16223B"))
      setPadding(dp(14), dp(12), dp(14), dp(16))
      visibility = View.GONE
    }
    draftText = TextView(this).apply {
      setTextColor(Color.parseColor("#E8EDF6")); textSize = 15f; setPadding(0, 0, 0, dp(10))
    }
    confirmBar.addView(draftText)
    val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
    val by = Button(this).apply {
      text = "✓ Bhejo (haan)"; textSize = 14f
      setOnClickListener { doSend(pendingDraft ?: draftText.text.toString()) }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
    }
    val bn = Button(this).apply {
      text = "✕ Cancel"; textSize = 14f
      setOnClickListener {
        confirmBar.visibility = View.GONE
        status.text = "❌ Cancel"
        TaskRunner.onTaskDone(this@ArenaWebActivity, quiet = true)
      }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
    }
    row.addView(by); row.addView(bn)
    confirmBar.addView(row)
    root.addView(confirmBar, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.BOTTOM))

    setContentView(root)
  }

  private fun pinNow() {
    web.evaluateJavascript("location.href") { u ->
      val url = u?.trim('"') ?: ""
      if (url.isNotEmpty()) {
        P.pin = url
        status.text = "📌 Pin ho gaya: $url"
        Speech.speak(this, "Ye chat pin ho gaya. Ab bolna — latest chat kholo")
      }
    }
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
