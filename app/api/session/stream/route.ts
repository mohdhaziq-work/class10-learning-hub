import { list, subscribe } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* Server-Sent Events feed for the live device dashboard. */
export async function GET() {
  const enc = new TextEncoder();
  let unsub: (() => void) | null = null;
  let ping: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        try { controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`)); } catch { /* closed */ }
      };
      send({ type: "snapshot", sessions: list() });
      unsub = subscribe(() => send({ type: "snapshot", sessions: list() }));
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
