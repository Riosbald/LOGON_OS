import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "LOG_ON Insights \u2014 Strategic Essays, Technical Research & Build Logs" }, { name: "description", content: "Three publishing lanes: insights, technical research, and build logs." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Insights</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">Thought leadership, research authority and engineering proof \u2014 three lanes, one standard.</h1>
        <div className="mt-10 space-y-6">
          <div className="rounded-[14px] border border-ink/10 p-5"><div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-accent">Lane one</div><h2 className="mt-2 font-display text-xl font-medium">Strategic essays</h2><p className="mt-2 text-[14px] text-muted">Controlled autonomy \u00b7 African context \u00b7 AI visibility as intelligence.</p></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-accent">Lane two</div><h2 className="mt-2 font-display text-xl font-medium">Technical research</h2><p className="mt-2 text-[14px] text-muted">Method, dataset, result, limitations \u2014 published with the data.</p></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-accent">Lane three</div><h2 className="mt-2 font-display text-xl font-medium">Build logs</h2><p className="mt-2 text-[14px] text-muted">What was built, what broke, what changed. Failure included.</p></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/research" primary>Read the research</CtaLink><CtaLink to="/control-plane">Kernel</CtaLink></div>
      </section>
    </SiteShell>
  );
}
