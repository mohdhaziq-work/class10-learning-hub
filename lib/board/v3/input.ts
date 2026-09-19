/* ENGINE v3 — input pipeline.
   Single listener on the fastest event the platform offers
   (pointerrawupdate where present, pointermove otherwise — never both).
   Every hardware sub-sample is delivered: coalesced first, then the outer
   event unconditionally (it carries the newest sample on many Android
   browsers; the consumer's distance gate drops true duplicates).
   Listeners are passive: touch-action:none on the canvas owns the gestures,
   so preventDefault is never needed on the ink path. */

import type { Cadence, InputSample, PinchState } from "./types";

export interface InputHandlers {
  onDown(s: InputSample): void;
  onMove(batch: InputSample[], cad: Cadence): void;
  onUp(s: InputSample): void;
  onCancel(s: InputSample): void;
  onPinch(p: PinchState | null): void;
}

export class InputPipeline {
  private rawEvt = false;
  private emaMs = 16;
  private lastT = 0;
  private lastCoal = 0;
  private pointers = new Map<number, { x: number; y: number }>();
  private cleanups: (() => void)[] = [];

  constructor(private target: HTMLElement, private h: InputHandlers) {
    this.rawEvt =
      typeof PointerEvent !== "undefined" &&
      "onpointerrawupdate" in (window as unknown as Record<string, unknown>);
    const moveEvt = this.rawEvt ? "pointerrawupdate" : "pointermove";

    this.on(target, "pointerdown", (e: PointerEvent) => {
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        /* capture can fail on detached nodes — ink still works */
      }
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) this.emitPinch();
      else if (this.pointers.size === 1) this.h.onDown(this.sample(e, false, false));
    });

    this.on(target, moveEvt, (e: PointerEvent) => {
      const now = performance.now();
      if (this.lastT) {
        const g = now - this.lastT;
        if (g > 0 && g < 400) this.emaMs = this.emaMs * 0.8 + g * 0.2;
      }
      this.lastT = now;

      const prev = this.pointers.get(e.pointerId);
      if (prev) {
        prev.x = e.clientX;
        prev.y = e.clientY;
      }
      if (this.pointers.size === 2) {
        this.emitPinch();
        return;
      }
      if (!prev) return; /* hover move before down — ignore for ink */

      const batch: InputSample[] = [];
      const gce = (e as PointerEvent & { getCoalescedEvents?: () => PointerEvent[] })
        .getCoalescedEvents?.();
      this.lastCoal = gce && gce.length > 1 ? gce.length : 0;
      if (gce && gce.length > 1) {
        for (const c of gce) batch.push(this.sample(c, true, false));
      }
      /* outer event ALWAYS last: newest sample on many Android browsers */
      batch.push(this.sample(e, false, true));
      this.h.onMove(batch, {
        emaMs: this.emaMs,
        raw: this.rawEvt,
        coalesced: this.lastCoal,
      });
    });

    const up = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.h.onPinch(null);
      if (this.pointers.size === 0) this.h.onUp(this.sample(e, false, false));
      else if (this.pointers.size === 1) {
        /* second finger lifted: re-anchor the survivor without a jump */
        this.h.onUp(this.sample(e, false, false));
      }
    };
    this.on(target, "pointerup", up);
    this.on(target, "pointercancel", (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.h.onPinch(null);
      this.h.onCancel(this.sample(e, false, false));
    });
  }

  /** sparse input (WebView ~10Hz) needs the adaptive bridge; fast input does not */
  get sparse(): boolean {
    return this.emaMs > 40;
  }
  get cadence(): Cadence {
    return { emaMs: this.emaMs, raw: this.rawEvt, coalesced: this.lastCoal };
  }

  destroy(): void {
    for (const fn of this.cleanups) fn();
    this.cleanups = [];
  }

  private emitPinch(): void {
    const [a, b] = [...this.pointers.values()];
    if (!a || !b) return;
    this.h.onPinch({
      cx: (a.x + b.x) / 2,
      cy: (a.y + b.y) / 2,
      dist: Math.hypot(a.x - b.x, a.y - b.y),
    });
  }

  private sample(e: PointerEvent, isCoalesced: boolean, isOuter: boolean): InputSample {
    return {
      x: e.clientX,
      y: e.clientY,
      t: e.timeStamp || performance.now(),
      pressure: e.pressure || 0,
      pointerId: e.pointerId,
      pointerType: e.pointerType || "mouse",
      isCoalesced,
      isOuter,
    };
  }

  private on(t: HTMLElement, ev: string, fn: (e: PointerEvent) => void): void {
    t.addEventListener(ev, fn as EventListener, { passive: true });
    this.cleanups.push(() => t.removeEventListener(ev, fn as EventListener));
  }
}
