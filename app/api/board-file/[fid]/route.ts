import { NextRequest, NextResponse } from "next/server";
import { promises as fs, createReadStream } from "fs";
import * as path from "path";
import * as os from "os";

/* Serves a phone-uploaded file back to the Smart Board.
   Supports Range requests so videos seek properly. */

export const dynamic = "force-dynamic";

const ROOT = path.join(os.tmpdir(), "c10-board-uploads");

export async function GET(req: NextRequest, { params }: { params: { fid: string } }) {
  const sid = req.nextUrl.searchParams.get("session") || "";
  const fid = params.fid || "";
  if (!/^[A-Za-z0-9-]{8,64}$/.test(sid) || !/^[a-f0-9]{32}$/.test(fid)) {
    return new NextResponse("bad request", { status: 400 });
  }
  const dir = path.join(ROOT, sid);
  let meta: { name?: string; mime?: string } = {};
  try {
    meta = JSON.parse(await fs.readFile(path.join(dir, fid + ".json"), "utf8"));
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
  let size = 0;
  try {
    size = (await fs.stat(path.join(dir, fid + ".bin"))).size;
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
  const type = meta.mime || "application/octet-stream";
  const safeName = String(meta.name || "file").replace(/"/g, "");
  const range = req.headers.get("range");
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    if (m) {
      let start = m[1] ? parseInt(m[1], 10) : 0;
      let end = m[2] ? parseInt(m[2], 10) : size - 1;
      if (isNaN(start) || start < 0) start = 0;
      if (isNaN(end) || end >= size) end = size - 1;
      if (start >= size || start > end) {
        return new NextResponse("range error", {
          status: 416,
          headers: { "Content-Range": `bytes */${size}` },
        });
      }
      const stream = createReadStream(path.join(dir, fid + ".bin"), { start, end });
      return new NextResponse(stream as unknown as ReadableStream, {
        status: 206,
        headers: {
          "Content-Type": type,
          "Accept-Ranges": "bytes",
          "Content-Range": `bytes ${start}-${end}/${size}`,
          "Content-Length": String(end - start + 1),
          "Content-Disposition": `inline; filename="${safeName}"`,
        },
      });
    }
  }
  const stream = createReadStream(path.join(dir, fid + ".bin"));
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": type,
      "Accept-Ranges": "bytes",
      "Content-Length": String(size),
      "Content-Disposition": `inline; filename="${safeName}"`,
    },
  });
}
