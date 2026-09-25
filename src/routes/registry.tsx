import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { AGENTS, TOOLS } from "@/lib/logon/catalog";
import { useLogonStore } from "@/lib/logon/store";

export const Route = createFileRoute("/registry")({ component: RegistryPage });

function RegistryPage() {
  const permissions = useLogonStore((state) => state.permissions);

  return (
    <AppShell>
      <section className="mt-10 max-w-3xl">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Registry
        </div>
        <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.05em]">
          A registered tool does not grant permission.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Tenant, agent, tool, and permission must match. High-impact side effects still require an
          approval gate even when the agent is allowlisted. Demand Scout's outreach grant is
          deliberately denied in this tenant — a registered tool is not a permission.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {AGENTS.map((agent) => (
          <article key={agent.agentId} className="rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                  {agent.systemId}
                </div>
                <h3 className="mt-1 font-display text-2xl tracking-[-0.03em]">{agent.title}</h3>
                <div className="mt-1 font-mono text-[10px] text-muted">
                  {agent.agentId}@{agent.version}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{agent.summary}</p>
          </article>
        ))}
      </section>

      <section className="mt-4 overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]">
        <div className="border-b border-ink/10 px-5 py-4">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Tools
          </div>
          <h3 className="font-display text-2xl tracking-[-0.03em]">Capability catalog</h3>
        </div>
        <div className="hidden grid-cols-[minmax(140px,1.1fr)_90px_110px_minmax(160px,1fr)_minmax(140px,0.8fr)] gap-3 border-b border-ink/10 px-5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted md:grid">
          <span>Tool</span>
          <span>Effect</span>
          <span>Sensitivity</span>
          <span>Allowed agents</span>
          <span>Permission</span>
        </div>
        {TOOLS.map((tool) => (
          <div
            key={tool.toolId}
            className="grid gap-2 border-b border-ink/10 px-5 py-4 md:grid-cols-[minmax(140px,1.1fr)_90px_110px_minmax(160px,1fr)_minmax(140px,0.8fr)] md:items-center"
          >
            <div>
              <div className="font-mono text-[12px] font-semibold">{tool.toolId}</div>
              <div className="text-[12px] text-muted">{tool.summary}</div>
            </div>
            <Badge tone={tool.sideEffect === "READ" || tool.sideEffect === "WRITE" ? "live" : "warn"}>
              {tool.sideEffect}
            </Badge>
            <span className="text-[11px] text-muted">{tool.dataSensitivity}</span>
            <div className="flex flex-wrap gap-1">
              {tool.allowedAgents.map((agentId) => (
                <span key={agentId} className="rounded-md bg-ink/6 px-1.5 py-1 font-mono text-[9px]">
                  {agentId}
                </span>
              ))}
            </div>
            <span className="font-mono text-[11px]">{tool.requiredPermission}</span>
          </div>
        ))}
      </section>

      <section className="mt-4 overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]">
        <div className="border-b border-ink/10 px-5 py-4">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Tenant grants
          </div>
          <h3 className="font-display text-2xl tracking-[-0.03em]">Explicit permissions</h3>
        </div>
        {permissions.map((item) => (
          <div
            key={`${item.agentId}-${item.toolId}-${item.permission}`}
            className="grid grid-cols-2 gap-2 border-b border-ink/10 px-5 py-3 text-[12px] sm:grid-cols-4"
          >
            <span className={item.allowed ? "font-semibold text-accent" : "font-semibold text-danger"}>
              {item.allowed ? "ALLOWED" : "DENIED"}
            </span>
            <span className="font-mono text-[11px]">{item.agentId}</span>
            <span className="font-mono text-[11px]">{item.toolId}</span>
            <span className="text-muted">{item.permission}</span>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
