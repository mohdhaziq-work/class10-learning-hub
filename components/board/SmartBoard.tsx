"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { BoardEngine } from "@/lib/board/engine";
import { Icon } from "@/components/ui/Icon";

/* Smart Board shell — the engine is pure TS; React only mounts/unmounts it.
   UI prefs (labels / compact / toolbar side) persist in localStorage. */
export default function SmartBoard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();

  useEffect(() => {
    if (!rootRef.current) return;
    const pdf = params.get("pdf");
    const engine = new BoardEngine(rootRef.current, {
      layout: params.get("layout") || undefined,
      bg: params.get("bg") || undefined,
      pdfUrl: pdf ? `/api/pdf?u=${encodeURIComponent(pdf)}` : undefined,
      pdfName: params.get("name") || undefined,
    });
    return () => engine.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- settings (pure UI prefs) ---- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ls = localStorage;
    const apply = () => {
      root.classList.toggle("sb-nolabels", ls.getItem("sb.labels") === "0");
      root.classList.toggle("sb-compact", ls.getItem("sb.compact") === "1");
      root.classList.toggle("sb-railright", ls.getItem("sb.railside") === "right");
    };
    apply();
    const open = (id: string) => document.getElementById(id)?.classList.add("show");
    document.getElementById("btnSettings")?.addEventListener("click", () => open("mSettings"));
    document.getElementById("btnHelp")?.addEventListener("click", () => open("mHelp"));
    const labels = document.getElementById("setLabels") as HTMLInputElement | null;
    const compact = document.getElementById("setCompact") as HTMLInputElement | null;
    const rl = document.getElementById("setRailL");
    const rr = document.getElementById("setRailR");
    const syncSide = () => {
      const right = ls.getItem("sb.railside") === "right";
      rl?.classList.toggle("on", !right);
      rr?.classList.toggle("on", right);
    };
    if (labels) {
      labels.checked = ls.getItem("sb.labels") !== "0";
      labels.addEventListener("change", () => { ls.setItem("sb.labels", labels.checked ? "1" : "0"); apply(); });
    }
    if (compact) {
      compact.checked = ls.getItem("sb.compact") === "1";
      compact.addEventListener("change", () => { ls.setItem("sb.compact", compact.checked ? "1" : "0"); apply(); });
    }
    rl?.addEventListener("click", () => { ls.setItem("sb.railside", "left"); apply(); syncSide(); });
    rr?.addEventListener("click", () => { ls.setItem("sb.railside", "right"); apply(); syncSide(); });
    syncSide();
  }, []);

  const tool = (t: string, icon: string, label: string, title: string) => (
    <button key={t} className={`tool${t === "pen" ? " on" : ""}`} data-tool={t} title={title}>
      <Icon name={icon} size={21} /><small>{label}</small>
    </button>
  );

  return (
    <div ref={rootRef} className="sb-root" data-layout="split">

      {/* ================= TOP BAR ================= */}
      <header className="sb-top">
        <div className="sb-brand"><span className="b"><Icon name="squarePen" size={18} /></span><span>Smart Board</span></div>

        <div className="sb-group">
          <button className="sb-btn" id="btnOpen" title="Open PDF / DOCX / TXT / Image"><Icon name="folder" size={16} /> Open</button>
          <input type="file" id="fileInput" accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif,.bmp" hidden />
          <span className="sb-file" id="fileName">No file open — or drag &amp; drop</span>
          <button className="sb-btn" id="btnTemplates" title="Ready-made lesson templates — mind map, kanban, quiz, timeline"><Icon name="layoutGrid" size={16} /> Templates</button>
        </div>

        <div className="sb-group" role="group" aria-label="History">
          <button className="sb-btn" id="btnUndo" title="Undo (Ctrl+Z)"><Icon name="undo2" size={16} /></button>
          <button className="sb-btn" id="btnRedo" title="Redo (Ctrl+Y)"><Icon name="redo2" size={16} /></button>
          <button className="sb-btn" id="btnThumbs" title="Page thumbnails"><Icon name="images" size={16} /></button>
          <button className="sb-btn" id="btnReplay" title="Replay — watch the board build itself like a video"><Icon name="rotateCcw" size={16} /> Replay</button>
        </div>

        <div className="sb-group" role="group" aria-label="Zoom">
          <button className="sb-btn" id="btnZoomOut" title="Zoom out"><Icon name="minus" size={16} /></button>
          <span className="zoom-lbl" id="zoomLbl">100%</span>
          <button className="sb-btn" id="btnZoomIn" title="Zoom in"><Icon name="plus" size={16} /></button>
          <button className="sb-btn" id="btnFit" title="Fit to width"><Icon name="scan" size={16} /> Fit</button>
          <button className="sb-btn" id="btnFitBoard" title="Zoom to fit board content"><Icon name="target" size={16} /></button>
        </div>

        <div className="sb-spacer" />

        <div className="sb-group sb-seg" id="layoutGroup" title="Layout">
          <button className="sb-btn" data-layout="doc" title="Document only (1)"><Icon name="fileText" size={16} /> Doc</button>
          <button className="sb-btn on" data-layout="split" title="Doc + Board side by side (2)"><Icon name="columns2" size={16} /> Split</button>
          <button className="sb-btn" data-layout="board" title="Whiteboard only (3)"><Icon name="presentation" size={16} /> Board</button>
        </div>

        <div className="sb-group">
          <button className="sb-btn" id="btnUpload" title="Upload from your phone — scan the QR code"><Icon name="scan" size={16} /> Phone</button>
          <button className="sb-btn" id="btnWidgets" title="Timer, student picker, attendance"><Icon name="timer" size={16} /> Class</button>
          <button className="sb-btn" id="btnSave" title="Save session (auto-save is on)"><Icon name="save" size={16} /> Save</button>
          <button className="sb-btn" id="btnExport" title="Export PNG / Print / JSON"><Icon name="download" size={16} /> Export</button>
        </div>

        <div className="sb-group sb-icons">
          <button className="sb-btn" id="btnSettings" title="Settings"><Icon name="settings" size={17} /></button>
          <button className="sb-btn" id="btnHelp" title="Guide &amp; shortcuts"><Icon name="circleHelp" size={17} /></button>
          <button className="sb-btn" id="btnFull" title="Fullscreen (F)"><Icon name="maximize" size={17} /></button>
          <a className="sb-btn" href="/" title="Back to Learning Hub"><Icon name="home" size={17} /></a>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div className="sb-main">
        <aside className="sb-rail" id="rail" aria-label="Tools">
          {tool("select", "mousePointer2", "MOVE", "Select / Move (V)")}
          {tool("pan", "hand", "PAN", "Pan / Hand (H)")}
          <div className="rail-sep" />
          {tool("pen", "pencil", "PEN", "Pen (P)")}
          {tool("highlighter", "highlighter", "HIGH", "Highlighter (M)")}
          {tool("eraser", "eraser", "ERASE", "Eraser — tap an object to delete (E)")}
          <div className="rail-sep" />
          <button className="tool" id="toolShapes" title="Shapes (L/R/C...)"><Icon name="shapes" size={21} /><small>SHAPE</small></button>
          {tool("text", "type", "TEXT", "Text (T)")}
          {tool("sticky", "stickyNote", "NOTE", "Sticky note (S)")}
          <div className="rail-sep" />
          {tool("laser", "circleDot", "LASER", "Laser pointer")}
          <button className="tool" data-tool="spotlight" title="Spotlight — dim everything except where you point (O)"><Icon name="sun" size={21} /><small>SPOT</small></button>
          <button className="tool" id="toolShade" title="Screen shade — hide and reveal (quiz mode)"><Icon name="eyeOff" size={21} /><small>SHADE</small></button>
          <button className="tool" id="toolRuler" title="Ruler — drag to measure"><Icon name="ruler" size={21} /><small>RULER</small></button>
          <button className="tool" id="toolProtractor" title="Protractor — drag to measure angles, double-tap to rotate"><Icon name="protractor" size={21} /><small>ANGLE</small></button>
          <button className="tool" id="toolMath" title="Maths symbols + graph plotter"><Icon name="sigma" size={21} /><small>MATHS</small></button>
          <div className="rail-sep" />
          <button className="tool" id="toolClear" title="Clear this page/board"><Icon name="trash2" size={21} /><small>CLEAR</small></button>
        </aside>

        <div className="sb-work">
          <div id="shade" style={{ display: "none" }}>
            <div id="shadeHint">Screen hidden — drag the bar to reveal, double-tap to close</div>
            <div id="shadeHandle" title="Drag to reveal"><span /></div>
          </div>
          <div id="spotOverlay" style={{ display: "none" }} />

          <section className="pane" id="paneDoc">
            <div className="pane-head"><span className="dot" style={{ background: "#188038" }} /> Document <span className="pane-sub">teach PDFs / notes here</span></div>
            <div className="pane-body">
              <div id="docScroll">
                <div className="doc-empty" id="docEmpty">
                  <div className="big"><Icon name="folderOpen" size={44} /></div>
                  <h2>Open a file and start teaching</h2>
                  <p><b>Open</b> a file or <b>drag &amp; drop</b> it here.<br />
                  PDF (any pages) • DOCX • TXT • Images — all work.<br /><br />
                  The whiteboard is ready on the other side — drag the divider to resize.</p>
                </div>
              </div>
              <div id="thumbs" />
            </div>
          </section>

          <div id="divider" title="Drag to resize"><span className="grip" /></div>

          <section className="pane" id="paneBoard">
            <div className="pane-head"><span className="dot" style={{ background: "#1a73e8" }} /> Whiteboard <span className="pane-sub">write / solve here</span></div>
            <div className="pane-body">
              <div id="boardScroll"><canvas id="boardCanvas" /></div>
              <div id="ruler" className="measure"><div id="rulerTicks" /><div id="rulerNums" /></div>
              <div id="protractor" className="measure"><svg id="protractorSvg" width="260" height="150" /></div>
            </div>
          </section>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <footer className="sb-bottom">
        <div className="swatches" id="swatches" title="Color" />
        <div className="bb-sep" />
        <div className="bb-group">Size <input type="range" id="penSize" min={1} max={40} defaultValue={4} style={{ width: 90 }} /><b id="penSizeLbl">4</b></div>
        <div className="bb-group">Opacity <input type="range" id="penOpacity" min={10} max={100} defaultValue={100} style={{ width: 70 }} /></div>
        <div className="bb-group"><label className="chk"><input type="checkbox" id="fillChk" /> Fill</label></div>
        <div className="bb-group"><label className="chk"><input type="checkbox" id="dashChk" /> Dashed</label></div>
        <div className="bb-sep" />
        <div className="bb-group">Board&nbsp;
          <select id="bgSelect" defaultValue="graph" title="Whiteboard background">
            <option value="white">White</option>
            <option value="black">Blackboard</option>
            <option value="grid">Grid</option>
            <option value="graph">Graph (Maths)</option>
            <option value="ruled">Ruled</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>
        <div className="page-ctl">
          <button className="sb-btn" id="btnBoardPrev" title="Previous board page ( [ )"><Icon name="chevronLeft" size={16} /></button>
          <span className="pg" id="boardPgLbl" title="Whiteboard pages">Board 1/1</span>
          <button className="sb-btn" id="btnBoardNext" title="Next board page ( ] )"><Icon name="chevronRight" size={16} /></button>
          <button className="sb-btn" id="btnBoardAdd" title="Add a new board page"><Icon name="plus" size={16} /></button>
          <span className="pg" id="targetLbl" style={{ minWidth: "auto" }}>Board</span>
          <button className="sb-btn" id="pgPrev" title="Previous page (←)"><Icon name="chevronLeft" size={16} /></button>
          <span className="pg" id="pgLbl">– / –</span>
          <button className="sb-btn" id="pgNext" title="Next page (→)"><Icon name="chevronRight" size={16} /></button>
        </div>
      </footer>

      {/* ================= POPOVERS ================= */}
      <div className="pop" id="shapePop">
        <h5>Choose a shape</h5>
        <div className="shape-grid" id="shapeGrid">
          <button data-shape="line" title="Line (L)"><Icon name="minus" size={20} /></button>
          <button data-shape="arrow" title="Arrow (A)"><Icon name="arrowRight" size={20} /></button>
          <button data-shape="rect" title="Rectangle (R)"><Icon name="square" size={20} /></button>
          <button data-shape="roundRect" title="Rounded rect"><Icon name="roundedSquare" size={20} /></button>
          <button data-shape="circle" title="Circle (C)"><Icon name="circle" size={20} /></button>
          <button data-shape="ellipse" title="Ellipse"><Icon name="ellipse" size={20} /></button>
          <button data-shape="triangle" title="Triangle"><Icon name="triangle" size={20} /></button>
          <button data-shape="diamond" title="Diamond"><Icon name="diamond" size={20} /></button>
          <button data-shape="star" title="Star"><Icon name="star" size={20} /></button>
          <button data-shape="tick" title="Tick"><Icon name="check" size={20} /></button>
          <button data-shape="cross" title="Cross"><Icon name="x" size={20} /></button>
          <button data-shape="bracket" title="Curly bracket" style={{ fontWeight: 800 }}>{"{}"}</button>
        </div>
      </div>

      <div className="pop" id="mathPop" style={{ maxWidth: 340 }}>
        <h5>Maths symbols — tap to write on the board</h5>
        <div className="math-syms" id="mathSyms" />
        <div className="mrow">
          <button className="mbtn primary" id="btnGraph"><Icon name="activity" size={17} /> Graph plotter (y = f(x))</button>
          <button className="mbtn" id="btnCalc"><Icon name="sigma" size={17} /> Calculator</button>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <div className="modal" id="mText"><div className="modal-card">
        <h2><Icon name="type" size={22} /> Write text</h2><p>First tap where you want to write on the board/PDF, then type here.</p>
        <textarea id="textInput" placeholder="Type here… use the symbols below for maths" />
        <div className="math-syms" id="textSyms" style={{ marginTop: 10 }} />
        <label>Size</label><input type="range" id="textSize" min={14} max={120} defaultValue={34} />
        <div className="mrow"><button className="mbtn" data-close="1">Cancel</button><button className="mbtn primary" id="textOk"><Icon name="check" size={17} /> Add</button></div>
      </div></div>

      <div className="modal" id="mSticky"><div className="modal-card">
        <h2><Icon name="stickyNote" size={22} /> Sticky note</h2><p>An important point, homework, or a reminder — pick a color.</p>
        <textarea id="stickyInput" placeholder="Write the note…" />
        <label>Color</label>
        <div className="swatches" id="stickyColors" style={{ marginTop: 6 }} />
        <div className="mrow"><button className="mbtn" data-close="1">Cancel</button><button className="mbtn primary" id="stickyOk"><Icon name="check" size={17} /> Stick</button></div>
      </div></div>

      <div className="modal" id="mGraph"><div className="modal-card" style={{ maxWidth: 640 }}>
        <h2><Icon name="activity" size={22} /> Graph Plotter — y = f(x)</h2>
        <p>Write a function (use x). Examples: <b>x*x</b>, <b>2*x+3</b>, <b>Math.sin(x)</b>, <b>Math.sqrt(x)</b></p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input type="text" id="graphFn" defaultValue="x*x - 4" style={{ flex: 2, minWidth: 180 }} />
          <select id="graphColor">
            <option value="#22c55e">Green</option><option value="#ef4444">Red</option>
            <option value="#3b82f6">Blue</option><option value="#f59e0b">Orange</option>
          </select>
          <button className="mbtn primary" id="graphPlot" style={{ flex: 1 }}>Plot</button>
        </div>
        <div style={{ marginTop: 12 }}><canvas id="graphCanvas" width={560} height={360} /></div>
        <div className="mrow"><button className="mbtn" data-close="1">Close</button><button className="mbtn primary" id="graphToBoard"><Icon name="pin" size={17} /> Send to board</button></div>
      </div></div>

      <div className="modal" id="mClass"><div className="modal-card">
        <h2><Icon name="timer" size={22} /> Class Tools</h2><p>Timer, random student picker, attendance — all in one place.</p>
        <div className="set-seg" style={{ marginBottom: 12 }}>
          <button className="on" id="tabTimer"><Icon name="timer" size={16} /> Timer</button>
          <button id="tabPicker"><Icon name="dices" size={16} /> Picker</button>
          <button id="tabAtt"><Icon name="listChecks" size={16} /> Attendance</button>
          <button id="tabFun"><Icon name="dices" size={16} /> Fun</button>
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
          <div id="pickerName"><Icon name="dices" size={28} /> ?</div>
          <textarea id="pickerList" placeholder="Class names — one per line (write once, it stays saved)" />
          <div className="mrow"><button className="mbtn primary" id="pickerGo">Pick a student!</button></div>
        </div>
        <div id="paneAtt" style={{ display: "none" }}>
          <div className="mrow" style={{ marginTop: 0 }}><button className="mbtn" id="attAll"><Icon name="check" size={17} /> All present</button><button className="mbtn" id="attNone">Reset</button></div>
          <div className="att-list" id="attList" />
          <p id="attCount" style={{ marginTop: 10 }} />
        </div>
        <div id="paneFun" style={{ display: "none" }}>
          <h5 className="set-head">Dice</h5>
          <div className="dice-row"><div className="die" id="die1">1</div><div className="die" id="die2">1</div></div>
          <div className="mrow"><button className="mbtn primary" id="btnDice"><Icon name="dices" size={16} /> Roll dice</button></div>
          <h5 className="set-head">Spinner — uses the picker name list</h5>
          <div className="spin-wrap"><canvas id="spinCanvas" width={240} height={240} /></div>
          <div className="mrow"><button className="mbtn primary" id="btnSpin">Spin</button></div>
          <h5 className="set-head">Scoreboard</h5>
          <div className="score-grid">
            <div className="score-card"><b id="scA">0</b><span>Team A</span>
              <div className="sc-btns"><button id="scAminus">−1</button><button id="scAplus">+1</button></div></div>
            <div className="score-card"><b id="scB">0</b><span>Team B</span>
              <div className="sc-btns"><button id="scBminus">−1</button><button id="scBplus">+1</button></div></div>
          </div>
          <div className="mrow"><button className="mbtn" id="scReset">Reset scores</button></div>
        </div>
        <div className="mrow"><button className="mbtn" data-close="1">Close</button></div>
      </div></div>

      <div className="modal" id="mExport"><div className="modal-card">
        <h2><Icon name="download" size={22} /> Export / Share</h2><p>Keep the board work or print it.</p>
        <div className="mrow"><button className="mbtn primary" id="exBoardPng"><Icon name="image" size={17} /> Board → PNG image</button><button className="mbtn" id="exPagePng"><Icon name="fileText" size={17} /> This PDF page → PNG</button></div>
        <div className="mrow"><button className="mbtn" id="exJson"><Icon name="save" size={17} /> Download session (JSON)</button><button className="mbtn" id="exImportBtn"><Icon name="upload" size={17} /> Open session (JSON)</button><input type="file" id="exImport" accept=".json" hidden /></div>
        <div className="mrow"><button className="mbtn" id="exPrint"><Icon name="printer" size={17} /> Print</button><button className="mbtn danger" id="exWipe"><Icon name="trash2" size={17} /> Delete everything</button></div>
        <div className="mrow"><button className="mbtn" data-close="1">Close</button></div>
      </div></div>

      <div className="modal" id="mUpload"><div className="modal-card" style={{ maxWidth: 620 }}>
        <h2><Icon name="scan" size={22} /> Upload from Phone</h2>
        <p>Scan the code with your phone camera, pick any file — PDF, image, video, audio, document — and it opens here automatically.</p>
        <div className="up-flex">
          <canvas id="qrCanvas" width={220} height={220} />
          <div className="up-side">
            <label>Link (same as the code)</label>
            <div className="up-url" id="upUrl">…</div>
            <div className="up-code" id="upCode">…</div>
            <div className="up-status" id="upStatus">Waiting…</div>
          </div>
        </div>
        <label>Received files (tap to open)</label>
        <div className="up-list" id="upList"><div className="up-empty">No files yet — upload from your phone.</div></div>
        <div className="mrow"><button className="mbtn primary" id="upDone">Done</button></div>
      </div></div>

      {/* ---- NEW: settings ---- */}
      <div className="modal" id="mSettings"><div className="modal-card">
        <h2><Icon name="settings" size={22} /> Settings</h2><p>Make the board yours — changes apply instantly and stay saved on this device.</p>

        <h5 className="set-head">Appearance</h5>
        <div className="set-row">
          <span>Tool labels <span className="hint">small captions under the tools</span></span>
          <input type="checkbox" className="switch" id="setLabels" defaultChecked />
        </div>
        <div className="set-row">
          <span>Compact tools <span className="hint">smaller tool buttons, more canvas</span></span>
          <input type="checkbox" className="switch" id="setCompact" />
        </div>
        <div className="set-row">
          <span>Toolbar side <span className="hint">left for right-handed, right for left-handed</span></span>
          <div className="set-seg"><button id="setRailL" className="on">Left</button><button id="setRailR">Right</button></div>
        </div>

        <h5 className="set-head">Board &amp; data</h5>
        <div className="set-row"><span>Board background <span className="hint">switch in the bottom bar</span></span><Icon name="layoutGrid" size={17} /></div>
        <div className="set-row"><span>Auto-save <span className="hint">every change is saved on this device</span></span><span className="badge-on"><Icon name="check" size={13} /> ON</span></div>
        <div className="set-row"><span>Export / backup <span className="hint">PNG, print, session JSON</span></span><Icon name="download" size={17} /></div>

        <h5 className="set-head">Shortcuts</h5>
        <div className="kbd-row" style={{ fontSize: 13.5 }}>
          <span><kbd>V</kbd> select · <kbd>P</kbd> pen</span>
          <span><kbd>M</kbd> highlighter · <kbd>E</kbd> eraser</span>
          <span><kbd>T</kbd> text · <kbd>L</kbd> line</span>
          <span><kbd>R</kbd> rect · <kbd>C</kbd> circle</span>
          <span><kbd>F</kbd> fullscreen · <kbd>←</kbd><kbd>→</kbd> pages</span>
          <span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> layouts</span>
        </div>

        <div className="mrow"><button className="mbtn primary" data-close="1"><Icon name="check" size={17} /> Done</button></div>
      </div></div>

      <div className="modal" id="mHelp"><div className="modal-card">
        <h2><Icon name="circleHelp" size={22} /> Smart Board Guide</h2>
        <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
          <p><b>Open</b> to load a PDF / DOCX / image, or drag-drop it</p>
          <p>In <b>Split</b>, PDF on one side and board on the other — drag the divider</p>
          <p>Write with pen / highlighter • <b>Shapes</b> has line, arrow, circle, star, tick</p>
          <p><b>Maths</b> button: symbols + graph plotter</p>
          <p>Everything <b>auto-saves</b> — open tomorrow and it is still there</p>
        </div>
        <h5 style={{ marginTop: 14 }}>Shortcuts</h5>
        <div className="kbd-row" style={{ fontSize: 13.5 }}>
          <span><kbd>V</kbd> select · <kbd>P</kbd> pen</span>
          <span><kbd>M</kbd> highlighter · <kbd>E</kbd> eraser</span>
          <span><kbd>T</kbd> text · <kbd>L</kbd> line</span>
          <span><kbd>R</kbd> rect · <kbd>C</kbd> circle</span>
          <span><kbd>F</kbd> fullscreen · <kbd>←</kbd><kbd>→</kbd> pages</span>
        </div>
        <div className="mrow"><button className="mbtn primary" data-close="1"><Icon name="check" size={17} /> Got it</button></div>
      </div></div>

      <div className="modal" id="mReplay"><div className="modal-card">
        <h2><Icon name="rotateCcw" size={22} /> Board Replay</h2>
        <p>Scrub or play through everything on this board page — object by object, like a video of the lesson.</p>
        <input type="range" id="replaySlider" min={0} defaultValue={0} style={{ width: "100%" }} />
        <div className="replay-row">
          <button className="mbtn primary" id="replayPlay">Play</button>
          <select id="replaySpeed" title="Speed" defaultValue={14}>
            <option value={6}>Slow</option>
            <option value={14}>Normal</option>
            <option value={30}>Fast</option>
          </select>
          <span className="pg" id="replayPos">0 / 0</span>
        </div>
        <div className="mrow"><button className="mbtn" id="replayClose">Close</button></div>
      </div></div>

      <div className="modal" id="mCalc"><div className="modal-card" style={{ maxWidth: 330 }}>
        <h2><Icon name="sigma" size={22} /> Calculator</h2>
        <div className="calc-out" id="calcOut">0</div>
        <div className="calc-grid" id="calcGrid">
          {["C", "(", ")", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "DEL", "="].map((k) => (
            <button key={k} data-k={k}>{k}</button>
          ))}
        </div>
      </div></div>

      <div className="modal" id="mTemplates"><div className="modal-card" style={{ maxWidth: 620 }}>
        <h2><Icon name="layoutGrid" size={22} /> Templates</h2>
        <p>One click adds a ready-made layout to the board — then edit anything freely.</p>
        <div className="tpl-grid" id="tplGrid">
          <button data-tpl="mindmap"><span className="ti"><Icon name="brain" size={17} /></span><b>Mind Map</b><span>Central idea + 4 branches with connectors</span></button>
          <button data-tpl="lesson"><span className="ti"><Icon name="notebookPen" size={17} /></span><b>Lesson Plan</b><span>Objective to homework in 5 steps</span></button>
          <button data-tpl="kanban"><span className="ti"><Icon name="columns2" size={17} /></span><b>Kanban Board</b><span>To do / Doing / Done columns</span></button>
          <button data-tpl="quiz"><span className="ti"><Icon name="puzzle" size={17} /></span><b>Quiz Time</b><span>3 question cards for class polls</span></button>
          <button data-tpl="timeline"><span className="ti"><Icon name="clock" size={17} /></span><b>Timeline</b><span>6 event points on one line</span></button>
          <button data-tpl="vocab"><span className="ti"><Icon name="languages" size={17} /></span><b>Vocabulary Bank</b><span>Word + meaning grid</span></button>
          <button data-tpl="checklist"><span className="ti"><Icon name="listChecks" size={17} /></span><b>Checklist</b><span>8 tick-box rows for revision</span></button>
          <button data-tpl="planner"><span className="ti"><Icon name="calendar" size={17} /></span><b>Weekly Planner</b><span>Mon to Sun columns</span></button>
        </div>
      </div></div>

      <div className="sb-toast" id="sbToast" />
      <div id="laser" />
    </div>
  );
}
