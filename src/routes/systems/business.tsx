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
        <Eyebrow>LOG_ON BUSINESS SYSTEMS</Eyebrow>
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
            Marketing spend ends. A system compounds. What we install is a closed loop: visibility \u2192
            enquiry \u2192 qualification \u2192 response \u2192 follow-up \u2192 review \u2192 retention \u2192 intelligence \u2192
            sharper targeting. Each pass makes the next one better, because every customer
            interaction is recorded as evidence rather than memory.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Growth loop
            </div>
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
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            A campaign is a decision someone made last quarter. A system has state, permissions and
            memory \u2014 it knows what it is allowed to do, what it already did, and what it must hand
            to a human.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE FOUR SURFACES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Four surfaces. One customer record. One evidence trail.
          </h2>
          <div className="mt-10 space-y-8">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
              <div className="font-mono text-[10px] text-muted">01</div>
              <h3 className="mt-1 font-display text-xl font-medium tracking-[-0.02em]">AI Visibility</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                Are you appearing when someone asks an AI assistant about your category? Which sources
                shaped that answer? What is factually wrong or missing? We measure, attribute, correct
                and re-measure. We did not invent AI visibility. The wedge is the closed loop.
              </p>
              <FlowStrip items={["Measure", "Diagnose", "Source attribution", "Corrections", "Action", "Re-measure"]} />
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
              <div className="font-mono text-[10px] text-muted">02</div>
              <h3 className="mt-1 font-display text-xl font-medium tracking-[-0.02em]">Reputation intelligence</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                Your reputation is a graph, not a star rating. Google Business Profile, review requests,
                WhatsApp journey, responses, monitoring, sentiment, competitor comparison, reporting.
              </p>
              <FlowStrip items={["GBP", "Review request", "WhatsApp journey", "Review response", "Monitoring", "Sentiment", "Competitor intel", "Reporting"]} />
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
              <div className="font-mono text-[10px] text-muted">03</div>
              <h3 className="mt-1 font-display text-xl font-medium tracking-[-0.02em]">Demand capture</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                Enquiry \u2192 qualification \u2192 response \u2192 follow-up \u2192 booking \u2192 CRM. WhatsApp first. The
                automation knows what it may not promise, and the exact point it must hand over.
              </p>
              <FlowStrip items={["Enquiry", "Qualification", "Response", "Follow-up", "Booking", "CRM"]} accent={2} />
              <p className="mt-3 text-[12px] text-muted">Human gate on response \u2014 no price or regulated promises without approval.</p>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
              <div className="font-mono text-[10px] text-muted">04</div>
              <h3 className="mt-1 font-display text-xl font-medium tracking-[-0.02em]">Measurement</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                What was done, what it produced, what it cost, what we change next month. Every claim
                traces to a record.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>BEHIND THE SYSTEM</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Seven specialist agents. You buy one outcome.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            Each agent has one job, one permission set and one evidence obligation. Shared customer
            record, policy engine and audit trail. Published because transparency about permissions is
            cheaper than a security incident.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[14px] border border-ink/10">
            <table className="w-full min-w-[720px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-canvas/80 text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3 font-semibold">Agent</th>
                  <th className="px-4 py-3 font-semibold">Single job</th>
                  <th className="px-4 py-3 font-semibold">May do</th>
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
          <p className="mt-4 text-[13px] text-muted">
            Risk tiers, touch limits and allowed sources are set per engagement. An agency cannot show
            you this table.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Five steps. One workflow first, then capability.
          </h2>
          <ol className="mt-10 space-y-6">
            {[
              { n: "0", t: "Diagnostic", b: "Free or low-cost. Evidence on how you appear, respond and follow up. If nothing is broken, we say so." },
              { n: "1", t: "Audit", b: "Evidence \u2192 diagnosis \u2192 opportunity \u2192 implementation roadmap. Days, not weeks. No 40-page decks." },
              { n: "2", t: "One workflow", b: "The single loop that removes the most painful bottleneck \u2014 usually lead response. One workflow. Measurable outcome." },
              { n: "3", t: "Measurement", b: "Every action instrumented from day one: outcome, attribution, cost, failures, escalations." },
              { n: "4", t: "Recurring operations", b: "Monthly: monitor, optimise, report, improve, evaluate agents. The recurring relationship is the business." },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-mono text-[12px] text-muted">{s.n}</span>
                <div>
                  <h3 className="font-display text-lg font-medium tracking-[-0.02em]">{s.t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip items={["DIAGNOSTIC", "AUDIT", "ONE WORKFLOW", "MEASUREMENT", "MONTHLY OPERATIONS"]} />
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            We deliberately do not run a campaign in the first month. Campaigns are the least suited to
            a system, and the part every competitor will sell you instead.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>GOVERNANCE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Can do \u2260 may do.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            This is a marketing page, so here is the part most marketing pages skip: the controls.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: "Permissions, not good intentions", b: "Explicit permission sets. Nothing granted by default." },
              { t: "Approval gates where a mistake is expensive", b: "Pricing, complaints, clinical, legal, irreversible public statements. Human approves first." },
              { t: "Escalation over guessing", b: "When unsure, hand over. Voice and chat alike." },
              { t: "An audit trail on every action", b: "Who acted, under whose authority, with what evidence. No record means liability, not a system." },
            ].map((item) => (
              <div key={item.t} className="rounded-[14px] border border-ink/10 bg-canvas/60 p-5">
                <h3 className="font-display text-base font-medium tracking-[-0.02em]">{item.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <h3 className="font-display text-base font-medium">Your data, your record</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Customer data belongs to your organisation and can be exported. Not used to train models for
              other clients. Hosting, sub-processors, retention confirmed in the agreement. We do not claim
              certifications we do not hold.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-[14px] border border-ink/10 bg-canvas/50 p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">Agent contract</div>
            <FlowStrip items={["OBJECTIVE", "IDENTITY", "CONTEXT", "TOOLS", "PERMISSIONS", "POLICIES", "LIMITS", "APPROVAL GATES", "EVIDENCE", "ESCALATION", "RECOVERY", "AUDIT TRAIL"]} />
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
            No unverified percentages. No invented revenue lifts. The first instrumented case study is in
            progress \u2014 when it ships, it will carry baseline, instrument, window, result, the failure, and
            the approval gate that stayed with a human.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">Case study</h3>
              <p className="mt-2 text-[13px] text-muted">
                First vertical engagement: in progress. Will include client type, metric, measurement tool,
                date window, workflow installed, what broke, and what a human still approves.
              </p>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">Three non-negotiable rules</h3>
              <ul className="mt-2 space-y-2 text-[13px] text-muted">
                <li>Every number carries its instrument.</li>
                <li>Every case study includes a failure.</li>
                <li>No client name without written permission.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-[13px] text-muted">
            Related:{" "}
            <Link to="/research" className="font-semibold text-ink underline-offset-2 hover:underline">Research</Link>
            {" \u00b7 "}
            <Link to="/insights" className="font-semibold text-ink underline-offset-2 hover:underline">Build logs</Link>
            {" \u00b7 "}
            <Link to="/control-plane" className="font-semibold text-ink underline-offset-2 hover:underline">Kernel evidence</Link>
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
            <table className="w-full min-w-[560px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 text-[11px] uppercase tracking-wider text-muted">
                  <th className="py-2 pr-4 font-semibold">Stage</th>
                  <th className="py-2 pr-4 font-semibold">What you get</th>
                  <th className="py-2 pr-4 font-semibold">What it is for</th>
                  <th className="py-2 font-semibold">Investment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Diagnostic", "Written findings on how you appear, respond and follow up", "Get inside the business with no risk", "Free / low-cost"],
                  ["Audit", "Evidence \u2192 diagnosis \u2192 opportunity \u2192 roadmap", "Decide with facts", "Published rate on request"],
                  ["Implementation", "One workflow, installed and measured", "Remove the bottleneck", "Value-based"],
                  ["Monthly operations", "Monitor, optimise, report, improve, evaluate agents", "The recurring relationship", "Recurring"],
                  ["Enterprise / custom", "Full LOG_ON OS + Agent Assurance", "Multi-site, technical buyer", "Custom"],
                ].map(([s, g, f, i]) => (
                  <tr key={s} className="border-b border-ink/6">
                    <td className="py-3 pr-4 font-medium">{s}</td>
                    <td className="py-3 pr-4 text-muted">{g}</td>
                    <td className="py-3 pr-4 text-muted">{f}</td>
                    <td className="py-3 font-mono text-[12px]">{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Early audit pricing exists to reduce friction, acquire, learn, and prove value. It is an
            experiment, not the economic model. Once there is proof, pricing moves to business value.
          </p>
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
                <h3 className="font-display text-base font-medium tracking-[-0.02em]">{item.q}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>NEXT STEP</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            One audit. One niche. One workflow. One measurable outcome. Then repeat.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Bring us one bottleneck \u2014 the enquiries nobody answers fast enough, the reviews nobody owns,
            the visibility you cannot see. We will audit it, show you the evidence, and tell you what the
            first workflow should be. If the answer is a campaign, we will say that too.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>Book the AI Visibility Audit</CtaLink>
            <CtaLink to="/partners">Talk to us about your vertical</CtaLink>
            <CtaLink to="/research">Read the research</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
