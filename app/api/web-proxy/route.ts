import { NextRequest, NextResponse } from "next/server";

/* Server-side reader for embedded study pages (EduRev PYQs).
   We frame their public page through this proxy so we can hide their
   login / sign-in overlays inside the Smart Board reading pane.
   Content is never copied or stored — HTML streams through as-is. */

const ALLOWED_HOSTS = ["edurev.in"];
const UA =
 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const CLEAN_CSS = `
<style id="sb-reader-clean">
 .lp_sup_si_btn,.signinbtn,.signupbtn,.signbtn,.ER_Model_OTP,.er-sticky-inner-pp,
 .modal,.modal-backdrop,[id*="dvLogin"],[id*="divLogin"],[class*="signin-popup"],
 [class*="login-pop"],[class*="auth-modal"],.fixfooter,.fixed-bottom{display:none!important}
</style>`;

const CLEAN_JS = `
<script id="sb-reader-clean-js">
(function(){
 function rm(el){ if(el&&el.parentNode) el.parentNode.removeChild(el); }
 function clean(){
  document.querySelectorAll(".lp_sup_si_btn,.signinbtn,.signupbtn,.ER_Model_OTP,.modal,.modal-backdrop,.er-sticky-inner-pp").forEach(rm);
  document.querySelectorAll("body > *").forEach(function(el){
   try{
    var cs=getComputedStyle(el);
    if(cs.position==="fixed" && el.offsetHeight>50 && /sign\\s*in|log\\s*in|create account|join free/i.test(el.textContent||"")) rm(el);
   }catch(_){}
  });
 }
 if(document.readyState!=="loading") clean(); else document.addEventListener("DOMContentLoaded",clean);
 setTimeout(clean,1200); setTimeout(clean,4000);
})();
</script>`;

export async function GET(req: NextRequest) {
 const raw = req.nextUrl.searchParams.get("url") || "";
 let u: URL;
 try {
  u = new URL(raw);
 } catch {
  return NextResponse.json({ error: "Invalid url" }, { status: 400 });
 }
 if (u.protocol !== "https:" || !ALLOWED_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith("." + h))) {
  return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
 }

 const res = await fetch(u.toString(), {
  headers: { "user-agent": UA, accept: "text/html" },
  redirect: "follow",
  cache: "no-store",
 });
 if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });

 let html = await res.text();
 const inject = `<base href="https://${u.hostname}/">` + CLEAN_CSS;
 if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, (m) => m + inject);
 else html = inject + html;
 html = html.replace(/<\/body>/i, CLEAN_JS + "</body>");

 return new NextResponse(html, {
  status: 200,
  headers: {
   "content-type": "text/html; charset=utf-8",
   "cache-control": "public, max-age=1800",
   "x-robots-tag": "noindex",
  },
 });
}
