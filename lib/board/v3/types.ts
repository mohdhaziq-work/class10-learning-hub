/* ENGINE v3 — shared types.
   v3 is the clean-slate rewrite of the whiteboard core: one adaptive input
   pipeline, one layered renderer, explicit history. No desynchronized hints,
   no always-on prediction ghosts. */

export interface Pt {
  x: number;
  y: number;
  /** stylus pressure 0..1 when the hardware reports real pressure */
  w?: number;
}

export type ToolId =
  | "pen"
  | "highlighter"
  | "marker"
  | "eraser"
  | "line"
  | "arrow"
  | "rect"
  | "ellipse"
  | "text"
  | "lasso"
  | "laser";

export interface StrokeStyle {
  color: string;
  size: number;
  /** 0..100 */
  opacity: number;
  dashed?: boolean;
  fill?: boolean;
}

/** One normalized hardware sample flowing out of the input pipeline. */
export interface InputSample {
  x: number;
  y: number;
  t: number;
  pressure: number;
  pointerId: number;
  pointerType: string;
  /** sub-sample pulled from getCoalescedEvents() */
  isCoalesced: boolean;
  /** the event that triggered the batch (newest sample on many Android builds) */
  isOuter: boolean;
}

/** Live description of how the OS is delivering input right now. */
export interface Cadence {
  /** EMA of ms between delivered events */
  emaMs: number;
  /** true when listening on pointerrawupdate */
  raw: boolean;
  /** last batch's coalesced sub-sample count */
  coalesced: number;
}

export interface PinchState {
  /** world-space midpoint + distance, previous + current, for pan/zoom */
  cx: number;
  cy: number;
  dist: number;
}
