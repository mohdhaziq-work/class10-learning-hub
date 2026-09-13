import QRCode from "qrcode";

/* ==========================================================================
   REMOTE PHONE PAD — laptop side (inside the Smart Board).
   The phone becomes a wireless writing tablet + touchpad. The phone sends
   only tiny input events over a peer-to-peer WebRTC DataChannel (no server
   hop, no video encoding) — the laptop's own board engine renders them at
   full 60fps, which is why it feels instant.

   Two data channels:
     "input" — unordered, no retransmit → pointer/touchpad moves (lowest latency)
     "ctrl"  — ordered, reliable → pen down/up, tool commands, clicks (must not drop)

   Signaling reuses the site's /api/cast relay (offer/answer/ICE mailbox).
   ========================================================================== */
export interface PadHooks {
  pointer(ph: "down" | "move" | "up", nx: number, ny: number): void;
  command(c: string, v?: any): void;
  cursorMove(dx: number, dy: number): void;
  cursorClick(btn: number, phase: number): void; /* 0 = full click, 1 = press, 2 = release */
  cursorScroll(dx: number, dy: number): void;
  status(s: "waiting" | "live" | "lost"): void;
}

const ICE: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };

export class RemotePad {
  private sid = "";
  private pc: RTCPeerConnection | null = null;
  private ctrl: RTCDataChannel | null = null;
  private input: RTCDataChannel | null = null;
  private after = 0;
  private timer: any = 0;
  private stopped = false;
  private opened = false;

  constructor(private hooks: PadHooks, private qr: HTMLCanvasElement, private onCode: (sid: string) => void) {}

  async open() {
    if (this.opened) return;
    this.opened = true;
    this.stopped = false;
    this.hooks.status("waiting");
    try {
      const r = await fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: "create" }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "session failed");
      this.sid = j.sid;
      this.onCode(this.sid);
      const url = `${location.origin}/pad/join?sid=${this.sid}`;
      QRCode.toCanvas(this.qr, url, { width: 220, margin: 1 }).catch(() => { /* link still shown */ });
    } catch {
      this.hooks.status("lost");
      return;
    }
    this.poll();
  }

  private async post(body: any) {
    try {
      const r = await fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      return await r.json();
    } catch { return null; }
  }

  private poll = async () => {
    if (this.stopped) return;
    try {
      const r = await fetch(`/api/cast?sid=${this.sid}&from=viewer&after=${this.after}`);
      const j = await r.json();
      if (!j.ok) {
        if (String(j.error || "").includes("not found")) { this.hooks.status("lost"); this.cleanup(); return; }
      } else {
        if (j.msgs.length) this.after = j.msgs[j.msgs.length - 1].id;
        for (const m of j.msgs) {
          const msg = m.msg || {};
          if (msg.type === "offer") await this.handleOffer(msg.sdp);
          else if (msg.type === "cand") this.pc?.addIceCandidate(msg.cand).catch(() => { /* stale */ });
          else if (msg.type === "bye") { this.hooks.status("lost"); this.cleanup(); return; }
        }
      }
    } catch { /* transient */ }
    if (!this.stopped) this.timer = setTimeout(this.poll, this.ctrl?.readyState === "open" ? 2500 : 350);
  };

  private async handleOffer(sdp: any) {
    try { this.pc?.close(); } catch { /* already closed */ }
    const pc = new RTCPeerConnection(ICE);
    this.pc = pc;
    const cands: any[] = [];
    pc.onicecandidate = (e) => { if (e.candidate) cands.push({ type: "cand", cand: e.candidate.toJSON() }); };
    let iceTimer: any = 0;
    const flush = async () => { if (cands.length) { await this.post({ a: "sig", sid: this.sid, from: "viewer", msgs: cands.splice(0) }); } };
    pc.onicegatheringstatechange = () => { if (pc.iceGatheringState === "complete") { clearTimeout(iceTimer); flush(); } };
    iceTimer = setTimeout(flush, 1200);
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") this.hooks.status("live");
      if (pc.connectionState === "failed" || pc.connectionState === "disconnected") this.hooks.status("lost");
    };
    pc.ondatachannel = (e) => {
      const dc = e.channel;
      if (dc.label === "ctrl") this.ctrl = dc;
      else this.input = dc;
      dc.onmessage = (ev) => this.onMessage(String(ev.data));
    };
    await pc.setRemoteDescription(sdp);
    const ans = await pc.createAnswer();
    await pc.setLocalDescription(ans);
    await this.post({ a: "sig", sid: this.sid, from: "viewer", msgs: [{ type: "answer", sdp: { type: ans.type, sdp: ans.sdp } }] });
  }

  private onMessage(raw: string) {
    let m: any;
    try { m = JSON.parse(raw); } catch { return; }
    if (m.p) {
      /* pointer: p:[phase, x, y] — phase 0=down 1=move 2=up */
      const ph = m.p[0] === 0 ? "down" : m.p[0] === 1 ? "move" : "up";
      this.hooks.pointer(ph, +m.p[1], +m.p[2]);
    } else if (m.P) {
      /* batched draw points (all coalesced 120 Hz samples in one message): P:[[x,y],…] */
      for (const q of m.P) this.hooks.pointer("move", +q[0], +q[1]);
    } else if (m.c) this.hooks.command(m.c, m.v);
    else if (m.m) this.hooks.cursorMove(+m.m[0], +m.m[1]);
    else if (m.M) { for (const q of m.M) this.hooks.cursorMove(+q[0], +q[1]); }
    else if (m.k) this.hooks.cursorClick(+m.k[0], +m.k[1]);
    else if (m.s) this.hooks.cursorScroll(+m.s[0], +m.s[1]);
  }

  close() {
    this.stopped = true;
    clearTimeout(this.timer);
    if (this.sid) this.post({ a: "end", sid: this.sid, from: "viewer" }).catch(() => { /* gone */ });
    this.cleanup();
    this.hooks.status("lost");
  }
  private cleanup() {
    clearTimeout(this.timer);
    try { this.ctrl?.close(); } catch { /* closed */ }
    try { this.input?.close(); } catch { /* closed */ }
    try { this.pc?.close(); } catch { /* closed */ }
    this.ctrl = this.input = null;
    this.pc = null;
    this.opened = false;
  }
}
