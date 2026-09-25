import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/vertical-os")({
  head: () => ({ meta: [{ title: "LOG_ON Vertical OS \u2014 Hotel, Clinic, Professional Services & SME" }, { name: "description", content: "One workflow that removes a painful bottleneck, not twenty agents." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Vertical OS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">One workflow. One bottleneck gone. Then we add capability.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">The first customer should not receive twenty agents.</p>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">Same kernel, same policy engine, same evidence trail. Different workflows and failure modes.</p>
        <div className="mt-10 space-y-6">
          <div className="rounded-[14px] border border-ink/10 p-5"><h2 className="font-display text-xl font-medium">Hotel OS</h2><p className="mt-2 text-[14px] text-muted">Enquiry that dies between DM and reservation.</p><FlowStrip items={["Enquiry","Qualification","Booking","Reminders","Check-in","Review","Retention","Revenue"]} accent={2} /></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><h2 className="font-display text-xl font-medium">Clinic OS</h2><p className="mt-2 text-[14px] text-muted">Intake automates; clinical judgement does not.</p><FlowStrip items={["Enquiry","Qualification","Appointment","Reminder","Follow-up","Review","Retention"]} /></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><h2 className="font-display text-xl font-medium">Professional Services OS</h2><p className="mt-2 text-[14px] text-muted">Billable judgement is the product.</p><FlowStrip items={["Lead","Qualification","Discovery","Proposal","Follow-up","Close","Delivery","Referral"]} accent={3} /></div>
          <div className="rounded-[14px] border border-ink/10 bg-canvas/60 p-5"><h2 className="font-display text-xl font-medium">SME OS</h2><p className="mt-2 text-[14px] text-muted">Full loop for businesses without an operations department. Human keeps pricing exceptions, complaints, legal commitments.</p><FlowStrip items={["Demand","Sales","Service","Reputation","Intelligence","Reporting"]} /></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/audit" primary>Find your vertical</CtaLink><CtaLink to="/control-plane">Shared kernel</CtaLink></div>
      </section>
    </SiteShell>
  );
}
