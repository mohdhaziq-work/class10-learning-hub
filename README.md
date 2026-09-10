# 🎓 Class 10 Learning Hub + Smart Board v2

**Professional-grade digital classroom** — Next.js 14 + TypeScript + Tailwind + Firebase.
Class 10 ke **97 chapters** (Maths, Science, SST, English, Hindi) chapter-wise slides,
mind maps, flow charts, formulas, quizzes ke saath — **plus** ek super-advanced
**Smart Board** aur teachers ke liye **Admin content editor**.

> 💰 **Cost: ₹0** — Render free plan + Firebase free (Spark) plan. Bina Firebase ke bhi 100% chalega (local-first).

---

## ✨ Features

### 📚 Learning Hub
- 5 subjects, 97 chapters, har subject uski zaroorat ke hisaab se (Maths = formulas, no faltu flowcharts)
- Chapter tabs: 📊 Slides (fullscreen) • 🗺️ Mind Map • 🔀 Flow Chart • ⏳ Timeline • 📝 Notes • 🧮 Formulas • ✏️ Examples • 🔬 Activities • 🔤 Word Bank • ❓ Quiz • 📌 PYQs
- 🔍 Global chapter search, ✅ progress tracking (local + cloud sync), 🌙 dark mode
- SEO: metadata, sitemap.xml, robots.txt, PWA manifest

### 🖊️ Smart Board (`/smart-board`)
- 📂 PDF (unlimited pages) / DOCX / TXT / Images — Open ya drag-drop
- ↔️ Split view (PDF + whiteboard), draggable divider, 3 layouts
- ✏️ Pen, highlighter, eraser, 12 shapes, text, sticky notes, 🔴 laser pointer
- 📐 Maths: graph background, function plotter (y = f(x)), 30 symbols
- 🔍 Zoom, thumbnails, undo/redo, 💾 auto-save, PNG/Print/JSON export
- ⏱️ Timer, 🎲 student picker, ✅ attendance • 👆 touch ready • ⌨️ shortcuts

### 👨‍🏫 Admin Panel (`/admin`)
- Bina coding ke koi bhi chapter edit karo — slides, notes, formulas, quiz, PYQ, words, mindmap/flow JSON
- 💾 Save → Firebase cloud (sab devices) ya local (is device)
- 📥 Export / 📤 Import chapter JSON

### 🔌 API
- `GET /api/health` • `GET /api/syllabus` • `GET /api/content/[key]` • `POST /api/bug-report`

---

## 🚀 Render par FREE deploy

1. Ye repo GitHub par push karo (`mohdhaziq-work/class10-learning-hub`)
2. [render.com](https://render.com) → **New +** → **Web Service** → repo select
3. `render.yaml` auto-detect hoga (Node, free plan):
   - Build: `npm install && npm run build` • Start: `npm start`
4. **Create Web Service** → 3–5 min me live 🎉 (free SSL + auto-deploy)

> Pehli request par free server ~50 sec me jaagta hai (cold start) — normal hai.

## ☁️ Firebase connect (optional, free)

1. [console.firebase.google.com](https://console.firebase.google.com) → Add project (free Spark plan, Analytics OFF chalega)
2. **Build → Firestore Database** → Create database → `firestore.rules` file ka content Rules me paste → Publish
3. **Build → Authentication** → Sign-in method → **Anonymous** → Enable
4. **Project Settings → Your apps → Web app** → config values copy karo
5. Local: `.env.example` ko `.env.local` me copy karke values bharo. Render: Dashboard → Environment me same keys add karo.

## 💻 Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production check
```

## 📁 Structure

```
app/                    # Next.js App Router
  (site)/               # Header/Footer wali site: home, subjects, chapter, admin
  smart-board/          # Fullscreen board (apna layout, apni CSS)
  api/                  # health, syllabus, content/[key], bug-report
  sitemap.ts robots.ts layout.tsx globals.css
components/             # layout, home, subject, chapter, board, admin, ui
lib/
  syllabus.ts content.ts        # NCERT data (typed)
  progress.ts overrides.ts      # local-first stores + cloud sync
  firebase/             # config, db (lazy), store (best-effort)
  board/engine.ts       # Smart Board engine (framework-free TS class)
public/  firestore.rules  render.yaml
```

## ⌨️ Smart Board shortcuts

`V` select • `H` pan • `P` pen • `M` highlighter • `E` eraser • `T` text • `L/R/C/A` shapes • `Ctrl+Z/Y` undo/redo • `←/→` pages • `F` fullscreen • `1/2/3` layouts • `Del` delete

---

## 📜 License

Free for education. School/class ke liye khul kar use karo, badlo, share karo. ❤️
