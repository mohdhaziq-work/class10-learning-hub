/* Class 10 Maths — CBSE Previous Year Questions (Board PYQs), chapters 8–14. */
import type { Pyq } from "./pyq";

export const PYQ_B: Record<string, Pyq[]> = {

/* ---------------- Chapter 8 · Introduction to Trigonometry ---------------- */
"maths-0-7": [
  { q: "Prove that sec A (1 − sin A) (sec A + tan A) = 1.", y: "CBSE 2020, 2019", m: 3, ans: "sec A(sec A + tan A)(1 − sin A) = (1/cos A)·((1+sin A)/cos A)·(1 − sin A) = (1 − sin²A)/cos²A = cos²A/cos²A = 1." },
  { q: "If sin A = 3/4, prove that √(sec² A − 1) = 3/√7.", y: "CBSE 2019", m: 3, ans: "cos A = √(1 − 9/16) = √7/4. sec A = 4/√7. √(sec²A − 1) = √(16/7 − 1) = √(9/7) = 3/√7." },
  { q: "Prove that tan θ/(1 − cot θ) + cot θ/(1 − tan θ) = 1 + sec θ cosec θ.", y: "CBSE 2019", m: 3, ans: "Put a = tan θ (cot θ = 1/a). LHS = a/(1 − 1/a) + (1/a)/(1 − a) = (a³ − 1)/(a(a − 1)) = (a² + a + 1)/a = a + 1 + 1/a = tan θ + cot θ + 1. Since tan θ + cot θ = 1/(sin θ cos θ), LHS = 1 + sec θ cosec θ." },
  { q: "If √3 tan θ = 3 sin θ, find the value of cos² θ − sin² θ.", y: "CBSE 2020", m: 2, ans: "√3 (sin θ/cos θ) = 3 sin θ ⇒ cos θ = 1/√3 (sin θ ≠ 0). cos²θ = 1/3, sin²θ = 2/3 ⇒ cos²θ − sin²θ = −1/3." },
  { q: "If tan (A + B) = √3 and tan (A − B) = 1/√3, 0° < A + B ≤ 90°, A > B, find A and B.", y: "CBSE 2019", m: 2, ans: "A + B = 60°, A − B = 30° ⇒ A = 45°, B = 15°." },
  { q: "Prove that sin θ (1 + tan θ) + cos θ (1 + cot θ) = sec θ + cosec θ.", y: "CBSE 2020", m: 3, ans: "LHS = sin θ + cos θ + sin²θ/cos θ + cos²θ/sin θ. Over LCM sin θ cos θ the numerator becomes (sin θ + cos θ)(sin θ cos θ) + sin³θ + cos³θ = (sin θ + cos θ)[sin θ cos θ + 1 − sin θ cos θ] = sin θ + cos θ. So LHS = (sin θ + cos θ)/(sin θ cos θ) = sec θ + cosec θ." },
  { q: "If sec θ + tan θ = p, prove that sin θ = (p² − 1)/(p² + 1).", y: "CBSE 2020", m: 3, ans: "sec θ − tan θ = 1/p (since sec²θ − tan²θ = 1). Adding: 2 sec θ = p + 1/p ⇒ cos θ = 2p/(p² + 1) ⇒ sin θ = √(1 − cos²θ) = (p² − 1)/(p² + 1)." },
  { q: "Prove that (cosec θ − cot θ)² = (1 − cos θ)/(1 + cos θ).", y: "CBSE 2020, 2019", m: 3, ans: "LHS = (1/sin θ − cos θ/sin θ)² = (1 − cos θ)²/sin²θ = (1 − cos θ)²/(1 − cos²θ) = (1 − cos θ)/(1 + cos θ)." },
  { q: "MCQ — The value of (sin 60° cos 30° + sin 30° cos 60°) is:", y: "CBSE 2023", m: 1, ans: "= sin(60° + 30°) = sin 90° = 1." },
  { q: "MCQ — If sin θ = cos θ, 0° < θ < 90°, then θ equals:", y: "CBSE 2020", m: 1, ans: "tan θ = 1 ⇒ θ = 45°." },
  { q: "Prove that (1 + cot A − cosec A)(1 + tan A + sec A) = 2.", y: "CBSE 2019 Compt.", m: 3, ans: "(1 + cot A − cosec A)(1 + tan A + sec A) = [(sin A + cos A − 1)/sin A] × [(sin A + cos A + 1)/cos A] = ((sin A + cos A)² − 1)/(sin A cos A) = (1 + 2 sin A cos A − 1)/(sin A cos A) = 2." },
],

/* ---------------- Chapter 9 · Some Applications of Trigonometry ---------------- */
"maths-0-8": [
  { q: "A tower stands vertically on the ground. From a point which is 30 m away from the foot of the tower, the angle of elevation of the top of the tower is 60°. Find the height of the tower.", y: "CBSE 2023", m: 2, ans: "h = 30 tan 60° = 30√3 ≈ 51.96 m." },
  { q: "A ladder 15 m long leans against a wall making an angle of 60° with the ground. Find the height of the wall.", y: "CBSE 2019 Compt.", m: 2, ans: "h = 15 sin 60° = 15√3/2 ≈ 12.99 m." },
  { q: "The angle of elevation of the top of a tower from a point on the ground is 30°. On moving 20 m closer, the angle of elevation becomes 60°. Find the height of the tower.", y: "CBSE 2020", m: 3, ans: "h = x tan 30° = (x − 20) tan 60° ⇒ x/√3 = (x−20)√3 ⇒ x = 30 ⇒ h = 30/√3 = 10√3 ≈ 17.32 m." },
  { q: "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Find the height of the tower.", y: "CBSE 2019", m: 3, ans: "Distance = 7 m (45°). Tower part above building = 7 tan 60° = 7√3. Height = 7 + 7√3 = 7(1 + √3) ≈ 19.12 m." },
  { q: "A kite is flying with a string of length 100 m. If the string makes an angle of 60° with the ground, find the height of the kite (use √3 = 1.732).", y: "CBSE 2020", m: 2, ans: "h = 100 sin 60° = 50√3 ≈ 86.6 m." },
  { q: "Two poles of equal heights are standing opposite each other on either side of the road, which is 80 m wide. From a point between them on the road, the angles of elevation of the top of the poles are 60° and 30°. Find the height of the poles and the distances of the point from the poles.", y: "CBSE 2019", m: 3, ans: "x√3 = (80 − x)/√3 ⇒ 3x = 80 − x ⇒ x = 20 m. Height = 20 tan 60° = 20√3 m; point is 20 m and 60 m from the poles." },
  { q: "As observed from the top of a 75 m tall lighthouse, the angles of depression of two ships approaching it are 30° and 45°. If one ship is directly behind the other, find the distance between the ships.", y: "CBSE 2020", m: 3, ans: "Distances from foot: 75 m (45°) and 75√3 m (30°). Distance between ships = 75(√3 − 1) ≈ 54.9 m." },
  { q: "A statue 1.6 m tall stands on the top of a pedestal. From a point on the ground, the angle of elevation of the top of the statue is 60° and the angle of elevation of the top of the pedestal is 45°. Find the height of the pedestal.", y: "CBSE 2019", m: 3, ans: "Pedestal h = distance d (45°). (h + 1.6) = d√3 ⇒ h√3 = h + 1.6 ⇒ h = 1.6/(√3 − 1) = 0.8(√3 + 1) ≈ 2.19 m." },
  { q: "MCQ — If the height of a tower is √3 times the length of its shadow, then the angle of elevation of the sun is:", y: "CBSE 2020", m: 1, ans: "tan θ = √3 ⇒ θ = 60°." },
  { q: "A straight highway leads to the foot of a tower. A man standing at the top of the tower observes a car at an angle of depression of 30°, which is approaching the foot of the tower with uniform speed. Six seconds later, the angle of depression of the car is found to be 60°. Find the time taken by the car to reach the foot of the tower.", y: "CBSE 2019", m: 3, ans: "Distances from the tower: h√3 (at 30°) and h/√3 (at 60°). In 6 s the car covers h√3 − h/√3 = 2h/√3. The remaining h/√3 at the same speed takes 3 s. Time to reach the foot = 3 seconds." },
],

/* ---------------- Chapter 10 · Circles ---------------- */
"maths-0-9": [
  { q: "Prove that the tangents drawn from an external point to a circle are equal in length.", y: "CBSE 2020, 2019", m: 4, ans: "In ΔOTP and ΔOQT: OP = OQ (radii), OT common, ∠OPT = ∠OQT = 90° (radius ⊥ tangent) ⇒ RHS congruence ⇒ TP = TQ." },
  { q: "Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact.", y: "CBSE 2020", m: 3, ans: "Take any point P on the tangent other than contact point T. OP > OT (P lies outside the circle as every other point of the tangent lies outside). So OT is the shortest distance from O ⇒ OT ⊥ tangent." },
  { q: "Two concentric circles are of radii 5 cm and 3 cm. Find the length of the chord of the larger circle which touches the smaller circle.", y: "CBSE 2020, 2019", m: 2, ans: "Chord of big circle = tangent of small. Half-chord = √(5² − 3²) = 4. Chord = 8 cm." },
  { q: "PQ is a chord of length 8 cm of a circle of radius 5 cm. The tangents at P and Q intersect at a point T. Find the length of TP.", y: "CBSE 2020", m: 3, ans: "Distance of chord from centre = √(25 − 16) = 3 cm. The tangents meet at T with OT = 25/3 cm. TP = √(OT² − r²) = √(625/9 − 25) = √(400/9) = 20/3 = 6⅔ cm." },
  { q: "Prove that a parallelogram circumscribing a circle is a rhombus.", y: "CBSE 2019", m: 3, ans: "Tangents from each vertex are equal: sum opposite sides of circumscribing quadrilateral are equal ⇒ AB + CD = AD + BC. In a parallelogram AB = CD, AD = BC ⇒ 2AB = 2BC ⇒ AB = BC. All sides equal ⇒ rhombus." },
  { q: "Prove that the angle between the two tangents drawn from an external point to a circle is supplementary to the angle subtended by the line segment joining the points of contact at the centre.", y: "CBSE 2019", m: 3, ans: "In quadrilateral OPTQ: ∠OPT = ∠OQT = 90° ⇒ ∠PTQ + ∠POQ = 180°. Hence supplementary." },
  { q: "From a point Q, the length of the tangent to a circle is 24 cm and the distance of Q from the centre is 25 cm. Find the radius of the circle.", y: "CBSE 2020", m: 2, ans: "r = √(25² − 24²) = √49 = 7 cm." },
  { q: "Two tangents TP and TQ are inclined to each other at an angle of 100°. Find ∠POQ where O is the centre.", y: "CBSE 2020 Compt.", m: 2, ans: "In quadrilateral OPTQ: 90° + 90° + 100° + ∠POQ = 360° ⇒ ∠POQ = 80°." },
  { q: "Prove that in two concentric circles, the chord of the larger circle which touches the smaller circle is bisected at the point of contact.", y: "CBSE 2019", m: 3, ans: "Chord (tangent of small circle) ⊥ radius at contact. The perpendicular from the centre to a chord bisects the chord ⇒ bisected at the contact point." },
  { q: "MCQ — From a point 10 cm away from the centre of a circle of radius 6 cm, the length of the tangent is:", y: "CBSE 2023", m: 1, ans: "√(100 − 36) = 8 cm." },
],

/* ---------------- Chapter 11 · Areas Related to Circles ---------------- */
"maths-0-10": [
  { q: "Find the area of a sector of a circle of radius 6 cm whose central angle is 60°.", y: "CBSE 2020, 2019", m: 2, ans: "Area = (60/360) × (22/7) × 36 = 132/7 ≈ 18.86 cm²." },
  { q: "The radii of two circles are 8 cm and 6 cm respectively. Find the radius of the circle having area equal to the sum of the areas of the two circles.", y: "CBSE 2020", m: 2, ans: "πR² = 64π + 36π ⇒ R² = 100 ⇒ R = 10 cm." },
  { q: "A chord of a circle of radius 12 cm subtends an angle of 120° at the centre. Find the area of the corresponding segment of the circle.", y: "CBSE 2020", m: 3, ans: "Segment = sector − triangle = (120/360)π(144) − ½(144) sin 120° = 48π − 36√3 ≈ 88.4 cm²." },
  { q: "In a circle of radius 21 cm, an arc subtends an angle of 60° at the centre. Find the length of the arc.", y: "CBSE 2020", m: 2, ans: "Arc = (60/360) × 2π × 21 = 22 cm." },
  { q: "A horse is tied to a peg at one corner of a square shaped grass field of side 15 m by means of a 5 m long rope. Find the area of that part of the field in which the horse can graze.", y: "CBSE 2019", m: 2, ans: "Quadrant of radius 5: (¼)π(25) = 25π/4 ≈ 19.63 m²." },
  { q: "MCQ — If the perimeter of a circle and the perimeter of a square are equal, then the ratio of their areas (circle : square) is:", y: "CBSE 2020", m: 1, ans: "2πr = 4a ⇒ a = πr/2. Ratio = πr² : π²r²/4 = 4 : π = 14 : 11." },
  { q: "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the area of the minor segment.", y: "CBSE 2019", m: 3, ans: "Segment = 25π − ½(10)(10) = 25π − 50 ≈ 28.5 cm²." },
  { q: "Find the area of a sector of a circle of radius 14 cm whose central angle is 90°.", y: "CBSE 2020 Compt.", m: 2, ans: "(90/360) × (22/7) × 196 = 154 cm²." },
  { q: "A copper wire when bent in the form of a square encloses an area of 484 cm². The same wire is now bent into the shape of a circle. Find the area enclosed by the circle. Which shape encloses more area?", y: "CBSE 2019 Compt.", m: 3, ans: "Side of square = 22, wire = 88 ⇒ 2πr = 88 ⇒ r = 14. Circle area = 616 cm² > 484 cm² — the circle encloses more." },
  { q: "The minute hand of a clock is 14 cm long. Find the area swept by the minute hand in 5 minutes.", y: "CBSE 2020", m: 3, ans: "5 min → 30°. Area = (30/360) × (22/7) × 196 = 154/6 ≈ 25.67 cm²." },
],

/* ---------------- Chapter 12 · Surface Areas and Volumes ---------------- */
"maths-0-11": [
  { q: "Two cubes each of volume 64 cm³ are joined end to end. Find the surface area of the resulting cuboid.", y: "CBSE 2019", m: 2, ans: "Each cube: side 4 cm. Cuboid: 8 × 4 × 4 cm. SA = 2(lb + bh + lh) = 2(32 + 16 + 32) = 160 cm²." },
  { q: "A metallic sphere of radius 6 cm is melted and drawn into a wire of radius 0.2 cm. Find the length of the wire.", y: "CBSE 2020", m: 3, ans: "(4/3)π(216) = π(0.04)L ⇒ L = 288/0.04 = 7200 cm = 72 m." },
  { q: "The radii of the two circular ends of a frustum of a cone 45 cm high are 28 cm and 7 cm. Find its capacity.", y: "CBSE 2019", m: 3, ans: "V = ⅓π(45)(28² + 7² + 28×7) = ⅓π(45)(1029) = 15435π cm³ ≈ 48510 cm³ = 48.51 litres." },
  { q: "A toy is in the form of a cone mounted on a hemisphere of radius 3.5 cm. The total height of the toy is 15.5 cm. Find the total surface area of the toy.", y: "CBSE 2019", m: 3, ans: "Cone height 12 cm, l = 12.5 cm. TSA = πrl + 2πr² = π(3.5)(12.5) + 2π(12.25) = 214.5 cm²." },
  { q: "A wooden article was made by scooping out a hemisphere from each end of a solid cylinder, as shown. If the height of the cylinder is 10 cm and its base is of radius 3.5 cm, find the total surface area of the article.", y: "CBSE 2019", m: 3, ans: "TSA = CSA of cylinder + 2 × CSA of hemispheres = 2πrh + 2(2πr²) = 2(22/7)(3.5)(10) + 4(22/7)(12.25) = 220 + 154 = 374 cm²." },
  { q: "A hemispherical bowl of internal radius 9 cm is full of liquid. The liquid is to be filled into cylindrical-shaped small bottles each of diameter 3 cm and height 4 cm. How many bottles are needed to empty the bowl?", y: "CBSE 2020", m: 3, ans: "Bowl volume = (2/3)π(729) = 486π. Each bottle = π(1.5)²(4) = 9π. Number = 486π/9π = 54 bottles." },
  { q: "A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, which is surmounted by another cylinder of height 60 cm and radius 8 cm. Find the mass of the pole, given that 1 cm³ of iron has approximately 8 g mass.", y: "CBSE 2019", m: 3, ans: "V = π(12)²(220) + π(8)²(60) = π(31680 + 3840) = 35520π ≈ 111532.6 cm³ ⇒ mass ≈ 892.26 kg." },
  { q: "A solid sphere of diameter 6 cm is dropped into a cylindrical vessel partly filled with water. The diameter of the vessel is 12 cm. If the sphere is completely submerged, find the rise in the water level.", y: "CBSE 2020", m: 2, ans: "(4/3)π(3)³ = π(6)²h ⇒ 36π = 36πh ⇒ h = 1 cm." },
  { q: "The largest possible sphere is carved out of a cubical block of wood of side 21 cm. Find the volume of the sphere.", y: "CBSE 2019 Compt.", m: 2, ans: "Radius = 10.5 cm. V = (4/3)(22/7)(10.5)³ = 4851 cm³." },
  { q: "MCQ — The total surface area of a solid hemisphere of radius r is:", y: "CBSE 2023", m: 1, ans: "Curved SA + flat face = 2πr² + πr² = 3πr²." },
],

/* ---------------- Chapter 13 · Statistics ---------------- */
"maths-0-12": [
  { q: "The mean of 5 numbers is 30. If one number is excluded, their mean becomes 28. Find the excluded number.", y: "CBSE 2023, 2020", m: 2, ans: "Sum = 150; after exclusion sum = 4 × 28 = 112. Excluded number = 150 − 112 = 38." },
  { q: "Find the median of the first ten prime numbers.", y: "CBSE 2020", m: 2, ans: "Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Median = (11 + 13)/2 = 12." },
  { q: "The mean of the observations x, x + 3, x + 5, x + 7 and x + 10 is 9. Find the mean of the last three observations.", y: "CBSE 2019", m: 2, ans: "5x + 25 = 45 ⇒ x = 4. Last three observations: 9, 11, 14. Mean = 34/3 = 11⅓ ≈ 11.33." },
  { q: "Find the median and mode of the following data: 13, 16, 12, 14, 19, 12, 14, 13, 14.", y: "CBSE 2019", m: 2, ans: "Sorted: 12, 12, 13, 13, 14, 14, 14, 16, 19. Median = 14 (5th term); Mode = 14 (most frequent)." },
  { q: "MCQ — The empirical relationship between the three measures of central tendency is:", y: "CBSE 2020", m: 1, ans: "3 Median = Mode + 2 Mean." },
  { q: "Find the mean of the following distribution: xᵢ = 4, 6, 9, 10, 15 with fᵢ = 5, 10, 10, 7, 8.", y: "CBSE 2020", m: 3, ans: "Σf = 40, Σfx = 20 + 60 + 90 + 70 + 120 = 360. Mean = 360/40 = 9." },
  { q: "MCQ — While computing the mean of grouped data, it is assumed that the frequencies of all classes are centred at:", y: "CBSE 2023", m: 1, ans: "The class mid-points." },
  { q: "If the median of the data 24, 25, 26, x + 2, x + 3, 30, 31, 34 (arranged in ascending order) is 27.5, then find x.", y: "CBSE 2020", m: 2, ans: "Median = average of 4th and 5th terms: (x + 2 + x + 3)/2 = 27.5 ⇒ 2x + 5 = 55 ⇒ x = 25." },
  { q: "For the following distribution find the modal class and the median class: Marks 0-10 (f = 7), 10-20 (f = 14), 20-30 (f = 13), 30-40 (f = 10), 40-50 (f = 5).", y: "CBSE 2020", m: 2, ans: "Cumulative frequencies: 7, 21, 34, 44, 49; n/2 = 24.5 ⇒ median class 20-30. Highest frequency 14 ⇒ modal class 10-20." },
],

/* ---------------- Chapter 14 · Probability ---------------- */
"maths-0-13": [
  { q: "One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting a king of red colour.", y: "CBSE 2020, 2019", m: 2, ans: "2 red kings out of 52 ⇒ P = 2/52 = 1/26." },
  { q: "Two dice are thrown together. Find the probability that the sum of the numbers on the two faces is 8.", y: "CBSE 2020", m: 2, ans: "Favourable pairs: (2,6), (3,5), (4,4), (5,3), (6,2) = 5. P = 5/36." },
  { q: "A bag contains 3 red and 5 black balls. A ball is drawn at random from the bag. What is the probability that the ball drawn is not red?", y: "CBSE 2019", m: 2, ans: "P(not red) = 1 − 3/8 = 5/8." },
  { q: "A die is thrown once. Find the probability of getting a prime number.", y: "CBSE 2023", m: 1, ans: "Primes: 2, 3, 5 ⇒ P = 3/6 = 1/2." },
  { q: "A box contains 90 discs which are numbered from 1 to 90. If one disc is drawn at random, find the probability that it bears a perfect square number.", y: "CBSE 2020", m: 2, ans: "Perfect squares from 1-90: 1, 4, 9, 16, 25, 36, 49, 64, 81 = 9. P = 9/90 = 1/10." },
  { q: "It is given that in a group of 3 students, the probability of 2 students not having the same birthday is 0.992. What is the probability that the 2 students have the same birthday?", y: "CBSE 2019", m: 2, ans: "P(same) = 1 − 0.992 = 0.008." },
  { q: "A lot of 144 pens contains 12 defective pens. A pen is drawn at random from the lot. Find the probability that the pen drawn is good.", y: "CBSE 2020 Compt.", m: 2, ans: "Good pens = 132. P = 132/144 = 11/12." },
  { q: "Two different dice are thrown together. Find the probability of getting a sum of 7.", y: "CBSE 2019", m: 2, ans: "Favourable: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6. P = 6/36 = 1/6." },
  { q: "A jar contains 24 marbles, some are green and others are blue. A marble is drawn at random; the probability that it is green is 2/3. Find the number of blue marbles.", y: "CBSE 2019", m: 2, ans: "Green = (2/3) × 24 = 16 ⇒ blue = 8." },
  { q: "MCQ — A card is drawn from a well-shuffled deck. The probability of getting a red face card is:", y: "CBSE 2020", m: 1, ans: "6 red face cards (J, Q, K of hearts and diamonds). P = 6/52 = 3/26." },
  { q: "One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting a face card.", y: "CBSE 2019", m: 3, ans: "Face cards: 12 (J, Q, K × 4 suits). P = 12/52 = 3/13." },
],
};
