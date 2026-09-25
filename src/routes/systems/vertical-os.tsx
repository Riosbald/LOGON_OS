import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/vertical-os")({
  head: () => ({
    meta: [
      {
        title:
          "LOG_ON Vertical OS \u2014 Clinic & Professional Services Lead \u00b7 Hospitality \u00b7 Gig Platform \u00b7 Ops",
      },
      {
        name: "description",
        content:
          "Same kernel, composed workflows. Public lead: specialist clinic and professional services in Lagos. Reference architectures for hospitality, gig platforms and internal ops \u2014 labelled honestly.",
      },
    ],
  }),
  component: Page,
});

const LEAD_AGENTS = [
  {
    name: "Lead Response",
    may: "Reply, qualify, book within window",
    mayNot: "Promise price, clinical outcome or legal advice",
    evidence: "Transcript \u00b7 qualification \u00b7 escalation trigger",
  },
  {
    name: "Follow-up",
    may: "Sequence 2nd\u20134th touch, reschedule",
    mayNot: "Exceed touch limit without review",
    evidence: "Sequence state \u00b7 stop reason",
  },
  {
    name: "Review / reputation",
    may: "Request review, draft response",
    mayNot: "Publish public reply without approval",
    evidence: "Request log \u00b7 draft \u00b7 approval record",
  },
  {
    name: "Visibility",
    may: "Measure, attribute, flag errors",
    mayNot: "Edit external sources directly",
    evidence: "Query log \u00b7 source attribution",
  },
] as const;

const REFS = [
  {
    id: "hospitality",
    title: "Hospitality",
    status: "Reference architecture",
    pain: "Enquiry dies between DM and reservation; reviews unowned; no single reputation graph.",
    loop: ["Enquiry", "Qualify", "Book", "Remind", "Check-in", "Review", "Retain"],
    gate: "Pricing exceptions \u00b7 refunds \u00b7 public review replies",
    first: "WhatsApp / DM lead response + booking handoff",
  },
  {
    id: "gig",
    title: "Gig / job platform",
    status: "Reference architecture",
    pain: "Fake listings, unattended auto-apply risk, pay/transport opacity, no audit on agent actions.",
    loop: ["Post", "Match", "Score", "Flag risk", "HITL apply", "Remind"],
    gate: "Submit application \u00b7 remove listing \u00b7 publish pay claim",
    first: "Fake-job detection + apply queue with human gate",
  },
  {
    id: "ops",
    title: "Internal ops / information outsourcing",
    status: "Reference architecture",
    pain: "Research and docking work without tool limits, evidence or escalation \u2014 speed without defence.",
    loop: ["Intake", "Scope", "Tool use", "Draft", "Human review", "Deliver", "Archive"],
    gate: "External send \u00b7 irreversible writes \u00b7 client-facing claims",
    first: "Scoped research agent with permission matrix + evidence pack",
  },
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>VERTICAL OS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          One workflow. One bottleneck gone. Then we add capability.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Same kernel, same policy engine, same evidence trail. Different workflows and failure modes.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          We do not ship twenty agents on day one. We compose the commercial loop for a concrete
          scenario, install the single workflow that removes the worst leak, measure it, then expand.
          Below: one <strong className="text-ink">public lead niche</strong>, and three{" "}
          <strong className="text-ink">reference architectures</strong> \u2014 labelled so nothing reads
          as a client case study that is not one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            Book a diagnostic for your niche
          </CtaLink>
          <CtaLink to="/control-plane">Shared kernel</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-12 sm:px-6">
          <Eyebrow>HOW TO READ THIS PAGE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl">
            Four evidence classes. We only claim what we can label.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Builder-operated",
                b: "Owner-built systems. Not a client engagement.",
              },
              {
                t: "Reference architecture",
                b: "Designed composition. Not production proof.",
              },
              {
                t: "Engagement in progress",
                b: "First instrumented niche. Metric when ready.",
              },
              {
                t: "Client-consented",
                b: "Written permission \u00b7 baseline \u00b7 failure included.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-[12px] border border-ink/10 bg-paper px-4 py-3">
                <div className="text-[13px] font-semibold">{x.t}</div>
                <div className="mt-1 text-[12px] text-muted">{x.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow>PUBLIC LEAD NICHE</Eyebrow>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
              Lead
            </span>
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Specialist clinic &amp; professional services \u2014 Lagos
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            WhatsApp-first demand. Review-driven choice. High cost of slow response and of wrong
            promises. Clinical and legal judgement stay with humans; intake, follow-up and reputation
            loops can be governed systems.
          </p>
          <p className="mt-3 max-w-2xl text-[13px] text-muted">
            Status: <strong className="text-ink">Public lead for the first commercial experiment.</strong>{" "}
            Not a published client case study. First instrumented engagement will carry niche, period,
            instrument, baseline, result and failure \u2014 or it will not carry a number.
          </p>

          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Composed loop
            </div>
            <FlowStrip
              items={[
                "Enquiry",
                "Qualify",
                "Respond",
                "Book",
                "Remind",
                "Follow-up",
                "Review",
                "Retain",
              ]}
              accent={2}
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

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">Pain this composition targets</h3>
              <ul className="mt-3 space-y-2 text-[13px] text-muted">
                <li>Warm enquiry at 21:40 \u2014 reply on Tuesday</li>
                <li>No owner of the second touch</li>
                <li>Reputation written across six places, no single graph</li>
                <li>AI assistants describing the practice wrongly or not at all</li>
              </ul>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">First workflow (day-scale install)</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Lead response + follow-up on the channel patients already use (WhatsApp first), with
                qualification, booking handoff, and hard stops on clinical or pricing promises.
              </p>
              <p className="mt-3 text-[13px] text-muted">
                Human keeps: clinical advice, fees exceptions, complaints, anything public and
                irreversible.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-[14px] border border-ink/10">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-canvas/80 text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3 font-semibold">Agent</th>
                  <th className="px-4 py-3 font-semibold">May do</th>
                  <th className="px-4 py-3 font-semibold">May not</th>
                  <th className="px-4 py-3 font-semibold">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {LEAD_AGENTS.map((a) => (
                  <tr key={a.name} className="border-b border-ink/6 align-top">
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3 text-muted">{a.may}</td>
                    <td className="px-4 py-3 text-muted">{a.mayNot}</td>
                    <td className="px-4 py-3 text-muted">{a.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Diagnostic for clinic / professional services
            </CtaLink>
            <CtaLink to="/systems/business">Business Systems</CtaLink>
            <CtaLink to="/systems/assurance">Assurance</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>ALSO DESIGNED FOR</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Three reference architectures. Same OS. Different failure modes.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            These are compositions you can walk a prospect through. They are not claims of live
            client deployments. Status on each card is explicit.
          </p>

          <div className="mt-10 space-y-6">
            {REFS.map((r) => (
              <div key={r.id} className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{r.title}</h3>
                  <span className="rounded-full border border-ink/15 bg-canvas px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {r.status}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{r.pain}</p>
                <div className="mt-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
                    Loop
                  </div>
                  <FlowStrip items={r.loop} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Human gates
                    </div>
                    <p className="mt-1 text-[13px] text-ink/85">{r.gate}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      First workflow
                    </div>
                    <p className="mt-1 text-[13px] text-ink/85">{r.first}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>HOW WE COMPOSE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Scenario + pain \u2192 agents + gates \u2192 one workflow.
          </h2>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <FlowStrip
              items={[
                "Scenario",
                "Pain",
                "Loop slice",
                "Agent may/may-not",
                "Human gates",
                "First workflow",
                "Measure",
              ]}
            />
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Multi-approach does not mean multi-promise. Every composition still runs on the same
            principle: <strong className="text-ink">Can do \u2260 may do.</strong> Builder-operated and
            reference packs exist so we can sell the method before the first consented case study
            ships \u2014 without mislabelling either.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Start with a diagnostic
            </CtaLink>
            <CtaLink to="/systems/intelligence">Intelligence</CtaLink>
            <CtaLink to="/research">Research</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
