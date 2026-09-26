import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Research — African AI Reasoning, Agent Assurance, Voice Intelligence, AI Visibility",
      },
      {
        name: "description",
        content:
          "Four research programmes and a public benchmark testing whether AI systems understand African contexts: cultural reasoning, agent assurance, voice and AI visibility.",
      },
    ],
  }),
  component: Page,
});

const PROGRAMMES = [
  {
    number: "PROGRAMME 1",
    title: "African AI Reasoning",
    subtitle: "Cultural reasoning, Yorùbá, Nigerian Pidgin, code-switching, contextual interpretation.",
    body: "We test whether a model identifies the relevant cultural signal, interprets it correctly, recognises uncertainty, avoids stereotype-based reasoning and preserves meaning in context.",
    proof: "Dataset card with category counts and annotation rules",
  },
  {
    number: "PROGRAMME 2",
    title: "Agent Assurance",
    subtitle: "Agent safety, tool permissions, evaluation, observability, human oversight.",
    body: "Our own platform is the test subject: tool-selection correctness, permission compliance, hallucination, source attribution, workflow correctness, escalation, refusal and recovery.",
    proof: "Tool-permission compliance score, including failures",
  },
  {
    number: "PROGRAMME 3",
    title: "African Voice Intelligence",
    subtitle: "Speech, accents, code-switching, voice-to-workflow.",
    body: "Speech recognition accuracy is table stakes. We measure whether a system reaches the correct action across accents, switches and noise, and asks for clarification instead of inventing a booking.",
    proof: "Task-completion accuracy, not only word error rate",
  },
  {
    number: "PROGRAMME 4",
    title: "AI Business Visibility",
    subtitle: "GEO, AI search, local trust, reputation, source authority.",
    body: "We study which sources shape an AI answer, where a small business is misrepresented, and whether factual corrections change visibility and business outcomes.",
    proof: "Influence map of sources shaping an answer in one vertical",
  },
] as const;

const DATASET_CATEGORIES = [
  "Canonical proverb",
  "Lyric functioning proverbially",
  "Ordinary statement",
  "Metaphor",
  "Cultural reference",
  "Pidgin analogy",
  "Context-dependent meaning",
  "Tool selection and permission",
  "Escalation and refusal",
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>FUNDER · PARTNER · RESEARCHER</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          Does the system actually understand African contexts, or does it merely recognise African words?
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          Culture as contextual evidence, not demographic shortcut.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          LOG_ON studies how AI systems behave when deployed in real African linguistic, cultural and
          operational contexts. A proverb inside a lyric, a Pidgin analogy in a complaint, or a
          code-switch in a booking request carries meaning that word-level recognition misses.
        </p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Research loop
          </div>
          <FlowStrip items={["BUILD", "MEASURE", "DOCUMENT", "RELEASE", "LEARN"]} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/insights" primary>
            Read the benchmark work
          </CtaLink>
          <CtaLink to="/partners">Discuss a collaboration</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>FOUR CONNECTED PROGRAMMES</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Context, assurance, voice and visibility — one applied research spine.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PROGRAMMES.map((programme) => (
              <article key={programme.number} className="rounded-[14px] border border-ink/10 bg-paper p-5 sm:p-6">
                <Eyebrow>{programme.number}</Eyebrow>
                <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.03em]">{programme.title}</h3>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink/85">{programme.subtitle}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{programme.body}</p>
                <div className="mt-5 rounded-[10px] border border-ink/10 bg-canvas/70 p-3">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Proof element</div>
                  <p className="mt-1 text-[12px] text-ink/80">{programme.proof}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE ASSET</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            LOG_ON Context &amp; Agent Evaluation Benchmark
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            An agency has case studies. A research authority has a benchmark. The benchmark is a
            versioned dataset, scoring harness and public record of limitations — an asset that
            compounds each time deployment surfaces a new failure.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-lg font-medium">Evaluation categories</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {DATASET_CATEGORIES.map((category) => (
                  <span key={category} className="rounded-md border border-ink/10 bg-canvas px-2.5 py-1 font-mono text-[11px] text-ink/80">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-lg font-medium">Every release includes</h3>
              <ul className="mt-3 space-y-2 text-[13px] text-muted">
                <li>Method, dataset card and scoring harness</li>
                <li>Baseline, result and confidence</li>
                <li>Failure analysis and limitations</li>
                <li>Reproducible artefacts where consent permits</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <CtaLink to="/insights" primary>
              Access the public research log
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>METHOD</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            The Substack is a public laboratory, not a news feed.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            We publish what was actually built: specifications, benchmarks, agent traces, failure
            analyses, before-and-after evidence and security reviews. Numbers appear only when a named
            method produced them.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip items={["SPECIFICATION", "DATASET", "BASELINE", "EXPERIMENT", "FAILURE", "FIX", "RELEASE"]} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/systems/assurance">Read the assurance method</CtaLink>
            <CtaLink to="/systems/voice">Read the voice system</CtaLink>
            <CtaLink to="/audit">Work with us</CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <p className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Evidence before authority.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            The research programme is commercially connected, not a collection of topics: context
            improves voice and intelligence; assurance makes deployments defensible; visibility turns
            evidence into business action.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/partners" primary>
              Discuss a research partnership
            </CtaLink>
            <Link to="/insights" className="inline-flex min-h-11 items-center rounded-md border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink hover:bg-ink/5">
              Follow the laboratory
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
