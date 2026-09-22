/* Deterministic option shuffle for the AI Half Yearly kit.
   The content banks store the correct option at index 0 (repo convention), so the
   displayed answer would almost always be option (a). This reorders the options
   with the same seeded algorithm the chapter Quiz uses (ChapterView optionOrder):
   the order comes from the question text, so it is stable across renders and
   builds, yet varied from question to question. The correct answer travels with
   its option, so the printed "(correct)" tag always stays on the right choice. */

function optionOrder(seed: string, n: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let s = h >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = idx[i];
    idx[i] = idx[j];
    idx[j] = t;
  }
  return idx;
}

export interface ShuffledItem {
  q: string;
  o: string[];
  a: number;
  why: string;
}

export function shuffleItems<T extends { q: string; o: readonly string[]; a: number; why: string }>(
  items: readonly T[]
): ShuffledItem[] {
  return items.map((it) => {
    const order = optionOrder(it.q, it.o.length);
    return {
      q: it.q,
      o: order.map((i) => it.o[i]),
      a: order.indexOf(it.a),
      why: it.why,
    };
  });
}
