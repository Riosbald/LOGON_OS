import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Book a LOG_ON Audit \u2014 AI Visibility, Automation, Agent Security, Readiness, Reputation" }, { name: "description", content: "Start with evidence. Five audit types: evidence \u2192 diagnosis \u2192 opportunity \u2192 implementation roadmap." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Audit</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">Start with evidence. Leave with a roadmap.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">One audit. One niche. One workflow. One measurable outcome.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[["AI Visibility Audit","Where you appear in AI answers and what to correct."],["AI Automation Audit","Response gaps and one bottleneck workflow."],["AI Agent Security Audit","Permissions, misuse surface, oversight."],["AI Readiness Audit","Control maturity for controlled autonomy."],["Reputation Intelligence Audit","GBP, reviews, sentiment, competitor graph."]].map(([t,s]) => (
            <div key={t} className="rounded-[14px] border border-ink/10 bg-canvas/60 p-5"><h3 className="font-display text-base font-medium">{t}</h3><p className="mt-2 text-[13px] text-muted">{s}</p></div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Evidence","Diagnosis","Opportunity","Roadmap"].map((p,i) => (
            <div key={p} className="rounded-[12px] border border-ink/10 bg-paper px-4 py-4 text-center"><div className="font-mono text-[10px] text-muted">{i+1}</div><div className="mt-1 text-[13px] font-semibold">{p}</div></div>
          ))}
        </div>
        <div className="mt-10"><FlowStrip items={["Diagnostic","Audit","Implementation","Monthly ops","Enterprise"]} />
          <p className="mt-4 text-[13px] text-muted">Early pricing reduces friction to prove value. No fabricated outcome metrics.</p>
        </div>
        <div className="mt-10 rounded-[14px] bg-ink p-6 text-paper sm:p-8">
          <h3 className="font-display text-xl font-medium">Ready to start with evidence?</h3>
          <a href="mailto:audit@logon.africa?subject=LOG_ON%20Audit" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-paper px-4 text-sm font-semibold text-ink">Request audit scope</a>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/control-plane">Open control plane</CtaLink></div>
      </section>
    </SiteShell>
  );
}
