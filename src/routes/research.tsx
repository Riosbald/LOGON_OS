import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "LOG_ON Research \u2014 African AI Reasoning, Agent Assurance, Voice, AI Visibility" }, { name: "description", content: "Four research programmes testing whether AI systems understand African contexts." }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
        <Eyebrow>Research</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">Does the system actually understand African contexts, or does it merely recognise African words?</h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-ink/90">Culture as contextual evidence, not demographic shortcut.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[["Programme 1","African AI Reasoning","Yor\u00f9b\u00e1, Pidgin, code-switching, contextual interpretation."],["Programme 2","Agent Assurance","Permission compliance, escalation, refusal, recovery."],["Programme 3","African Voice Intelligence","Task-completion across accents and switches."],["Programme 4","AI Business Visibility","Which businesses AI systems mention and why."]].map(([p,t,b]) => (
            <div key={p} className="rounded-[14px] border border-ink/10 p-5"><div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-accent">{p}</div><h3 className="mt-2 font-display text-lg font-medium">{t}</h3><p className="mt-2 text-[13px] text-muted">{b}</p></div>
          ))}
        </div>
        <div className="mt-10 rounded-[14px] border border-ink/10 bg-canvas/60 p-5"><h3 className="font-display text-lg font-medium">Context &amp; Agent Evaluation Benchmark</h3><p className="mt-2 text-[13px] text-muted">Build \u2192 measure \u2192 document \u2192 release \u2192 learn.</p></div>
        <div className="mt-12 flex flex-wrap gap-3"><CtaLink to="/insights" primary>Follow the laboratory</CtaLink><CtaLink to="/systems/assurance">Assurance method</CtaLink></div>
      </section>
    </SiteShell>
  );
}
