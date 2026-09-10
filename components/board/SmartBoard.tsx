"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { BoardEngine } from "@/lib/board/engine";
import { Icon } from "@/components/ui/Icon";

/* Smart Board shell — the engine is pure TS; React only mounts/unmounts it */
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
    <button key={t} className={`tool${t === "pen" ? " on" : ""}`} data-tool={t} title={title}>
      <Icon name={icon} size={21} /><small>{label}</small>
    </button>
  );

  return (
    <div ref={rootRef} className="sb-root" data-layout="split">
      <header className="sb-top">
        <div className="sb-brand"><span className="b"><Icon name="squarePen" size={19} /></span><span>Smart Board</span></div>
        <div className="sb-group">
          <button className="sb-btn" id="btnOpen" title="Open PDF / DOCX / TXT / Image"><Icon name="folder" size={17} /> Open</button>
          <input type="file" id="fileInput" accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif,.bmp" hidden />
          <span className="sb-file" id="fileName">No file — press Open or drag &amp; drop</span>
        </div>
        <div className="sb-group" id="layoutGroup" title="Layout">
          <button className="sb-btn" data-layout="doc" title="Document only (1)"><Icon name="fileText" size={17} /> Doc</button>
          <button className="sb-btn on" data-layout="split" title="Doc + Board side by side (2)"><Icon name="columns2" size={17} /> Split</button>
          <button className="sb-btn" data-layout="board" title="Whiteboard only (3)"><Icon name="presentation" size={17} /> Board</button>
        </div>
        <div className="sb-group">
          <button className="sb-btn" id="btnUndo" title="Undo (Ctrl+Z)"><Icon name="undo2" size={17} /></button>
          <button className="sb-btn" id="btnRedo" title="Redo (Ctrl+Y)"><Icon name="redo2" size={17} /></button>
          <button className="sb-btn" id="btnThumbs" title="Page thumbnails"><Icon name="images" size={17} /></button>
        </div>
        <div className="sb-group">
          <button className="sb-btn" id="btnZoomOut" title="Zoom out"><Icon name="minus" size={17} /></button>
          <span className="zoom-lbl" id="zoomLbl">100%</span>
          <button className="sb-btn" id="btnZoomIn" title="Zoom in"><Icon name="plus" size={17} /></button>
          <button className="sb-btn" id="btnFit" title="Fit to width"><Icon name="scan" size={17} /> Fit</button>
        </div>
        <div className="sb-group">
          <button className="sb-btn" id="btnWidgets" title="Timer, student picker, attendance"><Icon name="timer" size={17} /> Class</button>
          <button className="sb-btn" id="btnSave" title="Save session (auto-save on)"><Icon name="save" size={17} /> Save</button>
          <button className="sb-btn" id="btnExport" title="Export PNG / Print / JSON"><Icon name="download" size={17} /> Export</button>
          <button className="sb-btn" id="btnFull" title="Fullscreen (F)"><Icon name="maximize" size={17} /></button>
          <a className="sb-btn" href="/" title="Back to Learning Hub"><Icon name="home" size={17} /></a>
        </div>
      </header>

      <div className="sb-main">
        <aside className="sb-rail" id="rail">
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
          <button className="tool" id="toolMath" title="Maths symbols + graph plotter"><Icon name="sigma" size={21} /><small>MATHS</small></button>
          <button className="tool" id="toolClear" title="Clear this page/board"><Icon name="trash2" size={21} /><small>CLEAR</small></button>
        </aside>

        <div className="sb-work">
          <section className="pane" id="paneDoc">
            <div className="pane-head"><span className="dot" style={{ background: "#22c55e" }} /> Document — teach PDFs / notes here</div>
            <div className="pane-body">
              <div id="docScroll">
                <div className="doc-empty" id="docEmpty">
                  <div className="big"><Icon name="folderOpen" size={46} /></div>
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
            <div className="pane-head"><span className="dot" style={{ background: "#a855f7" }} /> Whiteboard — write / solve here</div>
            <div className="pane-body">
              <div id="boardScroll"><canvas id="boardCanvas" /></div>
            </div>
          </section>
        </div>
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
        </div>
      </div>

      <div className="pop" id="mathPop" style={{ maxWidth: 340 }}>
        <h5>Maths symbols — tap to write on the board</h5>
        <div className="math-syms" id="mathSyms" />
        <div className="mrow">
          <button className="mbtn primary" id="btnGraph"><Icon name="activity" size={17} /> Graph plotter (y = f(x))</button>
        </div>
      </div>

      <footer className="sb-bottom">
        <div className="swatches" id="swatches" title="Color" />
        <div className="bb-group">Size <input type="range" id="penSize" min={1} max={40} defaultValue={4} style={{ width: 90 }} /><b id="penSizeLbl">4</b></div>
        <div className="bb-group">Opacity <input type="range" id="penOpacity" min={10} max={100} defaultValue={100} style={{ width: 70 }} /></div>
        <div className="bb-group"><label style={{ display: "flex", gap: 5, alignItems: "center", cursor: "pointer" }}><input type="checkbox" id="fillChk" /> Fill</label></div>
        <div className="bb-group"><label style={{ display: "flex", gap: 5, alignItems: "center", cursor: "pointer" }}><input type="checkbox" id="dashChk" /> Dashed</label></div>
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
          <span className="pg" id="targetLbl" style={{ minWidth: "auto" }}>Board</span>
          <button className="sb-btn" id="pgPrev" title="Previous page (←)"><Icon name="chevronLeft" size={17} /></button>
          <span className="pg" id="pgLbl">– / –</span>
          <button className="sb-btn" id="pgNext" title="Next page (→)"><Icon name="chevronRight" size={17} /></button>
        </div>
      </footer>

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
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <button className="mbtn primary" id="tabTimer"><Icon name="timer" size={17} /> Timer</button>
          <button className="mbtn" id="tabPicker"><Icon name="dices" size={17} /> Picker</button>
          <button className="mbtn" id="tabAtt"><Icon name="listChecks" size={17} /> Attendance</button>
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
        <div className="mrow"><button className="mbtn" data-close="1">Close</button></div>
      </div></div>

      <div className="modal" id="mExport"><div className="modal-card">
        <h2><Icon name="download" size={22} /> Export / Share</h2><p>Keep the board work or print it.</p>
        <div className="mrow"><button className="mbtn primary" id="exBoardPng"><Icon name="image" size={17} /> Board → PNG image</button><button className="mbtn" id="exPagePng"><Icon name="fileText" size={17} /> This PDF page → PNG</button></div>
        <div className="mrow"><button className="mbtn" id="exJson"><Icon name="save" size={17} /> Download session (JSON)</button><button className="mbtn" id="exImportBtn"><Icon name="upload" size={17} /> Open session (JSON)</button><input type="file" id="exImport" accept=".json" hidden /></div>
        <div className="mrow"><button className="mbtn" id="exPrint"><Icon name="printer" size={17} /> Print</button><button className="mbtn danger" id="exWipe"><Icon name="trash2" size={17} /> Delete everything</button></div>
        <div className="mrow"><button className="mbtn" data-close="1">Close</button></div>
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

      <div className="sb-toast" id="sbToast" />
      <div id="laser" />
    </div>
  );
}
