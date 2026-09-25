import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/intelligence")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Intelligence \u2014 Market, Opportunity & AI Visibility Intelligence",
      },
      {
        name: "description",
        content:
          "Continuous external intelligence converted into actionable business decisions. Market signals, opportunity ranking, AI visibility \u2014 with source, evidence and confidence on every claim.",
      },
    ],
  }),
  component: Page,
});

const NINE_FIELDS = [
  { f: "EVENT", d: "What happened" },
  { f: "SOURCE", d: "Where it was observed" },
  { f: "EVIDENCE", d: "What proves it" },
  { f: "CHANGE", d: "What is different from baseline" },
  { f: "IMPACT", d: "Who is affected and how" },
  { f: "RELEVANCE", d: "Why this matters to the client" },
  { f: "OPPORTUNITY", d: "What becomes possible" },
  { f: "ACTION", d: "What should be done next" },
  { f: "CONFIDENCE", d: "How sure we are, and why" },
] as const;

const SIGNAL_TYPES = [
  {
    t: "Market & regulatory",
    b: "Policy shifts, licensing changes, sector rules, public procurement signals that alter what a business may sell or how it must operate.",
  },
  {
    t: "Competitive surface",
    b: "New entrants, pricing moves, channel shifts, review volume spikes, directory and map changes in the local category.",
  },
  {
    t: "Demand & channel",
    b: "Search and AI-assistant query patterns, WhatsApp and social enquiry themes, seasonality, event-driven demand.",
  },
  {
    t: "AI visibility",
    b: "How assistants and search describe the client and competitors \u2014 source attribution, factual errors, missing entities.",
  },
  {
    t: "Reputation graph",
    b: "Review velocity, sentiment shifts, response latency, third-party mentions that shape the next customer decision.",
  },
  {
    t: "Execution capacity",
    b: "Internal constraints: staffing, inventory, approval bottlenecks \u2014 so recommendations stay executable.",
  },
] as const;

const BRIEFING_RULES = [
  "Every claim carries a source.",
  "Every number carries an instrument and a window.",
  "Every recommendation names the owner and the next human decision.",
  "Confidence is stated; low confidence is not hidden.",
  "No field in the nine-field schema may be empty.",
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>INTELLIGENCE SYSTEMS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          External events are not news. They are decisions waiting to be made.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Continuous external intelligence, converted into action.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          Most organisations collect links, screenshots and opinions. Few run a system that turns
          an external change into a ranked opportunity with a source, a confidence level and a next
          action. That is the gap LOG_ON Intelligence closes \u2014 under the same policy engine and
          evidence trail as the rest of the OS.
        </p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Intelligence loop
          </div>
          <FlowStrip
            items={["Source", "Verification", "Signal", "Impact", "Recommendation", "Action"]}
          />
          <div className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Over the loop
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {["GOVERNANCE", "SECURITY", "ORCHESTRATION"].map((x) => (
              <span
                key={x}
                className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-accent"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            See a sample briefing structure
          </CtaLink>
          <CtaLink to="/insights">Build logs &amp; insights</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE PROBLEM</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Information without a decision protocol is noise.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Unsourced claims",
                b: "Reports that assert a market shift without naming the instrument, the window or the baseline. Unusable in a board conversation.",
              },
              {
                t: "Opportunity theatre",
                b: "Long lists of \"opportunities\" ranked by size alone \u2014 ignoring whether the organisation can execute, approve or fund the response.",
              },
              {
                t: "Visibility blind spot",
                b: "Someone asks an AI assistant for the best provider in the category. The client is missing or misdescribed. Nobody owns the correction loop.",
              },
              {
                t: "No handoff to work",
                b: "Intelligence stops at the slide. There is no path into a workflow, an approval gate or a measured experiment.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-base font-medium tracking-[-0.02em]">{item.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE SCHEMA</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Nine fields. No field may be empty.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            Every intelligence product \u2014 market brief, opportunity rank, visibility report \u2014 is
            required to fill this schema. Incomplete rows do not ship. That constraint is the product.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {NINE_FIELDS.map((item) => (
              <div
                key={item.f}
                className="rounded-[12px] border border-ink/10 bg-canvas/60 px-4 py-3"
              >
                <div className="font-mono text-[11px] font-semibold tracking-wide">{item.f}</div>
                <div className="mt-1 text-[12px] text-muted">{item.d}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Confidence is not optional. A low-confidence signal is still useful if the uncertainty is
            visible. Hiding uncertainty is a liability.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHAT WE WATCH</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Six signal classes. One customer record.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SIGNAL_TYPES.map((s) => (
              <div key={s.t} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-base font-medium tracking-[-0.02em]">{s.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Signals feed Business Systems (visibility, reputation, demand) and Assurance (threat
            surface). Intelligence is the sensing layer of the commercial loop.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>OPPORTUNITY INTELLIGENCE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Ranked by what we can execute \u2014 not prize size alone.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            An opportunity that the organisation cannot staff, approve or measure is not an
            opportunity. Ranking includes fit, capacity, risk and time-to-evidence \u2014 not only
            addressable market.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Ranking dimensions
            </div>
            <FlowStrip
              items={[
                "Fit",
                "Capacity",
                "Risk",
                "Time-to-evidence",
                "Upside",
                "Decision owner",
              ]}
            />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">What ships in a brief</h3>
              <ul className="mt-3 space-y-2 text-[13px] text-muted">
                <li>Ranked opportunities with nine-field rows</li>
                <li>Sources and confidence per claim</li>
                <li>Recommended next experiment or workflow</li>
                <li>Explicit non-recommendations (what not to chase)</li>
              </ul>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">What does not ship</h3>
              <ul className="mt-3 space-y-2 text-[13px] text-muted">
                <li>Unsourced market size claims</li>
                <li>Guarantees of ranking or assistant placement</li>
                <li>Opportunity lists without execution capacity</li>
                <li>Recommendations without a human decision owner</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>AI VISIBILITY</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Measure \u2192 diagnose \u2192 attribute \u2192 correct \u2192 re-measure.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            We did not invent AI visibility. We do not compete on monitoring volume. The product is
            the closed loop: visibility tied to business outcome, source attribution, factual
            correction and re-measurement \u2014 under the same governance as demand capture.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip
              items={[
                "Measure",
                "Diagnose",
                "Source attribution",
                "Corrections",
                "Action",
                "Re-measure",
              ]}
            />
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Shared surface with Business Systems. Intelligence owns sensing and attribution;
            Business Systems own response and reputation workflows.
          </p>
          <div className="mt-6">
            <CtaLink to="/systems/business">Business Systems</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>AFRICA EXPANSION</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            One market at a time.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            We are not &quot;launching Africa.&quot; Context, partners and linguistic reality differ by
            market. The sequence is deliberate: depth before breadth.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <FlowStrip
              items={[
                "Lagos / Nigeria",
                "Kenya / Uganda",
                "Ghana / Rwanda / Tanzania",
                "Further markets via partners",
              ]}
            />
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Intelligence products require local sources, language handling and operational norms.
            Research programmes feed this sequence; they do not substitute for it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to="/research">Research programmes</CtaLink>
            <CtaLink to="/partners">Partners</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>BRIEFING RULES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Rules that cost us the easy deal.
          </h2>
          <ul className="mt-8 space-y-3">
            {BRIEFING_RULES.map((r) => (
              <li
                key={r}
                className="flex gap-3 rounded-[12px] border border-ink/10 bg-paper px-4 py-3 text-[14px]"
              >
                <span className="font-mono text-[12px] text-muted">\u2192</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Same evidence discipline as Business and Assurance. If we cannot source it, we do not
            publish it. If confidence is low, we say so.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>HOW TO START</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Sample structure first. Paid briefing second.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            We show the schema and an anonymised structure before asking for a paid engagement. The
            audit ladder still applies: diagnostic \u2192 audit \u2192 one instrumented workflow \u2192 monthly
            sensing where it earns its keep.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 text-[11px] uppercase tracking-wider text-muted">
                  <th className="py-2 pr-4 font-semibold">Entry</th>
                  <th className="py-2 pr-4 font-semibold">Focus</th>
                  <th className="py-2 font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Sample briefing structure",
                    "Schema + anonymised example",
                    "See the method before buying",
                  ],
                  [
                    "Market / visibility diagnostic",
                    "One category, one city or niche",
                    "Sourced findings + confidence",
                  ],
                  [
                    "Opportunity ranking engagement",
                    "Fit \u00d7 capacity \u00d7 risk \u00d7 time-to-evidence",
                    "Ranked list with decision owners",
                  ],
                  [
                    "Recurring intelligence",
                    "Cadenced signals into Business Systems",
                    "Measured loop, not a newsletter",
                  ],
                ].map(([e, f, o]) => (
                  <tr key={e} className="border-b border-ink/6">
                    <td className="py-3 pr-4 font-medium">{e}</td>
                    <td className="py-3 pr-4 text-muted">{f}</td>
                    <td className="py-3 text-muted">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Book a diagnostic
            </CtaLink>
            <CtaLink to="/systems/business">Business Systems</CtaLink>
            <CtaLink to="/research">Research</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Evidence before claim. Confidence on the page.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Intelligence without a path into governed work is content. LOG_ON Intelligence is the
            sensing layer of the commercial loop \u2014 held to the same standard as every agent in the OS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Start with a diagnostic
            </CtaLink>
            <CtaLink to="/control-plane">Control plane</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
