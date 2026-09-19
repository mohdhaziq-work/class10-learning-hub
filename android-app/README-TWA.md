# TWA variant (Chrome-rendered app shell)

The WebView variant of this app measures ~55–85 ms input-to-ink because Android
WebView's input pipeline runs at reduced dispatch rates (~10 Hz on many builds,
see use-gesture#662) and lacks Chrome Android's input optimizations (Input
Vizard / Framer / Direct2Thread, all of which live inside Chrome's renderer).

A Trusted Web Activity runs the SAME site inside a full Chrome Custom Tab, so
the app inherits Chrome's 23–35 ms input pipeline and our `pointerrawupdate`
path. That is the Phase-1 strategy: one web engine, two shells.

## What is already done (code-ready, this repo)

- `public/.well-known/assetlinks.json` — Digital Asset Links statement for
  `com.class10hub.app` (fingerprint is a placeholder until we get the keystore).
- `AndroidManifest.xml` — verified-origin intent filter
  (`autoVerify=true` on `https://class10-learning-hub.onrender.com`).
- `app/build.gradle.kts` — `androidx.browser:browser:1.8.0` dependency.
- `MainActivity.kt` — renderer priority policy, render-process-gone /
  unresponsive handlers (crash protection for both variants).

## Steps to build the TWA variant (on your machine)

1. Get the SHA-256 fingerprint of the release keystore:

   ```
   keytool -list -v -keystore <your.keystore> -alias <your-alias>
   ```

   Copy the `SHA256:` line (colon-separated hex). Send it over so
   `public/.well-known/assetlinks.json` can be finalized, then redeploy Render.

2. Verify the handshake before building:

   ```
   https://class10-learning-hub.onrender.com/.well-known/assetlinks.json
   ```

   must return JSON with your fingerprint. Chrome only grants the verified
   origin (full-screen, no URL bar) when this check passes.

3. Generate the TWA project (recommended: Bubblewrap, free):

   ```
   npm i -g @bubblewrap/cli
   bubblewrap init --manifest https://class10-learning-hub.onrender.com/manifest.json
   bubblewrap build
   ```

   - packageId: `com.class10hub.app`
   - signing key: use the SAME keystore from step 1.
   - display: `standalone` (our web manifest already says so).

   Bubblewrap produces a signed APK that opens the site in a Chrome Custom
   Tab with the verified-origin handshake.

4. Alternative without Bubblewrap: keep this Gradle project and add
   `com.google.androidbrowserhelper:androidbrowserhelper` + a
   `LauncherActivity` pointing at the site URL. Same assetlinks requirement.

5. Test on a real device with Chrome installed (TWA needs Chrome or another
   Custom Tabs provider; on devices without Chrome it falls back to a plain
   tab, which is still Chrome's renderer).

## Expected numbers (targets from ENGINE-V2-PLAN.md)

| shell               | INPUT p95 now | target   |
| ------------------- | ------------- | -------- |
| Chrome (phone)      | 23–35 ms      | < 40 ms  |
| TWA (this variant)  | n/a (new)     | < 55 ms  |
| WebView (old shell) | 55–85 ms      | < 55 ms  |

QA protocol: record screen clips on both shells with the latency HUD visible
(INPUT/DRAW/p95/coal/RAW flags) and compare against the built-in smart-board
whiteboard on the same device.

## Native escape hatch (only if TWA under-delivers)

`androidx.graphics.lowlatency.GLFrontBufferedRenderer` + `MotionPredictor`
(front-buffered "wet" overlay while the stroke is live, double-buffered "dry"
commit on pointer-up) is the documented Chromium-OS pattern
(`chromeos/low-latency-stylus` sample). Not planned unless measurements force it.
