import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Partners — AI Systems for Accelerators, BSOs & Local Implementation Firms",
      },
      {
        name: "description",
        content:
          "You supply the relationships. LOG_ON supplies secure AI operating systems, assurance and delivery enablement for accelerators, BSOs and local implementation firms.",
      },
    ],
  }),
  component: Page,
});

const PARTNER_TYPES = [
  {
    title: "Accelerators",
    body: "Give portfolio companies a practical starting point: visibility, response, follow-up and evidence instead of another disconnected tool subscription.",
  },
  {
    title: "Business-support organisations",
    body: "Deliver an AI readiness and implementation pathway that small businesses can actually operate after the workshop ends.",
  },
  {
    title: "Digital-transformation firms",
    body: "Add a governed AI systems capability without building an agent kernel, evaluation method and assurance practice from scratch.",
  },
  {
    title: "Local implementation partners",
    body: "Own the relationship and local context. LOG_ON supplies the system, training, deployment support and evidence discipline.",
  },
  {
    title: "Industry associations and technology hubs",
    body: "Turn trusted distribution into a repeatable workflow for member organisations, with the scope and limitations stated plainly.",
  },
] as const;

const ENABLEMENT = [
  ["Systems", "Business, Assurance, Intelligence, Vertical OS and Voice-to-Operations compositions."],
  ["Training", "Kernel concepts, workflow design, tool permissions, approval gates and operator handoff."],
  ["Assurance method", "Nine-stage review, evaluation baseline, failure analysis and go-live decision."],
  ["Deployment support", "Environment, integration, evidence and measurement support for the first workflow."],
  ["Market-entry playbook", "A co-branded, scored route into one market and one vertical at a time."],
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>ACCELERATOR / BSO / IMPLEMENTATION FIRM · PARTNERS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          You supply the relationships. We supply the operating systems.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          We are not opening offices in every market. We are arming the people already there.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          Expansion through partners beats expansion through headcount. Partners bring distribution,
          trust and local relationships; LOG_ON brings the AI systems, assurance method and technical
          depth they cannot build alone.
        </p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">Delivery model</div>
          <FlowStrip items={["PARTNER TRUST", "LOG_ON SYSTEM", "LOCAL DELIVERY", "EVIDENCE", "LEARNING"]} />
          <p className="mt-4 text-[13px] text-muted">
            The partner owns the relationship and context. LOG_ON owns the system contract, assurance
            method and technical support. Client ownership is agreed before delivery starts.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:partners@logon.africa?subject=LOG_ON%20Partner" className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-sm font-semibold text-paper hover:opacity-90">
            Apply to partner
          </a>
          <CtaLink to="/audit">Discuss a pilot</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHO THIS IS FOR</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            A delivery capability, not a referral fee.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((partner) => (
              <article key={partner.title} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-lg font-medium tracking-[-0.02em]">{partner.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{partner.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>WHAT YOU GET</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            The stack to ship and support one governed workflow.
          </h2>
          <div className="mt-8 overflow-x-auto rounded-[14px] border border-ink/10">
            <table className="w-full min-w-[620px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-canvas/80 text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3 font-semibold">Capability</th>
                  <th className="px-4 py-3 font-semibold">Partner enablement</th>
                </tr>
              </thead>
              <tbody>
                {ENABLEMENT.map(([title, body]) => (
                  <tr key={title} className="border-b border-ink/6 align-top">
                    <td className="px-4 py-3 font-medium">{title}</td>
                    <td className="px-4 py-3 text-muted">{body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-[14px] text-muted">
            We do not promise a logo wall, a referral percentage or a black-box white label. The
            partnership is a delivery capability with named responsibilities, evidence and support.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>MARKET ENTRY</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            We score one market at a time.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Lagos → Nigeria → Kenya / Uganda → Ghana / Rwanda / Tanzania → pan-African. Each step is
            assessed on sector fit, local partner requirements, regulatory friction, payment and data
            constraints, localisation and competitor presence before anyone commits.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip items={["LAGOS", "NIGERIA", "KENYA / UGANDA", "GHANA / RWANDA / TANZANIA", "PAN-AFRICAN"]} />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Sector fit", "Local partner requirements", "Regulatory friction", "Payment and data constraints", "Localisation", "Competitor presence", "Referral paths", "Implementation capacity"].map((item) => (
              <div key={item} className="rounded-[12px] border border-ink/10 bg-paper px-4 py-3 text-[12px] text-muted">{item}</div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Discuss your market
            </CtaLink>
            <Link to="/systems/intelligence" className="inline-flex min-h-11 items-center rounded-md border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink hover:bg-ink/5">
              See the intelligence system
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Distribution is not the product. Trustworthy delivery is.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Start with one vertical, one partner and one workflow. Measure it. Publish what happened.
            Then add capability.
          </p>
          <div className="mt-8">
            <CtaLink to="/audit" primary>
              Start a partner pilot
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
