/* Class 10 Maths — CBSE Previous Year Questions (Board PYQs), chapters 1–7.
   Real board-exam questions with year + marks, answers concise.
   Chapter keys match the site: maths-0-0 … maths-0-13 (NCERT 2026-27, 14 chapters). */
import type { Pyq } from "./pyq";

export const PYQ_A: Record<string, Pyq[]> = {

/* ---------------- Chapter 1 · Real Numbers ---------------- */
"maths-0-0": [
  { q: "Prove that √2 is an irrational number.", y: "CBSE 2025, 2023", m: 3, ans: "Assume √2 = p/q (co-prime). Then p² = 2q² ⇒ p even, p = 2k ⇒ q² = 2k² ⇒ q even too — contradicts co-prime. Hence √2 is irrational." },
  { q: "Prove that √3 is an irrational number.", y: "CBSE 2020", m: 3, ans: "Same contradiction method: √3 = a/b ⇒ a² = 3b² ⇒ a = 3k ⇒ b² = 3k² ⇒ both divisible by 3 — contradiction." },
  { q: "Prove that 4 − 2√5 is an irrational number, given that √5 is irrational.", y: "CBSE 2026, 2023", m: 2, ans: "Assume 4 − 2√5 = p/q (rational) ⇒ √5 = (4q − p)/2q, which is rational — contradicts √5 irrational. Hence 4 − 2√5 is irrational." },
  { q: "If √2 is irrational, prove that 5 − 2√2 is also irrational.", y: "CBSE 2023 Compt.", m: 2, ans: "If 5 − 2√2 were rational, then √2 = (5 − rational)/2 would be rational — contradiction. Hence irrational." },
  { q: "Show that 6ⁿ can never end with the digit 0 for any natural number n.", y: "CBSE 2023", m: 3, ans: "6 = 2 × 3, so 6ⁿ = 2ⁿ × 3ⁿ has no factor 5. A number ending in 0 must be divisible by 10 = 2 × 5. Hence 6ⁿ never ends in 0." },
  { q: "Find the HCF and LCM of 72 and 120 by prime factorisation.", y: "CBSE 2023", m: 3, ans: "72 = 2³ × 3², 120 = 2³ × 3 × 5. HCF = 2³ × 3 = 24, LCM = 2³ × 3² × 5 = 360." },
  { q: "Using prime factorisation, find the HCF and LCM of 96 and 120.", y: "CBSE 2023", m: 3, ans: "96 = 2⁵ × 3, 120 = 2³ × 3 × 5. HCF = 2³ × 3 = 24, LCM = 2⁵ × 3 × 5 = 480." },
  { q: "Find the greatest 3-digit number which is exactly divisible by 18, 24 and 36.", y: "CBSE 2023", m: 3, ans: "LCM(18, 24, 36) = 72. Greatest 3-digit multiple: 999 ÷ 72 = 13 (remainder dropped) → 13 × 72 = 936." },
  { q: "The traffic lights at three different road crossings change after every 48 s, 72 s and 108 s. If they change simultaneously at 7 a.m., after how long will they change together again?", y: "CBSE 2020", m: 3, ans: "LCM(48, 72, 108) = 432 s = 7 min 12 s. They change together at 7:07:12 a.m." },
  { q: "Find the HCF and LCM of 26, 65 and 117 using prime factorisation.", y: "CBSE 2020", m: 3, ans: "26 = 2×13, 65 = 5×13, 117 = 3²×13. HCF = 13, LCM = 2 × 3² × 5 × 13 = 1170." },
  { q: "If p = ab³ and q = a²b, where a and b are prime numbers, find LCM(p, q).", y: "CBSE 2020 Compt.", m: 2, ans: "LCM = highest powers = a²b³." },
  { q: "The LCM of two numbers is 9 times their HCF. If the sum of LCM and HCF is 500, find the HCF.", y: "CBSE 2019 Compt.", m: 2, ans: "Let HCF = x ⇒ LCM = 9x. x + 9x = 500 ⇒ x = 50. HCF = 50." },
  { q: "Find the largest number which divides 70 and 125 leaving remainders 5 and 8 respectively.", y: "CBSE 2019", m: 2, ans: "Required number = HCF(70 − 5, 125 − 8) = HCF(65, 117) = 13." },
  { q: "MCQ — The decimal expansion of 13/3125 will terminate after how many decimal places?", y: "CBSE 2020", m: 1, ans: "3125 = 5⁵. 13/3125 = 416/100000 → terminates after 5 places. Answer: 5." },
],

/* ---------------- Chapter 2 · Polynomials ---------------- */
"maths-0-1": [
  { q: "Find the zeroes of the quadratic polynomial 6x² − 3 − 7x and verify the relationship between the zeroes and the coefficients.", y: "CBSE 2023", m: 3, ans: "6x² − 7x − 3 = (2x − 3)(3x + 1). Zeroes: 3/2 and −1/3. Sum = 7/6 = −b/a ✓, Product = −1/2 = c/a ✓." },
  { q: "Find the zeroes of the quadratic polynomial 3x² − x − 4 and verify the relations between the zeroes and the coefficients.", y: "CBSE 2023", m: 3, ans: "3x² − x − 4 = (3x − 4)(x + 1). Zeroes: 4/3, −1. Sum = 1/3 = −b/a ✓, Product = −4/3 = c/a ✓." },
  { q: "Find a quadratic polynomial whose zeroes are 5 and −7.", y: "CBSE 2022", m: 2, ans: "Sum = −2, Product = −35. Polynomial: x² + 2x − 35." },
  { q: "If one zero of the quadratic polynomial (a² + 9)x² + 13x + 6a is the reciprocal of the other, find the value of a.", y: "CBSE 2020", m: 3, ans: "Product of zeroes = 1 ⇒ 6a/(a² + 9) = 1 ⇒ a² − 6a + 9 = 0 ⇒ (a − 3)² = 0 ⇒ a = 3." },
  { q: "If the zeroes of the cubic polynomial x³ − 3x² + x + 1 are a − b, a and a + b, find the value of a.", y: "CBSE 2019", m: 2, ans: "Sum of zeroes = 3a = −(−3)/1 = 3 ⇒ a = 1." },
  { q: "Divide the polynomial 3x² − x³ − 3x + 5 by x − 1 − x² and verify the division algorithm.", y: "CBSE 2019", m: 3, ans: "Dividing −x³ + 3x² − 3x + 5 by −x² + x − 1 gives quotient x − 2, remainder 3. Check: Dividend = Divisor × Quotient + Remainder ✓." },
  { q: "If the product of the zeroes of ax² − 6x − 6 is 4, find the value of a.", y: "CBSE 2020", m: 2, ans: "Product = c/a = −6/a = 4 ⇒ a = −3/2." },
  { q: "MCQ — If α and β are the zeroes of x² + 7x + 12, then α + β equals:", y: "CBSE 2023", m: 1, ans: "Sum = −b/a = −7. Answer: −7." },
  { q: "MCQ — The graph of y = p(x) is a parabola that cuts the x-axis at 3 points. The number of zeroes of p(x) is:", y: "CBSE 2020", m: 1, ans: "Number of zeroes = number of x-intercepts = 3." },
  { q: "MCQ — If one zero of kx² + 3x + 4 is 1, then k equals:", y: "CBSE 2019 Compt.", m: 1, ans: "p(1) = k + 3 + 4 = 0 ⇒ k = −7." },
  { q: "If α and β are the zeroes of the polynomial p(x) = x² − 5x + 6, find the value of α + β + αβ.", y: "CBSE 2020 Compt.", m: 2, ans: "α + β = 5, αβ = 6 ⇒ α + β + αβ = 11." },
],

/* ---------------- Chapter 3 · Pair of Linear Equations ---------------- */
"maths-0-2": [
  { q: "For what value of k will the pair 2x + 3y = 5 and 4x + ky = 10 have infinitely many solutions?", y: "CBSE 2020", m: 2, ans: "Need a₁/a₂ = b₁/b₂ = c₁/c₂: 2/4 = 3/k = 5/10 ⇒ k = 6." },
  { q: "Find the value of k for which the pair kx + 3y = k − 3 and 12x + ky = k has no solution.", y: "CBSE 2019", m: 2, ans: "No solution: k/12 = 3/k ≠ (k−3)/k. k² = 36; k = −6 (k = 6 gives infinite solutions). Answer: k = −6." },
  { q: "Solve the following pair of equations by substitution: 2x + 3y = 11 and 2x − 4y = −24.", y: "CBSE 2019", m: 3, ans: "Subtracting: 7y = 35 ⇒ y = 5, then x = (11 − 15)/2 = −2. Solution: x = −2, y = 5." },
  { q: "Draw the graphs of x − y + 1 = 0 and 3x + 2y − 12 = 0. Determine the coordinates of the vertices of the triangle formed by these lines and the x-axis, and shade the triangular region.", y: "CBSE 2019", m: 5, ans: "Lines meet at (2, 3). x-axis intercepts: (−1, 0) and (4, 0). Triangle vertices: (2, 3), (−1, 0), (4, 0); area = ½ × 5 × 3 = 7.5 sq units." },
  { q: "A fraction becomes 9/11 if 2 is added to both numerator and denominator. If 3 is added to both, it becomes 5/6. Find the fraction.", y: "CBSE 2020", m: 3, ans: "(x+2)/(y+2) = 9/11 and (x+3)/(y+3) = 5/6 give 11x − 9y = −4, 6x − 5y = −3 ⇒ x = 7, y = 9. Fraction = 7/9." },
  { q: "A boat covers 32 km upstream and 36 km downstream in 7 hours. Also, it covers 40 km upstream and 48 km downstream in 9 hours. Find the speed of the boat in still water and that of the stream.", y: "CBSE 2019", m: 5, ans: "Let u = 1/(b−s), v = 1/(b+s): 32u + 36v = 7, 40u + 48v = 9 ⇒ u = 1/8, v = 1/12. Boat = 10 km/h, stream = 2 km/h." },
  { q: "2 women and 5 men can together finish an embroidery work in 4 days, while 3 women and 6 men can finish it in 3 days. Find the time taken by 1 woman alone, and that taken by 1 man alone.", y: "CBSE 2019", m: 5, ans: "8w + 20m = 1 and 9w + 18m = 1 ⇒ w = m/2… solving: 1 woman alone = 18 days, 1 man alone = 36 days." },
  { q: "The sum of a two-digit number and the number obtained by reversing the digits is 66. If the digits of the number differ by 2, find the number. How many such numbers are there?", y: "CBSE 2023", m: 3, ans: "x + y = 6 and |x − y| = 2 ⇒ digits 4 and 2. Numbers: 42 and 24 — there are two such numbers." },
  { q: "Meena went to a bank to withdraw ₹2000. She asked the cashier to give her ₹50 and ₹100 notes only. Meena got 25 notes in all. Find how many notes of ₹50 and ₹100 she received.", y: "CBSE 2020", m: 3, ans: "x + y = 25, 50x + 100y = 2000 ⇒ x = 10, y = 15. 10 notes of ₹50 and 15 notes of ₹100." },
  { q: "MCQ — The pair 3x + y = 1 and kx + 2y = 5 has a unique solution when:", y: "CBSE 2023", m: 1, ans: "Unique solution needs 3/k ≠ 1/2 ⇒ k ≠ 6. Answer: k ≠ 6." },
  { q: "The age of the father is twice the sum of the ages of his two children. After 20 years, his age will be equal to the sum of the ages of his children. Find the age of the father.", y: "CBSE 2020 Compt.", m: 3, ans: "F = 2(x+y) and F + 20 = (x+20) + (y+20) ⇒ 2(x+y) + 20 = x + y + 40 ⇒ x + y = 20. Father = 40 years." },
],

/* ---------------- Chapter 4 · Quadratic Equations ---------------- */
"maths-0-3": [
  { q: "Find the discriminant of 2x² − 4x + 3 = 0 and hence describe the nature of its roots.", y: "CBSE 2023", m: 2, ans: "D = b² − 4ac = 16 − 24 = −8 < 0 ⇒ no real roots (two distinct complex roots)." },
  { q: "Find the value of k for which the equation kx(x − 2) + 6 = 0 has two equal roots.", y: "CBSE 2023, 2019", m: 2, ans: "kx² − 2kx + 6 = 0. Equal roots: D = 4k² − 24k = 0 ⇒ k = 6 (k ≠ 0)." },
  { q: "Solve the quadratic equation 2x² + ax − a² = 0 by factorisation.", y: "CBSE 2023", m: 2, ans: "2x² + ax − a² = (2x − a)(x + a) = 0 ⇒ x = a/2 or x = −a." },
  { q: "Find two consecutive positive integers, the sum of whose squares is 365.", y: "CBSE 2019", m: 3, ans: "x² + (x+1)² = 365 ⇒ 2x² + 2x − 364 = 0 ⇒ x² + x − 182 = 0 ⇒ x = 13. Integers: 13 and 14." },
  { q: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, the journey would have taken 1 hour less. Find the speed of the train.", y: "CBSE 2019", m: 3, ans: "360/x − 360/(x+5) = 1 ⇒ x² + 5x − 1800 = 0 ⇒ x = 40. Speed = 40 km/h." },
  { q: "The difference of the squares of two numbers is 180. The square of the smaller number is 8 times the larger number. Find the two numbers.", y: "CBSE 2020", m: 4, ans: "x² − y² = 180, y² = 8x ⇒ x² − 8x − 180 = 0 ⇒ x = 18 ⇒ y² = 144. Numbers: 18 and 12 (or 18 and −12)." },
  { q: "If −5 is a root of the quadratic equation 2x² + px − 15 = 0 and the quadratic equation p(x² + x) + k = 0 has equal roots, find the value of k.", y: "CBSE 2019", m: 3, ans: "2(25) − 5p − 15 = 0 ⇒ p = 7. 7x² + 7x + k = 0, equal roots: 49 − 28k = 0 ⇒ k = 7/4." },
  { q: "The sum of the squares of two consecutive multiples of 7 is 637. Find the multiples.", y: "CBSE 2023", m: 3, ans: "(7x)² + (7x+7)² = 637 ⇒ 49x² + 49(x+1)² = 637 ⇒ x² + (x+1)² = 13 ⇒ x = 2. Multiples: 14 and 21." },
  { q: "In a class test, the sum of Shefali's marks in Mathematics and English is 30. Had she got 2 marks more in Mathematics and 3 marks less in English, the product of their marks would have been 210. Find her marks in the two subjects.", y: "CBSE 2019", m: 3, ans: "(x+2)(33−x) = 210 ⇒ x² − 31x + 144 = 0 ⇒ x = 28 or 3. Marks: Maths 28, English 2 (or Maths 3, English 27)." },
  { q: "Solve for x: 1/(x+1) + 2/(x+2) = 4/(x+4), x ≠ −1, −2, −4.", y: "CBSE 2020", m: 3, ans: "(x+2)(x+4) + 2(x+1)(x+4) = 4(x+1)(x+2) ⇒ 3x² + 16x + 16 = 4x² + 12x + 8 ⇒ x² − 4x − 8 = 0 ⇒ x = 2 ± 2√3." },
  { q: "MCQ — The roots of x² − x − 2 = 0 are:", y: "CBSE 2020", m: 1, ans: "(x−2)(x+1) = 0 ⇒ x = 2, −1." },
  { q: "A motorboat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.", y: "CBSE 2019 Compt.", m: 4, ans: "24/(18−s) − 24/(18+s) = 1 ⇒ 324 − s² = 48s ⇒ s² + 48s − 324 = 0 ⇒ s = 6. Stream speed = 6 km/h." },
],

/* ---------------- Chapter 5 · Arithmetic Progressions ---------------- */
"maths-0-4": [
  { q: "Which term of the AP 21, 18, 15, … is zero?", y: "CBSE 2023", m: 2, ans: "aₙ = 21 + (n−1)(−3) = 0 ⇒ n = 8. The 8th term." },
  { q: "Find the 10th term from the end of the AP 4, 9, 14, …, 249.", y: "CBSE 2023", m: 2, ans: "10th from end = 249 − 9 × 5 = 204." },
  { q: "How many terms of the AP 9, 17, 25, … must be taken to give a sum of 636?", y: "CBSE 2019", m: 3, ans: "n/2[18 + (n−1)8] = 636 ⇒ 4n² + 5n − 636 = 0 ⇒ n = 12. Twelve terms." },
  { q: "Find the sum of the first 22 terms of the AP 8, 3, −2, …", y: "CBSE 2019", m: 2, ans: "S₂₂ = 11[2(8) + 21(−5)] = 11 × (−89) = −979." },
  { q: "The sum of the 4th and 8th terms of an AP is 24 and the sum of the 6th and 10th terms is 44. Find the first seven terms of the AP.", y: "CBSE 2019", m: 3, ans: "2a + 10d = 24, 2a + 14d = 44 ⇒ d = 5, a = −13. First seven terms: −13, −8, −3, 2, 7, 12, 17." },
  { q: "For what value of n, are the nth terms of two APs 63, 65, 67, … and 3, 10, 17, … equal?", y: "CBSE 2020", m: 3, ans: "61 + 2n = 7n − 4 ⇒ 5n = 65 ⇒ n = 13." },
  { q: "An AP consists of 50 terms. The sum of its first 10 terms is 210 and the sum of the last 15 terms is 2565. Find the AP.", y: "CBSE 2020", m: 3, ans: "2a + 9d = 42 and 2a + 84d = 342 ⇒ d = 4, a = 3. AP: 3, 7, 11, 15, …" },
  { q: "If the sum of the first n even natural numbers is 420, find the value of n.", y: "CBSE 2023", m: 2, ans: "n(n+1) = 420 ⇒ n² + n − 420 = 0 ⇒ n = 20." },
  { q: "Find the sum of the odd numbers between 0 and 50.", y: "CBSE 2020", m: 2, ans: "1 + 3 + … + 49: n = 25, S = 25² = 625." },
  { q: "MCQ — If the sum of the first n terms of an AP is Sₙ = 3n² + 5n, then its common difference is:", y: "CBSE 2020", m: 1, ans: "aₙ = Sₙ − Sₙ₋₁ = 6n + 2 ⇒ d = 6." },
  { q: "Which term of the AP 3, 8, 13, 18, … is 78?", y: "CBSE 2020", m: 2, ans: "3 + (n−1)5 = 78 ⇒ n = 16. The 16th term." },
],

/* ---------------- Chapter 6 · Triangles ---------------- */
"maths-0-5": [
  { q: "State and prove the Basic Proportionality Theorem (Thales' theorem).", y: "CBSE 2020, 2019", m: 4, ans: "Statement: a line parallel to one side of a triangle divides the other two sides in the same ratio. Proof: join BE and CD. ΔADE and ΔBDE have the same altitude from E to AB ⇒ ar(ΔADE)/ar(ΔBDE) = AD/DB; from D, ar(ΔADE)/ar(ΔCED) = AE/EC. ΔBDE and ΔCED stand on the same base DE between the same parallels DE and BC ⇒ equal areas. Hence AD/DB = AE/EC." },
  { q: "Prove that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides (Pythagoras theorem).", y: "CBSE 2020, 2019", m: 4, ans: "Draw BD ⊥ AC. ΔADB ~ ΔABC ⇒ AD/AB = AB/AC ⇒ AB² = AD·AC; similarly BC² = DC·AC. Adding: AB² + BC² = AC·(AD + DC) = AC²." },
  { q: "In ΔABC, DE ∥ BC where D is on AB and E is on AC. If AD = x, DB = x − 2, AE = x + 2 and EC = x − 1, find the value of x.", y: "CBSE 2023", m: 3, ans: "AD/DB = AE/EC ⇒ x/(x−2) = (x+2)/(x−1) ⇒ x² − x = x² − 4 ⇒ x = 4." },
  { q: "ABC is a right triangle, right-angled at C. BD ⊥ AC is drawn. Prove that ΔADB ~ ΔBDC and hence BD² = AD × DC.", y: "CBSE 2020", m: 3, ans: "∠ADB = ∠BDC = 90° and ∠A = ∠DBC (each = 90° − ∠ABD) ⇒ ΔADB ~ ΔBDC. Corresponding sides: AD/BD = BD/DC ⇒ BD² = AD × DC." },
  { q: "P and Q are points on the sides AB and AC respectively of ΔABC. If AP = 3 cm, PB = 6 cm, AQ = 5 cm and QC = 10 cm, prove that PQ ∥ BC.", y: "CBSE 2019", m: 2, ans: "AP/PB = 3/6 = 1/2 and AQ/QC = 5/10 = 1/2. Ratios equal ⇒ by converse of BPT, PQ ∥ BC." },
  { q: "A ladder 25 m long reaches a window of a building 20 m above the ground. Find the distance of the foot of the ladder from the building.", y: "CBSE 2020", m: 2, ans: "Distance = √(25² − 20²) = √225 = 15 m." },
  { q: "Two poles of heights 6 m and 11 m stand on level ground. If the distance between their feet is 12 m, find the distance between their tops.", y: "CBSE 2020", m: 3, ans: "Difference of heights = 5 m; distance between tops = √(12² + 5²) = 13 m." },
  { q: "In an equilateral triangle, prove that three times the square of one side is equal to four times the square of one of its altitudes.", y: "CBSE 2020, 2019", m: 3, ans: "In ΔABC with altitude AD: AB² = AD² + (BC/2)² = AD² + AB²/4 ⇒ (3/4)AB² = AD² ⇒ 3AB² = 4AD²." },
  { q: "BL and CM are medians of ΔABC right-angled at A. Prove that 4(BL² + CM²) = 5BC².", y: "CBSE 2019", m: 3, ans: "L, M are midpoints of AC, AB. In right ΔABL: BL² = AB² + AL² = AB² + (AC/2)². Similarly CM² = AC² + (AB/2)². So 4(BL² + CM²) = 4AB² + AC² + 4AC² + AB² = 5(AB² + AC²) = 5BC²." },
  { q: "MCQ — If ΔABC ~ ΔDEF with ∠A = 47° and ∠E = 83°, then ∠C equals:", y: "CBSE 2023", m: 1, ans: "∠D = 47°, so ∠F = 180 − 47 − 83 = 50°. ∠C corresponds to ∠F = 50°." },
  { q: "ΔABC ~ ΔDEF. If BC = 3 cm, EF = 4 cm and ar(ΔABC) = 27 cm², find ar(ΔDEF).", y: "CBSE 2023", m: 2, ans: "Ratio of areas = (BC/EF)² = 9/16 ⇒ ar(ΔDEF) = 27 × 16/9 = 48 cm²." },
],

/* ---------------- Chapter 7 · Coordinate Geometry ---------------- */
"maths-0-6": [
  { q: "Find the ratio in which the point (−1, 6) divides the line segment joining the points (−3, 10) and (6, −8).", y: "CBSE 2020 Compt.", m: 2, ans: "Section formula on x: (6k − 3)/(k + 1) = −1 ⇒ 7k = 2 ⇒ k = 2/7. Ratio 2 : 7." },
  { q: "Find the point on the y-axis which is equidistant from the points (5, −2) and (−3, 2).", y: "CBSE 2019", m: 2, ans: "Point (0, y): 25 + (y+2)² = 9 + (y−2)² ⇒ 29 + 4y = 13 − 4y ⇒ y = −2. Point: (0, −2)." },
  { q: "Find a relation between x and y such that the point (x, y) is equidistant from the points (3, 6) and (−3, 4).", y: "CBSE 2023", m: 2, ans: "(x−3)² + (y−6)² = (x+3)² + (y−4)² ⇒ −6x − 12y + 45 = 6x − 8y + 25 ⇒ 12x + 4y = 20 ⇒ 3x + y = 5." },
  { q: "Find the area of the rhombus if its vertices are (3, 0), (4, 5), (−1, 4) and (−2, −1).", y: "CBSE 2019", m: 3, ans: "Diagonals AC = √32, BD = √72. Area = ½ d₁d₂ = ½ × √2304 = 24 sq units." },
  { q: "Find the value of k if the points (7, −2), (5, 1) and (3, k) are collinear.", y: "CBSE 2023", m: 2, ans: "Area = 0: ½[7(1−k) + 5(k+2) + 3(−3)] = 0 ⇒ 7 − 7k + 5k + 10 − 9 = 0 ⇒ k = 4." },
  { q: "Find the coordinates of the point which divides the join of (−1, 7) and (4, −3) in the ratio 2 : 3.", y: "CBSE 2020", m: 2, ans: "((2×4 + 3×(−1))/5, (2×(−3) + 3×7)/5) = (1, 3)." },
  { q: "If (1, 2), (4, y), (x, 6) and (3, 5) are the vertices of a parallelogram taken in order, find x and y.", y: "CBSE 2020", m: 3, ans: "Diagonals bisect: midpoints equal ⇒ (1+x)/2 = (4+3)/2 ⇒ x = 6; (2+y)/2 = (6+5)/2 ⇒ y = 7." },
  { q: "Show that the points (1, 7), (4, 2), (−1, −1) and (−4, 4) are the vertices of a square.", y: "CBSE 2019", m: 3, ans: "All sides = √34; diagonals = √68 each; i.e. equal sides + equal diagonals ⇒ square." },
  { q: "Determine the ratio in which the line 2x + y − 4 = 0 divides the segment joining A(2, −2) and B(3, 1).", y: "CBSE 2019", m: 3, ans: "Point = (2+t, −2+3t). 2(2+t) + (−2+3t) − 4 = 0 ⇒ t = 2/5 ⇒ ratio 2 : 3." },
  { q: "MCQ — The distance of the point (−6, 8) from the origin is:", y: "CBSE 2020", m: 1, ans: "√(36 + 64) = 10." },
],
};
