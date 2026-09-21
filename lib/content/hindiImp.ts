/* हिंदी — Most Expected का सूचकांक (index): यूनिट, कुल प्रश्न और "Must do" सूची। */

import { HINDI_IMP_GADYA } from "./hindiImpKshitijGadya";
import { HINDI_IMP_KAVYA } from "./hindiImpKshitijKavya";
import { HINDI_IMP_KRITIKA } from "./hindiImpKritika";
import { HINDI_IMP_VYAKARAN } from "./hindiImpVyakaran";
import type { HNImpQ, HNImpTopic, HNImpUnit } from "./hindiTypes";

export const HINDI_IMP_UNITS: HNImpUnit[] = [
  ...HINDI_IMP_GADYA,
  ...HINDI_IMP_KAVYA,
  ...HINDI_IMP_KRITIKA,
];

/* व्याकरण और लेखन — ये पाठ नहीं, खंड हैं, इसलिए इन्हें अलग से रखा गया है। */
export const HINDI_IMP_GRAMMAR_UNITS: { key: string; title: string; note: string; topics: HNImpTopic[] }[] =
  HINDI_IMP_VYAKARAN.map((g) => ({
    key: "vy-" + g.topic,
    title: g.topic,
    note: g.note,
    topics: [{ name: g.topic, qs: g.items }],
  }));

export interface HNImpHot {
  id: string;
  q: string;
  marks: number;
  topic: string;
  unit: string;
}

const litHot: HNImpHot[] = HINDI_IMP_UNITS.flatMap((u) =>
  u.topics.flatMap((t) =>
    t.qs
      .filter((q) => q.hot)
      .map((q) => ({ id: q.id, q: q.q, marks: q.marks, topic: q.topic, unit: u.title })),
  ),
);

const gramHot: HNImpHot[] = HINDI_IMP_VYAKARAN.flatMap((g) =>
  g.items
    .filter((q) => q.hot)
    .map((q) => ({ id: q.id, q: q.q, marks: q.marks, topic: g.topic, unit: "व्याकरण" })),
);

export const HINDI_IMP_HOT: HNImpHot[] = [...litHot, ...gramHot];

export const HINDI_IMP_TOTAL: number =
  HINDI_IMP_UNITS.reduce((a, u) => a + u.topics.reduce((b, t) => b + t.qs.length, 0), 0) +
  HINDI_IMP_VYAKARAN.reduce((a, g) => a + g.items.length, 0);

export const HINDI_IMP_HOT_TOTAL = HINDI_IMP_HOT.length;

/* खंड ग के लिए पाठ + खंड ख/घ के लिए विषय — एक नज़र में पूरी तैयारी */
export const HINDI_IMP_SUMMARY = {
  chapters: HINDI_IMP_UNITS.map((u) => ({ book: u.book, title: u.title, author: u.author })),
  grammarTopics: HINDI_IMP_VYAKARAN.map((g) => g.topic),
  writingTasks: 4,
};

export type { HNImpQ };
