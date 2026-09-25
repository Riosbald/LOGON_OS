import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Insights \u2014 Build logs, failure analysis, evidence index",
      },
      {
        name: "description",
        content:
          "Builder-operated evidence from the LOG_ON kernel: permission denial, approval gates, failure analysis. No invented client metrics.",
      },
    ],
  }),
  component: Page,
});

const ITEMS = [
  {
    id: "FAILURE-0001",
    badge: "Builder-operated",
    title: "Registered tool \u2260 permitted tool",
    body: "Kernel regression: outreach.email requested under baseline policy \u2192 PERMISSION_DENIAL before side effects. Can do \u2260 may do.",
    href: "https://github.com/Riosbald/LOGON_OS/blob/main/docs/failures/FAILURE-0001.md",
  },
  {
    id: "FAILURE-0002",
    badge: "Builder-operated",
    title: "High-impact action waits for approval",
    body: "payments.wire path enters APPROVAL with zero TOOL_RESULT until a human decides. Approve commits evidence; reject does not.",
    href: "https://github.com/Riosbald/LOGON_OS/blob/main/docs/failures/FAILURE-0002.md",
  },
  {
    id: "LEAD-001",
    badge: "Engagement in progress",
    title: "Clinic & professional services \u2014 Lagos",
    body: "Public lead niche. No published metric until niche, period, instrument, baseline, result and failure are all real.",
    href: "/systems/vertical-os",
  },
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>INSIGHTS & EVIDENCE</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          Build logs and failure analysis \u2014 labelled, not invented.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium text-ink/90">
          The laboratory is the kernel. What we publish here is what the tests and control plane
          actually enforce.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">
          Evidence classes: builder-operated \u00b7 reference architecture \u00b7 engagement in progress \u00b7
          client-consented. We do not put a number on a page until an engagement produces it.
        </p>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>INDEX</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em]">
            Current artefacts
          </h2>
          <div className="mt-8 space-y-4">
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-muted">{item.id}</span>
                  <span className="rounded-full border border-ink/15 bg-canvas px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-medium tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.body}</p>
                <div className="mt-4">
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-ink underline-offset-2 hover:underline"
                    >
                      Open artefact \u2192
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-sm font-semibold text-ink underline-offset-2 hover:underline"
                    >
                      Open \u2192
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-muted">
            Full index in-repo:{" "}
            <a
              href="https://github.com/Riosbald/LOGON_OS/blob/main/docs/evidence/EVIDENCE-INDEX.md"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              docs/evidence/EVIDENCE-INDEX.md
            </a>
          </p>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <div className="flex flex-wrap gap-3">
            <CtaLink to="/control-plane" primary>
              Operate the control plane
            </CtaLink>
            <CtaLink to="/systems/assurance">Assurance method</CtaLink>
            <CtaLink to="/research">Research programmes</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
