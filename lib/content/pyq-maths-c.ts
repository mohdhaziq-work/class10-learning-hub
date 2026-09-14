/* Class 10 Maths — CBSE PYQs, OLDER YEARS batch (2011–2017 classics that still
   appear on every PYQ compilation: LearnCBSE, EduRev, PW, Tiwari Academy).
   Questions with a single year are exact; ranges mean "asked in this era". */
import type { Pyq } from "./pyq";

export const PYQ_C: Record<string, Pyq[]> = {

"maths-0-0": [
  { q: "Use Euclid's division lemma to show that the cube of any positive integer is of the form 9m, 9m + 1 or 9m + 8.", y: "CBSE 2014, 2012", m: 3, ans: "Any integer x = 3q + r, r ∈ {0,1,2}. Cubing each case mod 9 gives 0, 1 or 8. Hence x³ = 9m, 9m+1 or 9m+8." },
  { q: "Use Euclid's division algorithm to find the HCF of 867 and 255.", y: "CBSE 2012-15", m: 3, ans: "867 = 255×3 + 102; 255 = 102×2 + 51; 102 = 51×2 + 0. HCF = 51." },
  { q: "Given that HCF(306, 657) = 9, find the LCM(306, 657).", y: "CBSE 2012-15", m: 2, ans: "LCM = (306 × 657)/9 = 201102/9 = 22338." },
  { q: "Explain why 7 × 11 × 13 + 13 and 7 × 6 × 5 × 4 × 3 × 2 × 1 + 5 are composite numbers.", y: "CBSE 2014-16", m: 3, ans: "First = 13(77 + 1) = 13 × 78; second = 5(7×6×4×3×2×1 + 1) = 5 × (1008 + 1) = 5 × 1009. Each has a factor other than 1 and itself ⇒ composite." },
  { q: "Find the HCF of 65 and 117 by Euclid's division algorithm, and express it in the form 65m + 117n.", y: "CBSE 2016-17", m: 3, ans: "117 = 65×1 + 52; 65 = 52×1 + 13; 52 = 13×4 + 0. HCF = 13. Working backwards: 13 = 65 − 52 = 65 − (117 − 65) = 2×65 − 117 ⇒ m = 2, n = −1." },
],

"maths-0-1": [
  { q: "If α and β are the zeroes of the polynomial x² − 5x + 6, find the value of α² + β².", y: "CBSE 2013-16", m: 2, ans: "α + β = 5, αβ = 6. α² + β² = (α+β)² − 2αβ = 25 − 12 = 13." },
  { q: "If one zero of the quadratic polynomial x² + 3x + k is 2, find the value of k.", y: "CBSE 2014-16", m: 2, ans: "p(2) = 4 + 6 + k = 0 ⇒ k = −10." },
  { q: "Divide x³ − 3x² + 5x − 3 by x² − 2 and verify the division algorithm.", y: "CBSE 2013-15", m: 3, ans: "Quotient = x − 3, Remainder = 7x − 9. Check: (x² − 2)(x − 3) + (7x − 9) = x³ − 3x² + 5x − 3 ✓." },
  { q: "If the sum of the zeroes of x² − (k + 6)x + 2(2k − 1) is equal to half of their product, find k.", y: "CBSE 2015-17", m: 3, ans: "Sum = k + 6, Product = 4k − 2. k + 6 = (4k − 2)/2 ⇒ k + 6 = 2k − 1 ⇒ k = 7." },
],

"maths-0-2": [
  { q: "A father is three times as old as his son. In 12 years, he will be twice as old as his son. Find their present ages.", y: "CBSE 2012-15", m: 3, ans: "F = 3S and F + 12 = 2(S + 12) ⇒ 3S + 12 = 2S + 24 ⇒ S = 12, F = 36. Son 12, father 36." },
  { q: "5 pencils and 7 pens together cost ₹50, whereas 7 pencils and 5 pens cost ₹46. Find the cost of one pencil and one pen.", y: "CBSE 2013-16", m: 3, ans: "5p + 7n = 50, 7p + 5n = 46. Adding: 12(p+n) = 96 ⇒ p+n = 8; subtracting: 2(n−p) = 4 ⇒ n−p = 2. Pencil = ₹3, pen = ₹5." },
  { q: "Solve: 99x + 101y = 499 and 101x + 99y = 501.", y: "CBSE 2011-14", m: 3, ans: "Adding: 200(x+y) = 1000 ⇒ x+y = 5. Subtracting: −2x + 2y = −2 ⇒ y − x = 1. x = 2, y = 3." },
],

"maths-0-3": [
  { q: "Solve for x: 4x² − 4a²x + (a⁴ − b⁴) = 0.", y: "CBSE 2013-16", m: 3, ans: "(2x − a²)² = b⁴ ⇒ 2x − a² = ±b² ⇒ x = (a² + b²)/2 or (a² − b²)/2." },
  { q: "If the roots of (a − b)x² + (b − c)x + (c − a) = 0 are equal, prove that 2b = a + c.", y: "CBSE 2012-15", m: 3, ans: "Equal roots ⇒ D = 0: (b − c)² = 4(a − b)(c − a). Expanding both sides gives a² + c² + 2ac = 4ac − 4ab + 4b² − 4bc… simplifying leads to (a + c − 2b)² = 0 ⇒ 2b = a + c." },
  { q: "The sum of a number and its reciprocal is 10/3. Find the number.", y: "CBSE 2011-14", m: 2, ans: "x + 1/x = 10/3 ⇒ 3x² − 10x + 3 = 0 ⇒ (3x − 1)(x − 3) = 0 ⇒ x = 3 or 1/3." },
  { q: "The perimeter of a rectangular plot is 62 m and its area is 228 m². Find the dimensions of the plot.", y: "CBSE 2012-15", m: 3, ans: "l + b = 31, lb = 228 ⇒ l, b are roots of t² − 31t + 228 = 0 ⇒ (t − 19)(t − 12) = 0. Dimensions: 19 m × 12 m." },
],

"maths-0-4": [
  { q: "Which term of the AP 3, 15, 27, 39, … will be 132 more than its 54th term?", y: "CBSE 2013-16", m: 3, ans: "aₙ = a₅₄ + 132: 3 + (n−1)12 = 3 + 53×12 + 132 ⇒ (n−1)12 = 768 ⇒ n = 65. The 65th term." },
  { q: "If the 17th term of an AP exceeds its 10th term by 7, find the common difference.", y: "CBSE 2011-13", m: 2, ans: "a₁₇ − a₁₀ = 7d = 7 ⇒ d = 1." },
  { q: "How many multiples of 4 lie between 10 and 250?", y: "CBSE 2012-14", m: 2, ans: "First = 12, last = 248. n = (248 − 12)/4 + 1 = 60." },
],

"maths-0-5": [
  { q: "Sides AB and AC and median AD of ΔABC are respectively proportional to sides PQ and PR and median PM of ΔPQR. Show that ΔABC ~ ΔPQR.", y: "CBSE 2012-16", m: 4, ans: "AB/PQ = AC/PR = AD/PM ⇒ AB/PQ = AC/PR = (2AD)/(2PM) = BD/QM = DC/MR — with the included angle equal (SSS in halves), ΔABD ~ ΔPQM and ΔADC ~ ΔPMR; combining gives ΔABC ~ ΔPQR." },
  { q: "In ΔABC, AD ⊥ BC and AD² = BD × DC. Prove that ∠BAC = 90°.", y: "CBSE 2013-16", m: 3, ans: "AB² = AD² + BD² = BD·DC + BD² = BD(BD + DC) = BD·BC; similarly AC² = DC·BC. AB² + AC² = BC(BD + DC) = BC² ⇒ by the converse of Pythagoras, ∠BAC = 90°." },
  { q: "In an equilateral triangle ABC, D is a point on side BC such that BD = ⅓ BC. Prove that 9AD² = 7AB².", y: "CBSE 2015-16", m: 3, ans: "Let AB = a. The altitude from A meets BC at its midpoint M, so AM² = a² − (a/2)² = 3a²/4. BD = a/3 ⇒ DM = |a/2 − a/3| = a/6. AD² = AM² + DM² = 3a²/4 + a²/36 = 28a²/36 = 7a²/9. Hence 9AD² = 7AB²." },
],

"maths-0-6": [
  { q: "Find the value(s) of y if the distance between the points P(2, −3) and Q(10, y) is 10 units.", y: "CBSE 2013-16", m: 3, ans: "64 + (y + 3)² = 100 ⇒ (y+3)² = 36 ⇒ y = 3 or y = −9." },
  { q: "Find the ratio in which the line 3x + y − 9 = 0 divides the line segment joining the points (1, 3) and (2, 7).", y: "CBSE 2014-16", m: 3, ans: "Section point: ((2k+1)/(k+1), (7k+3)/(k+1)). Substituting: 3(2k+1) + (7k+3) − 9(k+1) = 0 ⇒ 4k = 3 ⇒ k = 3/4. Ratio 3 : 4." },
  { q: "Find the coordinates of the points of trisection of the line segment joining (4, −1) and (−2, −3).", y: "CBSE 2012-15", m: 3, ans: "P divides the segment in 1 : 2 ⇒ P = ((1·(−2) + 2·4)/3, (1·(−3) + 2·(−1))/3) = (2, −5/3). Q divides in 2 : 1 ⇒ Q = ((2·(−2) + 1·4)/3, (2·(−3) + 1·(−1))/3) = (0, −7/3)." },
],

"maths-0-7": [
  { q: "If sin θ + cos θ = √2, prove that sin θ cos θ = ½.", y: "CBSE 2012-15", m: 3, ans: "Squaring: 1 + 2 sin θ cos θ = 2 ⇒ sin θ cos θ = ½ (and θ = 45°)." },
  { q: "Prove that √((1 + sin A)/(1 − sin A)) = sec A + tan A.", y: "CBSE 2013-16", m: 3, ans: "√((1+sinA)/(1−sinA)) × √((1+sinA)/(1+sinA)) = (1+sinA)/cosA = sec A + tan A." },
  { q: "If tan 2A = cot(A − 18°), where 2A is an acute angle, find the value of A.", y: "CBSE 2011-14", m: 2, ans: "cot(A − 18°) = tan(90° − (A − 18°)). So 2A = 90° − A + 18° ⇒ 3A = 108° ⇒ A = 36°." },
],

"maths-0-8": [
  { q: "A TV tower stands vertically on the bank of a canal. From a point on the other bank directly opposite the tower, the angle of elevation of the top of the tower is 60°. From another point 20 m away from this point on the same bank, the angle of elevation of the top of the tower is 30°. Find the height of the tower and the width of the canal.", y: "CBSE 2013-16", m: 5, ans: "h = w tan60 = (w+20) tan30 ⇒ w√3 = (w+20)/√3 ⇒ 3w = w + 20 ⇒ w = 10 m, h = 10√3 m." },
  { q: "The angle of elevation of the top of a hill at the foot of a tower is 60° and the angle of elevation of the top of the tower from the foot of the hill is 30°. If the tower is 50 m high, find the height of the hill.", y: "CBSE 2012-15", m: 3, ans: "Distance = 50/tan30 = 50√3. Hill height = 50√3 × tan60 = 50√3 × √3 = 150 m." },
],

"maths-0-9": [
  { q: "XY and X′Y′ are two parallel tangents to a circle with centre O, and another tangent AB with point of contact C intersects XY at A and X′Y′ at B. Prove that ∠AOB = 90°.", y: "CBSE 2013-16", m: 4, ans: "Join OA, OB and OC. OP ⊥ XY and OC ⊥ AB (radius ⊥ tangent). In right triangles OAP and OAC: OP = OC (radii), OA common ⇒ ΔOAP ≅ ΔOAC ⇒ OA bisects ∠POC. Similarly OB bisects ∠COQ. Since XY ∥ X′Y′, ∠POQ = 180°. Therefore ∠AOB = ∠AOC + ∠COB = ½∠POC + ½∠COQ = ½ × 180° = 90°." },
  { q: "A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.", y: "CBSE 2011-15", m: 3, ans: "Tangents from each vertex are equal: AP = AS, BP = BQ, CR = CQ, DR = DS. AB + CD = (AP+BP) + (CR+DR) = (AS+BQ) + (CQ+DS) = AD + BC." },
],

"maths-0-10": [
  { q: "Find the area of a sector of a circle with radius 4 cm and angle 30°. Also find the length of the corresponding arc.", y: "CBSE 2012-15", m: 3, ans: "Area = (30/360)π(16) = 4π/3 ≈ 4.19 cm²; arc = (30/360) × 2π × 4 = 2π/3 ≈ 2.09 cm." },
  { q: "The wheels of a car are of diameter 80 cm each. How many complete revolutions does each wheel make in 10 minutes when the car is travelling at a speed of 66 km per hour?", y: "CBSE 2013-15", m: 3, ans: "Circumference = π × 0.8 m. Distance in 10 min = 66 × 1000 × (10/60) = 11000 m. Revolutions = 11000/(0.8π) = 4375." },
],

"maths-0-11": [
  { q: "A solid cylinder has a total surface area of 462 cm². Its curved surface area is one-third of its total surface area. Find the radius and height of the cylinder.", y: "CBSE 2013-16", m: 4, ans: "CSA = 154 ⇒ 2πrh = 154; TSA − CSA = 2πr² = 308 ⇒ r² = 49 ⇒ r = 7 cm; then h = 154/(2π×7) = 3.5 cm." },
  { q: "A sphere of radius 8 cm is melted and recast into a right circular cone of height 32 cm. Find the radius of the base of the cone.", y: "CBSE 2012-15", m: 2, ans: "(4/3)π(8)³ = (1/3)πr²(32) ⇒ r² = 64 ⇒ r = 8 cm." },
  { q: "A 20 m deep well with diameter 7 m is dug, and the earth from digging is evenly spread out to form a platform 22 m by 14 m. Find the height of the platform.", y: "CBSE 2011-14", m: 3, ans: "Earth volume = π(3.5)²(20) = 770 m³. Height = 770/(22 × 14) = 2.5 m." },
],

"maths-0-12": [
  { q: "The following data gives the lifetimes (in hours) of 225 electrical components: 0-20 (f = 10), 20-40 (35), 40-60 (52), 60-80 (61), 80-100 (38), 100-120 (29). Find the modal lifetime.", y: "CBSE 2012-15", m: 3, ans: "Modal class 60-80. Mode = 60 + (61−52)/(2×61 − 52 − 38) × 20 = 60 + 9/32 × 20 = 65.625 hours." },
  { q: "For a frequency distribution, Mean = 10 and Median = 12. Using the empirical relationship, find the Mode.", y: "CBSE 2011-13", m: 2, ans: "Mode = 3 Median − 2 Mean = 36 − 20 = 16." },
  { q: "Find the mean of the first 10 odd natural numbers.", y: "CBSE 2011-14", m: 2, ans: "1 + 3 + … + 19 = 100. Mean = 100/10 = 10." },
],

"maths-0-13": [
  { q: "A bag contains 5 red balls and some blue balls. If the probability of drawing a blue ball is double that of drawing a red ball, find the number of blue balls.", y: "CBSE 2012-15", m: 3, ans: "Let blue = b. b/(5+b) = 2 × 5/(5+b) ⇒ b = 10." },
  { q: "Two coins are tossed together. Find the probability of getting at least one head.", y: "CBSE 2011-14", m: 2, ans: "Outcomes: HH, HT, TH, TT. At least one head = 3/4." },
  { q: "A number is selected at random from 1 to 50. Find the probability that it is a multiple of 7.", y: "CBSE 2012-15", m: 2, ans: "Multiples: 7, 14, 21, 28, 35, 42, 49 = 7. P = 7/50." },
  { q: "A die is thrown once. Find the probability of getting a number lying between 2 and 6.", y: "CBSE 2011-13", m: 1, ans: "Favourable: 3, 4, 5. P = 3/6 = 1/2." },
],
};
