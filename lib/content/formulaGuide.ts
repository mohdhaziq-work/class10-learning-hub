/* Application guide: how, where and in which context to apply each chapter's formulas.
   Rendered under the Formula Bank. Key: chapterKey. Original guidance text. */
export interface GuideEntry { t: string; use: string }
export const FORMULA_GUIDE: Record<string, GuideEntry[]> = {
 "maths-0-0": [
  { t: "HCF x LCM = product of two numbers", use: "Use when any three of the four values are given — typically 'find LCM given HCF and the numbers'. Works only for exactly TWO numbers." },
  { t: "Fundamental Theorem of Arithmetic", use: "Apply to prove irrationality (assume rational, reach contradiction) and to find HCF/LCM by prime factorisation." },
  { t: "Terminating decimals: q = 2^m 5^n", use: "Check the denominator of p/q in lowest form; if it has only 2s and 5s the decimal terminates — a favourite 1-mark MCQ." },
 ],
 "maths-0-1": [
  { t: "alpha + beta = -b/a, alpha.beta = c/a", use: "Use whenever roots are given and the polynomial is asked (build x^2 - Sx + P), or when an expression in alpha, beta must be evaluated without solving." },
  { t: "Graphical zero count", use: "Count x-axis intersections of the graph — direct 1-mark question." },
 ],
 "maths-0-2": [
  { t: "Elimination / substitution", use: "Substitution when one variable is already isolated; elimination when coefficients can be matched. Word problems (age, speed, cost) always reduce to these." },
  { t: "a1/a2 vs b1/b2 conditions", use: "Compare ratios to answer unique / no / infinite solution questions without solving — standard 2-marker." },
 ],
 "maths-0-3": [
  { t: "Quadratic formula x = (-b ± sqrt(D)) / 2a", use: "The universal solver — use when factorisation is not obvious. Compute D first to know the nature of roots." },
  { t: "Discriminant D = b^2 - 4ac", use: "D>0 two distinct real roots; D=0 equal roots; D<0 no real roots. 'Find k for equal roots' questions set D=0." },
  { t: "Sum = -b/a, Product = c/a", use: "Quick checks and 'form the equation' questions." },
 ],
 "maths-0-4": [
  { t: "a_n = a + (n-1)d", use: "Any 'find the nth term / which term is X' question. From the end: a_n = l - (n-1)d." },
  { t: "S_n = n/2 [2a + (n-1)d]", use: "Sum questions; when last term is known use S_n = n/2 (a + l) — faster." },
  { t: "a_n = S_n - S_(n-1)", use: "When the sum formula is given and a term is asked." },
 ],
 "maths-0-5": [
  { t: "Basic Proportionality (Thales)", use: "A line parallel to one side inside a triangle splits the other two in equal ratio — use in every 'DE parallel BC' figure." },
  { t: "Area ratio = (side ratio)^2", use: "Similar-triangle comparison questions; combine with corresponding heights/medians ratio too." },
  { t: "Pythagoras", use: "Right triangles, ladder-wall, distance-between-poles problems." },
 ],
 "maths-0-6": [
  { t: "Distance / section / midpoint", use: "Distance for 'prove points form a square/isosceles'; section formula with ratio k:1 for 'point on axis' questions; midpoint is ratio 1:1." },
  { t: "Collinearity trick", use: "Three points collinear when area of triangle = 0 (or distances add up)." },
 ],
 "maths-0-7": [
  { t: "sin/cos/tan ratios + table (0,30,45,60,90)", use: "Memorise the table; most 1-markers are direct values or simple combinations." },
  { t: "sin^2 + cos^2 = 1 (and cousins)", use: "Simplify/verify identity questions — convert everything to sin and cos first." },
  { t: "Complementary relations", use: "sin(90-A)=cos A etc. — spot pairs that cancel in expressions." },
 ],
 "maths-0-8": [
  { t: "tan = height/distance", use: "Elevation problems: draw the right triangle with horizontal distance as base. Two-angle problems (two buildings, broken tree) need two equations." },
  { t: "30-60-90 and 45-45-90 side ratios", use: "Skip trig tables: sides are 1:sqrt3:2 or 1:1:sqrt2 — fastest way to solve height problems." },
 ],
 "maths-0-9": [
  { t: "Tangent ⟂ radius", use: "Every length-of-tangent question uses the right triangle: (radius)^2 + (tangent)^2 = (centre-to-point)^2." },
  { t: "Equal tangents from external point", use: "Perimeter-of-circumscribed-figure proofs rely on PA = PB pairing." },
 ],
 "maths-0-10": [
  { t: "Sector area (θ/360)πr^2, arc (θ/360)2πr", use: "Keep θ in degrees; wiper/clock-hand problems are sector questions in disguise." },
  { t: "Segment area = sector − triangle", use: "Chord + angle given → compute sector, subtract triangle (often equilateral/right)." },
 ],
 "maths-0-11": [
  { t: "Sphere 4πr^2 / (4/3)πr^3; cylinder 2πrh, πr^2h; cone πrl, (1/3)πr^2h", use: "Melting-recasting questions conserve VOLUME; painting/tenting questions use CURVED or TOTAL surface area — pick the right one." },
  { t: "Combination solids", use: "Split into known solids, add/subtract volumes or surfaces piece by piece." },
 ],
 "maths-0-12": [
  { t: "Mean (direct/assumed/step), Median, Mode", use: "Large frequencies → assumed-mean or step-deviation. Grouped median: locate median class first (cf ≥ n/2). Mode: highest-frequency class, then the formula." },
  { t: "3 Median = Mode + 2 Mean", use: "Find the third measure when two are given — direct 2-marker." },
 ],
 "maths-0-13": [
  { t: "P(E) = favourable/total, P(E)+P(E')=1", use: "'At least one' questions are fastest via the complement: 1 − P(none)." },
  { t: "Equally likely outcomes", use: "Coins/dice/cards sample spaces (2, 6, 52) must be memorised; double-dice totals via the 6x6 table." },
 ],
 "science-0-0": [
  { t: "Balanced equations", use: "Balance by hit-and-trial counting atoms each side — always asked; state symbols and conditions earn full marks." },
  { t: "Reaction types", use: "Classify first (combination/decomposition/displacement/double/redox) — the type tells you the products to expect." },
 ],
 "science-0-1": [
  { t: "pH scale", use: "pH<7 acid, =7 neutral, >7 base; 'stomach/soil/tummy ache' context questions use neutralisation." },
  { t: "Salt family (washing soda, baking soda, POP)", use: "Learn preparation equation + one use each — standard 3-mark set." },
 ],
 "science-0-2": [
  { t: "Reactivity series", use: "Predict displacement and extraction method (top = electrolysis, middle = reduction with C/Al, bottom = heat/oxide)." },
  { t: "Ionic compound properties", use: "High MP, conduct in molten/aqueous, soluble in water — reason-based questions." },
 ],
 "science-0-3": [
  { t: "Homologous series trend", use: "Physical properties change with chain length; chemical properties stay with the functional group." },
  { t: "Functional groups (-OH, -CHO, -COOH)", use: "Identify the group from formula; name + one test (e.g., -COOH turns blue litmus red)." },
 ],
 "science-0-4": [
  { t: "Photosynthesis equation", use: "6CO2 + 6H2O --light/chlorophyll--> C6H12O6 + 6O2; raw materials, site and conditions are the usual sub-questions." },
  { t: "Aerobic vs anaerobic respiration", use: "Compare site, O2 need, products and energy (38 vs 2 ATP) in a table question." },
 ],
 "science-0-8": [
  { t: "Mirror formula 1/v + 1/u = 1/f, magnification", use: "Apply sign convention strictly (distances against incident light negative). m = -v/u = h'/h." },
  { t: "Lens formula 1/v - 1/u = 1/f, P = 1/f(m)", use: "Same sign discipline; power in dioptres, f in metres; convex +, concave −." },
 ],
 "science-0-10": [
  { t: "V = IR, R = ρl/A", use: "Numericals on circuits; resistance grows with length, shrinks with area — reasoning questions." },
  { t: "Series R = R1+R2+..., Parallel 1/R = 1/R1+1/R2", use: "Series for same current, parallel for same voltage; heating H = I^2Rt (fuse/heater questions)." },
 ],
 "science-0-11": [
  { t: "Fleming's left/right hand rules", use: "Left hand = motor (force), right hand = generator (induced current). Do not swap." },
  { t: "AC vs DC, domestic circuit", use: "Fuse in live wire, earthing for metal bodies, 50 Hz AC in India — safety reasoning questions." },
 ],
};
