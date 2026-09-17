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
    const web = params.get("web");
    /* internal site PDFs (e.g. /api/pyq/pdf) load directly; external NCERT URLs go through the proxy */
    const pdfUrl = pdf ? (pdf.startsWith("/") ? pdf : `/api/pdf?u=${encodeURIComponent(pdf)}`) : undefined;
    const webUrl = web && /^https:\/\//.test(web) ? web : undefined;
    const engine = new BoardEngine(rootRef.current, {
      layout: params.get("layout") || undefined,
      bg: params.get("bg") || undefined,
      pdfUrl,
      pdfName: params.get("name") || undefined,
      webUrl,
      webName: params.get("name") || undefined,
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

  /* Viewport zoom isolation: block browser pinch / ctrl-wheel page zoom so the
     board owns all gestures (canvas pan-zoom still works inside the engine). */
  useEffect(() => {
    const wheel = (e: WheelEvent) => { if (e.ctrlKey) e.preventDefault(); };
    const touch = (e: TouchEvent) => { if (e.touches.length > 1) e.preventDefault(); };
    const gest = (e: Event) => e.preventDefault();
    document.addEventListener("wheel", wheel, { passive: false });
    document.addEventListener("touchstart", touch, { passive: false });
    document.addEventListener("gesturestart", gest);
    document.addEventListener("gesturechange", gest);
    return () => {
      document.removeEventListener("wheel", wheel);
      document.removeEventListener("touchstart", touch);
      document.removeEventListener("gesturestart", gest);
      document.removeEventListener("gesturechange", gest);
    };
  }, []);

  const tool = (t: string, icon: string, label: string, title: string) => (
    <button key={t} className={`tool${t === "pen" ? " on" : ""}`} data-tool={t} title={title}>
      <Icon name={icon} size={21} /><small>{label}</small>
    </button>
  );

  return (
    <div ref={rootRef} className="sb-root" data-layout="split">
      <div id="latencyHud" className="lat-hud" hidden><span id="latText" /> <small>input: OS to JS | draw: JS to canvas | est adds one display frame</small></div>
      <div id="recPill" className="rec-pill" hidden><span className="rec-dot" /><span id="recTime">00:00</span><button id="btnRecStop">Stop</button></div>

      {/* hidden file input (opened from Files / empty pane) */}
      <input type="file" id="fileInput" accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif,.bmp" hidden />

      {/* ================= MAIN ================= */}
      <aside className="sb-side">
        <a href="/" title="Back to Learning Hub"><Icon name="home" size={17} /></a>
        <button id="btnSettings" title="Settings"><Icon name="settings" size={17} /></button>
        <button id="btnHelp" title="Guide &amp; shortcuts"><Icon name="circleHelp" size={17} /></button>
        <button id="btnFull" title="Fullscreen (F)"><Icon name="maximize" size={17} /></button>
      </aside>

      <div className="sb-main">
        <div className="sb-work">
          <div id="shade" style={{ display: "none" }}>
            <div id="shadeHint">Screen hidden — drag the bar to reveal, double-tap to close</div>
            <div id="shadeHandle" title="Drag to reveal"><span /></div>
          </div>

          <section className="pane" id="paneDoc">
            <div className="pane-head"><span className="dot" style={{ background: "#188038" }} /> Document <span className="pane-sub" id="fileName">no file open — use Files on the left</span></div>
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
            <div className="pane-head"><span className="dot" style={{ background: "#1a73e8" }} /> Whiteboard <span className="pane-sub">write / solve here</span>
              <span className="live-chip" id="liveChip" style={{ display: "none", marginLeft: "auto" }}><span className="lc-dot" /> School Board Mode — Auto-Saving Live</span>
            </div>
            <div className="pane-body">
              <div id="boardScroll"><canvas id="boardCanvas" /><canvas id="boardLive" /><canvas id="boardFx" /><div id="brushRing" /></div>
              <div id="ruler" className="measure"><div id="rulerTicks" /><div id="rulerNums" /></div>
              <div id="protractor" className="measure">
                <svg id="protractorSvg" width="260" height="150" />
                <div className="measure-chip" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                  <input id="proAngleIn" type="number" min={0} max={359} step={15} defaultValue={0} title="Exact angle in degrees" />
                  <span>deg</span>
                  <label title="Snap rotation to 15-degree steps"><input type="checkbox" id="proSnap" defaultChecked /> 15°</label>
                </div>
              </div>
            </div>
          </section>

          <div className="zoom-float" id="zoomFloat">
            <button className="sb-btn" id="btnZoomOut" title="Zoom out"><Icon name="minus" size={15} /></button>
            <span className="zoom-lbl" id="zoomLbl">100%</span>
            <button className="sb-btn" id="btnZoomIn" title="Zoom in"><Icon name="plus" size={15} /></button>
            <button className="sb-btn" id="btnFit" title="Fit to width"><Icon name="scan" size={15} /></button>
            <button className="sb-btn" id="btnFitBoard" title="Zoom to fit board content"><Icon name="target" size={15} /></button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM DOCK — individual icon boxes, cap in the middle ================= */}
      <footer className="sb-dock">
        <div className="dock-cluster">
          <button className="tool" id="btnFiles" title="Open file / saved sessions / phone upload"><Icon name="folder" size={20} /></button>
          <button className="tool" data-tool="select" title="Select / Move (V)"><Icon name="mousePointer2" size={20} /></button>
          <button className="tool on" data-tool="pen" title="Pen — 3 tip types, any color, any size (P)">
            <Icon name="pencil" size={20} />
            <span className="tool-dot" id="penColorDot" style={{ background: "#dc2626" }} />
          </button>
          <button className="tool" data-tool="eraser" title="Eraser — stroke / pixel / area (E)"><Icon name="eraser" size={20} /></button>
        </div>

        <button className="dock-cap" id="btnMenu" title="MENU — more tools & board options"><Icon name="graduationCap" size={27} /></button>

        <div className="dock-cluster">
          <button className="tool" id="btnUndo" title="Undo (Ctrl+Z)"><Icon name="undo2" size={19} /></button>
          <button className="tool" id="btnRedo" title="Redo (Ctrl+Y)"><Icon name="redo2" size={19} /></button>
        </div>

        <div className="dock-cluster dock-minor" id="layoutGroup" title="Layout — keys 1 / 2 / 3">
          <button className="sb-btn" data-layout="doc" title="Document only (1)"><Icon name="fileText" size={15} /></button>
          <button className="sb-btn on" data-layout="split" title="Document + Board (2)"><Icon name="columns2" size={15} /></button>
          <button className="sb-btn" data-layout="board" title="Whiteboard only (3)"><Icon name="presentation" size={15} /></button>
        </div>

        <div className="dock-cluster dock-minor page-ctl">
          <button className="sb-btn" id="btnBoardPrev" title="Previous board page ( [ )"><Icon name="chevronLeft" size={16} /></button>
          <span className="pg" id="boardPgLbl" title="Whiteboard pages">Board 1/1</span>
          <button className="sb-btn" id="btnBoardNext" title="Next board page ( ] )"><Icon name="chevronRight" size={16} /></button>
          <span className="pg" id="pgLbl">– / –</span>
          <button className="sb-btn" id="pgPrev" title="Previous page"><Icon name="chevronLeft" size={16} /></button>
          <button className="sb-btn" id="pgNext" title="Next page"><Icon name="chevronRight" size={16} /></button>
        </div>

        {/* engine-bound controls kept in DOM but hidden (live in MENU) */}
        <span className="dock-hidden" aria-hidden="true">
          <button className="tool" id="btnMenuLegacy" hidden />
          <button className="tool" id="btnSave" hidden /><button className="tool" id="btnExport" hidden />
          <button className="tool" id="toolClear" hidden />
          <button className="tool" id="btnBoardAdd" hidden /><button className="tool" id="btnBoardDup" hidden />
          <button className="tool" id="btnBoardDel" hidden />
          <span className="pg" id="targetLbl" />
        </span>
      </footer>

      {/* ================= POPOVERS ================= */}
      <div className="pop tool-pop" id="penPop">
        <div className="tp-head"><h5>Pen</h5><button className="tp-x" title="Close"><Icon name="x" size={14} /></button></div>
        <div className="seg-row five" id="penKindSeg">
          <button data-kind="ball" title="Ballpoint — smooth everyday pen"><Icon name="penLine" size={16} />Ball</button>
          <button data-kind="marker" title="Marker — broad, softly translucent"><Icon name="squarePen" size={16} />Marker</button>
          <button data-kind="ink" title="Ink — calligraphy, pressure-aware"><Icon name="penTool" size={16} />Ink</button>
          <button data-kind="text" title="Text pen — your handwriting becomes typed computer text"><Icon name="type" size={16} />Text</button>
          <button data-kind="shape" title="Shape pen — rough drawings snap into perfect shapes"><Icon name="shapes" size={16} />Shape</button>
        </div>
        <p className="tp-hint" id="penKindHint" />
        <h5>Color</h5>
        <div className="color-grid" id="penColorGrid" />
        <div className="custom-row">
          <label className="custom-sw" title="Pick any custom color"><input type="color" id="penCustom" defaultValue="#dc2626" /><Icon name="plus" size={13} /></label>
          <input type="text" id="penHex" defaultValue="#dc2626" maxLength={7} spellCheck={false} />
        </div>
        <div className="recent-row" id="penRecents" style={{ display: "none" }} />
        <h5>Size <b id="penSizeVal">4</b></h5>
        <div className="size-row" id="penSizes">
          <button data-s={2} title="Hairline"><span style={{ width: 4, height: 4 }} /></button>
          <button data-s={5} title="Fine"><span style={{ width: 7, height: 7 }} /></button>
          <button data-s={9} title="Medium"><span style={{ width: 11, height: 11 }} /></button>
          <button data-s={16} title="Bold"><span style={{ width: 16, height: 16 }} /></button>
          <button data-s={28} title="Chalk"><span style={{ width: 22, height: 22 }} /></button>
        </div>
        <input type="range" id="penSizeRange" min={1} max={40} defaultValue={4} />
        <canvas id="penPreview" width={472} height={76} />
      </div>

      <div className="pop tool-pop" id="hlPop">
        <div className="tp-head"><h5>Highlighter</h5><button className="tp-x" title="Close"><Icon name="x" size={14} /></button></div>
        <h5>Color</h5>
        <div className="color-grid" id="hlColorGrid" />
        <h5>Width</h5>
        <div className="size-row" id="hlSizes">
          <button data-s={12} title="Thin"><span style={{ width: 6, height: 6 }} /></button>
          <button data-s={20} title="Medium"><span style={{ width: 10, height: 10 }} /></button>
          <button data-s={30} title="Wide"><span style={{ width: 15, height: 15 }} /></button>
          <button data-s={44} title="Extra wide"><span style={{ width: 21, height: 21 }} /></button>
        </div>
        <canvas id="hlPreview" width={472} height={76} />
      </div>

      <div className="pop tool-pop" id="eraserPop">
        <div className="tp-head"><h5>Eraser</h5><button className="tp-x" title="Close"><Icon name="x" size={14} /></button></div>
        <div className="seg-row" id="eraserModeSeg">
          <button data-mode="stroke" title="Tap an object — the whole thing is deleted"><Icon name="slash" size={17} />Stroke</button>
          <button data-mode="pixel" title="Rub to erase exactly where you touch"><Icon name="eraser" size={17} />Pixel</button>
          <button data-mode="area" title="Draw any loop — circle, square, any shape — everything inside is erased"><Icon name="circle" size={17} />Lasso</button>
        </div>
        <h5>Size</h5>
        <div className="size-row" id="eraserSizes">
          <button data-s={12} title="Small"><span style={{ width: 6, height: 6 }} /></button>
          <button data-s={28} title="Medium"><span style={{ width: 11, height: 11 }} /></button>
          <button data-s={56} title="Large"><span style={{ width: 17, height: 17 }} /></button>
          <button data-s={100} title="Huge"><span style={{ width: 23, height: 23 }} /></button>
        </div>
        <p className="tp-hint" id="eraserHint" />
      </div>

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
          <button data-shape="pentagon" title="Pentagon"><Icon name="pentagon" size={20} /></button>
          <button data-shape="hexagon" title="Hexagon"><Icon name="hexagon" size={20} /></button>
          <button data-shape="semicircle" title="Semicircle"><Icon name="semicircle" size={20} /></button>
          <button data-shape="cube" title="Cube (3D)"><Icon name="box" size={20} /></button>
          <button data-shape="cylinder" title="Cylinder (3D)"><Icon name="cylinder" size={20} /></button>
          <button data-shape="cone" title="Cone (3D)"><Icon name="cone" size={20} /></button>
          <button data-shape="sphere" title="Sphere (3D)"><Icon name="sphere" size={20} /></button>
        </div>
        <h5 style={{ marginTop: 12 }}>Color &amp; style</h5>
        <div className="color-grid ten" id="shapeColorGrid" />
        <div className="tp-inline">
          <input type="range" id="shapeSize" min={1} max={20} defaultValue={4} title="Thickness" />
          <label className="chk"><input type="checkbox" id="fillChk" /> Fill</label>
          <label className="chk"><input type="checkbox" id="dashChk" /> Dash</label>
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
      <div className="pop" id="menuPop">
        <h5>More tools</h5>
        <div className="menu-grid">
          {tool("pan", "hand", "PAN", "Pan / Hand (H)")}
          {tool("highlighter", "highlighter", "HIGH", "Highlighter — colors & width (M)")}
          <button className="tool" id="toolShapes" title="Advanced shapes — 2D + 3D"><Icon name="shapes" size={20} /><small>SHAPE</small></button>
          {tool("text", "type", "TEXT", "Text (T)")}
          {tool("sticky", "stickyNote", "NOTE", "Sticky note (S)")}
          <button className="tool" id="toolMath" title="Maths symbols + graph plotter"><Icon name="sigma" size={20} /><small>MATHS</small></button>
          <button className="tool" id="toolRuler" title="Ruler — drag, wheel to rotate, edge to resize"><Icon name="ruler" size={20} /><small>SCALE</small></button>
          <button className="tool" id="toolProtractor" title="Protractor — precise angles, 15-degree snap"><Icon name="protractor" size={20} /><small>ANGLE</small></button>
          <button className="tool" id="toolShade" title="Screen shade — hide and reveal (quiz mode)"><Icon name="eyeOff" size={20} /><small>SHADE</small></button>
          <button className="tool" id="btnThumbs" title="Page thumbnails"><Icon name="images" size={20} /><small>PAGES</small></button>
          <button className="tool" id="btnTemplates" title="Ready-made lesson templates"><Icon name="layoutGrid" size={20} /><small>TEMPL</small></button>
          <button className="tool" id="btnReplay" title="Replay — watch the board build itself"><Icon name="rotateCcw" size={20} /><small>REPLAY</small></button>
          <button className="tool" id="btnWidgets" title="Class tools — timer, picker, attendance"><Icon name="timer" size={20} /><small>CLASS</small></button>
          <button className="tool" id="btnPad" title="Phone Pad — phone as writing tablet"><Icon name="smartphone" size={20} /><small>PAD</small></button>
          <button className="tool" id="btnLatency" style={{ display: "none" }} title="Pen latency test — admin device"><Icon name="timer" size={20} /><small>SPEED</small></button>
          <button className="tool" id="btnRec" style={{ display: "none" }} title="Record the screen — admin device"><Icon name="circleDot" size={20} /><small>REC</small></button>
          <button className="mbtn" id="mExport" style={{ textAlign: "left" }}><Icon name="download" size={17} /> Export PNG / print</button>
          <button className="mbtn" id="mClear" style={{ textAlign: "left" }}><Icon name="trash2" size={17} /> Clear this page</button>
          <button className="mbtn" id="mAddPage" style={{ textAlign: "left" }}><Icon name="plus" size={17} /> Add board page</button>
          <button className="tool" id="btnRecordings" style={{ display: "none" }} title="Watch saved screen recordings — admin device"><Icon name="play" size={20} /><small>CLIPS</small></button>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <div className="modal" id="mRecordings"><div className="modal-card" style={{ maxWidth: 760 }}>
        <h2><Icon name="play" size={22} /> Screen recordings</h2>
        <p>Diagnostic clips, saved privately on this device (browser storage). Record from MENU when you need to show a problem.</p>
        <video id="recPlayer" controls playsInline style={{ width: "100%", borderRadius: 12, background: "#111", display: "none", marginTop: 12 }} />
        <div id="recShareUrl" style={{ display: "none", marginTop: 10, wordBreak: "break-all", fontFamily: "ui-monospace,Menlo,monospace", fontSize: 11.5, background: "#f1f3f4", borderRadius: 8, padding: "8px 10px", color: "#1a73e8" }} />
        <div id="recList" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
          <button className="btn-g" id="btnRecClose">Close</button>
        </div>
      </div></div>
      <div className="modal" id="mText"><div className="modal-card">
        <h2><Icon name="type" size={22} /> Write text</h2><p>First tap where you want to write on the board/PDF, then type here.</p>
        <textarea id="textInput" placeholder="Type here… use the symbols below for maths" />
        <div className="math-syms" id="textSyms" style={{ marginTop: 10 }} />
        <label>Size</label><input type="range" id="textSize" min={14} max={120} defaultValue={34} />
        <label>Color</label>
        <div className="swatches" id="textColors" style={{ marginTop: 6 }} />
        <label className="chk-row" style={{ display: "inline-flex", gap: 8, alignItems: "center", marginTop: 10 }}>
          <input type="checkbox" id="textBold" defaultChecked style={{ width: 16, height: 16, accentColor: "#1a73e8" }} /> Bold text
        </label>
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

      <div className="modal" id="mPad"><div className="modal-card" style={{ maxWidth: 520 }}>
        <h2><Icon name="smartphone" size={22} /> Phone Pad</h2>
        <p>Make your phone a <b>wireless writing tablet + touchpad</b> for this board — scan the QR with the phone. No app, no delay (peer-to-peer).</p>
        <div className="up-flex">
          <canvas id="padQr" width={220} height={220} style={{ background: "#fff", borderRadius: 14, padding: 8, border: "1px solid var(--line)" }} />
          <div className="up-side">
            <div className="up-status" id="padStatus">Waiting for phone — scan the QR…</div>
            <div className="up-code" id="padCode">…</div>
            <p style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.7, marginTop: 10, marginBottom: 0 }}>
              <b>Draw</b> — the phone pad becomes the board: likho, highlight karo, erase karo, pages palto.<br />
              <b>Cursor</b> — full touchpad: tap = click, 2 fingers = scroll, hold = drag.
            </p>
          </div>
        </div>
        <div className="mrow">
          <button className="mbtn" data-close="1">Close</button>
          <button className="mbtn danger" id="padStop">Disconnect phone</button>
        </div>
      </div></div>

      <div className="modal" id="mFiles"><div className="modal-card">
        <h2><Icon name="folder" size={22} /> Files</h2>
        <p>Open from your device or phone — <b>everything is saved on this device</b> and opens instantly next time. No re-uploading.</p>
        <div className="mrow" style={{ marginTop: 0 }}>
          <button className="mbtn primary" id="btnOpen" title="Open PDF / DOCX / TXT / image from this device"><Icon name="folder" size={17} /> Open from device</button>
          <button className="mbtn" id="btnUpload" title="Scan the QR code with your phone and send any file"><Icon name="scan" size={17} /> From phone</button>
        </div>
        <div className="mrow">
        </div>
        <label style={{ marginTop: 16 }}>Saved on this device</label>
        <div className="fl-list" id="fileList" />
        <p style={{ fontSize: 12.5, marginBottom: 0, marginTop: 10 }}>Videos and files over 60 MB are not cached.</p>
        <div className="mrow"><button className="mbtn primary" data-close="1">Close</button></div>
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

        <h5 className="set-head">Board canvas</h5>
        <label className="set-lbl">Surface style</label>
        <div className="set-seg wide" id="bgSeg">
          <select id="bgSelect" defaultValue="graph" title="Whiteboard background">
            <option value="white">Plain</option>
            <option value="black">Blackboard</option>
            <option value="grid">Grid</option>
            <option value="graph">Graph</option>
            <option value="ruled">Ruled</option>
            <option value="dotted">Dots</option>
          </select>
        </div>
        <label className="set-lbl">Canvas color</label>
        <div className="swatches" id="bgColors" style={{ display: "flex", gap: 7, flexWrap: "wrap" }} />
        <label className="set-lbl">Grid size <b id="gridVal">100%</b></label>
        <input type="range" id="gridSize" min={50} max={200} step={5} defaultValue={100} />
        <div className="set-row" style={{ marginTop: 10 }}>
          <span>Reset canvas view <span className="hint">zoom 100% and recenter</span></span>
          <button className="mbtn" id="btnCanvasReset" type="button"><Icon name="refreshCw" size={14} /> Reset</button>
        </div>

        <h5 className="set-head">Board &amp; data</h5>
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
          <p><b>Files</b> on the left rail — open from device or phone, or pick a <b>saved file</b> (no re-uploading)</p>
          <p>In <b>Split</b>, PDF on one side and board on the other — drag the divider</p>
          <p><b>Pen</b>: 3 tip types, any color, any size — tap the PEN tool to open its options • <b>Eraser</b>: stroke, pixel or area</p>
          <p><b>Shapes</b>: line, arrow, circle, star, tick — color &amp; thickness inside the shape menu</p>
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
    </div>
  );
}
