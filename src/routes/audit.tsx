import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      {
        title: "Book a LOG_ON Audit — AI Visibility, Automation, Agent Security, Readiness, Reputation",
      },
      {
        name: "description",
        content:
          "Start with evidence. Five audit types, one deliverable format: evidence → diagnosis → opportunity → implementation roadmap.",
      },
    ],
  }),
  component: Page,
});

const AUDITS = [
  ["AI Visibility Audit", "Where you appear in AI answers, which sources shaped the answer and what to correct."],
  ["AI Automation Audit", "Response gaps, follow-up leakage and one bottleneck workflow to implement."],
  ["AI Agent Security Audit", "Permissions, misuse surface, tool access, human oversight and residual risk."],
  ["AI Readiness Audit", "Data, process and control maturity for deploying controlled autonomy."],
  ["Reputation Intelligence Audit", "Google Business Profile, reviews, sentiment, competitor graph and response."],
] as const;

const LADDER = [
  ["Diagnostic", "Evidence on visibility or readiness", "Free / low-cost"],
  ["Audit", "Evidence → diagnosis → opportunity → roadmap", "$149 / $199 + consultation / $299"],
  ["Implementation", "One workflow that removes a bottleneck", "Value-based"],
  ["Monthly operations", "Monitor, optimise, report, improve and evaluate", "Recurring"],
  ["Enterprise / custom", "Full LOG_ON OS deployment + Agent Assurance", "Custom"],
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>READY BUYER</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          Start with evidence. Leave with a roadmap.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Five entry points. One deliverable format: evidence → diagnosis → opportunity →
          implementation roadmap.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          Each audit is deliberately small. The purpose is to get inside the business, prove value,
          learn the workflow and give you enough evidence to decide what happens next. We do not
          deliver a 40-page deck that cannot become work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:audit@logon.africa?subject=LOG_ON%20Audit" className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-sm font-semibold text-paper hover:opacity-90">
            Book your audit
          </a>
          <CtaLink to="/systems/business">See the business system</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>FIVE ENTRY POINTS</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Pick the audit that matches your problem.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AUDITS.map(([title, body]) => (
              <article key={title} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-lg font-medium tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE DELIVERABLE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Evidence → diagnosis → opportunity → implementation roadmap.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Evidence", "Diagnosis", "Opportunity", "Roadmap"].map((item, index) => (
              <div key={item} className="rounded-[12px] border border-ink/10 bg-canvas/70 px-4 py-4 text-center">
                <div className="font-mono text-[10px] text-muted">0{index + 1}</div>
                <div className="mt-1 text-[13px] font-semibold">{item}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-muted">
            You get what we found, what it means, what opportunity it creates, what to do first and
            which human decision is still required. You do not get a fabricated outcome number.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE CTA LADDER</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Reduce friction → acquire → learn → prove value.
          </h2>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip items={["DIAGNOSTIC", "AUDIT", "IMPLEMENTATION", "MONTHLY OPERATIONS", "ENTERPRISE / CUSTOM"]} />
          </div>
          <div className="mt-8 overflow-x-auto rounded-[14px] border border-ink/10">
            <table className="w-full min-w-[700px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-paper text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3 font-semibold">Rung</th>
                  <th className="px-4 py-3 font-semibold">Promise</th>
                  <th className="px-4 py-3 font-semibold">Price posture</th>
                </tr>
              </thead>
              <tbody>
                {LADDER.map(([rung, promise, price]) => (
                  <tr key={rung} className="border-b border-ink/6 align-top">
                    <td className="px-4 py-3 font-medium">{rung}</td>
                    <td className="px-4 py-3 text-muted">{promise}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-ink/80">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHAT HAPPENS NEXT</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Audit → one workflow → measurement → monthly operations.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Early pricing exists to reduce friction, acquire the right first engagements, learn the
            workflow and prove value. After proof, pricing follows business value and implementation
            complexity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:audit@logon.africa?subject=LOG_ON%20Audit" className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-sm font-semibold text-paper hover:opacity-90">
              Request audit scope
            </a>
            <CtaLink to="/control-plane">See the operating surface</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
