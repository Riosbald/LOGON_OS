import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/assurance")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Agent Assurance \u2014 Practical AI & Agent Governance for Organisations",
      },
      {
        name: "description",
        content:
          "A nine-stage AI Assurance Review that turns AI safety into an engineering process: use case, threat model, capability, misuse, data, tool permissions, oversight, go-live, monitoring.",
      },
    ],
  }),
  component: Page,
});

const STAGES = [
  {
    n: "01",
    t: "Use-case definition",
    b: "What the agent is for, who it serves, what success looks like, and what is out of scope. Without this, every later stage is guessing.",
  },
  {
    n: "02",
    t: "Threat model",
    b: "Who might misuse it, what they gain, and which failure modes matter. Threats named before tools are chosen.",
  },
  {
    n: "03",
    t: "Capability testing",
    b: "Does it do the job under realistic inputs? Baseline score against a curated test set \u2014 not a demo script.",
  },
  {
    n: "04",
    t: "Misuse testing",
    b: "Prompt injection, social engineering, out-of-scope requests, tool abuse. What happens when someone tries to break it.",
  },
  {
    n: "05",
    t: "Data & privacy review",
    b: "What data it can see, store, and leave behind. Retention, export, residency, and who may access logs.",
  },
  {
    n: "06",
    t: "Tool-permission review",
    b: "Every tool classified: read, write, irreversible. Approval tier per class. Registry membership is not authorisation.",
  },
  {
    n: "07",
    t: "Human oversight",
    b: "Who approves what, under which risk tier, with which evidence attached. Kill switches at agent, tool, tenant and platform level.",
  },
  {
    n: "08",
    t: "Go-live decision",
    b: "A written go / no-go with residual risks named. Not a verbal \"looks fine.\"",
  },
  {
    n: "09",
    t: "Monitoring",
    b: "How today's failure becomes tomorrow's regression test. Continuous evaluation after deploy \u2014 the stage that matters most.",
  },
] as const;

const CONTROLS = [
  {
    layer: "Identity",
    control: "Who the agent is acting as, and under whose authority",
    failure: "Impersonation or unclear principal",
  },
  {
    layer: "Runtime",
    control: "What it may invoke, rate limits, sandboxing, kill switches",
    failure: "Runaway loops or unapproved tool calls",
  },
  {
    layer: "Data",
    control: "What it may read, write, retain, export",
    failure: "Leakage, retention without consent, cross-tenant bleed",
  },
  {
    layer: "Audit",
    control: "Evidence of every consequential action",
    failure: "No answer to \"what did the automation do to this customer?\"",
  },
] as const;

const EVAL_FLOW = [
  "Test dataset",
  "Baseline",
  "Agent version",
  "Evaluation",
  "Failure analysis",
  "Human review",
  "Fix",
  "Regression test",
] as const;

const LIFECYCLE = [
  "THREAT MODEL",
  "CAPABILITY TEST",
  "MISUSE TEST",
  "DATA/PRIVACY",
  "TOOL PERMISSION",
  "HUMAN OVERSIGHT",
  "EVALUATION",
  "GO/NO-GO",
  "DEPLOY",
  "MONITOR",
  "REGRESSION",
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>ASSURANCE SYSTEMS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          AI safety, delivered as an engineering process \u2014 not a policy document.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Enterprise governance platforms exist. Most organisations can&apos;t buy them.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          We bring a practical, affordable implementation and assurance layer to mid-market and SME
          organisations deploying agents right now. Governance is becoming infrastructure. LOG_ON does
          not clone enterprise platforms. We implement the controls where they are actually missing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            Scope an assurance review
          </CtaLink>
          <CtaLink to="/control-plane">See the control plane</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE MARKET GAP</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Enterprise platforms govern everything. Most teams need the controls that are actually
            missing.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Full enterprise governance suites cover model lifecycle, vendor risk and continuous
            oversight at a price and complexity that freezes mid-market teams. Meanwhile those teams
            are already putting agents on WhatsApp, CRM and internal tools \u2014 with tool access granted
            by convenience, not by design.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">What enterprise platforms do</h3>
              <p className="mt-2 text-[13px] text-muted">
                Broad coverage: agents, models, apps, workflows, vendors, lifecycle, risk registers,
                continuous monitoring. Built for organisations that already have a security and
                compliance function.
              </p>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-base font-medium">What LOG_ON Assurance does</h3>
              <p className="mt-2 text-[13px] text-muted">
                Practical controls for teams deploying agents now: use-case clarity, threat model,
                tool permissions, oversight, evaluation gates, go-live decision, and monitoring that
                turns failures into tests. We state where our scope ends relative to enterprise
                platforms.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            We do not claim to replace enterprise GRC suites. We implement the layer that is missing
            between &quot;we bought an agent&quot; and &quot;we can defend what it is allowed to do.&quot;
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE METHOD</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Nine stages. One go-live decision.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            Each stage produces an artefact, not an opinion. Stage nine is the one that matters most:
            how today&apos;s failure becomes tomorrow&apos;s regression test.
          </p>
          <ol className="mt-10 space-y-4">
            {STAGES.map((s) => (
              <li
                key={s.n}
                className="flex gap-4 rounded-[14px] border border-ink/10 bg-canvas/60 px-4 py-4 sm:px-5"
              >
                <span className="font-mono text-[12px] text-muted">{s.n}</span>
                <div>
                  <h3 className="font-display text-base font-medium tracking-[-0.02em]">{s.t}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Method flow
            </div>
            <FlowStrip
              items={[
                "Use-case",
                "Threat model",
                "Capability",
                "Misuse",
                "Data/privacy",
                "Tool permissions",
                "Oversight",
                "Go-live",
                "Monitoring",
              ]}
            />
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            The nine stages are an auditable checklist a buyer could run without us. That is what
            makes the method credible \u2014 not the brand on the cover.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>RUNTIME CONTROL</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Discovery, contextual risk, runtime control over what agents access.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            Agent security is not a firewall problem. It is a question of what an agent can reach,
            what it may change, under whose authority, and what evidence remains afterwards.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[14px] border border-ink/10">
            <table className="w-full min-w-[560px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-paper text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3 font-semibold">Layer</th>
                  <th className="px-4 py-3 font-semibold">Control</th>
                  <th className="px-4 py-3 font-semibold">Failure mode if missing</th>
                </tr>
              </thead>
              <tbody>
                {CONTROLS.map((c) => (
                  <tr key={c.layer} className="border-b border-ink/6 align-top">
                    <td className="px-4 py-3 font-medium">{c.layer}</td>
                    <td className="px-4 py-3 text-muted">{c.control}</td>
                    <td className="px-4 py-3 text-muted">{c.failure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            <strong className="text-ink">Can do \u2260 may do.</strong> A registered tool does not grant
            permission. That principle is enforced in the kernel and verified by tests.
          </p>
          <div className="mt-6">
            <CtaLink to="/control-plane">Operate the kernel</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>EVALUATION</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            A test dataset is worth more than a prompt library.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            An agent without an evaluation set is a demo. LOG_ON ships client agents with a curated
            test dataset, a baseline score, and a regression gate that blocks release when behaviour
            degrades.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Evaluation loop
            </div>
            <FlowStrip items={EVAL_FLOW} />
          </div>
          <div className="mt-6 rounded-[14px] border border-ink/10 bg-paper p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Over the lifecycle
            </div>
            <FlowStrip items={LIFECYCLE} />
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            Failures are classified, fixed, and turned into regression cases. A failure analysis from
            a real engagement is more credible than a marketing claim about accuracy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to="/research">See the evaluation method</CtaLink>
            <CtaLink to="/insights">Build logs</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>DELIVERABLES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Artefacts, not opinions.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Use-case & threat brief",
                b: "Scope, actors, threats, out-of-scope list \u2014 the foundation every later decision references.",
              },
              {
                t: "Permission matrix",
                b: "Tools classified by risk (read / write / irreversible) with required approval tiers.",
              },
              {
                t: "Evaluation baseline",
                b: "Test set, scores, failure taxonomy \u2014 the gate against which the next version is judged.",
              },
              {
                t: "Go-live decision record",
                b: "Written residual risks, conditions, and the owner of the kill switch.",
              },
              {
                t: "Monitoring plan",
                b: "What is observed post-deploy, how failures enter the regression set, review cadence.",
              },
              {
                t: "Failure analysis (when it breaks)",
                b: "Root cause, fix, new test case. Available to the client \u2014 not internal only.",
              },
            ].map((d) => (
              <div key={d.t} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-base font-medium tracking-[-0.02em]">{d.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{d.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>HOW TO START</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Start with an Agent Security or Readiness audit.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted">
            Same ladder as the rest of LOG_ON: diagnostic \u2192 audit \u2192 one controlled workflow \u2192
            measurement \u2192 monthly operations. Assurance is the control layer over Business and
            Intelligence systems.
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
                    "AI Agent Security Audit",
                    "Tool permissions, misuse surface, oversight gaps",
                    "Permission matrix + residual risks",
                  ],
                  [
                    "AI Readiness Audit",
                    "Data, process, control maturity",
                    "Readiness diagnosis + roadmap",
                  ],
                  [
                    "Full Assurance Review",
                    "Nine stages end to end",
                    "Go-live decision record + monitoring plan",
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
              Scope an assurance review
            </CtaLink>
            <CtaLink to="/platform">Platform &amp; kernel</CtaLink>
            <CtaLink to="/research">Research programmes</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Can do \u2260 may do.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Every LOG_ON agent carries objective, identity, context, tools, permissions, policies,
            limits, approval gates, evidence requirements, escalation rules, recovery and audit
            trail. Assurance is how we prove that list is not marketing copy.
          </p>
          <div className="mt-8">
            <CtaLink to="/control-plane" primary>
              Open the control plane
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
