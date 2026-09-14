package com.class10hub.vaani

import android.content.Context
import android.content.SharedPreferences

object Prefs {
  private const val NAME = "vaani"
  private lateinit var sp: SharedPreferences
  fun init(ctx: Context) {
    if (::sp.isInitialized) return
    sp = ctx.applicationContext.getSharedPreferences(NAME, Context.MODE_PRIVATE)
  }
  var confirmSend: Boolean
    get() = sp.getBoolean("confirmSend", true)
    set(v) = sp.edit().putBoolean("confirmSend", v).apply()
  var autoNext: Boolean
    get() = sp.getBoolean("autoNext", true)
    set(v) = sp.edit().putBoolean("autoNext", v).apply()
  var bootStart: Boolean
    get() = sp.getBoolean("bootStart", true)
    set(v) = sp.edit().putBoolean("bootStart", v).apply()
  var englishMode: Boolean
    get() = sp.getBoolean("englishMode", false)
    set(v) = sp.edit().putBoolean("englishMode", v).apply()
  var queue: String
    get() = sp.getString("queue", "") ?: ""
    set(v) = sp.edit().putString("queue", v).apply()
  var lastHeard: String
    get() = sp.getString("lastHeard", "") ?: ""
    set(v) = sp.edit().putString("lastHeard", v).apply()
}
