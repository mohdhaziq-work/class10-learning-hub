package com.class10hub.vaani

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.Switch
import android.widget.TextView

class MainActivity : Activity() {

  private lateinit var txtHeard: TextView
  private lateinit var txtQueue: TextView
  private lateinit var btnOverlay: TextView
  private lateinit var btnMic: TextView
  private lateinit var btnContacts: TextView
  private lateinit var btnNotif: TextView
  private lateinit var btnBubble: TextView
  private var voice: VoiceEngine? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    Prefs.init(this)
    Speaker.init(this)
    buildUi()
    TaskEngine.listeners.add { runOnUiThread { refreshQueue() } }
  }

  private val dp = { v: Int -> (v * resources.displayMetrics.density).toInt() }

  private fun tv(text: String, size: Float, color: Int, bold: Boolean = false): TextView =
    TextView(this).apply {
      this.text = text; textSize = size; setTextColor(color)
      if (bold) setTypeface(typeface, android.graphics.Typeface.BOLD)
    }

  private fun card(): LinearLayout = LinearLayout(this).apply {
    orientation = LinearLayout.VERTICAL
    setBackgroundResource(R.drawable.bg_card)
    setPadding(dp(16), dp(14), dp(16), dp(14))
    layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(10) }
  }

  private fun sectionTitle(s: String): TextView = tv(s, 12f, 0xFF8B98B3.toInt(), true).apply {
    letterSpacing = 0.14f
    layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(22); bottomMargin = dp(2) }
  }

  private fun permRow(label: String, btn: TextView): LinearLayout {
    val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
    row.addView(tv(label, 14.5f, 0xFFE8EDF6.toInt()), LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
    btn.apply {
      textSize = 12.5f; setBackgroundResource(R.drawable.bg_btn2)
      setPadding(dp(14), dp(8), dp(14), dp(8)); isClickable = true
      layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
    }
    row.addView(btn)
    return row
  }

  private fun switchRow(label: String, checked: Boolean, cb: (Boolean) -> Unit): LinearLayout {
    val row = LinearLayout(this).apply {
      orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL
      layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(8) }
    }
    row.addView(tv(label, 14.5f, 0xFFE8EDF6.toInt()), LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
    val sw = Switch(this)
    sw.isChecked = checked
    sw.setOnCheckedChangeListener { _, v -> cb(v) }
    row.addView(sw)
    return row
  }

  private fun bigBtn(label: String, cb: () -> Unit): TextView = tv(label, 14f, 0xFFFFFFFF.toInt(), true).apply {
    setBackgroundResource(R.drawable.bg_btn); gravity = Gravity.CENTER
    setPadding(dp(10), dp(13), dp(10), dp(13)); isClickable = true
    layoutParams = LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f)
    setOnClickListener { cb() }
  }

  private fun buildUi() {
    val rootScroll = ScrollView(this)
    val root = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL; setPadding(dp(20), dp(28), dp(20), dp(30))
    }

    root.addView(tv("VAANI", 30f, 0xFFE8EDF6.toInt(), true))
    root.addView(tv("Voice Assistant — bolo, kaam ho jayega", 13.5f, 0xFF8B98B3.toInt()))

    val micWrap = LinearLayout(this).apply {
      orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER
      layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(18) }
    }
    micWrap.addView(TextView(this).apply {
      text = "🎤"; textSize = 38f; gravity = Gravity.CENTER
      setBackgroundResource(R.drawable.bg_micbtn); isClickable = true
      layoutParams = LinearLayout.LayoutParams(dp(96), dp(96))
      setOnClickListener { listenLocal() }
    })
    root.addView(micWrap)
    root.addView(tv("dabao aur bolo", 12.5f, 0xFF8B98B3.toInt()).apply {
      gravity = Gravity.CENTER
      layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(8) }
    })

    txtHeard = tv(Prefs.lastHeard.ifBlank { "yahan tumhara command dikhega" }, 14f, 0xFFE8EDF6.toInt()).apply {
      setBackgroundResource(R.drawable.bg_card); setPadding(dp(14), dp(12), dp(14), dp(12))
      layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(16) }
    }
    root.addView(txtHeard)

    /* ---- permissions ---- */
    root.addView(sectionTitle("PERMISSIONS"))
    val pc = card()
    btnOverlay = TextView(this); btnMic = TextView(this); btnContacts = TextView(this); btnNotif = TextView(this)
    pc.addView(permRow("Draw over apps (bubble)", btnOverlay))
    pc.addView(permRow("Microphone (sunne ke liye)", btnMic))
    pc.addView(permRow("Contacts (call karo naam se)", btnContacts))
    if (Build.VERSION.SDK_INT >= 33) pc.addView(permRow("Notification", btnNotif))
    pc.addView(bigBtnFull("Battery whitelist (service zinda rahe)") { Executor.batteryWhitelist(this) })
    root.addView(pc)

    /* ---- settings ---- */
    root.addView(sectionTitle("SETTINGS"))
    val sc = card()
    sc.addView(switchRow("Send se pehle confirm (haan/nahi)", Prefs.confirmSend) { Prefs.confirmSend = it })
    sc.addView(switchRow("Kaam complete hone pe agla auto-start", Prefs.autoNext) { Prefs.autoNext = it })
    sc.addView(switchRow("Phone on hote hi bubble chalu", Prefs.bootStart) { Prefs.bootStart = it })
    sc.addView(switchRow("English mic mode (default Hinglish)", Prefs.englishMode) { Prefs.englishMode = it })
    root.addView(sc)

    /* ---- task queue ---- */
    root.addView(sectionTitle("TASK QUEUE"))
    val qc = card()
    txtQueue = tv("", 13.5f, 0xFFE8EDF6.toInt())
    qc.addView(txtQueue)
    qc.addView(bigBtnFull("List saaf karo") { TaskEngine.clear(); refreshQueue(); Speaker.speak("List saaf kar di") }, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(10) })
    root.addView(qc)

    /* ---- shortcuts ---- */
    root.addView(sectionTitle("SHORTCUTS"))
    val bc = card()
    val row1 = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
    row1.addView(bigBtn("Arena.ai") { ArenaActivity.open(this) })
    row1.addView(View(this), LinearLayout.LayoutParams(dp(8), 1))
    row1.addView(bigBtn(if (BubbleService.instance == null) "Bubble ON" else "Bubble OFF") { toggleBubble() })
    bc.addView(row1, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))
    bc.addView(bigBtnFull("Awaaz test") { Speaker.speak("Namaste! Main Vaani hoon — aap kya kaam karwana chahenge?") }, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(8) })
    root.addView(bc)

    /* ---- help ---- */
    root.addView(sectionTitle("BOL KE KEHLAO"))
    val help = tv(
      "• \"Chrome / WhatsApp / YouTube kholo\" — koi bhi app\n" +
      "• \"Call karo papa\" · \"Alarm lagao 6 baje\" · \"Timer 10 minute\"\n" +
      "• \"YouTube pe lofi beats chalao\" · \"photosynthesis search karo\"\n" +
      "• \"Torch on / off\" · \"Volume badhao / full / mute\"\n" +
      "• \"Arena kholo\" · \"Arena ki latest chat kholo\"\n" +
      "• \"Task banao\" → kaam ek ek karke bolo → \"Shuru karo\"\n" +
      "• Queue control: \"Next\" · \"Status\" · \"Ruk jao\" · \"List saaf karo\"\n" +
      "• Arena khula ho to seedha bolo — wahi message banega, confirm ke baad send",
      13f, 0xFF8B98B3.toInt()
    ).apply {
      setLineSpacing(dp(3).toFloat(), 1f)
      layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(10) }
    }
    root.addView(help)

    rootScroll.addView(root)
    setContentView(rootScroll)
  }

  private fun bigBtnFull(label: String, cb: () -> Unit): TextView =
    tv(label, 13.5f, 0xFFFFFFFF.toInt(), true).apply {
      setBackgroundResource(R.drawable.bg_btn2); gravity = Gravity.CENTER
      setPadding(dp(10), dp(11), dp(10), dp(11)); isClickable = true
      setOnClickListener { cb() }
    }

  private fun toggleBubble() {
    if (BubbleService.instance == null) {
      if (!Settings.canDrawOverlays(this)) {
        Speaker.speak("Pehle overlay permission do")
        startActivity(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + packageName)))
        return
      }
      BubbleService.start(this)
      btnBubble.text = "Bubble OFF"
      Speaker.speak("Bubble chalu ho gaya")
    } else {
      BubbleService.stop(this)
      btnBubble.text = "Bubble ON"
    }
  }

  private fun listenLocal() {
    if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
      requestPermissions(perms(), 1); return
    }
    txtHeard.text = "suno raha hoon…"
    voice?.destroy()
    voice = VoiceEngine(this) { f, p, e ->
      if (p != null) txtHeard.text = "… " + p
      else if (f != null) { txtHeard.text = "“" + f + "”"; Router.handle(this, f) }
      else if (e != null) txtHeard.text = e
    }
    voice?.start()
  }

  private fun perms(): Array<String> {
    val l = arrayListOf(Manifest.permission.RECORD_AUDIO, Manifest.permission.READ_CONTACTS)
    if (Build.VERSION.SDK_INT >= 33) l.add(Manifest.permission.POST_NOTIFICATIONS)
    return l.toTypedArray()
  }

  private fun refreshPerms() {
    fun set(btn: TextView, ok: Boolean) {
      btn.text = if (ok) "✓ OK" else "GRANT"
      btn.setTextColor(if (ok) 0xFF4ADE80.toInt() else 0xFFFCA5A5.toInt())
    }
    set(btnOverlay, Settings.canDrawOverlays(this))
    set(btnMic, checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED)
    set(btnContacts, checkSelfPermission(Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED)
    if (Build.VERSION.SDK_INT >= 33)
      set(btnNotif, checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED)
    btnOverlay.setOnClickListener {
      startActivity(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + packageName)))
    }
    btnMic.setOnClickListener { requestPermissions(perms(), 1) }
    btnContacts.setOnClickListener { requestPermissions(perms(), 1) }
    if (Build.VERSION.SDK_INT >= 33) btnNotif.setOnClickListener { requestPermissions(perms(), 1) }
    btnBubble.text = if (BubbleService.instance == null) "Bubble ON" else "Bubble OFF"
  }

  private fun refreshQueue() { txtQueue.text = TaskEngine.queueText() }

  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == 1 && grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
      Speaker.speak("Permission mil gayi, ab bol sakte ho")
      if (Settings.canDrawOverlays(this)) BubbleService.start(this)
    }
    refreshPerms()
  }

  override fun onResume() { super.onResume(); refreshPerms(); refreshQueue() }
  override fun onPause() { super.onPause(); voice?.destroy() }
  override fun onDestroy() { super.onDestroy(); voice?.destroy() }
}
