import type { Metadata } from "next";
import { HANDOFF } from "@/lib/handoff";

export const metadata: Metadata = {
  title: "AI Handoff — internal",
  robots: { index: false, follow: false },
};

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-[13px] font-mono font-bold uppercase tracking-[.16em] text-ink-mute">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((s, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-ink">
            <span className="w-5 h-5 rounded-md bg-slate-900 text-white grid place-items-center text-[10.5px] font-extrabold flex-none mt-0.5">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AiHandoffPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-ink-mute">
        Internal — for AI agents only · not indexed · updated {HANDOFF.updated}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight mt-2">Project Handoff</h1>
      <p className="text-ink-soft mt-3 text-[15px] leading-relaxed">
        If you are an AI agent opening this project for the first time (or resuming after another
        agent stopped), read this page top to bottom, then SKILL.md. It contains the user's rules,
        the architecture map, current state and what remains — so work continues seamlessly.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          ["Repo", HANDOFF.repo],
          ["Branch", HANDOFF.branch],
          ["Live", HANDOFF.live],
          ["Stack", HANDOFF.stack],
        ].map(([k, v]) => (
          <div key={k} className="bg-white border border-slate-200 rounded-xl p-3.5">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.14em] text-ink-mute">{k}</p>
            <p className="text-[13px] font-semibold mt-1 break-words">{v}</p>
          </div>
        ))}
      </div>

      <Block title="How to work here" items={HANDOFF.howToWork} />
      <Block title="User rules (summary — full list in SKILL.md)" items={HANDOFF.userRulesSummary} />
      <Block title="Architecture map" items={HANDOFF.architecture} />
      <Block title="Current state" items={HANDOFF.currentState} />
      <Block title="Pending tasks (continue from here)" items={HANDOFF.pendingTasks} />
      <Block title="Session log" items={HANDOFF.log} />

      <p className="mt-10 border-t border-slate-200 pt-4 text-[13px] text-ink-mute leading-relaxed">
        Standing rule: after finishing any task, update lib/handoff.ts (currentState, pendingTasks,
        log, updated, lastCommit) and the SKILL.md log, then build, smoke-test, commit and push.
        The next agent depends on this page being true.
      </p>
    </div>
  );
}
