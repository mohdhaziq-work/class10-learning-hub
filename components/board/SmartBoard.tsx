"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { BoardEngine } from "@/lib/board/engine";

/* Smart Board shell — engine is pure TS, React sirf mount/unmount karta hai */
export default function SmartBoard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();

  useEffect(() => {
    if (!rootRef.current) return;
    const engine = new BoardEngine(rootRef.current, {
      layout: params.get("layout") || undefined,
      bg: params.get("bg") || undefined,
    });
    return () => engine.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tool = (t: string, icon: string, label: string, title: string) => (
    <button key={t} className={`tool${t === "pen" ? " on" : ""}`} data-tool={t} title={title}>{icon}<small>{label}</small></button>
  );

  return (
    <div ref={rootRef} className="sb-root" data-layout="split">
      <header className="sb-top">
        <div className="sb-brand"><span className="b">🖊️</span><span>Smart Board</span></div>
        <div className="sb-group">
          <button className="sb-btn" id="btnOpen" title="PDF / DOCX / TXT / Image kholo">📂 Open</button>
          <input type="file" id="fileInput" accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif,.bmp" hidden />
          <span className="sb-file" id="fileName">Koi file nahi — Open dabao ya drag-drop karo</span>
        </div>
        <div className="sb-group" id="layoutGroup" title="Layout">
          <button className="sb-btn" data-layout="doc" title="Sirf document (1)">📄 Doc</button>
          <button className="sb-btn on" data-layout="split" title="Doc + Board side by side (2)">↔️ Split</button>
          <button className="sb-btn" data-layout="board" title="Sirf whiteboard (3)">📝 Board</button>
        </div>
        <div className="sb-group">
          <button className="sb-btn" id="btnUndo" title="Undo (Ctrl+Z)">↩️</button>
          <button className="sb-btn" id="btnRedo" title="Redo (Ctrl+Y)">↪️</button>
          <button className="sb-btn" id="btnThumbs" title="Page thumbnails">🖼️</button>
        </div>
        <div className="sb-group">
          <button className="sb-btn" id="btnZoomOut" title="Zoom out">➖</button>
          <span className="zoom-lbl" id="zoomLbl">100%</span>
          <button className="sb-btn" id="btnZoomIn" title="Zoom in">➕</button>
          <button className="sb-btn" id="btnFit" title="Fit to width">⛶ Fit</button>
        </div>
        <div className="sb-group">
          <button className="sb-btn" id="btnWidgets" title="Timer, student picker, attendance">⏱️ Class</button>
          <button className="sb-btn" id="btnSave" title="Session save (auto-save on)">💾 Save</button>
          <button className="sb-btn" id="btnExport" title="Export PNG / Print / JSON">📤 Export</button>
          <button className="sb-btn" id="btnFull" title="Fullscreen (F)">🖥️</button>
          <a className="sb-btn" href="/" title="Wapas Learning Hub">🏠</a>
        </div>
      </header>

      <div className="sb-main">
        <aside className="sb-rail" id="rail">
          {tool("select", "👆", "MOVE", "Select / Move (V)")}
          {tool("pan", "✋", "PAN", "Pan / Haath (H)")}
          <div className="rail-sep" />
          {tool("pen", "✏️", "PEN", "Pen (P)")}
          {tool("highlighter", "🖍️", "HIGH", "Highlighter (M)")}
          {tool("eraser", "🧽", "ERASE", "Eraser — tap object to delete (E)")}
          <div className="rail-sep" />
          <button className="tool" id="toolShapes" title="Shapes (L/R/C...)">⬛<small>SHAPE</small></button>
          {tool("text", "🔤", "TEXT", "Text (T)")}
          {tool("sticky", "📝", "NOTE", "Sticky note (S)")}
          <div className="rail-sep" />
          {tool("laser", "🔴", "LASER", "Laser pointer")}
          <button className="tool" id="toolMath" title="Maths symbols + graph plotter">📐<small>MATHS</small></button>
          <button className="tool" id="toolClear" title="Is page/board ko saaf karo">🗑️<small>CLEAR</small></button>
        </aside>

        <div className="sb-work">
          <section className="pane" id="paneDoc">
            <div className="pane-head"><span className="dot" style={{ background: "#22c55e" }} /> Document — PDF / Notes yahan padhao</div>
            <div className="pane-body">
              <div id="docScroll">
                <div className="doc-empty" id="docEmpty">
                  <div className="big">📂</div>
                  <h2>File kholo aur padhana shuru karo</h2>
                  <p><b>Open</b> dabao ya file yahan <b>drag &amp; drop</b> karo.<br />
                    PDF (kitne bhi pages) • DOCX • TXT • Images — sab chalega.<br /><br />
                    👉 Doosri side me whiteboard ready hai — divider khisak kar size badlo.</p>
                </div>
              </div>
              <div id="thumbs" />
            </div>
          </section>
          <div id="divider" title="Khisak kar size badlo">⋮⋮</div>
          <section className="pane" id="paneBoard">
            <div className="pane-head"><span className="dot" style={{ background: "#a855f7" }} /> Whiteboard — yahan likho / solve karo</div>
            <div className="pane-body">
              <div id="boardScroll"><canvas id="boardCanvas" /></div>
            </div>
          </section>
        </div>
      </div>

      <div className="pop" id="shapePop">
        <h5>Shape chuno</h5>
        <div className="shape-grid" id="shapeGrid">
          <button data-shape="line" title="Line (L)">📏</button>
          <button data-shape="arrow" title="Arrow (A)">➡️</button>
          <button data-shape="rect" title="Rectangle (R)">⬛</button>
          <button data-shape="roundRect" title="Rounded rect">▢</button>
          <button data-shape="circle" title="Circle (C)">⭕</button>
          <button data-shape="ellipse" title="Ellipse">⬭</button>
          <button data-shape="triangle" title="Triangle">🔺</button>
          <button data-shape="diamond" title="Diamond">🔷</button>
          <button data-shape="star" title="Star">⭐</button>
          <button data-shape="tick" title="Tick ✓">✅</button>
          <button data-shape="cross" title="Cross ✗">❌</button>
          <button data-shape="bracket" title="Curly bracket">｛｝</button>
        </div>
      </div>

      <div className="pop" id="mathPop" style={{ maxWidth: 340 }}>
        <h5>Maths symbols — dabao, board par likhega</h5>
        <div className="math-syms" id="mathSyms" />
        <div className="mrow">
          <button className="mbtn primary" id="btnGraph">📈 Graph plotter (y = f(x))</button>
        </div>
      </div>

      <footer className="sb-bottom">
        <div className="swatches" id="swatches" title="Rang" />
        <div className="bb-group">Size <input type="range" id="penSize" min={1} max={40} defaultValue={4} style={{ width: 90 }} /><b id="penSizeLbl">4</b></div>
        <div className="bb-group">Opacity <input type="range" id="penOpacity" min={10} max={100} defaultValue={100} style={{ width: 70 }} /></div>
        <div className="bb-group"><label style={{ display: "flex", gap: 5, alignItems: "center", cursor: "pointer" }}><input type="checkbox" id="fillChk" /> Fill</label></div>
        <div className="bb-group"><label style={{ display: "flex", gap: 5, alignItems: "center", cursor: "pointer" }}><input type="checkbox" id="dashChk" /> Dashed</label></div>
        <div className="bb-group">Board&nbsp;
          <select id="bgSelect" defaultValue="graph" title="Whiteboard background">
            <option value="white">⬜ White</option>
            <option value="black">⬛ Blackboard</option>
            <option value="grid">🔳 Grid</option>
            <option value="graph">📐 Graph (Maths)</option>
            <option value="ruled">📏 Ruled</option>
            <option value="dotted">⚫ Dotted</option>
          </select>
        </div>
        <div className="page-ctl">
          <span className="pg" id="targetLbl" style={{ minWidth: "auto" }}>🎯 Board</span>
          <button className="sb-btn" id="pgPrev" title="Previous page (←)">◀</button>
          <span className="pg" id="pgLbl">– / –</span>
          <button className="sb-btn" id="pgNext" title="Next page (→)">▶</button>
        </div>
      </footer>

      <div className="modal" id="mText"><div className="modal-card">
        <h2>🔤 Text likho</h2><p>Board/PDF par jahan likhna hai wahan pehle tap karo, phir yahan likho.</p>
        <textarea id="textInput" placeholder="Yahan likho… maths ke liye neeche symbols dabao" />
        <div className="math-syms" id="textSyms" style={{ marginTop: 10 }} />
        <label>Size</label><input type="range" id="textSize" min={14} max={120} defaultValue={34} />
        <div className="mrow"><button className="mbtn" data-close="1">Cancel</button><button className="mbtn primary" id="textOk">Add ✓</button></div>
      </div></div>

      <div className="modal" id="mSticky"><div className="modal-card">
        <h2>📝 Sticky note</h2><p>Important point, homework ya reminder — rang chuno.</p>
        <textarea id="stickyInput" placeholder="Note likho…" />
        <label>Rang</label>
        <div className="swatches" id="stickyColors" style={{ marginTop: 6 }} />
        <div className="mrow"><button className="mbtn" data-close="1">Cancel</button><button className="mbtn primary" id="stickyOk">Chipkao ✓</button></div>
      </div></div>

      <div className="modal" id="mGraph"><div className="modal-card" style={{ maxWidth: 640 }}>
        <h2>📈 Graph Plotter — y = f(x)</h2>
        <p>Function likho (x ka use karo). Examples: <b>x*x</b>, <b>2*x+3</b>, <b>Math.sin(x)</b>, <b>Math.sqrt(x)</b></p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input type="text" id="graphFn" defaultValue="x*x - 4" style={{ flex: 2, minWidth: 180 }} />
          <select id="graphColor">
            <option value="#22c55e">Green</option><option value="#ef4444">Red</option>
            <option value="#3b82f6">Blue</option><option value="#f59e0b">Orange</option>
          </select>
          <button className="mbtn primary" id="graphPlot" style={{ flex: 1 }}>Plot</button>
        </div>
        <div style={{ marginTop: 12 }}><canvas id="graphCanvas" width={560} height={360} /></div>
        <div className="mrow"><button className="mbtn" data-close="1">Band karo</button><button className="mbtn primary" id="graphToBoard">📌 Board par bhejo</button></div>
      </div></div>

      <div className="modal" id="mClass"><div className="modal-card">
        <h2>⏱️ Class Tools</h2><p>Timer, random student picker, attendance — sab ek jagah.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <button className="mbtn primary" id="tabTimer">⏱️ Timer</button>
          <button className="mbtn" id="tabPicker">🎲 Picker</button>
          <button className="mbtn" id="tabAtt">✅ Attendance</button>
        </div>
        <div id="paneTimer">
          <div id="timerFace">05:00</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="number" id="timerMin" defaultValue={5} min={1} max={120} title="Minutes" />
            <button className="mbtn primary" id="timerStart">Start</button>
            <button className="mbtn" id="timerReset">Reset</button>
          </div>
        </div>
        <div id="panePicker" style={{ display: "none" }}>
          <div id="pickerName">🎲 ?</div>
          <textarea id="pickerList" placeholder="Class ke naam — har line me ek (ek baar likho, save rahega)" />
          <div className="mrow"><button className="mbtn primary" id="pickerGo">Pick student!</button></div>
        </div>
        <div id="paneAtt" style={{ display: "none" }}>
          <div className="mrow" style={{ marginTop: 0 }}><button className="mbtn" id="attAll">Sab present ✓</button><button className="mbtn" id="attNone">Reset</button></div>
          <div className="att-list" id="attList" />
          <p id="attCount" style={{ marginTop: 10 }} />
        </div>
        <div className="mrow"><button className="mbtn" data-close="1">Band karo</button></div>
      </div></div>

      <div className="modal" id="mExport"><div className="modal-card">
        <h2>📤 Export / Share</h2><p>Board ka kaam save rakho ya print karo.</p>
        <div className="mrow"><button className="mbtn primary" id="exBoardPng">📝 Board → PNG image</button><button className="mbtn" id="exPagePng">📄 Is PDF page → PNG</button></div>
        <div className="mrow"><button className="mbtn" id="exJson">💾 Session download (JSON)</button><button className="mbtn" id="exImportBtn">📥 Session kholo (JSON)</button><input type="file" id="exImport" accept=".json" hidden /></div>
        <div className="mrow"><button className="mbtn" id="exPrint">🖨️ Print</button><button className="mbtn danger" id="exWipe">🗑️ Sab kuch delete</button></div>
        <div className="mrow"><button className="mbtn" data-close="1">Band karo</button></div>
      </div></div>

      <div className="modal" id="mHelp"><div className="modal-card">
        <h2>❓ Smart Board Guide</h2>
        <p>• <b>Open</b> se PDF/DOCX/Image kholo ya drag-drop karo<br />
          • <b>Split</b> me ek side PDF, ek side board — divider khisako<br />
          • Pen/Highlighter se likho • <b>Shapes</b> me line, arrow, circle, star, tick…<br />
          • <b>Maths</b> button: symbols + graph plotter<br />
          • <b>Undo/Redo</b>, zoom, thumbnails, laser pointer<br />
          • Sab <b>auto-save</b> hota hai — kal wapas kholo to milega<br />
          • Shortcuts: V select, P pen, M highlighter, E eraser, T text, L line, R rect, C circle, F fullscreen, ←/→ pages</p>
        <div className="mrow"><button className="mbtn primary" data-close="1">Samajh gaya ✓</button></div>
      </div></div>

      <div className="sb-toast" id="sbToast" />
      <div id="laser" />
    </div>
  );
}
