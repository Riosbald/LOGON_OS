import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { AGENTS, POLICY_SETS, toolsForAgent } from "@/lib/logon/catalog";
import { useLogonStore } from "@/lib/logon/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compose")({ component: ComposePage });

const PRESETS = [
  {
    id: "proof-wire",
    label: "Proof recovery",
    hint: "High-impact funds. Must wait for approval before commit.",
    agentId: "proof.auditor",
    objective: "Issue ₦4.2m recovery credit to vendor VT-441 after confirmed duplicate invoices",
    tools: ["crm.read", "evidence.ledger", "payments.wire"],
    policies: ["baseline", "high-impact", "africa-expansion"],
  },
  {
    id: "deny-all",
    label: "Fail-closed",
    hint: "deny-all blocks at the kernel boundary.",
    agentId: "proof.auditor",
    objective: "Attempt a proof audit under a fail-closed policy",
    tools: ["crm.read", "evidence.ledger"],
    policies: ["deny-all"],
  },
  {
    id: "outreach",
    label: "Blocked outreach",
    hint: "Tool is registered. Permission is denied.",
    agentId: "demand.scout",
    objective: "Send an unsolicited outreach sequence to Northstar's buying committee",
    tools: ["outreach.email"],
    policies: ["baseline"],
  },
  {
    id: "deploy",
    label: "Production deploy",
    hint: "Destructive change. Approval gate required.",
    agentId: "ops.courier",
    objective: "Deploy production runtime flags for courier revision r-204",
    tools: ["deploy.production"],
    policies: ["baseline"],
  },
] as const;

function ComposePage() {
  const navigate = useNavigate();
  const start = useLogonStore((state) => state.start);
  const [agentId, setAgentId] = useState(AGENTS[0]?.agentId ?? "finance.auditor");
  const [objective, setObjective] = useState(
    "Audit vendor invoices for duplicate payments and recommend a recovery action",
  );
  const [tools, setTools] = useState<string[]>(["crm.read", "evidence.ledger"]);
  const [policies, setPolicies] = useState<string[]>(["baseline"]);

  const availableTools = useMemo(() => toolsForAgent(agentId), [agentId]);

  function toggle(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  function applyPreset(id: (typeof PRESETS)[number]["id"]) {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setAgentId(preset.agentId);
    setObjective(preset.objective);
    setTools([...preset.tools]);
    setPolicies([...preset.policies]);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!objective.trim()) {
      toast("Objective is required.");
      return;
    }
    const executionId = start({
      agentId,
      objective: objective.trim(),
      requestedTools: tools,
      policySet: policies.length ? policies : ["baseline"],
    });
    toast("Execution accepted at INTAKE.");
    void navigate({ to: "/", search: { run: executionId, inbox: "all" } });
  }

  return (
    <AppShell>
      <section className="mt-10 max-w-3xl">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Compose
        </div>
        <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.05em]">
          Start a controlled execution.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Models may propose. Policy, permission, and approval layers decide whether work proceeds.
          High-impact tools cannot skip the human gate, and side effects do not commit before it.
        </p>
      </section>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="min-h-20 rounded-xl bg-canvas px-4 py-3 text-left shadow-[var(--shadow-border)] hover:bg-accent/6"
          >
            <div className="text-[11px] font-extrabold">{preset.label}</div>
            <p className="mt-1 text-[12px] leading-snug text-muted">{preset.hint}</p>
          </button>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-6 rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)] sm:p-7"
      >
        <label className="grid gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Agent
          </span>
          <select
            value={agentId}
            onChange={(event) => {
              const next = event.target.value;
              setAgentId(next);
              const allowed = toolsForAgent(next).map((tool) => tool.toolId);
              setTools((current) => {
                const kept = current.filter((tool) => allowed.includes(tool));
                return kept.length ? kept : allowed.slice(0, 1);
              });
            }}
            className="h-12 rounded-md border border-ink/12 bg-paper px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {AGENTS.map((agent) => (
              <option key={agent.agentId} value={agent.agentId}>
                {agent.title} · {agent.agentId}@{agent.version}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Objective
          </span>
          <textarea
            value={objective}
            onChange={(event) => setObjective(event.target.value)}
            rows={4}
            className="rounded-md border border-ink/12 bg-paper px-3 py-3 text-sm leading-relaxed outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="What outcome should this execution produce?"
          />
        </label>

        <fieldset className="grid gap-2">
          <legend className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Requested tools
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {availableTools.map((tool) => {
              const on = tools.includes(tool.toolId);
              return (
                <button
                  key={tool.toolId}
                  type="button"
                  onClick={() => setTools((current) => toggle(current, tool.toolId))}
                  className={cn(
                    "min-h-16 rounded-lg border px-3 py-3 text-left transition-colors duration-[var(--motion-quick)]",
                    on ? "border-accent/40 bg-accent/8" : "border-ink/10 bg-paper hover:border-ink/25",
                  )}
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] font-semibold">
                    <span>{tool.toolId}</span>
                    <span className="text-[9px] uppercase tracking-[0.08em] text-muted">
                      {tool.sideEffect}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-snug text-muted">{tool.summary}</p>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="grid gap-2">
          <legend className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Policy set
          </legend>
          <div className="flex flex-wrap gap-2">
            {POLICY_SETS.map((policy) => {
              const on = policies.includes(policy.id);
              return (
                <button
                  key={policy.id}
                  type="button"
                  onClick={() => setPolicies((current) => toggle(current, policy.id))}
                  className={cn(
                    "min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors duration-[var(--motion-quick)]",
                    on ? "border-ink bg-ink text-paper" : "border-ink/12 bg-paper text-ink",
                  )}
                  title={policy.hint}
                >
                  {policy.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="inverse">
            Submit to kernel
          </Button>
          <Button type="button" variant="secondary" onClick={() => void navigate({ to: "/" })}>
            Cancel
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
