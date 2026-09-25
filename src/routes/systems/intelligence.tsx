import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/intelligence")({
  head: () => ({ meta: [{ title: "LOG_ON Intelligence \u2014 Market, Opportunity & AI Visibility Intelligence" }, { name: "description", content: "Continuous external intelligence converted into actionable business decisions." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Intelligence Systems</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">External events are not news. They are decisions waiting to be made.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">Continuous external intelligence, converted into action.</p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5"><FlowStrip items={["Source","Verification","Signal","Impact","Recommendation","Action"]} /></div>
        <div className="mt-10"><h2 className="font-display text-xl font-medium">Nine fields. No field may be empty.</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["EVENT","SOURCE","EVIDENCE","CHANGE","IMPACT","RELEVANCE","OPPORTUNITY","ACTION","CONFIDENCE"].map(f => <span key={f} className="rounded-md border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[11px] font-semibold">{f}</span>)}</div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">Opportunity intelligence</h3><p className="mt-2 text-[13px] text-muted">Ranked by what we can execute \u2014 not prize size alone.</p></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">Africa expansion</h3><p className="mt-2 text-[13px] text-muted">One market at a time.</p><FlowStrip items={["Lagos","Nigeria","Kenya/Uganda","Ghana/Rwanda/Tanzania","pan-African"]} /></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/audit" primary>See a sample briefing</CtaLink><CtaLink to="/insights">Insights</CtaLink></div>
      </section>
    </SiteShell>
  );
}
