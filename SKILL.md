# 🧠 SKILL FILE — Mohd Haziq ke Rules & Instructions

> Ye file agent ke liye permanent memory hai. Har kaam me in rules ko follow karo.
> User jab naya rule/instruction de, to use yahan update karo (date ke saath).

---

## 1. 🗣️ Language — HINGLISH (hamesha)
- User Roman Hindi (Hinglish) me likhta hai, kabhi-kabhi garbled typing ke saath — **pyar se samjho, guess karo, kaam karo**.
- **Saare jawab Hinglish me do** — Hindi flow + English technical words.
- Kabhi shudh English essay mat do; kabhi user ki typing ka mazaak mat udao.

## 2. 🏆 Quality Bar — PORTFOLIO LEVEL (samjhauta nahi)
- Reference standard: **`haziq-portfolio`** repo — Next.js 14 + TypeScript + Tailwind + Firebase + Admin panel + API routes + SEO.
- User ne bola: *"itna professional advanced complex work"* — to **kabhi basic/plain kaam mat do**.
- Har project me chahiye: proper architecture (app/components/lib), TypeScript types, admin/backend jahan fit ho, SEO basics, professional README, deploy config.
- Pehle analyze karo (jaise portfolio clone karke kiya tha), phir us level par build karo.

## 3. 💰 Paisa — ₹0, HAMESHA FREE
- **Koi paid service, API key, ya trial mat lagao.** Sirf free tier:
  - Hosting: **Render FREE plan**
  - Backend/DB: **Firebase Spark (free)** — aur bina Firebase ke bhi app 100% chalni chahiye (local-first + graceful fallback).
- Agar koi cheez free me na ho, to free alternative do — paid suggest mat karo.

## 4. 🚀 Hosting — RENDER ONLY (Vercel kabhi nahi)
- Deploy target hamesha **Render** — `render.yaml` (Blueprint) repo me rakho.
- Render rules: `PORT` hardcode mat karo (Render inject karta hai); `healthCheckPath: /api/health` add karo; `NODE_VERSION` pin karo.
- User dashboard clicks khud karta hai — uske liye **detailed step-by-step guide** do (har click, expected logs, test checklist, troubleshooting table).

## 5. 🔑 Git & SSH Setup (fixed — dobara mat puchho)
- GitHub user: **`mohdhaziq-work`**
- SSH key: `~/.ssh/id_ed25519_class10` (private) + `id_ed25519_class10.pub` (public, ED25519, comment `class10-learning-hub`)
- Push command pattern: `GIT_SSH_COMMAND="ssh -i ~/.ssh/id_ed25519_class10 -o StrictHostKeyChecking=yes" git push ...`
- Deploy keys repo-scoped hote hain — push fail ho to user ko bolo: repo Settings → Deploy keys → **Allow write access** tick kare.
- Commit identity: `Mohd Haziq <mohdhaziq-work@users.noreply.github.com>`, branch `main`.
- Remote action (push/deploy) tab karo jab user deploy ki taraf ishara kare ("render setup", "check", "push") — har chhoti cheez par permission mat mango, bas karke batao.

## 6. 🧹 Workspace — HAMESHA SAAF (standing order)
- Reference/clone kiya hua junk (jaise `haziq-portfolio-review`) — **kaam khatm hote hi delete karo**.
- Cache/junk (`~/.npm/_cacache` etc.) time-time par saaf karo.
- Sirf important cheezein rakho: project source, `.git`, `.ssh` keys, ye SKILL.md.
- Safai ke baad **report karo**: kya delete kiya, kitna space bacha, kya rakha aur kyun.
- ⚠️ Kabhi delete mat karo: `~/.ssh/*` (keys), project ka `.git`, chalti hui cheez ke `node_modules` (server ke liye chahiye).

## 7. ✅ Verify Before Done (bina test ke "ho gaya" mat bolo)
- TypeScript/Next project: `npm run build` **pass hona chahiye** (113 pages ho ya 3).
- Saare important routes `curl` se test karo — **200 OK** chahiye (pages + APIs).
- JS-only changes: `node --check` chalao.
- Test results user ko dikhao (build summary, route table) — phir hi "DONE" bolo.

## 8. 🎓 Project Context — class10-learning-hub
- **Audience:** Class 10 (NCERT/CBSE), classroom **smart board** par chalega.
- **Maths SABSE important** — uske liye bana hai. Maths me: formulas, solved examples, graph tools. **Maths me flowchart/mindmap NAHI** (user ka clear rule).
- **Smart Board = main feature:** PDF/DOCX + whiteboard split view, drawing shapes, laser, timer, maths plotter — sabse zyada mehnat isi par.
- **Classroom UX:** touch-friendly, bade buttons, fullscreen mode, projector-readable fonts, Hindi + English mix content.
- Subject-wise features: Science/SST = mindmaps + flowcharts + timelines; English/Hindi = word banks + themes.

## 9. 📝 Working Style
- Bade kaam ko steps me todo, progress batate jao (commentary short rakho).
- Commands + expected output + "agar fail ho to" — teeno do.
- File banao to poori working banao (aadhe-tute code nahi); chhote fixes turant karo.
- User puche "check" to khud test karke result dikhao (jaise SSH `Hi ... authenticated` wala check).
- Skill file update: user jab bhi style/quality par instruction de, use yahan note karo.

---

## 10. 🎨 Design System — PREMIUM MINIMAL + ICONS ONLY + ENGLISH ONLY (max level)
- **Portfolio-style premium minimal** (user ka taste — `mohdhaziq-portfolio` jaisa): **Inter font only** + JetBrains Mono accents, near-monochrome (black/white/slate) + **ONE blue accent `#1a73e8`** + gold `#c9a227` micro-details. Pills, thin borders, generous whitespace.
- **🚫 NO rainbow/colorful UI** — user ko colorful icons/fonts bilkul pasand nahi. Icon tiles neutral (slate-100/gray), CTAs black pills, progress/links blue. Color sirf semantic chhoti jagah (quiz sahi/galat, auto-guide amber).
- **🚫 ZERO EMOJIS in website UI** — sirf icons (`components/ui/Icon.tsx`). Math/Greek/arrows (√ π θ → × ÷) allowed. Har design change ke baad perl emoji-scan — empty chahiye.
- **🇬🇧 WEBSITE ME ONLY ENGLISH** — koi Hinglish nahi (buttons, content, toasts, placeholders, metadata sab). Exception: Hindi subject ke chapter titles (proper nouns, Devanagari must hai); authors/translations romanized. Har language change ke baad Hinglish-token scan + Devanagari scan chalao.
- **Responsive sab devices:** phones, tablets, laptops, desktops, smart boards. Board mobile par stacked. Buttons min 38-44px touch-friendly.
- **6 subjects:** Maths, Science, SST, English, Hindi + **AI (KIPS book / CBSE 417)**.
- **☀️ NO dark/night theme** — website sirf light theme me (user order). Koi theme toggle, `dark:` classes, ya dark-mode script mat add karo. (Smart Board ka apna dark UI alag cheez hai — wo product hai, theme nahi.)

## 11. 🤖 AI HANDOFF PAGE (hidden) — har session ka niyam
- Website par ek **hidden page `/ai`** hai (`app/(site)/ai/page.tsx`, data `lib/handoff.ts` me) — nav me link nahi, `noindex`, robots disallow. Sirf AI agents ke liye.
- **HAR kaam ke baad** (session khatm karne se pehle): `lib/handoff.ts` ke `currentState`, `pendingTasks`, `log`, `updated`, `lastCommit` update karo + is SKILL.md ke Log me entry. Agla AI wahin se continue karega.
- **Har reply/session ki shuruaat me active rules ka short recap dikhao** (user ka order: "har bar use dikha karo"): no emojis, English-only site, light-only, Render-only, ₹0, portfolio-level quality, Hinglish replies.
- Naya AI session start ho to pehle `/ai` page + SKILL.md padhe, phir kaam.

## 12. 📚 PYQ DEPTH — sach + plan
- **Jhootha count kabhi nahi bolna.** Page par `PYQ_TOTAL` (actual) hi dikhao. 2026-09-14 tak: ~370 maths PYQs (batches A-D, 2011-2026).
- Target **2000+** hai — batches me badhao (`lib/content/pyq-maths-e.ts`, `-f.ts`... har batch ~250-300 real board-style questions, year+marks+answer ke saath). Junk/auto-generated filler NAHI.
- Baaki subjects (Science/SST/English/Hindi) ke PYQ pages bhi isi `/pyq/<subject>` pattern par aayenge.
- PDF **crisp** hona chahiye: board PDF render DPR× (cap 2.5) — blurry complaint fix ho chuki hai; nayi changes me wapas mat todna.
- "Board paper" pages (`/pyq/maths/[slug]`) asli CBSE question-paper jaisi styling me hain (`.qp-*` classes globals.css me) — isi design language me improve karo.

---

### 📌 Log
- **2026-09-10:** Skill file bani. Rules: Hinglish, portfolio-level quality, ₹0 free-only, Render-only, workspace hamesha saaf, verify-before-done, Maths-first + Smart-Board-first.
- **2026-09-10:** Google redesign live — icons-only, all-device responsive, AI subject (16 chapters) add hua. Build 130/130, smoke all-200, pushed to GitHub.
- **2026-09-10:** Premium-minimal pass — portfolio-style monochrome (Inter-only, black CTAs, single blue accent), full English-only website. Build 130/130, pushed.
- **2026-09-10:** Night theme poori tarah hataya — website ab light-only hai (koi toggle, dark: class ya theme script nahi). Build + smoke pass, pushed.
- **2026-09-10:** NCERT PDF har chapter me — 100+ official chapter PDFs verify karke (HTTP 200 + title check) jode; 2 wapas-aaye chapters (Industrialisation, Consumer Rights) full content ke saath add; board me ?pdf auto-load + % progress; admin Save spinner; reveal-race fix + route progress bar. 115 chapter pages, smoke pass, pushed. Deploy-key SSH ke liye ~/.ssh/config banaya (IdentityFile id_ed25519_class10).
- **2026-09-10:** Smart Board advanced — QR phone upload (API + mobile page + auto-open), video/audio player, whiteboard pages (v3 session), screen shade, ruler + protractor, Send-to-Board images. Build 132/132, upload roundtrip + ranges smoke pass, pushed.
- **2026-09-14:** SEO pass pushed: canonical, OG/Twitter, JSON-LD WebSite/Course/LearningResource/Breadcrumbs, robots disallow /api /admin /upload, noindex admin/upload, sitemap cleaned, og.png added. Remote had parallel PYQ commit; rebased and fixed duplicate viewport. Build 172/172.
- **2026-09-14:** Added Google site verification meta tag JRNgWYCLdfnRnXDLas-IrnjW38h-fgJJit3oXlxHXHw in app/layout.tsx. Render failure was old duplicate viewport commit; fixed in 60cd28e. Deploy latest commit.
- **2026-09-14:** Added second Google site verification tag PzwcyygbgXrqaPF-JZyPIRhvlKS_Nt4oTU-i-kRvzNo alongside previous tag.
- **2026-09-14:** PYQ SEO expansion pushed: indexable /pyq, /pyq/maths, 14 chapter slug pages, redirects, FAQ/ItemList/LearningResource JSON-LD, internal links. Target queries: class 10 pyqs, maths pyqs, chapter wise pyq, CBSE previous year questions.
- **2026-09-14:** Stalled-session takeover — batch D PYQs (~175 real board questions) + chapter PYQ pages ko asli CBSE question-paper design (`.qp-*`), board PDF render ab DPR-crisp (blurry fix), hidden `/ai` AI-handoff page + rule "har kaam ke baad handoff+SKILL update", robots me /ai disallow. Emojis dobara scan (engine toast ✨ hataya).
- **2026-09-14:** Batch E — EduRev ke 14 chapter PYQ pages parse karke 481 unique board questions add (bank 854). Answers sirf option/result line; explanations copy NAHI ki (copyright-safe). Source note handoff me. Push 52b916f.
- **2026-09-14:** EduRev connect — board ka naya "web" doc kind: `/smart-board?web=<url>` external page (EduRev PYQs) ko doc pane me iframe karta hai, whiteboard split me; write/browse toggle. 14 maths chapters ke buttons. EduRev content sirf frame hota hai, copy NAHI. Push c2f9a7f. Note: har session start me `git remote add origin git@github.com:mohdhaziq-work/class10-learning-hub.git` + ssh config dobara lagana padta hai (.git/config snapshot me nahi bachta).
- **2026-09-17 (rule):** Workspace safai: sirf SKILL.md + repo + user uploads rakho; one-off scratch (clips/frames/tmp analysis) har session ke end me delete. 192MB clips clear kiya.
- **2026-09-18 (lat-hud/menu):** any element toggled via hidden attr MUST have `[hidden]{display:none}` override if its class sets display (lat-hud was second victim after rec-pill). Glow banned on dock (neutral shadows only). Menu = sectioned labeled rows.
- **2026-09-18 (ink accuracy):** NEVER nudge ink per input type — smart-board stylus reports pointerType touch and any nudge reads as offset; tap must commit a single-point dot (touchPending on up).
- **2026-09-18 (handoff bug):** NEVER put a raw newline inside a JS string literal when patching lib/handoff.ts (Render build broke: "Unterminated string constant"). After ANY handoff.ts edit run `./node_modules/.bin/tsc --noEmit` before pushing.
- **2026-09-18 (dock v3):** dock = individual white icon boxes + blue graduation-cap MENU in center (ref: uploads/SmartSelect_*YouTube.jpg); hidden engine-bound buttons must stay in DOM (.dock-hidden). Sign-out fix: NEVER signInAnonymously before first onAuthStateChanged (overwrites restored Google session) — firstAuthState gate in db.ts.
- **2026-09-18:** Windows exe release pipeline fix (gh CLI + retry + artifact fallback); trigger: desktop-app change ya Actions > Run workflow. Push be9da67.
- **2026-09-18 (overnight):** Classwork ~5s live upsert per device; EduRev zoom transform-based smooth; split drag rAF+iframe freeze; dock decluttered (essentials only, rest MENU me); live tracking sticky (visibility beat + 5min online). Push 9b38f71.
- **2026-09-17:** REC pill CSS bug (author display:flex > hidden attr) fixed; fullscreen webkit fallback+toast; CI pull-before-push; home par classwork; drawer device tools. Push 7d332b4.
- **2026-09-17:** APK CI ab auto-commit (public/downloads fresh har android change par, v2.0.0); Windows Electron portable exe via GitHub Releases; /download page. Push aaeeb7d.
- **2026-09-17:** Permanent Firestore ledger (devices/approvals/classwork) — redeploy-proof teacher auth; any-account Google login + cross-device progress sync; account dropdown + admin dev drawer; teacher wording; page zoom on. Rules paste pending user. Push 539d15c.
- **2026-09-17:** Incremental live draw REVERT (double-edge artifact ball pen par — user clip me pakda). Decimation 1.25 kept. SEO: exact brand H1 + WebSite/Org JSON-LD; GSC request-indexing user ko bola. Push 5135e77.
- **2026-09-17:** Ink trail fix: ball strokes incremental live draw + sync paint (rAF wait removed); alpha tools full-redraw fallback. Clip 2 analysis: ~9% stalls, user in-clip likha finger aage ink piche. Push 8b07653.
- **2026-09-17:** Clip analysis pipeline proven (curl + ffmpeg frames + read_file). Pehla clip: 10-20% stall frames while recording; recording composite ab 0.75 scale + 30fps cap. Push 6956b43.
- **2026-09-17:** Firebase Storage BLAZE (paid) hai — hata diya. Free relay: /api/clip (30MB, 12 clips, ID-token admin gate). Share se link milta hai, agent frames extract karke dekhta hai. Clips ephemeral (deploy par clear) — link jaldi paste karo. Push 5a64484.
- **2026-09-17:** Share with AI: CLIPS > Share uploads to Firebase Storage, public link clipboard me; agent frames extract karke dekhta hai. Storage enable + rules one-time console step pending user. Push 6ff4f00.
- **2026-09-17:** Sign-in site header me (board se hata), Firebase config embedded fallback (Render env ki zaroorat nahi), authorized domain user ne add kiya. Push 0ce34e7.
- **2026-09-17:** Admin = Firebase Google sign-in sirf mohdhaziq1962@gmail.com (URL key hata diya). REC pill admin-only fixed; phone par recording = board-canvas captureStream fallback. Sign-in optional for students. Push 5cdf3c9.
- **2026-09-16:** Admin device system (approved device = admin; SPEED/REC/CLIPS admin-only) + lag-free on-site screen recording (IndexedDB clip library, MENU > REC/CLIPS) + /admin-devices gated (first unlock ?key=class10-admin). Push f9fe742.
- **2026-09-16:** Letter-start 80-120ms spikes fixed: undo snapshots JSON.stringify -> structuredClone (pushHistory no longer blocks pointerdown). Diagnose-first rule WORKED: SPEED tool data pinpointed the stall. Push 946e197.
- **2026-09-16:** Pen latency test shipped: MENU > SPEED → live INPUT/DRAW/EST ms HUD (zero cost when off). 20ms reality: active stylus + updated WebView + APK + 120Hz, code side is maxed. Push 60c1313.
- **2026-09-16:** Vendor parity: palm = duster (broad touch rub se erase, single undo), first-dot synchronous paint (~16ms saved). desynchronized/layer-forcing CSS permanently REJECTED (blackout+blur history). Push 14bb90d.
- **2026-09-16:** Finger calibration (built-in board jaisa): touch-only tip correction (10L/8U), palm rejection (contact >26px), 4px glide threshold; stylus untouched. Push 1f10d4c.
- **2026-09-16:** Pen pipeline RESTORED from proven f8264ec (single drawObject live+committed — offset/jump impossible). Sab speculative optimizations (pool/incremental/worker) hot path se hataye. Lesson: real-board par simplicity > micro-opts; naya experiment sirf user-verified need par. Push 965b4f0.
- **2026-09-16:** Stability rollback (real-board feedback): worker opt-in only (INK_WORKER_ENABLED=false), plain 2d contexts, APK containment CSS removed (blurry text cause), fullscreen orientation-lock (mobile flip fix). Pooled incremental ink retained. Push 06e9091.
- **2026-09-16:** Live-ink right-offset bug FIXED: worker mode me #boardLive ki CSS size skip ho rahi thi (element buffer-pixel size par render hota tha) — sizeBoard ab hamesha CSS size set karta hai. Push 4e0c188.
- **2026-09-16:** Max-level ink engine: live stroke layer OffscreenCanvas worker par (fallback main-thread incremental), static layer desync+alpha:false, Float32Array pooled zero-alloc hot path, O(new-points) incremental rendering, #boardFx overlay (lasso/shape), commit par 100% redraw integrity. content-visibility/translate3d intentionally NAHI (blackout injunction). Push 9ec882c.
- **2026-09-16:** Retroactive analytics: global_device_analytics ledger (ip + geo + source fields), Day-1 backfill via client legacy artifacts (sb-first-seen / saved board session), runBackfill migration at boot, /admin-devices timeline groups Today vs Historical, har card par IP/geo/first-seen, retroactive permanent authorize. Push 8701c47.
- **2026-09-16:** Persistent device vault: device_history_logs permanent ledger (device_uuid localStorage fingerprint), PENDING/AUTHORIZED_TEACHER/REVOKED statuses, .data JSON vault file (restart-safe), /admin-devices historical ledger + filters + last-seen sort, delayed async authorize by device, board handshake instant unlock (sb-live-auth cache) + School Board Mode chip. Push 9a3f6a2.
- **2026-09-16:** CANVAS BLACKOUT FIX: desynchronized contexts + content-visibility/translateZ hints hi Chrome me black canvas ka cause the — sab hata diya; contextlost/restored recovery + rAF-debounced resize + white pane bg + post-resize context re-assert. Push 65a710b.
- **2026-09-16:** APK perf emergency: offscreenPreRaster + hardware layer guard + onTrimMemory VRAM flush + smart-board-only injected containment CSS (pane toggles 0ms). User ne pehla APK public/downloads me upload kiya — Download App button LIVE; naya fast APK Actions me banta hai, artifact se replace karna. Push b79e8fa.
- **2026-09-16:** Android shell: android-app/ Kotlin WebView wrapper (GPU-forced, immersive sticky, RenderPriority.HIGH); GitHub Actions free APK build workflow; homepage header+hero me Download App CTA (#1a73e8) → /downloads/class10-learning-hub.apk. APK binary abhi repo me NAHI hai — Actions se build karke public/downloads me daalo. Push 134d40b.
- **2026-09-16:** Low-latency ink pipeline: sab 2D contexts desynchronized:true; board canvases par GPU layer hints (translateZ/will-change/content-visibility); pointermove zero-allocation (scratch worldPt, coalesced events eraser tak extend); rect stroke-shuru me cache hota hai. Push b1b4ede.
- **2026-09-16:** Board executive overhaul: ink pipeline zero-latency confirmed (PointerEvents+coalesced+rAF live layer+Bezier+velocity taper); 50% layout-freeze bug FIXED (divider inline flex cleared in setLayout + rAF remeasure); laser/spotlight code se hata diye; viewport zoom lock (meta + ctrl-wheel/multitouch guards SmartBoard me); doc pane momentum scroll. Push 89f7205.
- **2026-09-16:** Live device tracking + remote authorization (no-login, local-first): SessionTracker layout me mount (UUID sessionStorage, 30s heartbeat, bye beacon, 15s auth poll); /admin-devices SSE dashboard (live cards + Authorize as Teacher Board); engine board sirf authorized sessions ka PNG /api/classwork par bhejta hai (server flag dobara verify karta hai, warna 403); public /classwork archive; 2-min silent prune. Firebase ki zaroorat NAHI — Render par free chalta hai. Push 5be6826.
- **2026-09-16:** Content/subject overhaul: NCERT PDF buttons ab split-view (board me pdf+whiteboard); Slides tab platform-wide deactivated (code preserved); maths chapter view se PYQ+Notes tabs hataye; interactive node mind-map engine (MindMapInteractive.tsx — tap expand + zoom); notes PW-style numbered cards; Formula Bank + application guide (formulaGuide.ts); science Activities lab 26 activities with original SVG art (ActivityArt.tsx); +135 conceptual MCQs (quizExtra.ts) maths+science quizzes me merged. Push 80febdb.
- **2026-09-16:** Executive spec implemented: dock core-only (Move/Pen/Eraser/Clear/Undo/Redo) + MENU More-Tools popup; Laser+Spotlight PERMANENTLY removed; bg/grid controls Settings modal me (canvas hub: surface style, palette+custom, grid-size slider, view reset); left doc pane READ-ONLY (Write-on-page gone); PYQ chapter pages par sticky TOP action bar (EduRev board button upar); /pyq/maths premium card grid + /pyq par all-subject PYQ cards; shapes me pentagon/hexagon/semicircle/cube/cylinder/cone/sphere; ruler wheel-rotate+edge-resize; protractor exact-degree input + 15° snap. Push ceb4446.
- **2026-09-15:** Smart Board layout redesign (user ke pro smart-board reference images ke hisaab se): upar kuch NAHI, sab niche floating DOCK me — tools center, file/save/export left, pages/bg right; left me chhoti utility pill (home/settings/help/full); MENU button se More-tools grid (shade/ruler/protractor/spotlight/clear/templates/replay/widgets/pad/thumbs). Popovers ab dock ke UPAR khulte hain. Engine selector `.tool[data-tool]` (rail hata). Push 52fe70b.
- **2026-09-15:** EduRev blur ka ROOT CAUSE mila: unka logout.js/header_lout.js sign-in khulte hi `$(".container").addClass("blur")` karta hai; hum sign-in hata dete the par `.blur` class reh jaati thi = permanent blur. Fix: proxy CSS me `.blur/.container.blur/[class*=blur]{filter:none!important}` + JS har 800ms class/inline-filter strip (40 sweeps + 35s/60s). ZARURI detail: EduRev HTML me `</head>`/`</body>`/`</html>` tags hote hi NAHI (page `</script>` par khatam) — CSS `<head>` ke turant baad, cleanup JS document ke END me append karo. Push 390f3dd.
- **2026-09-15:** EduRev blur fix — sign-in overlay page ko blur kar deta tha; proxy me ab unblur sweep (700ms x15), backdrop-filter removal, sticky bar + modals hataye. EduRev PYQ web-pane ab SAB subjects ke chapter pages par: `EDUREV_CHAPTERS` map lib/pyqSeo.ts me FLAT chapter-index order me hai (chapter `n` use mat karna — SST/Hindi/English groups me numbering reset hoti hai). Science 13, SST 22, English 28, Hindi 14 chapters mapped. Push 4b2d6ed. Note: workspace restore ke baad ssh key perms 0644 ho jaati hain — push se pehle `chmod 600 ~/.ssh/id_ed25519_class10` zaroor.
- **2026-09-14:** EduRev clean-reader — `/api/web-proxy` sirf edurev.in allow karta hai, HTML stream karke sign-in/login modals/sticky bars inject CSS+JS se hide karta hai (engine `webSrc()` auto-route). Board background customizer (pattern + swatches + custom color, localStorage `sb-bg-prefs`). Board pages: duplicate/delete. Doc pane: 2-finger pinch zoom + ctrl-wheel zoom (`wireDocPinch`). Pad page ke bache hue emojis hataye. Push dade196.
- **2026-09-14:** Smart Board overhaul — light splash loader (kala loading screen gone), text tool me color swatches + bold toggle, graph plotter light paper theme, laser glow-pulse, bottom bar slim floating pill, top nav se Admin hataya (footer me hai), /smart-board SEO: SoftwareApplication + BreadcrumbList JSON-LD. Push 559b584.
- **2026-09-14:** Purane Google verification tags site se hataye (user purani GSC property delete kar ke naye email se fresh verification karega). Verification meta ab sirf NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env se aata hai — naya code aaye to env set karo ya layout me paste karo. Push edcd41b.
- **2026-09-29:** Science MCQ bank shipped — lib/content/sciMcq.ts: SCI_MCQ covers all 13 Science chapters (science-0-0..science-0-12), ~165 MCQs, each with NCERT-sub-heading topic tag; board-favourites marked exam:true (QuizQ gained exam?:boolean). ChapterView Quiz shows green "Expected in exam" badge + bank merged into chapter quiz/count. PYQ x AI-50 board match: NOT possible — board-papers.ts only links cbse.gov.in PDFs, zero parsed question text; school-paper match already lives at /important-questions/ai-pyq-match. Push 53ef369. NOTE: remote owner is mohdhaziq-work — never guess Mohd-Haziq when re-adding origin.
- **2026-09-30:** English half-yearly blueprint shipped — /important-questions/english-blueprint (server page + client accordion view components/english/EnglishBlueprintView.tsx): school blueprint exactly (80M: reading 20, writing 10, grammar 10, literature 40) + 17 tap-to-open chapter packs (FF prose 1,2,3,4,5,9; poems 3,5,7,9,10; FWF 1,2,3,4,7,8) each with detailed summary, characters, themes, extract lines + meanings, marks-sized Q&A; grammar crash (modals/speech/editing/prepositions), letter + analytical paragraph formats, exam strategy, print button; English subject-page card added. Data: lib/content/englishBlueprint.ts. Push f3b473f. NOTE: snapshot resets keep wiping origin and node_modules — re-add origin (mohdhaziq-work) + npm ci before tsc every turn.
