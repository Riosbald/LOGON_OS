import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/vertical-os")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Vertical OS — Hotel, Clinic, Professional Services & SME Operating Systems",
      },
      {
        name: "description",
        content:
          "One workflow that removes a painful bottleneck, not twenty agents. Business-type operating systems built on the shared LOG_ON kernel.",
      },
    ],
  }),
  component: Page,
});

const VERTICALS = [
  {
    label: "HOTEL OS",
    title: "Enquiry → qualification → booking → reminders → check-in → review → retention → revenue report.",
    body: "The bottleneck is almost never the website. It is the enquiry that dies between the DM and the reservation.",
    proof: "Eight-stage flow with the human gate marked at rate exceptions and complaints.",
  },
  {
    label: "CLINIC OS",
    title: "Enquiry → qualification → appointment → reminder → follow-up → review → retention.",
    body: "In clinical settings the automation must know it is not clinical. Intake and logistics automate; judgement does not.",
    proof: "Permission boundary: what the agent may send and what it must escalate to staff.",
  },
  {
    label: "PROFESSIONAL SERVICES OS",
    title: "Lead → qualification → discovery → proposal → follow-up → close → delivery → referral.",
    body: "Billable judgement is the product. Everything around it should be automated, tracked and evidenced.",
    proof: "Proposal-to-follow-up timeline with the approval gate on pricing.",
  },
  {
    label: "SME OS",
    title: "Demand → sales → customer service → reputation → intelligence → reporting.",
    body: "The full loop, sized for a business that has no operations department.",
    proof: "Loop mapped against a one-person operations function, showing what stays human.",
  },
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>VERTICAL OPERATOR</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          One workflow. One bottleneck gone. Then we add capability.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          The first customer should not receive twenty agents. They should receive one workflow that
          removes a painful business bottleneck — and it should work before we sell the second one.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          Vertical OS is LOG_ON deployed for a specific business type: same kernel, policy engine and
          evidence trail; different workflows, language and failure modes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            Find your vertical
          </CtaLink>
          <CtaLink to="/control-plane">See the shared kernel</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE PRINCIPLE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Same kernel. One workflow first. Evidence before expansion.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["1", "Choose the bottleneck", "Find the painful leak in demand, response, delivery or retention."],
              ["2", "Install the boundary", "Name what the agent may do, what requires approval and what remains human."],
              ["3", "Measure and learn", "Keep the trace, classify failures and add the next workflow only after proof."],
            ].map(([number, title, body]) => (
              <div key={number} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <div className="font-mono text-[11px] text-muted">{number}</div>
                <h3 className="mt-2 font-display text-lg font-medium">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>REFERENCE ARCHITECTURES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Four business types. One controlled way to start.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {VERTICALS.map((vertical) => (
              <article key={vertical.label} className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
                <Eyebrow>{vertical.label}</Eyebrow>
                <h3 className="mt-3 font-display text-xl font-medium leading-tight tracking-[-0.03em]">{vertical.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{vertical.body}</p>
                <div className="mt-5 rounded-[10px] border border-ink/10 bg-canvas/70 p-3">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Proof element</div>
                  <p className="mt-1 text-[12px] text-ink/80">{vertical.proof}</p>
                </div>
                <div className="mt-4">
                  <CtaLink to="/audit">Audit this workflow</CtaLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE COMMERCIAL LOOP</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Vertical specificity sits on the same operating spine.
          </h2>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip items={["INTELLIGENCE", "STRATEGY", "DEMAND", "DELIVERY", "RETENTION", "MEASUREMENT", "LEARNING"]} />
            <div className="mt-4 flex flex-wrap gap-2">
              {["GOVERNANCE", "SECURITY", "ORCHESTRATION"].map((item) => (
                <span key={item} className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-accent">{item}</span>
              ))}
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-muted">
            A hotel, clinic, professional-services firm and SME share the control layer. Their tools,
            permissions, handoffs and evaluation sets are not interchangeable.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Start with the workflow your team already knows is broken.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            We will not sell a platform tour before we understand the bottleneck, the human gate and
            the evidence required to call the first workflow useful.
          </p>
          <div className="mt-8">
            <CtaLink to="/audit" primary>
              Start with a diagnostic
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
