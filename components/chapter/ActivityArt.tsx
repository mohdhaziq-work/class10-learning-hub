/* Minimal original line-art diagrams for NCERT-style activities.
   Each art is a hand-built inline SVG (monochrome + brand blue), crisp at any size. */
export default function ActivityArt({ art }: { art?: string }) {
 const s = { stroke: "#334155", strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
 const b = { stroke: "#1a73e8", strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
 let inner: React.ReactNode = null;
 if (art === "circuit")
  inner = (
   <>
    <rect x="30" y="30" width="140" height="80" rx="6" {...s} />
    <path d="M85 30h10l4-8 6 14 6-14 4 8h10" {...s} />
    <circle cx="150" cy="70" r="12" {...b} />
    <path d="M144 64l12 12" {...b} />
    <path d="M45 62v16M53 66v8" {...s} />
    <path d="M100 52v-10" {...s} />
   </>
  );
 else if (art === "magnet")
  inner = (
   <>
    <rect x="70" y="50" width="60" height="26" rx="4" {...s} />
    <path d="M70 50v26" {...b} />
    <path d="M40 40c-14 14-14 34 0 48M160 40c14 14 14 34 0 48" {...b} />
    <path d="M52 48c-9 10-9 26 0 36M148 48c9 10 9 26 0 36" {...s} />
    <circle cx="30" cy="63" r="3" {...s} />
    <circle cx="170" cy="63" r="3" {...s} />
   </>
  );
 else if (art === "leaf")
  inner = (
   <>
    <path d="M100 110c0-46 22-70 44-78-2 46-20 70-44 78Z" {...b} />
    <path d="M100 110c8-30 22-52 36-64" {...s} />
    <path d="M60 40h28M60 40v28" {...s} />
    <circle cx="60" cy="40" r="6" {...b} />
   </>
  );
 else if (art === "acid")
  inner = (
   <>
    <path d="M70 40h60M80 40v30l-18 40a8 8 0 0 0 7 11h62a8 8 0 0 0 7-11l-18-40V40" {...s} />
    <path d="M74 92h52" {...b} />
    <circle cx="92" cy="104" r="3" {...b} />
    <circle cx="106" cy="99" r="2.4" {...b} />
    <path d="M96 26v8M104 26v8" {...s} />
   </>
  );
 else if (art === "heating")
  inner = (
   <>
    <path d="M60 78h80l-10 26H70L60 78Z" {...s} />
    <path d="M84 112c-4 8 4 10 0 16M100 112c-4 8 4 10 0 16M116 112c-4 8 4 10 0 16" {...b} />
    <path d="M78 70c6-8 12 4 18-4s12 4 18-4" {...s} />
    <circle cx="100" cy="52" r="10" {...b} />
   </>
  );
 else if (art === "reflex")
  inner = (
   <>
    <circle cx="100" cy="40" r="14" {...s} />
    <path d="M100 54v34M100 66l-22 12M100 66l22 12M100 88l-14 26M100 88l14 26" {...s} />
    <path d="M40 96c18-8 34-8 48 0" {...b} />
    <path d="M46 92l-8 4 6 6" {...b} />
   </>
  );
 else if (art === "light")
  inner = (
   <>
    <path d="M40 100 80 60l40 40" {...s} />
    <rect x="74" y="54" width="12" height="12" transform="rotate(45 80 60)" {...b} />
    <path d="M40 100h120" {...s} />
    <path d="M96 44l8-8M104 52l8-8" {...b} />
   </>
  );
 else if (art === "eye")
  inner = (
   <>
    <path d="M40 70c20-24 100-24 120 0-20 24-100 24-120 0Z" {...s} />
    <circle cx="100" cy="70" r="16" {...b} />
    <circle cx="100" cy="70" r="6" {...s} />
    <path d="M100 34v10" {...s} />
   </>
  );
 else if (art === "plant")
  inner = (
   <>
    <path d="M100 116V70" {...s} />
    <path d="M100 84c-16-2-26-12-28-26 16 2 26 12 28 26ZM100 70c16-2 26-12 28-26-16 2-26 12-28 26Z" {...b} />
    <path d="M78 116h44" {...s} />
   </>
  );
 else
  inner = (
   <>
    <circle cx="100" cy="70" r="30" {...b} />
    <path d="M100 40v-12M100 112v-12M64 70h-12M148 70h-12" {...s} />
   </>
  );
 return (
  <svg viewBox="0 0 200 140" className="act-art" role="img" aria-label="activity diagram">
   {inner}
  </svg>
 );
}
