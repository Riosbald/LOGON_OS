import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Eyebrow, FlowStrip, CtaLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/systems/voice")({
  head: () => ({
    meta: [
      {
        title: "LOG_ON Voice-to-Operations — From Voice Note to Completed Business Action",
      },
      {
        name: "description",
        content:
          "Speech → meaning → structured event → action → confirmation. Voice that ends in a booking, ticket or CRM record — not a transcript.",
      },
    ],
  }),
  component: Page,
});

const FORBIDDEN_ACTIONS = [
  ["Unapproved commitment", "Do not promise price, availability, outcome or delivery time without the required authority."],
  ["Ambiguous booking", "Do not create or move an appointment when the person, time or service is unresolved."],
  ["Clinical or legal judgement", "Do not turn a voice note into advice. Escalate the content to the qualified human."],
  ["Silent uncertainty", "Do not guess through accent, noise or code-switching. Ask for clarification and keep the trace."],
] as const;

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <Eyebrow>OPERATIONS LEAD · VOICE-TO-OPERATIONS</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          A voice note should end in a completed action, not a transcript.
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-snug text-ink/90">
          “Voice assistant” is the wrong product. The valuable product is voice to operations.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          Speech → meaning → structured event → action → confirmation. A booking, ticket, CRM record
          or confirmed appointment — with the policy engine between interpretation and side effect.
        </p>
        <div className="mt-8 rounded-[14px] border border-ink/10 bg-canvas/80 p-5">
          <FlowStrip items={["CUSTOMER VOICE NOTE", "SPEECH", "INTENT", "ENTITIES", "POLICY", "WORKFLOW", "CRM / TICKET / BOOKING", "CONFIRMATION"]} accent={4} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/audit" primary>
            Audit your inbound voice
          </CtaLink>
          <CtaLink to="/platform">See the platform</CtaLink>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>THE ARCHITECTURE</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Keep the semantic core independent of the voice provider.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Providers change. Accents improve. Models get cheaper. Your business logic should not be
            rebuilt each time. The voice vendor is swappable infrastructure; meaning, policy and
            workflow are the durable asset.
          </p>
          <div className="mt-8 rounded-[14px] border border-ink/10 bg-paper p-5">
            <FlowStrip items={["VOICE PROVIDER", "VOICE ADAPTER", "LOG_ON SEMANTIC CORE", "TOOLS / AGENTS"]} />
          </div>
          <div className="mt-6 rounded-[12px] border border-ink/10 bg-paper p-4">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Assurance artefact</div>
            <p className="mt-2 text-[13px] text-muted">Adapter boundary contract: provider output enters the semantic core as a typed event; no provider gets direct authority to execute a business side effect.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>AFRICAN VOICE REALITY</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Code-switching is normal speech, not an edge case.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Nigerian English, Nigerian Pidgin, Yorùbá, mid-sentence switches, accent variation,
            background noise and business context are part of the operating environment. The
            differentiation is recognising meaning across a switch and still knowing what to do — or
            knowing when to ask.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Recognise", "Speech and language variation without treating accent as an error."],
              ["Structure", "Turn meaning into a typed event with confidence and missing fields visible."],
              ["Clarify", "Ask when uncertain instead of inventing a booking, ticket or commitment."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-lg font-medium">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-muted">Proof element: confusion-matrix style evaluation across accents and switch patterns, published with its dataset card.</p>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-canvas/50">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <Eyebrow>CONTROL</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Voice must still obey the policy engine.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            A live voice interface is the easiest place to lose control: a system speaking to a
            customer in real time, under pressure, with no undo. Confirmation gates and forbidden-
            commitment rules are mandatory.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {FORBIDDEN_ACTIONS.map(([title, body]) => (
              <div key={title} className="rounded-[14px] border border-ink/10 bg-paper p-5">
                <h3 className="font-display text-base font-medium">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink to="/audit" primary>
              Review your voice risk
            </CtaLink>
            <CtaLink to="/research">Read the voice research</CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
