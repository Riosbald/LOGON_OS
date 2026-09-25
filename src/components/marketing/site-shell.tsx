import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/systems/business", label: "Systems" },
  { to: "/platform", label: "Platform" },
  { to: "/research", label: "Research" },
  { to: "/partners", label: "Partners" },
  { to: "/control-plane", label: "Control plane" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="border-b border-ink/8">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="grid size-10 place-items-center rounded-[12px] bg-ink font-display text-xl leading-none text-paper">L</div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">LOG_ON</div>
              <div className="font-display text-[15px] leading-none tracking-[-0.02em]">AI Operating Systems</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className={cn("inline-flex min-h-10 items-center rounded-md px-3 text-sm font-medium transition-colors", pathname.startsWith(item.to) ? "bg-ink/8 text-ink" : "text-ink/70 hover:bg-ink/5")}>{item.label}</Link>
            ))}
          </nav>
          <Link to="/audit" className="inline-flex min-h-10 items-center rounded-md bg-ink px-3.5 text-sm font-semibold text-paper hover:opacity-90">Book audit</Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-ink/8">
        <div className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">LOG_ON</div>
              <p className="mt-2 text-sm text-ink/80">Secure, measurable AI operating systems for African organisations.</p>
              <p className="mt-2 font-mono text-[11px] text-muted">Can do ≠ may do.</p>
            </div>
            <div className="space-y-2 text-sm">
              <Link to="/systems/business" className="block text-ink/80 hover:text-ink">Business</Link>
              <Link to="/systems/assurance" className="block text-ink/80 hover:text-ink">Assurance</Link>
              <Link to="/systems/intelligence" className="block text-ink/80 hover:text-ink">Intelligence</Link>
              <Link to="/systems/vertical-os" className="block text-ink/80 hover:text-ink">Vertical OS</Link>
              <Link to="/systems/voice" className="block text-ink/80 hover:text-ink">Voice</Link>
            </div>
            <div className="space-y-2 text-sm">
              <Link to="/platform" className="block text-ink/80 hover:text-ink">Platform</Link>
              <Link to="/research" className="block text-ink/80 hover:text-ink">Research</Link>
              <Link to="/insights" className="block text-ink/80 hover:text-ink">Insights</Link>
              <Link to="/partners" className="block text-ink/80 hover:text-ink">Partners</Link>
              <Link to="/audit" className="block text-ink/80 hover:text-ink">Audit</Link>
              <Link to="/control-plane" className="block text-ink/80 hover:text-ink">Control plane</Link>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-ink/8 pt-6 font-mono text-[10px] text-muted">
            <span>Evidence before claim.</span>
            <span>Not an agency. Not a chatbot builder.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent">{children}</div>;
}

export function FlowStrip({ items, accent }: { items: readonly string[]; accent?: number }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-[11px] sm:text-[12px]">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted/60">→</span>}
          <span className={accent === i ? "rounded bg-accent/15 px-1.5 py-0.5 font-semibold text-accent" : "text-ink/80"}>{item}</span>
        </span>
      ))}
    </div>
  );
}

export function CtaLink({ to, children, primary }: { to: string; children: ReactNode; primary?: boolean }) {
  return (
    <Link to={to} className={primary ? "inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-sm font-semibold text-paper hover:opacity-90" : "inline-flex min-h-11 items-center rounded-md border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink hover:bg-ink/5"}>
      {children}
    </Link>
  );
}
