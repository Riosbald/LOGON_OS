import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { SYSTEMS } from "@/lib/logon/catalog";
import { TERMINAL_STATUSES } from "@/lib/logon/types";
import { useLogonStore } from "@/lib/logon/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/systems")({ component: SystemsPage });

function SystemsPage() {
  const executions = useLogonStore((state) => state.executions);
  const rows = Object.values(executions);

  return (
    <AppShell>
      <section className="mt-10 max-w-3xl">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Operating systems
        </div>
        <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.05em]">
          One kernel. Ten business loops. Proof first.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Do not build the full platform before proving one complete loop — one vertical, one
          workflow, one measurable outcome. System 1 is live in this control plane.
        </p>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-2">
        {SYSTEMS.map((system) => {
          const runs = rows.filter((item) => item.systemId === system.id);
          const waiting = runs.filter((item) => item.status === "APPROVAL").length;
          const live = runs.filter(
            (item) => !TERMINAL_STATUSES.has(item.status) && item.status !== "APPROVAL",
          ).length;
          const closed = runs.filter((item) => item.status === "LEARNING").length;
          return (
            <article
              key={system.id}
              className={cn(
                "rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)]",
                system.status === "live" && "ring-1 ring-accent/25",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-muted">{system.index}</span>
                <Badge
                  tone={system.status === "live" ? "live" : system.status === "next" ? "warn" : "neutral"}
                >
                  {system.status}
                </Badge>
              </div>
              <h3 className="mt-3 font-display text-[1.7rem] tracking-[-0.03em]">{system.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{system.loop}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <dt className="text-muted">Active</dt>
                  <dd className="font-display text-xl tabular-nums">{live}</dd>
                </div>
                <div>
                  <dt className="text-muted">Approval</dt>
                  <dd className="font-display text-xl tabular-nums text-warn">{waiting}</dd>
                </div>
                <div>
                  <dt className="text-muted">Closed</dt>
                  <dd className="font-display text-xl tabular-nums">{closed}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </section>

      <div className="mt-6">
        <Link
          to="/compose"
          className="inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-medium text-paper transition-opacity duration-[var(--motion-quick)] hover:opacity-90"
        >
          Run a Proof execution
        </Link>
      </div>
    </AppShell>
  );
}
