package com.class10hub.jarvis

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.graphics.Path
import android.view.accessibility.AccessibilityEvent

/* Screen control by voice — scroll, swipe, back, home, recents.
   Enable: Settings > Accessibility > Jarvis (the app guides you). */
class GestureService : AccessibilityService() {

  companion object {
    @JvmStatic var inst: GestureService? = null
    fun on(): Boolean = inst != null
  }

  override fun onServiceConnected() {
    super.onServiceConnected()
    inst = this
  }

  override fun onDestroy() {
    if (inst === this) inst = null
    super.onDestroy()
  }

  override fun onAccessibilityEvent(e: AccessibilityEvent?) {}
  override fun onInterrupt() {}

  /* finger swipes UP = content scrolls DOWN (natural) */
  fun scroll(down: Boolean): Boolean {
    return try {
      val w = resources.displayMetrics.widthPixels.toFloat()
      val h = resources.displayMetrics.heightPixels.toFloat()
      val path = Path()
      if (down) { path.moveTo(w / 2, h * 0.72f); path.lineTo(w / 2, h * 0.28f) }
      else { path.moveTo(w / 2, h * 0.28f); path.lineTo(w / 2, h * 0.80f) }
      val gd = GestureDescription.Builder()
        .addStroke(GestureDescription.StrokeDescription(path, 0, 260))
        .build()
      dispatchGesture(gd, null, null)
    } catch (_: Exception) { false }
  }

  fun swipe(left: Boolean): Boolean {
    return try {
      val w = resources.displayMetrics.widthPixels.toFloat()
      val h = resources.displayMetrics.heightPixels.toFloat()
      val path = Path()
      if (left) { path.moveTo(w * 0.8f, h / 2); path.lineTo(w * 0.2f, h / 2) }
      else { path.moveTo(w * 0.2f, h / 2); path.lineTo(w * 0.8f, h / 2) }
      val gd = GestureDescription.Builder()
        .addStroke(GestureDescription.StrokeDescription(path, 0, 240))
        .build()
      dispatchGesture(gd, null, null)
    } catch (_: Exception) { false }
  }

  fun global(action: Int): Boolean = try { performGlobalAction(action) } catch (_: Exception) { false }
}
