import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useLogonStore } from "@/lib/logon/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Control plane" },
  { to: "/compose", label: "New execution" },
  { to: "/registry", label: "Registry" },
  { to: "/systems", label: "Systems" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const principal = useLogonStore((state) => state.principal);
  const autoRun = useLogonStore((state) => state.autoRun);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="mx-auto min-h-dvh max-w-[1540px] px-4 pb-10 pt-5 sm:px-7">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-[13px] bg-ink font-display text-2xl leading-none text-paper">
            L
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
              LOG_ON OS
            </div>
            <h1 className="font-display text-[19px] leading-none tracking-[-0.03em]">
              Control Plane
            </h1>
          </div>
        </div>

        <nav className="flex flex-wrap gap-1.5" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-3.5 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
                  active ? "bg-ink text-paper" : "text-ink/80 hover:bg-ink/6",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-0.5 rounded-[10px] border border-ink/10 bg-canvas/70 px-2.5 py-1.5 text-[10px] sm:grid-cols-3">
            <strong className="col-span-2 font-semibold sm:col-span-1">
              {principal.subjectId}
            </strong>
            <span className="text-muted">{principal.tenantId}</span>
            <span className="text-muted">{principal.roles.join(" · ")}</span>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold">
            <span
              className={cn(
                "size-1.5 rounded-full",
                mounted && autoRun ? "bg-accent" : "bg-muted",
              )}
            />
            {mounted && autoRun ? "Kernel live" : "Kernel paused"}
          </span>
        </div>
      </header>
      {children}
      <footer className="mt-5 flex flex-col gap-1.5 px-1 font-mono text-[10px] text-muted sm:flex-row sm:justify-between">
        <span>LOG_ON · Execution is controlled by the kernel.</span>
        <span>Can do ≠ may do.</span>
      </footer>
    </div>
  );
}
