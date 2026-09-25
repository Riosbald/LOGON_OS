import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOG_ON \u2014 Secure, Measurable AI Operating Systems for African Organisations" },
      {
        name: "description",
        content:
          "LOG_ON designs, deploys, governs and improves AI operating systems for African businesses: growth, assurance, intelligence \u2014 with humans in control of high-risk decisions.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>LOG_ON OS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          Secure, measurable AI operating systems for African organisations.
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-medium text-ink/90">
          You don't need more AI tools. You need an operating system for the work.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          LOG_ON designs, deploys, governs and improves AI systems that help organisations acquire
          customers, serve them, understand their markets, automate work and make better decisions.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          We build the intelligence and control layer that turns AI capability into trustworthy work.
          Humans stay in control of high-risk decisions.
        </p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Commercial loop
          </div>
          <FlowStrip
            items={[
              "INTELLIGENCE",
              "STRATEGY",
              "DEMAND",
              "DELIVERY",
              "RETENTION",
              "MEASUREMENT",
              "LEARNING",
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
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            Book the AI Visibility Audit
          </CtaLink>
          <CtaLink to="/control-plane">Open control plane</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE THESIS</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Capability was never the bottleneck. Control is.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">
            Every organisation can now buy intelligence. Very few can safely give it the authority to
            act.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <p className="font-display text-lg font-medium">Can do \u2260 may do.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "objective",
                "identity",
                "context",
                "tools",
                "permissions",
                "policies",
                "limits",
                "approval gates",
                "evidence requirements",
                "escalation rules",
                "recovery",
                "audit trail",
              ].map((a) => (
                <span
                  key={a}
                  className="rounded-md border border-ink/10 bg-canvas px-2.5 py-1 font-mono text-[11px]"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <CtaLink to="/platform">See the agent architecture</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THREE SYSTEMS, ONE PLATFORM</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Business systems. Assurance systems. Intelligence systems.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                to: "/systems/business",
                id: "business",
                t: "Business Systems",
                s: "Growth, reputation, visibility, voice, CRM and follow-up.",
              },
              {
                to: "/systems/assurance",
                id: "assurance",
                t: "Assurance Systems",
                s: "AI safety, agent security, evaluation and governance.",
              },
              {
                to: "/systems/intelligence",
                id: "intelligence",
                t: "Intelligence Systems",
                s: "Market, opportunity, competitor, AI visibility and research.",
              },
            ].map((x) => (
              <Link
                key={x.id}
                to={x.to}
                className="rounded-[14px] border border-ink/10 bg-canvas/60 p-5 hover:bg-canvas"
              >
                <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-accent">
                  {x.id}
                </div>
                <h3 className="mt-2 font-display text-lg font-medium">{x.t}</h3>
                <p className="mt-2 text-[13px] text-muted">{x.s}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <CtaLink to="/systems/business">Explore the systems</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHERE TO START</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Start with a diagnostic. Leave with evidence, not a proposal.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Evidence", "Diagnosis", "Opportunity", "Roadmap"].map((p, i) => (
              <div
                key={p}
                className="rounded-[12px] border border-ink/10 bg-paper px-4 py-4 text-center"
              >
                <div className="font-mono text-[10px] text-muted">{i + 1}</div>
                <div className="mt-1 text-[13px] font-semibold">{p}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink to="/audit" primary>
              Book the audit
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
