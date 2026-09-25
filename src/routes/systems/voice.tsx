import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/voice")({
  head: () => ({ meta: [{ title: "LOG_ON Voice-to-Operations \u2014 From Voice Note to Completed Business Action" }, { name: "description", content: "Speech to meaning to structured event to action to confirmation \u2014 not a transcript." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Voice-to-Operations</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">A voice note should end in a completed action, not a transcript.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">&quot;Voice assistant&quot; is the wrong product.</p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5"><FlowStrip items={["Voice note","Speech recognition","Intent","Entities","Policy check","Workflow","CRM/ticket/booking","Confirmation"]} /></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">Architecture</h3><p className="mt-2 text-[13px] text-muted">Semantic core independent of voice provider.</p><FlowStrip items={["PROVIDER","ADAPTER","SEMANTIC CORE","TOOLS"]} /></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">African voice reality</h3><p className="mt-2 text-[13px] text-muted">Code-switching is normal. Nigerian English, Pidgin, Yor\u00f9b\u00e1. Know when you do not understand \u2014 then ask.</p></div>
          <div className="rounded-[14px] border border-ink/10 p-5 sm:col-span-2"><h3 className="font-display text-lg font-medium">Control</h3><p className="mt-2 text-[13px] text-muted">Voice obeys the policy engine. Confirmation gates, no unapproved commitments, audit trail.</p></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/audit" primary>Audit inbound voice</CtaLink><CtaLink to="/platform">Platform</CtaLink></div>
      </section>
    </SiteShell>
  );
}
