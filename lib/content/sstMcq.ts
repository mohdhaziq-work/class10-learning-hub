/* SST topic-wise MCQ bank — merged index.
   Every question is tagged with the NCERT sub-topic it is set from, so the
   quiz can be practised topic by topic (which topic -> which questions). */
import type { QuizQ } from "./types";
import { SST_MCQ_HISTORY } from "./sstMcqHistory";
import { SST_MCQ_GEOGRAPHY } from "./sstMcqGeography";
import { SST_MCQ_CIVICS } from "./sstMcqCivics";
import { SST_MCQ_ECONOMICS } from "./sstMcqEconomics";

export const SST_MCQ: Record<string, QuizQ[]> = Object.assign(
  {},
  SST_MCQ_HISTORY,
  SST_MCQ_GEOGRAPHY,
  SST_MCQ_CIVICS,
  SST_MCQ_ECONOMICS,
);

export const SST_MCQ_TOTAL = Object.values(SST_MCQ).reduce((a, b) => a + b.length, 0);

/* how many questions each place holds — used for honest counts on the page */
export const SST_MCQ_COUNT = Object.fromEntries(
  Object.entries(SST_MCQ).map(([k, v]) => [k, v.length]),
) as Record<string, number>;
