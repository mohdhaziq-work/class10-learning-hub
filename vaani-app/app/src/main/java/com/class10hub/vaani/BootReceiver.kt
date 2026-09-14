package com.class10hub.vaani

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class BootReceiver : BroadcastReceiver() {
  override fun onReceive(ctx: Context, i: Intent) {
    if (Intent.ACTION_BOOT_COMPLETED == i.action && Prefs.bootStart) {
      try { BubbleService.start(ctx) } catch (_: Exception) { }
    }
  }
}
