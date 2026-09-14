package com.class10hub.jarvis

import android.content.Context
import android.content.SharedPreferences

object P {
  private lateinit var sp: SharedPreferences
  fun init(c: Context) {
    if (!::sp.isInitialized) sp = c.applicationContext.getSharedPreferences("jarvis", Context.MODE_PRIVATE)
  }
  var lang: String
    get() = sp.getString("lang", "hi-IN") ?: "hi-IN"
    set(v) { sp.edit().putString("lang", v).apply() }
  var pin: String
    get() = sp.getString("pin", "") ?: ""
    set(v) { sp.edit().putString("pin", v).apply() }
  var queue: List<String>
    get() = (sp.getString("queue", "") ?: "").split("\u0001").filter { it.isNotBlank() }
    set(v) { sp.edit().putString("queue", v.joinToString("\u0001")).apply() }
}
