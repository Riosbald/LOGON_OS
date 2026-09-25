import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "LOG_ON Partners \u2014 AI Systems for Accelerators, BSOs & Implementation Firms" }, { name: "description", content: "You supply the relationships. We supply the AI operating systems." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Partners</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">You supply the relationships. We supply the operating systems.</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">We are not opening offices in every market. We are arming the people already there.</p>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">Accelerators \u00b7 BSOs \u00b7 digital-transformation firms \u00b7 local implementation partners \u00b7 industry associations.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">What you get</h3><p className="mt-2 text-[13px] text-muted">Delivery capability \u2014 systems, training, assurance method, evaluation datasets, co-branded playbook \u2014 not a referral fee.</p></div>
          <div className="rounded-[14px] border border-ink/10 p-5"><h3 className="font-display text-lg font-medium">Market entry</h3><FlowStrip items={["Lagos","Nigeria","Kenya/Uganda","Ghana/Rwanda/Tanzania","pan-African"]} /></div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/audit" primary>Discuss your market</CtaLink><a href="mailto:partners@logon.africa?subject=LOG_ON%20Partner" className="inline-flex min-h-11 items-center rounded-md border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink hover:bg-ink/5">Apply to partner</a></div>
      </section>
    </SiteShell>
  );
}
