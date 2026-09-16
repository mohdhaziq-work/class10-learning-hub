/* AI HANDOFF FILE — single source of truth for any AI agent continuing this project.
   RULE: after completing ANY task in this repo, update this file (state, tasks, log)
   and SKILL.md before finishing the session. Keep it factual and current. */

export const HANDOFF = {
  updated: "2026-09-14",
  lastCommit: "Live device tracking + remote teacher authorization + classwork auto-save gateway",
  repo: "github.com/mohdhaziq-work/class10-learning-hub",
  branch: "main",
  live: "https://class10-learning-hub.onrender.com",
  stack: "Next.js 14 (app router) + TypeScript + Tailwind + pdfkit + qrcode; Firebase optional (local-first)",
  deploy: "Render free plan via render.yaml (auto-deploy on push; if not, Manual Deploy -> Deploy latest commit)",

  howToWork: [
    "Read /home/user/SKILL.md FIRST — user's permanent rules live there (Hinglish replies, premium quality, zero emojis, English-only UI, light theme only, Render-only, free-only).",
    "Read this page (app/(site)/ai/page.tsx renders lib/handoff.ts) for project state.",
    "After your task: update lib/handoff.ts (state/log/lastCommit) + SKILL.md log, build, test, commit, push.",
    "Commit identity: Mohd Haziq <mohdhaziq-work@users.noreply.github.com>. SSH key ~/.ssh/id_ed25519_class10 (set ~/.ssh/config Host github.com IdentityFile).",
    "Always: npm run build must pass; curl-smoke key routes; emoji-scan (perl regexp) must be empty; no dark-theme additions.",
  ],

  userRulesSummary: [
    "Replies to user in Hinglish; website content English only.",
    "NO emojis anywhere on the website — icons only (components/ui/Icon.tsx). Math symbols OK.",
    "Light theme ONLY — never add dark mode, dark: classes or theme toggles (Smart Board's own dark canvas is product, not theme).",
    "Premium minimal Google/labs.google style: Inter + JetBrains Mono, monochrome + single blue #1a73e8.",
    "Everything free (Render free + Firebase Spark optional). No Vercel.",
    "Portfolio-level code: Next+TS+Tailwind+API routes+admin, like haziq-portfolio.",
    "Maths is the main subject; Smart Board is the main feature; no flowcharts/mindmaps for Maths.",
    "Responsive: phones, tablets, laptops, smart boards.",
    "Verify before claiming done (build + curl + show results).",
  ],

  architecture: [
    "app/(site) — public pages: home, subjects/[id], chapter/[s]/[g]/[c], pyq, pyq/maths, pyq/maths/[slug], admin.",
    "app/smart-board — the Board product (lib/board/engine.ts is the big class; board.css at app/smart-board/board.css).",
    "app/upload/[session] + app/api/board-upload + app/api/board-file — QR phone upload pipeline.",
    "app/api/pyq/pdf — pdfkit-generated PYQ PDFs (DejaVu font in /fonts).",
    "lib/syllabus.ts — 6 subjects, all chapters. lib/content/* — slides/notes/quiz + pyq banks (a,b,c,d).",
    "lib/seo.ts + components/seo/JsonLd.tsx — canonical/OG/JSON-LD helpers. app/sitemap.ts + app/robots.ts.",
    "lib/handoff.ts + app/(site)/ai/page.tsx — THIS handoff system (hidden, noindex).",
  ],

  currentState: [
    "Site live on Render; SEO live: verification tags (two), canonical, OG, JSON-LD, sitemap with subjects+chapters+PYQ pages.",
    "PYQ system: /pyq landing + /pyq/maths + 14 chapter slug pages (server-rendered board-paper style), PDF download, Smart Board file-viewer opening, marks filters (?marks=).",
    "PYQ count now 854 maths questions: batches A-D curated + batch E (481) parsed from EduRev's 14 chapter PYQ pages (question statements are CBSE board items; answers = option/result line only, no explanations copied). Target 2000+ via more batches (see tasks).",
    "PDF sharpness: board PDF render now multiplies by devicePixelRatio (cap 2.5) — crisp on hi-DPI.",
    "Smart Board: split PDF+whiteboard, annotation, pages, QR upload, video/audio, shade/ruler/protractor, graph plotter, OCR handwriting, PYQ file viewer.",
    "Search Console: property verified via HTML meta tags (two codes). Sitemap submitted by user.",
    "LIVE DEVICE TRACKING 2026-09-16 (no-login architecture, local-first — no external DB required): SessionTracker (components/track) mounts in root layout: crypto UUID in sessionStorage, 30s heartbeat POST /api/session with device_type/OS/browser/screen/page, sendBeacon bye on pagehide, 15s poll of own authorization flag (window.__sbLive + sb-live event). Server store lib/track/store.ts (globalThis Map) prunes sessions silent >2min; SSE feed /api/session/stream powers /admin-devices dashboard (live cards: status dot Active/Idle, OS, browser, screen, entry/last-beat times, Authorize as Teacher Board toggle -> POST /api/session/authorize). Conditional auto-save: engine maybeCloudSync() posts board PNG to /api/classwork only when liveSyncOn (max 1/min); server RE-VERIFIES is_teacher_authorized and returns 403 otherwise. Public /classwork archive page lists authorized board snapshots. robots disallows /admin-devices. Verified end-to-end with curl (403 unauthorized, authorized write, SSE snapshot). Firebase remains optional — this works free on Render with zero keys. Pushed 5be6826.",
    "CONTENT OVERHAUL 2026-09-16: (1) NCERT PDF buttons everywhere now open /smart-board split view (pdf left, whiteboard right) instead of bare PDF. (2) Slides tab deactivated platform-wide (Slides renderer code preserved for reinstatement). (3) Maths: PYQ and Notes tabs removed from chapter view (native /pyq bank still lives at /pyq). (4) Interactive node mind map engine (components/chapter/MindMapInteractive.tsx): radial SVG nodes, tap-to-expand, zoom — replaces static mind map for science/SST/AI. (5) Notes rendered PW-style (numbered accent cards). (6) Formula Bank now shows application context + per-chapter How-and-where guide (lib/content/formulaGuide.ts, maths 14 + science 9 chapters). (7) New Activities lab (lib/content/activities.ts, 26 NCERT-style activities across 13 science chapters) with original inline SVG diagrams (components/chapter/ActivityArt.tsx: circuit/magnet/leaf/acid/heating/reflex/light/eye/plant). (8) 135 extra conceptual MCQs (lib/content/quizExtra.ts) merged into every maths+science chapter quiz. Pushed 80febdb.",
    "SPEC OVERHAUL 2026-09-16 (user executive spec): (1) bottom dock now core-only — Move/Pen/Eraser/Clear/Undo/Redo; everything else lives in the MENU More-Tools popup. (2) Laser pointer + Spotlight permanently removed (engine code, JSX, UI all excised). (3) bg pattern + colors removed from dock; Settings gear opens upgraded modal = customization hub: surface style select, canvas color palette + custom color, grid size slider (50-200%, persisted), canvas view reset. (4) Left doc pane is now strictly READ-ONLY: wireAnnotCanvas no-ops, web Write-on-page toggle removed, target forced to Board. (5) PYQ chapter pages: sticky top action bar (Open in Board with EduRev / Open in Board / Download PDF) — no more buried bottom buttons. (6) /pyq/maths redesigned with premium chapter cards (number badge, count chip, meter, hover lift); /pyq landing got all-subject PYQ cards (5 subjects). (7) Shapes engine: +pentagon/hexagon/semicircle/cube/cylinder/cone/sphere with new icons. (8) Ruler: wheel-rotate + edge-resize; Protractor: exact degree input + 15-degree snap + wheel rotate. Pushed ceb4446.",
    "Smart Board shell redesigned (2026-09-15, per user reference images of pro smart-board panels): old left rail removed; top is now completely empty; new floating BOTTOM DOCK holds everything in thumb reach — left cluster (MENU/OPEN/SAVE/EXPORT), center tools (move, pan, pen, highlight, eraser, shapes, text, note, laser, maths, undo/redo), right cluster (layout segment, board pager, doc pager, bg pattern+colors). Small left utility pill = home/settings/help/fullscreen. New #menuPop More-tools grid (spotlight, shade, ruler, protractor, clear, thumbs, templates, replay, widgets, pad). Engine: tool pops and shape/maths pops now open ABOVE dock buttons; tool wiring selector changed to .tool[data-tool]; click-away respects .sb-dock/.sb-side. Pushed 52fe70b.",
    "EduRev blur ROOT CAUSE found + fixed: EduRev logout.js/header_lout.js adds the .blur class to .container when its sign-in opens; our cleanup removed the sign-in but the .blur class stayed = permanently blurred page. Fix: proxy CSS kills .blur/.container.blur/[class*=blur] filters with !important, proxy JS strips the blur class + inline filters every 800ms (40 sweeps + 35s/60s re-checks), removes #mySidenav/#opacityBody/.sidenav/modal-open/sidebaropen. IMPORTANT injection detail: EduRev HTML ships with NO </head>/</body>/</html> tags (page ends at </script>) — CSS is injected right after <head>, cleanup JS is APPENDED at document end. Pushed 390f3dd.",
    "EduRev now on ALL subject chapter pages: EDUREV_CHAPTERS map in lib/pyqSeo.ts (flat chapter-index order, NOT chapter n — SST/Hindi/English groups reset numbering) covers Science 13, SST 22, English 28, Hindi 14 (no EduRev page for सूर के पद). Chapter page passes flat idx to eduRevBoardHrefFor. Anti-blur fix in /api/web-proxy: blanket backdrop-filter removal, unblur sweep every 700ms (15 ticks) clearing filter/backdropFilter from content wrappers + body, removal of #erStickyRoot-pp sticky sign-in bar, myModal/myModalRegister modals, Get-the-App buttons, modal-open scroll lock. Note: SSH key perms reset to 0644 by workspace restore — chmod 600 before push.",
    "Smart Board v2: EduRev pages in the doc pane now load through /api/web-proxy (server fetch + injected CSS/JS hides their sign-in buttons/login modals/sticky auth bar; only edurev.in allowed; engine webSrc() auto-routes edurev URLs). Board background fully customizable: bgSelect pattern + bgColors swatches + custom color input, persisted in localStorage (sb-bg-prefs). Board pages: duplicate + delete buttons. Doc pane: 2-finger pinch zoom + ctrl/cmd-wheel zoom (wireDocPinch). Zero-emoji rule enforced — removed leftover emojis from app/pad/join.",
    "Smart Board UI now fully light: light loading splash (no black screen), light graph plotter canvas, text tool has color + bold, laser pointer has glow-pulse, bottom bar is a slim floating pill, Admin removed from top nav (footer only), /smart-board has SoftwareApplication + Breadcrumb JSON-LD.",
  ],

  pendingTasks: [
    "PYQ depth: add batch E/F/G files (pyq-maths-e.ts ...) — ~300 questions per batch until 2000+ total; include Science/SST/English/Hindi PYQ pages later (same /pyq/<subject> pattern).",
    "PYQ content quality rule: questions must be real board-style with year+marks+answer; never pad with generated junk; never claim counts that are not true (show PYQ_TOTAL).",
    "Render deploy check after pushes (user does dashboard clicks; guide them).",
    "Firebase keys still optional/unset — teacher sync off until user provides 6 keys.",
    "Request indexing in Search Console for /pyq + /pyq/maths + chapter pages.",
    "Keep updating this handoff file + SKILL.md after every session.",
  ],

  log: [
    "2026-09-14: took over from a stalled session. Added batch D (~175 questions), board-paper redesign of chapter PYQ pages, DPR-crisp PDF rendering, hidden /ai handoff page + rule to update it after every task.",
    "2026-09-14: batch E — downloaded all 14 EduRev Class 10 Maths chapter PYQ pages, parsed 481 unique questions (MCQ options inline, assertion-reason, 2025-26 sections), merged + deduped; bank 373 -> 854. Pushed 52b916f.",
    "2026-09-14: old Google verification tags removed from site (user deleting old GSC property, switching to new email). Verification meta renders only if NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION set — paste new code or set env. Pushed edcd41b.",
    "2026-09-14: board 'web' doc kind — /smart-board?web=<https-url> frames an external page (EduRev chapter PYQs) in the doc pane with whiteboard split; write/browse toggle. Chapter pages + PYQ pages link to it for all 14 maths chapters. Note: EduRev content is FRAMED only (no X-Frame-Options), never copied; parsed bank holds only short CBSE question statements + option/result answers. Pushed c2f9a7f.",
    "2026-09-14: web doc pane layout fix (empty-state card hidden, iframe full-height) 005ba25; new GSC tag H_6j6jPhsV6M2g4OBoeK4HERmggDtoEZG8kN6YxP-E live 54f5010.",
    "2026-09-14: Smart Board overhaul — light splash loader (black #0b1020 gone), text tool color swatches + bold toggle (engine o.weight), graph plotter converted to light paper theme, laser pointer glow-pulse, bottom bar slim floating pill, Admin link removed from top nav (still in footer), /smart-board SEO: stronger metadata + SoftwareApplication + BreadcrumbList JSON-LD. Pushed 559b584.",
    "2026-09-14: EduRev clean-reader — /api/web-proxy streams edurev.in HTML through our origin and injects CSS+JS to remove sign-in buttons, login/OTP modals and sticky auth bars (content framed, never stored). Board bg customizer (patterns + 7 swatches + custom color, persisted). Board pages duplicate/delete. Doc pane 2-finger pinch zoom + ctrl-wheel zoom. Legacy pad-page emojis removed. Pushed dade196 + cleanup commit.",
    "2026-09-15: EduRev anti-blur fix (sign-in overlay used to blur the page; now unblur sweep + backdrop-filter removal) and EduRev PYQ web-pane extended to ALL subjects via EDUREV_CHAPTERS flat-index map: Science 13, SST 22 (History/Geo/Civics/Eco), English 28 (FF prose+poetry+Footprints), Hindi 14. Verified links on chapter pages for every subject. Pushed 4b2d6ed.",
    "2026-09-15: blur root cause fixed — EduRev JS adds .blur class to .container on sign-in; proxy now strips the class + filters continuously and injects reliably despite missing </head>/</body> tags. Pushed 390f3dd.",
  ],
};
