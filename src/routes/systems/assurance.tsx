import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/assurance")({
  head: () => ({ meta: [{ title: 'LOG_ON Agent Assurance \u2014 Practical AI & Agent Governance for Organisations' }, { name: "description", content: 'A nine-stage AI Assurance Review that turns AI safety into an engineering process.' }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Assurance Systems</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">AI safety, delivered as an engineering process \u2014 not a policy document.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">Enterprise governance platforms exist. Most organisations can&apos;t buy them.</p>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">Practical assurance for mid-market and SME organisations deploying agents now. We do not clone enterprise platforms.</p>
        <div className="mt-10"><h2 className="font-display text-xl font-medium">Nine stages. One go-live decision.</h2>
          <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {["Use-case definition","Threat model","Capability testing","Misuse testing","Data/privacy review","Tool-permission review","Human oversight","Go-live decision","Monitoring"].map((s,i) => (
              <li key={s} className="flex gap-3 rounded-[12px] border border-ink/10 bg-canvas/60 px-4 py-3"><span className="font-mono text-[11px] text-muted">{String(i+1).padStart(2,"0")}</span><span className="text-[13px] font-medium">{s}</span></li>
            ))}
          </ol>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">Runtime control</h3><p className="mt-2 text-[13px] text-muted">Identity \u00b7 Runtime \u00b7 Data \u00b7 Audit \u2014 what an agent can reach and what evidence remains.</p></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">Evaluation as release gate</h3><p className="mt-2 text-[13px] text-muted">An agent without an evaluation set is a demo. Regression gate blocks release when behaviour degrades.</p></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/audit" primary>Scope an assurance review</CtaLink><CtaLink to="/control-plane">See the control plane</CtaLink></div>
      </section>
    </SiteShell>
  );
}
