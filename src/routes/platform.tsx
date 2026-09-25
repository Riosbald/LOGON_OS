import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/platform")({
  head: () => ({ meta: [{ title: "LOG_ON Platform \u2014 Execution Kernel, Agent Runtime, Tool Permissions & Observability" }, { name: "description", content: "Execution semantics, agent runtime, tool and MCP permissions, model abstraction, observability and human oversight." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Platform</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">The dashboard is a projection of the system. It is not the system.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">Execution semantics first. Interfaces last.</p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5"><FlowStrip items={["EXECUTION_KERNEL_SPEC","AGENT_RUNTIME + TOOL_MCP_SPEC","VOICE_VISION_SPEC","FRONTEND_ARCHITECTURE"]} /></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[["Durable execution","PostgreSQL holds truth. Idempotent executions, approval persistence, tenant constraints."],["No provider lock-in","Business logic above the model. Model exit strategy built in."],["Tools and MCP","Untrusted until verified. Risk classification, approval tiers, sandboxing."],["Observability","OpenTelemetry portability. Failures become regression tests."],["Human oversight","Approval as product surface. Kill switches at agent, tool, tenant, platform."]].map(([t,b]) => (
            <div key={t} className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">{t}</h3><p className="mt-2 text-[13px] text-muted">{b}</p></div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/control-plane" primary>See the control plane</CtaLink><CtaLink to="/audit">Discuss your stack</CtaLink></div>
      </section>
    </SiteShell>
  );
}
