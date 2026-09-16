import { liveList, historyList, subscribe } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* SSE feed: live pool + permanent history ledger. */
export async function GET() {
  const enc = new TextEncoder();
  let unsub: (() => void) | null = null;
  let ping: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        try { controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`)); } catch { /* closed */ }
      };
      const snap = () => send({ type: "snapshot", sessions: liveList(), history: historyList() });
      snap();
      unsub = subscribe(snap);
      ping = setInterval(() => send({ type: "ping" }), 20000);
    },
    cancel() {
      if (unsub) unsub();
      if (ping) clearInterval(ping);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
