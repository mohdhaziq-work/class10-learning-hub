# Class 10 Hub — Android WebView Shell

Native Android wrapper that runs the Class 10 Learning Hub web app as a
fullscreen, GPU-accelerated classroom app for Android smart boards, tablets
and phones.

## Performance architecture

- `android:hardwareAccelerated="true"` on both `<application>` and `<activity>`
- `WebView.setLayerType(LAYER_TYPE_HARDWARE, null)` — isolated GPU layer
- `WebSettings.RenderPriority.HIGH` + `LOAD_DEFAULT` cache mode
- Persistent immersive sticky fullscreen (status bar, nav bar, system pill removed)
- `FLAG_KEEP_SCREEN_ON` for classroom sessions
- In-app navigation only; hardware back = web history back
- File-upload support for board session imports

## Build the APK

### Option A — GitHub Actions (no local SDK needed, free)

1. Push to `main` (or run the **Android APK Build** workflow manually).
2. Open the Actions run → download the `class10-learning-hub-apk` artifact.
3. Copy it to `public/downloads/class10-learning-hub.apk` in this repo —
   the website "Download App" button serves it directly.

### Option B — Android Studio / local Gradle

1. Open this folder in Android Studio (Hedgehog+), let it sync.
2. Build → Build APK(s), or run `gradle assembleDebug`.
3. APK appears in `app/build/outputs/apk/debug/`.

For a signed Play-ready build, generate a keystore and add a `signingConfigs`
block to `app/build.gradle.kts`.

## Install on a smart board

Copy the APK via USB, open a file manager on the board, tap the APK, and
allow "install unknown apps" for that file manager once. Launch **Class 10 Hub**.
