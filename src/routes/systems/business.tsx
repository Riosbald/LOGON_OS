import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/business")({
  head: () => ({ meta: [{ title: "LOG_ON Growth Systems \u2014 AI Visibility, Reputation Intelligence & Automated Follow-Up" }, { name: "description", content: "AI Visibility, Google Business Profile, reputation intelligence, lead capture and WhatsApp follow-up as one system." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Business Systems</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">We don&apos;t run campaigns. We build the system that finds, converts and keeps demand.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">&quot;We use AI to market your business&quot; is a service. This is infrastructure.</p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5"><FlowStrip items={["Visibility","Enquiry","Qualification","Follow-up","Review","Retention","Intelligence","Better targeting"]} /></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div><h2 className="font-display text-xl font-medium">Reputation intelligence</h2><p className="mt-2 text-[14px] text-muted">Your reputation is a graph, not a star rating.</p><FlowStrip items={["GBP","Review request","WhatsApp","Response","Monitoring","Sentiment","Competitor","Reporting"]} /></div>
          <div><h2 className="font-display text-xl font-medium">AI visibility</h2><p className="mt-2 text-[14px] text-muted">We do not claim to have invented AI visibility. Closed loop: measure, diagnose, attribute, correct, re-measure.</p><FlowStrip items={["Measure","Diagnose","Source attribution","Corrections","Action","Re-measure"]} /></div>
          <div><h2 className="font-display text-xl font-medium">Demand capture</h2><p className="mt-2 text-[14px] text-muted">Most lost revenue is a response problem. Automation that knows its limits.</p></div>
          <div><h2 className="font-display text-xl font-medium">Seven agents. One outcome.</h2><p className="mt-2 text-[14px] text-muted">Visibility \u00b7 Reputation \u00b7 Lead Response \u00b7 Follow-up \u00b7 Review \u00b7 Competitor Intelligence \u00b7 Reporting.</p></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/audit" primary>Book the AI Visibility Audit</CtaLink><CtaLink to="/partners">Talk about your vertical</CtaLink></div>
      </section>
    </SiteShell>
  );
}
