import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { SYSTEMS } from "@/lib/logon/catalog";
import { TERMINAL_STATUSES } from "@/lib/logon/types";
import { useLogonStore } from "@/lib/logon/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/systems/")({ component: SystemsPage });

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
          Internal control surface. Public marketing pages:{" "}
          <Link to="/systems/business" className="font-semibold text-ink underline-offset-2 hover:underline">
            Business
          </Link>
          , Assurance, Intelligence, Vertical OS.
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
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-medium tracking-[-0.03em]">{system.name}</div>
                  <p className="mt-1 text-[13px] text-muted">{system.summary}</p>
                </div>
                <Badge variant={system.status === "live" ? "default" : "secondary"}>{system.status}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 font-mono text-[11px] text-muted">
                <span>live {live}</span>
                <span>approval {waiting}</span>
                <span>closed {closed}</span>
              </div>
            </article>
          );
        })}
      </section>
      <div className="mt-10">
        <Link to="/control-plane" className="text-sm font-semibold text-ink underline-offset-2 hover:underline">
          Control plane \u2192
        </Link>
      </div>
    </AppShell>
  );
}
