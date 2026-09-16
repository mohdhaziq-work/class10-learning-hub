package com.class10hub.app

import android.app.Application
import android.webkit.WebView

class App : Application() {
    override fun onCreate() {
        super.onCreate()
        /* Warm the WebView engine early so first paint is instant on boards */
        WebView(this).destroy()
    }
}
