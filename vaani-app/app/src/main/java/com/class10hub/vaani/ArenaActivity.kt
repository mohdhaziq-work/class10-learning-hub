package com.class10hub.vaani

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.View
import android.webkit.CookieManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.LinearLayout
import android.widget.TextView
import org.json.JSONObject

/* Built-in smart browser for arena.ai — automated end-to-end:
   open latest chat -> dictate -> confirm -> type -> send -> detect "AI done" -> next task.
   Cookies persist, so you log in once. */
class ArenaActivity : Activity() {

  companion object {
    var instance: ArenaActivity? = null

    fun open(ctx: Context) {
      ctx.startActivity(Intent(ctx, ArenaActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
    }
    fun openLatest(ctx: Context) {
      ctx.startActivity(Intent(ctx, ArenaActivity::class.java)
        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK).putExtra("latest", true))
    }
    fun openWithTask(ctx: Context, text: String) {
      ctx.startActivity(Intent(ctx, ArenaActivity::class.java)
        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK).putExtra("taskText", text))
    }
  }

  private lateinit var web: WebView
  private lateinit var pill: TextView
  private lateinit var confirmCard: LinearLayout
  private lateinit var txtConfirm: TextView
  private var voice: VoiceEngine? = null
  private var pendingText: String? = null
  private var pendingLatest = false
  private var pendingTask: String? = null
  var foreground = false

  /* ---------- automation JS injected into every arena.ai page ----------
     Generic chat heuristics: input = visible textarea/contenteditable lowest
     on screen; send = button labelled send/submit/arrow; done = innerText
     stable for 10s (and the stop button, if any, has gone away). */
  private val AUTOMATE_JS = """
(function(){
  if (window.__vaani) return;
  var B = window.VaaniBridge;
  function vis(el){ if(!el) return false; var r=el.getBoundingClientRect();
    if(r.width<30||r.height<14) return false;
    var s=getComputedStyle(el); return s.visibility!=='hidden'&&s.display!=='none'; }
  function findInput(){ var best=null,bt=-1;
    document.querySelectorAll('textarea, [contenteditable="true"], input[type="text"]').forEach(function(el){
      if(vis(el)){ var r=el.getBoundingClientRect(); if(r.top>bt){bt=r.top;best=el;} } });
    return best; }
  function findSend(){ var best=null,bs=-1;
    document.querySelectorAll('button, [role="button"]').forEach(function(b){
      if(!vis(b)||b.disabled) return;
      var t=((b.getAttribute('aria-label')||'')+' '+(b.textContent||'')).trim().toLowerCase();
      if(!t||t.length>28) return;
      var sc=-1;
      if(/^(send|submit)$/.test(t)) sc=100;
      else if(/send|submit/.test(t)) sc=60;
      else if(/^(->|→|➤|➢|↑|arrow up)$/.test(t)) sc=50;
      if(sc>bs){bs=sc;best=b;} });
    return bs>0?best:null; }
  function typeInto(el, text){
    el.focus();
    if(el.isContentEditable){ el.textContent='';
      document.execCommand('selectAll',false,null);
      document.execCommand('insertText',false,text); }
    else { var proto = el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto,'value').set.call(el, text);
      el.dispatchEvent(new Event('input',{bubbles:true}));
      el.dispatchEvent(new Event('change',{bubbles:true})); } }
  function pressEnter(el){ ['keydown','keypress','keyup'].forEach(function(k){
    el.dispatchEvent(new KeyboardEvent(k,{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true,cancelable:true})); }); }
  var st={watching:false,lastLen:-1,stableAt:0,sentAt:0,sawStop:false};
  window.__vaani={
    sendMsg:function(text){ var el=findInput();
      if(!el){ B.onSent(false,'noinput'); return; }
      typeInto(el,text);
      setTimeout(function(){ var b=findSend();
        if(b){ b.click(); } else { pressEnter(el); }
        st.watching=true; st.lastLen=-1; st.stableAt=Date.now(); st.sentAt=Date.now(); st.sawStop=false;
        B.onSent(true, b?'btn':'enter'); },300); },
    openLatest:function(){
      var sels=['a[href*="/chat"]','a[href*="/history"]','[data-testid*="chat"] a','[data-testid*="conversation"]'];
      for(var i=0;i<sels.length;i++){
        var as=Array.prototype.slice.call(document.querySelectorAll(sels[i])).filter(vis);
        if(as.length){ as[0].click();
          B.onChatOpen(true,(as[0].textContent||'chat').trim().slice(0,40)); return; } }
      if(location.pathname.indexOf('/history')<0){ location.href='https://arena.ai/history'; }
      else B.onChatOpen(false,''); }
  };
  setInterval(function(){
    if(!st.watching) return;
    var now=Date.now();
    var stopBtn=false;
    document.querySelectorAll('button,[role="button"]').forEach(function(b){
      var t=((b.getAttribute('aria-label')||'')+' '+(b.textContent||'')).trim().toLowerCase();
      if(/^(stop|stop generating|halt|pause)$/.test(t)) stopBtn=true; });
    if(stopBtn) st.sawStop=true;
    var len=document.body.innerText.length;
    if(len!==st.lastLen){ st.lastLen=len; st.stableAt=now; }
    var stableFor=now-st.stableAt, sinceSent=now-st.sentAt;
    if(st.sawStop&&!stopBtn&&stableFor>4000){ st.watching=false; B.onDone(); return; }
    if(sinceSent>15000&&stableFor>10000){ st.watching=false; B.onDone(); return; }
    if(sinceSent>300000){ st.watching=false; B.onDone(); return; }
  },1000);
})();
"""

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    instance = this
    buildUi()
    handleExtras(intent)
    web.loadUrl("https://arena.ai/")
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    handleExtras(intent)
  }

  private fun handleExtras(i: Intent?) {
    if (i?.getBooleanExtra("latest", false) == true) pendingLatest = true
    i?.getStringExtra("taskText")?.let { if (it.isNotBlank()) pendingTask = it }
  }

  private fun buildUi() {
    val dp = { v: Int -> (v * resources.displayMetrics.density).toInt() }
    val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setBackgroundColor(0xFF0B1220.toInt()) }

    val bar = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; setPadding(dp(12), dp(10), dp(8), dp(10)) }
    bar.addView(TextView(this).apply {
      text = "Arena"; setTextColor(0xFFE8EDF6.toInt()); textSize = 16f; setTypeface(typeface, android.graphics.Typeface.BOLD)
    })
    pill = TextView(this).apply {
      text = "loading…"; setTextColor(0xFF8B98B3.toInt()); textSize = 12f
      setBackgroundResource(R.drawable.bg_pill); setPadding(dp(10), dp(4), dp(10), dp(4))
      layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply { leftMargin = dp(10) }
    }
    bar.addView(pill)
    bar.addView(TextView(this).apply { text = " " })
    val sp = View(this); bar.addView(sp, LinearLayout.LayoutParams(0, 1, 1f))
    bar.addView(TextView(this).apply {
      text = "⟳"; textSize = 20f; setTextColor(0xFF7AB0FF.toInt()); setPadding(dp(10), dp(4), dp(10), dp(4))
      setOnClickListener { web.reload() }
    })
    bar.addView(TextView(this).apply {
      text = "✕"; textSize = 18f; setTextColor(0xFFFCA5A5.toInt()); setPadding(dp(12), dp(4), dp(12), dp(4))
      setOnClickListener { finish() }
    })
    root.addView(bar)

    web = WebView(this)
    web.settings.javaScriptEnabled = true
    web.settings.domStorageEnabled = true
    web.settings.userAgentString = "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
    CookieManager.getInstance().setAcceptCookie(true)
    CookieManager.getInstance().setAcceptThirdPartyCookies(web, true)
    web.addJavascriptInterface(VaaniBridge(), "VaaniBridge")
    web.webViewClient = object : WebViewClient() {
      override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?) = false
      override fun onPageFinished(view: WebView?, url: String?) {
        view?.evaluateJavascript(AUTOMATE_JS, null)
        if (pendingLatest) { pendingLatest = false
          view?.postDelayed({ view.evaluateJavascript("__vaani && __vaani.openLatest()", null) }, 900) }
        pendingTask?.let { t -> pendingTask = null
          view?.postDelayed({ if (foreground) confirm(t) }, 1500) }
        runOnUiThread { pill.text = "ready" }
      }
    }
    web.webChromeClient = WebChromeClient()
    root.addView(web, LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f))

    confirmCard = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      setBackgroundResource(R.drawable.bg_card)
      setPadding(dp(16), dp(14), dp(16), dp(14))
      val lp = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)
      lp.setMargins(dp(10), dp(6), dp(10), dp(6)); layoutParams = lp; visibility = View.GONE
    }
    confirmCard.addView(TextView(this).apply {
      text = "YE BHEJNA HAI?"; setTextColor(0xFF8B98B3.toInt()); textSize = 11f; letterSpacing = 0.12f
    })
    txtConfirm = TextView(this).apply { setTextColor(0xFFE8EDF6.toInt()); textSize = 15f }
    confirmCard.addView(txtConfirm, LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(8) })
    val rowBtns = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
    rowBtns.addView(TextView(this).apply {
      text = "✔  BHEJO"; setTextColor(0xFFFFFFFF.toInt()); textSize = 14f; setTypeface(typeface, android.graphics.Typeface.BOLD)
      setBackgroundResource(R.drawable.bg_btn); gravity = android.view.Gravity.CENTER
      setPadding(dp(10), dp(12), dp(10), dp(12)); isClickable = true
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
      setOnClickListener { sendNow() }
    })
    rowBtns.addView(View(this), LinearLayout.LayoutParams(dp(8), 1))
    rowBtns.addView(TextView(this).apply {
      text = "✕  CANCEL"; setTextColor(0xFFE8EDF6.toInt()); textSize = 14f
      setBackgroundResource(R.drawable.bg_btn2); gravity = android.view.Gravity.CENTER
      setPadding(dp(10), dp(12), dp(10), dp(12)); isClickable = true
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
      setOnClickListener { confirmCard.visibility = View.GONE; pendingText = null; pill.text = "cancel — neeche mic dabao" }
    })
    confirmCard.addView(rowBtns, LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(12) })
    root.addView(confirmCard)

    root.addView(TextView(this).apply {
      text = "🎤  BOLO KAR LIKHWAO"
      setTextColor(0xFFFFFFFF.toInt()); textSize = 15f; setTypeface(typeface, android.graphics.Typeface.BOLD)
      setBackgroundResource(R.drawable.bg_btn); gravity = android.view.Gravity.CENTER
      setPadding(dp(10), dp(14), dp(10), dp(14)); isClickable = true
      val lp = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)
      lp.setMargins(dp(10), dp(2), dp(10), dp(10)); layoutParams = lp
      setOnClickListener { requestDictation() }
    }, LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT))

    setContentView(root)
  }

  fun confirmFromVoice(t: String) { confirm(t) }

  private fun confirm(text: String) {
    pendingText = text
    txtConfirm.text = text
    confirmCard.visibility = View.VISIBLE
    if (Prefs.confirmSend) {
      Speaker.speak("Ye bhejna hai? " + text + ". Haan bolo ya nahi.")
      listenConfirm()
    } else sendNow()
  }

  private fun requestDictation() {
    if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
      requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO), 7); return
    }
    pill.text = "suno raha hoon…"
    voice?.destroy()
    voice = VoiceEngine(this) { f, p, e ->
      if (p != null) runOnUiThread { pill.text = p }
      else if (f != null) confirm(f)
      else if (e != null) runOnUiThread { pill.text = e }
    }
    voice?.start()
  }

  private fun listenConfirm() {
    voice?.destroy()
    voice = VoiceEngine(this) { f, _, _ -> if (f != null) yesNo(f) }
    voice?.start()
  }

  private fun yesNo(t: String) {
    val s = t.lowercase()
    val yes = listOf("haan", "han", "yes", "ok", "okay", "bhejo", "bhej", "confirm", "sahi", "send", "done", "ji").any { s == it || s.contains(it) }
    val no = listOf("nahi", "nahin", "no ", "nope", "cancel", "radd", "galat", "mat bhejo", "rok do", "nahi bhejo").any { s.contains(it) }
    when {
      yes -> sendNow()
      no -> {
        confirmCard.visibility = View.GONE; pendingText = null
        Speaker.speak("Theek hai. Dobara bolna ho to neeche mic dabao")
        runOnUiThread { pill.text = "cancel" }
      }
      else -> { Speaker.speak("Haan ya nahi?"); listenConfirm() }
    }
  }

  private fun sendNow() {
    val text = pendingText ?: return
    runOnUiThread {
      confirmCard.visibility = View.GONE
      pill.text = "bhej raha hoon…"
      voice?.destroy()
      val js = "if(!window.__vaani){VaaniBridge.onSent(false,'noinject');}else{window.__vaani.sendMsg(" + JSONObject.quote(text) + ");}"
      web.evaluateJavascript(js, null)
    }
  }

  inner class VaaniBridge {
    @JavascriptInterface
    fun onSent(ok: Boolean, how: String) {
      runOnUiThread {
        if (ok) pill.text = "bheja ✓ — jawab ka wait…" else {
          pill.text = "input nahi mila"
          Speaker.speak("Chat ka input nahi mila — page load hone do, phir bolo")
        }
      }
    }
    @JavascriptInterface
    fun onDone() {
      runOnUiThread {
        pill.text = "jawab complete ✓"
        Speaker.speak("AI ka jawab poora ho gaya")
        TaskEngine.doneCurrent()
        if (Prefs.autoNext && TaskEngine.running) QueueRunner.run(this@ArenaActivity)
        else if (TaskEngine.queue.isEmpty()) TaskEngine.running = false
        TaskEngine.changed()
      }
    }
    @JavascriptInterface
    fun onChatOpen(ok: Boolean, title: String) {
      runOnUiThread {
        if (ok) { pill.text = "chat: " + title; Speaker.speak("Chat khul gayi") }
        else Speaker.speak("Chat list nahi mili — ek baar khud kholo, main yaad rahungi")
      }
    }
    @JavascriptInterface
    fun log(s: String) { android.util.Log.d("VaaniJS", s) }
  }

  override fun onResume() { super.onResume(); foreground = true }
  override fun onPause() { super.onPause(); foreground = false; voice?.destroy(); CookieManager.getInstance().flush() }
  override fun onDestroy() { super.onDestroy(); voice?.destroy(); if (instance === this) instance = null }
  override fun onBackPressed() { if (web.canGoBack()) web.goBack() else super.onBackPressed() }
}
