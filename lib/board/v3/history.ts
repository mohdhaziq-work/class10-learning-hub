/* ENGINE v3 — bounded undo/redo stack. Snapshots are page-level object lists
   (the engine decides what a snapshot is); the stack only stores and trims. */

export class History<T> {
  private undoS: T[] = [];
  private redoS: T[] = [];

  constructor(private cap = 60) {}

  push(snapshot: T): void {
    this.undoS.push(snapshot);
    if (this.undoS.length > this.cap) this.undoS.shift();
    this.redoS = [];
  }

  undo(current: T): T | null {
    const prev = this.undoS.pop();
    if (prev === undefined) return null;
    this.redoS.push(current);
    return prev;
  }

  redo(current: T): T | null {
    const next = this.redoS.pop();
    if (next === undefined) return null;
    this.undoS.push(current);
    return next;
  }

  get canUndo(): boolean {
    return this.undoS.length > 0;
  }
  get canRedo(): boolean {
    return this.redoS.length > 0;
  }
  clear(): void {
    this.undoS = [];
    this.redoS = [];
  }
}
