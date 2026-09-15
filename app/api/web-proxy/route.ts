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
 .lp_sup_si_btn,.signinbtn,.signupbtn,.signbtn,.tpbr_lgn_btn,.showinmobile,
 .ER_Model_OTP,.er-sticky,.er-sticky-inner-pp,#erStickyRoot-pp,#myModal,#myModalRegister,
 .modal,.modal-backdrop,[id*="dvLogin"],[id*="divLogin"],[class*="signin-popup"],
 [class*="login-pop"],[class*="auth-modal"],.fixfooter,.fixed-bottom,
 .Get_the_App_Btn,.app_dnld_lnk{display:none!important}
 *{backdrop-filter:none!important}
 [style*="blur"]{filter:none!important;backdrop-filter:none!important}
 .ed_container,.ed_container_inr,.ed_main,.ql_content,body{filter:none!important}
 body.modal-open{overflow:auto!important;padding-right:0!important}
</style>`;

const CLEAN_JS = `
<script id="sb-reader-clean-js">
(function(){
 var SEL=".lp_sup_si_btn,.signinbtn,.signupbtn,.tpbr_lgn_btn,.showinmobile,.ER_Model_OTP,.modal,.modal-backdrop,.er-sticky,#erStickyRoot-pp,.Get_the_App_Btn";
 function rm(el){ if(el&&el.parentNode) el.parentNode.removeChild(el); }
 function unblur(){
  document.querySelectorAll("[style*=\"blur\"],.blur,.blurred,.blurme").forEach(function(el){
   el.style.filter="none"; el.style.backdropFilter="none"; el.style.webkitFilter="none";
  });
  document.querySelectorAll(".ed_container,.ed_container_inr,.ed_main,.ql_content,main,body").forEach(function(el){
   el.style.filter="none"; el.style.backdropFilter="none";
  });
  document.body && document.body.classList.remove("modal-open","blurred");
 }
 function clean(){
  document.querySelectorAll(SEL).forEach(rm);
  unblur();
  document.querySelectorAll("body > *").forEach(function(el){
   try{
    var cs=getComputedStyle(el);
    if(cs.position==="fixed" && el.offsetHeight>40 && /sign\\s*in|log\\s*in|create account|join free|get the app/i.test(el.textContent||"")) rm(el);
   }catch(_){}
  });
 }
 if(document.readyState!=="loading"){ clean(); } else { document.addEventListener("DOMContentLoaded",clean); }
 var t=0, iv=setInterval(function(){ clean(); if(++t>14) clearInterval(iv); },700);
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
