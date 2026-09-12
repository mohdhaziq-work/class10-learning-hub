export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import path from "path";
import { createWorker } from "tesseract.js";

/* handwriting OCR — tesseract.js worker (singleton), model bundled in /resources so
   no CDN and no download at runtime. First call warms the worker (~0.3-2s). */
let workerP: Promise<any> | null = null;
function getWorker() {
  if (!workerP) {
    workerP = createWorker("eng", 1, {
      langPath: path.join(process.cwd(), "resources"),
      gzip: false,
      cachePath: "/tmp",
    }).catch((e) => { workerP = null; throw e; });
  }
  return workerP;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body?.warm) { await getWorker(); return Response.json({ ok: true }); }
    const img = body?.img;
    if (typeof img !== "string" || !img.startsWith("data:image")) return Response.json({ text: "" });
    const w = await getWorker();
    const { data } = await w.recognize(img);
    const text = String(data?.text || "").trim();
    return Response.json({ text });
  } catch (e: any) {
    return Response.json({ text: "", error: String(e?.message || e) });
  }
}
