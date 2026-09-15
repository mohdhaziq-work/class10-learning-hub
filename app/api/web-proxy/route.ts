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
 /* auth UI gone */
 .lp_sup_si_btn,.signinbtn,.signupbtn,.signbtn,.tpbr_lgn_btn,.showinmobile,
 .ER_Model_OTP,.er-sticky,.er-sticky-inner-pp,#erStickyRoot-pp,#myModal,#myModalRegister,
 #mySidenav,#opacityBody,.sidenav,.modal,.modal-backdrop,[id*="dvLogin"],[id*="divLogin"],
 [class*="signin-popup"],[class*="login-pop"],[class*="auth-modal"],.fixfooter,.fixed-bottom,
 .Get_the_App_Btn,.app_dnld_lnk{display:none!important}
 /* EduRev adds .blur to .container when its sign-in opens — kill every blur for good */
 .blur,.blurred,.container.blur,[class*="blur"]{filter:none!important;-webkit-filter:none!important;
   backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 .ed_container,.ed_container_inr,.ed_main,.ql_content,.container,main,body{filter:none!important;
   backdrop-filter:none!important}
 body.modal-open,body.sidebaropen{overflow:auto!important;padding-right:0!important}
</style>`;

const CLEAN_JS = `
<script id="sb-reader-clean-js">
(function(){
 var SEL=".lp_sup_si_btn,.signinbtn,.signupbtn,.tpbr_lgn_btn,.showinmobile,.ER_Model_OTP,.modal,.modal-backdrop,.er-sticky,#erStickyRoot-pp,#mySidenav,#opacityBody,.sidenav,.Get_the_App_Btn";
 function rm(el){ if(el&&el.parentNode) el.parentNode.removeChild(el); }
 function clean(){
  try{
   document.querySelectorAll(SEL).forEach(rm);
   /* EduRev's logout.js adds .blur to .container when sign-in opens; strip it everywhere */
   document.querySelectorAll(".blur,.blurred").forEach(function(el){ el.classList.remove("blur","blurred"); });
   document.querySelectorAll("html,body,.container,.ed_container,.ed_container_inr,.ed_main,main").forEach(function(el){
    el.classList.remove("modal-open","sidebaropen");
    el.style.filter="none"; el.style.webkitFilter="none"; el.style.backdropFilter="none";
   });
   document.querySelectorAll("[style*='blur']").forEach(function(el){
    el.style.filter="none"; el.style.webkitFilter="none"; el.style.backdropFilter="none";
   });
   document.querySelectorAll("body > *").forEach(function(el){
    var cs=getComputedStyle(el);
    if(cs.position==="fixed" && el.offsetHeight>40 && /sign\\s*in|log\\s*in|create account|join free|get the app/i.test(el.textContent||"")) rm(el);
   });
  }catch(_){}
 }
 if(document.readyState!=="loading"){ clean(); } else { document.addEventListener("DOMContentLoaded",clean); }
 var t=0, iv=setInterval(function(){ clean(); if(++t>40) clearInterval(iv); },800);
 setTimeout(clean,35000); setTimeout(clean,60000);
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
 /* EduRev ships HTML with NO </head>/<body> closing tags — inject CSS right after
    <head> and append the cleanup script at the very end of the document. */
 const base = `<base href="https://${u.hostname}/">`;
 if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, (m) => m + base + CLEAN_CSS);
 else html = base + CLEAN_CSS + html;
 html += CLEAN_JS;

 return new NextResponse(html, {
  status: 200,
  headers: {
   "content-type": "text/html; charset=utf-8",
   "cache-control": "public, max-age=1800",
   "x-robots-tag": "noindex",
  },
 });
}
