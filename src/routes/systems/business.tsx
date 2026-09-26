import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/business")({
  head: () => ({
    meta: [
      {
        title:
          "LOG_ON Growth Systems \u2014 AI Visibility, Reputation Intelligence & Automated Follow-Up for African Businesses",
      },
      {
        name: "description",
        content:
          "AI Visibility, Google Business Profile, reputation intelligence, lead capture and WhatsApp follow-up as one governed system. LOG_ON builds the loop that finds demand, converts it, follows up and measures the result.",
      },
    ],
  }),
  component: Page,
});

const AGENTS = [
  {
    name: "Visibility Agent",
    job: "Track and attribute how AI assistants and search describe the business",
    may: "Query, collect, compare, flag",
    mayNot: "Not edit external sources directly",
    evidence: "Query log + source attribution per answer",
  },
  {
    name: "Reputation Agent",
    job: "Run the review-request and response loop",
    may: "Request, route, remind, draft responses",
    mayNot: "Not publish a response above risk tier without approval",
    evidence: "Request log, response draft, approval record",
  },
  {
    name: "Lead Response Agent",
    job: "Answer an enquiry inside the response window",
    may: "Reply, qualify, book, hand over",
    mayNot: "Not promise price, availability or medical/legal specifics",
    evidence: "Transcript, qualification result, escalation trigger",
  },
  {
    name: "Follow-up Agent",
    job: "Own the second, third and fourth touch",
    may: "Sequence, remind, reschedule",
    mayNot: "Not exceed touch limit without review",
    evidence: "Sequence state + stop reason",
  },
  {
    name: "Review Agent",
    job: "Convert completed work into honest reviews",
    may: "Ask, route, time the request",
    mayNot: "Not incentivise, filter or fabricate reviews",
    evidence: "Request timing + outcome",
  },
  {
    name: "Competitor Intelligence Agent",
    job: "Watch the local competitive surface",
    may: "Monitor, compare, summarise",
    mayNot: "Not scrape beyond allowed sources",
    evidence: "Change log + confidence level",
  },
  {
    name: "Reporting Agent",
    job: "Turn activity into decisions",
    may: "Assemble, attribute, flag anomalies",
    mayNot: "Not present an unverified figure",
    evidence: "Every number linked to its source record",
  },
] as const;

const FAQ = [
  {
    q: "Is this just SEO with an AI label on it?",
    a: "No. Local SEO and Google Business Profile are components. The system also covers AI-assistant visibility, review generation and response, lead response time, follow-up sequences, competitor monitoring and measurement. And it runs under a policy engine with permissions and an audit trail, which is not an SEO deliverable.",
  },
  {
    q: "Do you guarantee rankings, or that an AI assistant will recommend us?",
    a: "No. Nobody who understands how these systems work can guarantee that honestly. What we commit to is measurement, attribution, correction of factual errors, and reporting on whether visibility and business outcomes improved.",
  },
  {
    q: "Who can see our customer data?",
    a: "Your organisation, and LOG_ON personnel with a documented need under the agreement. Not other clients. Not used to train models for anyone else. Export available. Access model, retention and sub-processors are confirmed in the agreement before work starts.",
  },
  {
    q: "What happens when the automation gets something wrong with a customer?",
    a: "It gets logged, the customer is corrected by a human, the failure becomes a test case, and the fix is verified before the next release. If it is a repeated class of failure, we stop the workflow rather than tune around it. The failure analysis is available to you.",
  },
  {
    q: "Do we have to replace our CRM?",
    a: "Usually not. We integrate with what you run where the integration is sound, and say so plainly when it is not. We are not selling a CRM.",
  },
  {
    q: "How fast can this be live?",
    a: "The audit is day-scale. The first workflow delivery range is measured from real engagements \u2014 we publish the observed range after the first three implementations rather than inventing one. Anything that touches payments, clinical data or public statements takes longer, because approval and testing are part of the build.",
  },
  {
    q: "Do you work outside Nigeria?",
    a: "We start where we have context and partners. The sequence is deliberate rather than ambitious: Nigeria first, then East Africa, then further markets through local partners. We are not launching \"Africa\" \u2014 we are scoring one market at a time.",
  },
  {
    q: "What will you refuse to build?",
    a: "A generic chatbot platform. Another AI content writer. Another generic CRM. Another AI-search tracker. A foundation model. A blockchain layer because it sounds advanced. Each would put us in a crowded category we are weaker in. If your problem is best solved by one of those, we will tell you and point you elsewhere.",
  },
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>SME / MID-MARKET OWNER · BUSINESS SYSTEMS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          We don't run campaigns. We build the system that finds, converts and keeps demand.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          One installed loop beneath your revenue: AI visibility, reputation intelligence, lead
          response and follow-up \u2014 running on the same policy engine, evidence trail and approval
          gates as the rest of the LOG_ON OS.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          Most growth work in this market is a sequence of one-off actions: a campaign, a boost, a
          post, a boost again. When the spend stops, the output stops. This is the other thing \u2014 a
          loop that keeps running, keeps a record of what it did, and escalates to a human the
          moment it is unsure.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            Book the AI Visibility Audit
          </CtaLink>
          <CtaLink to="/platform">See the system architecture</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE PROBLEM</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            It was never a traffic problem. It was a response problem.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            You already paid for the customer. Then one of these happened.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                body: "The message arrived at 21:40, and nobody replied until Tuesday. The enquiry was warm, in a chat window, on the platform your customers actually use \u2014 and it went cold in the gap between \"hello\" and \"hello, sorry for the delay.\"",
                miss: "No owner.",
              },
              {
                body: "The follow-up never happened. Not because anyone forgot deliberately. Because it was Tuesday, four other things were on fire, and nobody owned the second message.",
                miss: "No second touch.",
              },
              {
                body: "Your reputation is being written by strangers, and you see it last. Reviews, directories, social profiles, third-party pages \u2014 and increasingly, an AI assistant summarising all four to a customer who never visits your website at all. Six separate places, six separate habits, no single picture.",
                miss: "No single graph.",
              },
              {
                body: "You can't see what the assistant is saying about you. Someone asks an AI assistant for \"the best [your category] in [your city]\" and gets an answer. You are not in it, or you are described wrongly \u2014 and you find out by accident. Nobody can prove what any of it produced.",
                miss: "No evidence trail.",
              },
            ].map((item) => (
              <div key={item.miss} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <p className="text-[14px] leading-relaxed text-ink/85">{item.body}</p>
                <p className="mt-4 text-[13px] font-semibold">{item.miss}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-[14px] text-muted">
            None of these are marketing failures. They are system failures \u2014 missing ownership,
            missing follow-up, missing measurement, and no record of what the automation was
            authorised to do.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHAT WE BUILD</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            "We use AI to market your business" is a service. This is infrastructure.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">
            A system that continuously finds demand, converts it, follows up and learns from
            customer behaviour.
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Marketing spend ends. A system compounds. What we install is a closed loop under the same
            policy engine as the rest of the LOG_ON OS.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <FlowStrip
              items={[
                "VISIBILITY",
                "ENQUIRY",
                "QUALIFICATION",
                "RESPONSE",
                "FOLLOW-UP",
                "REVIEW",
                "RETENTION",
                "INTELLIGENCE",
              ]}
            />
            <div className="mt-4 flex flex-wrap gap-2">
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
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE FOUR SURFACES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Four surfaces. One customer record. One evidence trail.
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                n: "01",
                t: "AI Visibility",
                b: "Measure, diagnose, attribute, correct, re-measure. Closed loop tied to business outcome.",
                flow: ["Measure", "Diagnose", "Source attribution", "Corrections", "Action", "Re-measure"],
              },
              {
                n: "02",
                t: "Reputation intelligence",
                b: "GBP, review request, WhatsApp journey, response, monitoring, sentiment, competitor, reporting.",
                flow: ["GBP", "Review request", "WhatsApp", "Response", "Monitor", "Sentiment", "Competitor", "Report"],
              },
              {
                n: "03",
                t: "Demand capture",
                b: "Enquiry to CRM on channels customers use. WhatsApp first. Human gate on promises.",
                flow: ["Enquiry", "Qualify", "Respond", "Follow-up", "Book", "CRM"],
              },
              {
                n: "04",
                t: "Measurement",
                b: "What was done, what it produced, what it cost. Every claim traces to a record.",
                flow: ["Action", "Attribution", "Cost", "Failure", "Next change"],
              },
            ].map((s) => (
              <div key={s.n} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <div className="font-mono text-[10px] text-muted">{s.n}</div>
                <h3 className="mt-1 font-display text-xl font-medium">{s.t}</h3>
                <p className="mt-2 text-[14px] text-muted">{s.b}</p>
                <FlowStrip items={s.flow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>BEHIND THE SYSTEM</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Seven specialist agents. You buy one outcome.
          </h2>
          <div className="mt-8 overflow-x-auto rounded-[14px] border border-ink/10">
            <table className="w-full min-w-[720px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-canvas/80 text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3 font-semibold">Agent</th>
                  <th className="px-4 py-3 font-semibold">Job</th>
                  <th className="px-4 py-3 font-semibold">May</th>
                  <th className="px-4 py-3 font-semibold">May not</th>
                  <th className="px-4 py-3 font-semibold">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((a) => (
                  <tr key={a.name} className="border-b border-ink/6 align-top">
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3 text-muted">{a.job}</td>
                    <td className="px-4 py-3 text-muted">{a.may}</td>
                    <td className="px-4 py-3 text-muted">{a.mayNot}</td>
                    <td className="px-4 py-3 text-muted">{a.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Diagnostic \u2192 audit \u2192 one workflow \u2192 measure \u2192 monthly operations.
          </h2>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip
              items={["DIAGNOSTIC", "AUDIT", "ONE WORKFLOW", "MEASUREMENT", "MONTHLY OPERATIONS"]}
            />
          </div>
          <p className="mt-6 text-[14px] text-muted">
            We deliberately do not run a campaign in month one.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>GOVERNANCE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Can do \u2260 may do.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: "Permissions", b: "Explicit sets. Nothing by default." },
              { t: "Approval gates", b: "Pricing, complaints, clinical, legal, irreversible public." },
              { t: "Escalation", b: "When unsure, hand over." },
              { t: "Audit trail", b: "Who acted, under whose authority, with what evidence." },
            ].map((item) => (
              <div key={item.t} className="rounded-[14px] border border-ink/10 bg-canvas/60 p-5">
                <h3 className="font-display text-base font-medium">{item.t}</h3>
                <p className="mt-2 text-[13px] text-muted">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>EVIDENCE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            We publish the number, the method and the failure.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            No unverified percentages. Evidence is labelled by class so nothing reads as a client case
            study that is not one.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Builder-operated", "Reference architecture", "Engagement in progress", "Client-consented"].map(
              (x) => (
                <span
                  key={x}
                  className="rounded-full border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted"
                >
                  {x}
                </span>
              ),
            )}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
                Engagement in progress
              </div>
              <h3 className="mt-1 font-display text-base font-medium">
                Lead niche \u2014 clinic & professional services, Lagos
              </h3>
              <p className="mt-2 text-[13px] text-muted">
                Public lead for the first commercial experiment. When instrumented: niche, period, tool,
                baseline, result, failure, human gate \u2014 or no number.
              </p>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Reference / builder
              </div>
              <h3 className="mt-1 font-display text-base font-medium">Composed scenarios</h3>
              <p className="mt-2 text-[13px] text-muted">
                Hospitality, gig/job platform, and internal ops on Vertical OS as reference architectures
                \u2014 not live client claims.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-[14px] border border-ink/10 bg-canvas/60 p-5">
            <h3 className="font-display text-base font-medium">Three non-negotiable rules</h3>
            <ul className="mt-2 space-y-2 text-[13px] text-muted">
              <li>Every number carries its instrument, window and baseline.</li>
              <li>Every case study includes a failure.</li>
              <li>No client name without written permission.</li>
            </ul>
          </div>
          <p className="mt-6 text-[13px] text-muted">
            Related:{" "}
            <Link
              to="/systems/vertical-os"
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              Vertical OS
            </Link>
            {" \u00b7 "}
            <Link to="/research" className="font-semibold text-ink underline-offset-2 hover:underline">
              Research
            </Link>
            {" \u00b7 "}
            <Link to="/insights" className="font-semibold text-ink underline-offset-2 hover:underline">
              Build logs
            </Link>
            {" \u00b7 "}
            <Link
              to="/control-plane"
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              Kernel
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>HOW TO START</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Start with a diagnostic. Leave with evidence, not a proposal.
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 text-[11px] uppercase tracking-wider text-muted">
                  <th className="py-2 pr-4 font-semibold">Stage</th>
                  <th className="py-2 pr-4 font-semibold">What you get</th>
                  <th className="py-2 font-semibold">Investment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Diagnostic", "Findings on appear / respond / follow-up", "Free / low-cost"],
                  ["Audit", "Evidence \u2192 diagnosis \u2192 roadmap", "Published rate on request"],
                  ["Implementation", "One workflow, measured", "Value-based"],
                  ["Monthly", "Monitor, optimise, evaluate agents", "Recurring"],
                ].map(([s, g, i]) => (
                  <tr key={s} className="border-b border-ink/6">
                    <td className="py-3 pr-4 font-medium">{s}</td>
                    <td className="py-3 pr-4 text-muted">{g}</td>
                    <td className="py-3 font-mono text-[12px]">{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>QUESTIONS</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Straight answers, including the ones that cost us the deal.
          </h2>
          <div className="mt-10 space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-ink/8 pb-6">
                <h3 className="font-display text-base font-medium">{item.q}</h3>
                <p className="mt-2 text-[14px] text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>NEXT STEP</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            One audit. One niche. One workflow. One measurable outcome.
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Book the AI Visibility Audit
            </CtaLink>
            <CtaLink to="/systems/vertical-os">Vertical OS</CtaLink>
            <CtaLink to="/partners">Talk about your vertical</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
