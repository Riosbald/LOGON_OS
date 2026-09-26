import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Platform — Execution Kernel, Agent Runtime, Tool Permissions & Observability",
      },
      {
        name: "description",
        content:
          "The LOG_ON execution kernel, agent runtime, tool and MCP permissions, model abstraction, observability and human oversight for deployable business systems.",
      },
    ],
  }),
  component: Page,
});

const PLATFORM_LAYERS = [
  {
    eyebrow: "EXECUTION KERNEL",
    title: "PostgreSQL holds truth. Redis is infrastructure.",
    body: "Durable execution state, execution events, audit records, evidence records, idempotency, an execution outbox, and approval persistence with expiry. Retries are normal. Duplicate side effects are not.",
    proof: "State machine + idempotency key contract",
    flow: ["INTAKE", "PLAN", "APPROVAL", "EXECUTE", "EVIDENCE", "LEARN"],
  },
  {
    eyebrow: "MODEL ABSTRACTION",
    title: "Business logic sits above the model, not inside it.",
    body: "Workflow, data, policy, tools, evaluation, customer context, institutional memory and evidence are durable assets. Model routing and fallback remain replaceable infrastructure.",
    proof: "Model registry with routing policy and fallback visible",
    flow: ["LOG_ON LOGIC", "MODEL ABSTRACTION", "MODEL A", "MODEL B", "MODEL C"],
  },
  {
    eyebrow: "TOOLS AND MCP",
    title: "An MCP server is untrusted infrastructure until it is verified.",
    body: "The tool registry carries schemas, versions, risk classification, approval requirements, rate limits, sandboxing, result validation, revocation and credential-vault boundaries.",
    proof: "Tool risk classification: read / write / irreversible",
    flow: ["REGISTER", "CLASSIFY", "PERMIT", "VALIDATE", "REVOKE"],
  },
  {
    eyebrow: "OBSERVABILITY",
    title: "Traces, evaluations and failures belong in one place.",
    body: "OpenTelemetry keeps tracing portable. Agent latency, tool calls, token count and cost land in a trace; failures route back into datasets and regression gates instead of disappearing into a log file.",
    proof: "Execution timeline with policy checks and approval step",
    flow: ["OBSERVE", "COLLECT", "EVALUATE", "LEARN", "REGRESSION"],
  },
  {
    eyebrow: "HUMAN OVERSIGHT",
    title: "Approval is a product surface, not a Slack message.",
    body: "Risk-based routing, priority, multi-person approval, separation of duties, delegation, comments and evidence are first-class. Kill switches exist at agent, tool, tenant and platform level.",
    proof: "Risk-rated approval inbox with attached evidence",
    flow: ["RISK", "ROUTE", "EVIDENCE", "APPROVE", "AUDIT"],
  },
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>TECHNICAL EVALUATOR</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          The dashboard is a projection of the system. It is not the system.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Execution semantics first. Interfaces last.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          LOG_ON combines agent orchestration, deterministic workflows, tool permissions,
          evaluation, observability and human oversight into deployable business systems. The kernel
          is the product surface behind Business, Assurance and Intelligence systems.
        </p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Build order
          </div>
          <FlowStrip
            items={[
              "EXECUTION_KERNEL_SPEC",
              "AGENT_RUNTIME_SPEC",
              "TOOL_AND_MCP_SPEC",
              "VOICE_VISION_SPEC",
              "FRONTEND_ARCHITECTURE",
            ]}
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/research" primary>
            Read the specs
          </CtaLink>
          <CtaLink to="/control-plane">See the control plane</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE KERNEL</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            One execution contract beneath every specialised system.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            An execution has a principal, tenant, objective, context, policy, plan, permitted tools,
            approval state, evidence, outcome and learning record. That contract lets a business
            workflow and an assurance review share the same trace.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip
              items={[
                "USER/EVENT",
                "INTAKE",
                "CONTEXT/MEMORY",
                "POLICY",
                "ORCHESTRATOR",
                "PLAN",
                "TOOL CHECK",
                "ACTION",
                "VALIDATION",
                "APPROVAL",
                "EXECUTION",
                "EVIDENCE",
                "EVALUATION",
              ]}
              accent={9}
            />
          </div>
          <p className="mt-5 text-[14px] text-muted">
            The control plane shows this contract. It does not create a second source of truth.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>ENGINEERING SURFACES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            The proof is in the surfaces the system makes inspectable.
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {PLATFORM_LAYERS.map((layer) => (
              <article key={layer.eyebrow} className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
                <Eyebrow>{layer.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.03em]">{layer.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{layer.body}</p>
                <div className="mt-5 rounded-[10px] border border-ink/10 bg-canvas/70 p-3">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Proof surface
                  </div>
                  <p className="mt-1 text-[12px] text-ink/80">{layer.proof}</p>
                  <FlowStrip items={layer.flow} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHAT WE WILL NOT BUILD</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Refusal is part of the architecture.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            We are not building a generic chatbot platform, another AI writer, another generic CRM,
            an AI-search tracker, a foundation model or a blockchain layer. Those are different
            products with different moats. LOG_ON owns the intelligence and control layer for
            trustworthy work.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Generic chatbot platform",
              "Another AI writer",
              "Generic CRM",
              "Generic AI-search tracker",
              "Foundation model",
              "Blockchain layer",
            ].map((item) => (
              <div key={item} className="rounded-[12px] border border-ink/10 bg-paper px-4 py-3 text-[13px] text-muted">
                <span className="mr-2 text-danger">×</span>{item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Discuss your stack
            </CtaLink>
            <Link to="/systems/assurance" className="inline-flex min-h-11 items-center rounded-md border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink hover:bg-ink/5">
              Review assurance
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Can do ≠ may do.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Every agent carries objective, identity, context, tools, permissions, policies, limits,
            approval gates, evidence requirements, escalation rules, recovery and audit trail. The
            platform makes that contract executable and inspectable.
          </p>
          <div className="mt-8">
            <CtaLink to="/control-plane" primary>
              Operate the system
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
