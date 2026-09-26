import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Insights — Strategic Essays, Technical Research & Build Logs",
      },
      {
        name: "description",
        content:
          "Three publishing lanes from LOG_ON: controlled autonomy and African context, technical research from benchmarks, and build logs showing what was shipped.",
      },
    ],
  }),
  component: Page,
});

const LANES = [
  {
    eyebrow: "LANE ONE — LOG_ON INSIGHTS",
    title: "Strategic essays.",
    body: "Position pieces that argue a thesis rather than summarise news: controlled autonomy, African context and AI visibility as a business intelligence problem.",
    examples: [
      "The next AI advantage is controlled autonomy",
      "African AI will win on context",
      "Why AI visibility is becoming a business intelligence problem",
    ],
    proof: "Each essay ends with the LOG_ON artefact that demonstrates the argument.",
    to: "/research",
    cta: "Read the essays",
  },
  {
    eyebrow: "LANE TWO — LOG_ON RESEARCH",
    title: "Technical research.",
    body: "Method, dataset, result and limitations. Published with the data where consent and privacy permit.",
    examples: [
      "Can LLMs recognise proverbial function in Yorùbá lyrics?",
      "Testing agent tool-permission compliance",
      "Evaluating code-switched Nigerian voice interfaces",
    ],
    proof: "Every paper links to its dataset and harness so results can be reproduced.",
    to: "/research",
    cta: "Read the research",
  },
  {
    eyebrow: "LANE THREE — LOG_ON BUILD LOGS",
    title: "Proof.",
    body: "What was built, what broke, what the instrument recorded and what changed. The failure stays in the story.",
    examples: [
      "I built a voice agent that knows when it does not understand",
      "How we built a controlled agent runtime",
      "What a vertical experiment taught us about AI visibility",
    ],
    proof: "Every build log includes the failure, not only the finish.",
    to: "/control-plane",
    cta: "Open the control plane",
  },
] as const;

const EVIDENCE = [
  ["Specification", "What the system is supposed to do"],
  ["Benchmark", "How the behaviour is measured"],
  ["Build log", "What was actually shipped"],
  ["Failure analysis", "What broke and what changed"],
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>RETURNING READER</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          Thought leadership, research authority and engineering proof — three lanes, one standard.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Build → measure → document → release → learn.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          The Substack is the public laboratory, not a news feed. We publish the thesis, the method,
          the artefact and the failure that changed the next release.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/research" primary>
            Read the research
          </CtaLink>
          <CtaLink to="/control-plane">See the evidence surface</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THREE LANES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            One publishing system, three ways in.
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {LANES.map((lane) => (
              <article key={lane.eyebrow} className="flex flex-col rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
                <Eyebrow>{lane.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.03em]">{lane.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{lane.body}</p>
                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-[12px] text-ink/80">
                  {lane.examples.map((example) => (
                    <li key={example} className="flex gap-2"><span className="font-mono text-accent">→</span><span>{example}</span></li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <p className="rounded-[10px] border border-ink/10 bg-canvas/70 p-3 text-[12px] text-muted">{lane.proof}</p>
                  <Link to={lane.to} className="mt-4 inline-flex text-sm font-semibold text-ink underline-offset-2 hover:underline">{lane.cta} →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>EVIDENCE INDEX</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Claims earn their way onto the page.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Credibility does not come from saying we understand AI. It comes from showing what was
            built, what broke and what changed because of it. No fabricated client metrics. No
            unverified percentage. No case study without its evidence class.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EVIDENCE.map(([title, body]) => (
              <div key={title} className="rounded-[12px] border border-ink/10 bg-paper p-4">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">{title}</div>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href="https://github.com/Riosbald/LOGON_OS/blob/main/docs/evidence/EVIDENCE-INDEX.md" target="_blank" rel="noreferrer" className="rounded-[14px] border border-ink/10 bg-canvas/70 p-5 hover:bg-canvas">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">IN-REPO INDEX</div>
              <h3 className="mt-2 font-display text-lg font-medium">Specs, benchmarks and failures</h3>
              <p className="mt-2 text-[13px] text-muted">Open the evidence index and follow each artefact to its source record.</p>
            </a>
            <Link to="/systems/assurance" className="rounded-[14px] border border-ink/10 bg-canvas/70 p-5 hover:bg-canvas">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">ASSURANCE STANDARD</div>
              <h3 className="mt-2 font-display text-lg font-medium">Publish the failure analysis</h3>
              <p className="mt-2 text-[13px] text-muted">Read the method every deployment is expected to meet.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Publish the artefact. Then let the artefact argue.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            The strongest line in the system is a restriction, not a promise: can do ≠ may do.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Start with a diagnostic
            </CtaLink>
            <CtaLink to="/partners">Work with LOG_ON</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
