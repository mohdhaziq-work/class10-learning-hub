package com.class10hub.vaani

import android.app.Application

class App : Application() {
  override fun onCreate() {
    super.onCreate()
    Prefs.init(this)
    Speaker.init(this)
    TaskEngine.load(Prefs.queue)
    // every queue change -> persisted (survives restart)
    TaskEngine.listeners.add { Prefs.queue = TaskEngine.serialize() }
  }
}
