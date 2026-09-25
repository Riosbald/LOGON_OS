import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { eventSummary, formatExact, formatTime, humanStatus, shortId } from "@/lib/logon/format";
import { agentById, SYSTEMS } from "@/lib/logon/catalog";
import { LIFECYCLE, TERMINAL_STATUSES } from "@/lib/logon/types";
import { useLogonStore } from "@/lib/logon/store";
import { cn } from "@/lib/utils";

export type InboxFilter = "all" | "active" | "approval" | "failed" | "done";

const FILTERS: Array<{ id: InboxFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "approval", label: "Approval" },
  { id: "failed", label: "Failed" },
  { id: "done", label: "Closed" },
];

const INVARIANTS = [
  { kicker: "Capability", title: "Can do ≠ may do" },
  { kicker: "Registry", title: "Registered ≠ permitted" },
  { kicker: "Side effects", title: "Propose ≠ commit" },
  { kicker: "Proof", title: "Audit ≠ evidence" },
];

export function ControlPlane({
  runId,
  inbox = "all",
}: {
  runId?: string;
  inbox?: InboxFilter;
}) {
  const navigate = useNavigate({ from: "/" });
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const ensureSeeded = useLogonStore((state) => state.ensureSeeded);
  const executionsMap = useLogonStore((state) => state.executions);
  const events = useLogonStore((state) => state.events);
  const approvals = useLogonStore((state) => state.approvals);
  const evidence = useLogonStore((state) => state.evidence);
  const audit = useLogonStore((state) => state.audit);
  const permissions = useLogonStore((state) => state.permissions);
  const dispatch = useLogonStore((state) => state.dispatch);
  const selectedId = useLogonStore((state) => state.selectedId);
  const setSelected = useLogonStore((state) => state.setSelected);
  const autoRun = useLogonStore((state) => state.autoRun);
  const setAutoRun = useLogonStore((state) => state.setAutoRun);
  const step = useLogonStore((state) => state.step);
  const approve = useLogonStore((state) => state.approve);
  const resetDemo = useLogonStore((state) => state.resetDemo);

  useEffect(() => {
    ensureSeeded();
    setMounted(true);
  }, [ensureSeeded]);

  useEffect(() => {
    if (runId) setSelected(runId);
  }, [runId, setSelected]);

  const executions = useMemo(
    () =>
      Object.values(executionsMap).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [executionsMap],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return executions.filter((item) => {
      if (inbox === "active" && (TERMINAL_STATUSES.has(item.status) || item.status === "APPROVAL")) {
        return false;
      }
      if (inbox === "approval" && item.status !== "APPROVAL") return false;
      if (inbox === "failed" && item.status !== "FAILED" && item.status !== "REJECTED") return false;
      if (inbox === "done" && item.status !== "LEARNING") return false;
      if (!needle) return true;
      return (
        item.objective.toLowerCase().includes(needle) ||
        item.agentId.toLowerCase().includes(needle) ||
        item.executionId.toLowerCase().includes(needle) ||
        item.status.toLowerCase().includes(needle)
      );
    });
  }, [executions, inbox, query]);

  const selected =
    (runId && executionsMap[runId]) ||
    (selectedId && executionsMap[selectedId]) ||
    filtered[0] ||
    executions[0];
  const selectedEvents = selected
    ? events.filter((item) => item.executionId === selected.executionId)
    : [];
  const selectedApprovals = selected
    ? approvals.filter((item) => item.executionId === selected.executionId)
    : [];
  const selectedEvidence = selected
    ? evidence.filter((item) => item.executionId === selected.executionId)
    : [];
  const selectedAudit = selected
    ? audit.filter((item) => item.executionId === selected.executionId)
    : [];
  const pending = selectedApprovals.find((item) => item.status === "PENDING");
  const agent = selected ? agentById(selected.agentId) : undefined;
  const system = selected ? SYSTEMS.find((item) => item.id === selected.systemId) : undefined;
  const selectedDispatch = selected ? dispatch[selected.executionId] : undefined;
  const agentPermissions = selected
    ? permissions.filter((item) => item.agentId === selected.agentId)
    : [];
  const recent = [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 6);

  const metrics = {
    total: executions.length,
    active: executions.filter((item) => !TERMINAL_STATUSES.has(item.status) && item.status !== "APPROVAL").length,
    approvals: executions.filter((item) => item.status === "APPROVAL").length,
    failures: executions.filter((item) => item.status === "FAILED" || item.status === "REJECTED").length,
  };

  function selectRun(executionId: string) {
    setSelected(executionId);
    void navigate({
      search: (prev) => ({ ...prev, run: executionId }),
    });
  }

  function setInbox(next: InboxFilter) {
    void navigate({
      search: (prev) => ({ ...prev, inbox: next }),
    });
  }

  function onApprove(status: "APPROVED" | "REJECTED") {
    if (!pending) return;
    approve(pending.approvalId, status);
    toast(
      status === "APPROVED"
        ? "Approval recorded. Kernel may commit side effects."
        : "Rejection recorded. Work will not proceed.",
    );
  }

  return (
    <AppShell>
      <section className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent">
            Durable execution / human oversight
          </div>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.05em]">
            See what every agent is doing, why it is allowed, and what evidence it produced.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            The kernel remains authoritative. This console observes lifecycle state and returns bounded
            human decisions — it is not a second workflow engine.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setAutoRun(!autoRun)}>
            Auto {autoRun ? "on" : "off"}
          </Button>
          <Button variant="secondary" onClick={() => step(selected?.executionId)}>
            Step kernel
          </Button>
          <Button variant="ghost" onClick={() => resetDemo()}>
            Reset demo
          </Button>
          <Link
            to="/compose"
            className="inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-medium text-paper transition-opacity duration-[var(--motion-quick)] hover:opacity-90"
          >
            New execution
          </Link>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {INVARIANTS.map((item) => (
          <div key={item.title} className="rounded-xl bg-canvas px-4 py-3 shadow-[var(--shadow-border)]">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
              {item.kicker}
            </div>
            <div className="mt-1 font-display text-lg tracking-[-0.03em]">{item.title}</div>
          </div>
        ))}
      </section>

      <section className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Executions" value={mounted ? metrics.total : 0} />
        <Metric label="Active" value={mounted ? metrics.active : 0} accent />
        <Metric label="Awaiting approval" value={mounted ? metrics.approvals : 0} warn />
        <Metric label="Failed / rejected" value={mounted ? metrics.failures : 0} danger={mounted && metrics.failures > 0} />
      </section>

      {mounted && recent.length > 0 && (
        <section className="mt-3 overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
              Kernel activity
            </div>
            <span className="text-[10px] text-muted">{autoRun ? "live projection" : "paused"}</span>
          </div>
          <div className="grid gap-px border-t border-ink/10 bg-ink/5 sm:grid-cols-2 xl:grid-cols-3">
            {recent.map((event) => (
              <button
                key={`${event.executionId}-${event.sequence}`}
                type="button"
                onClick={() => selectRun(event.executionId)}
                className="bg-canvas px-4 py-3 text-left hover:bg-accent/6"
              >
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={event.status} />
                  <span className="font-mono text-[10px] text-muted">{formatTime(event.timestamp)}</span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug">{eventSummary(event)}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mt-4 grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]">
          <div className="border-b border-ink/10 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                  Execution inbox
                </div>
                <h3 className="font-display text-xl tracking-[-0.03em]">Runs</h3>
              </div>
              <span className="grid size-7 place-items-center rounded-full bg-ink text-[11px] font-extrabold text-paper tabular-nums">
                {mounted ? filtered.length : 0}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInbox(item.id)}
                  className={cn(
                    "h-8 rounded-md px-2.5 text-[11px] font-semibold",
                    inbox === item.id ? "bg-ink text-paper" : "bg-ink/6 text-ink/80 hover:bg-ink/10",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="mt-2 block">
              <span className="sr-only">Search executions</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search objective, agent, id"
                className="h-10 w-full rounded-md border border-ink/12 bg-paper px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>
          </div>
          <div>
            {mounted &&
              filtered.map((execution) => {
                const active = execution.executionId === selected?.executionId;
                const waiting = execution.status === "APPROVAL";
                return (
                  <button
                    key={execution.executionId}
                    type="button"
                    onClick={() => selectRun(execution.executionId)}
                    className={cn(
                      "relative grid w-full gap-1.5 border-b border-ink/10 px-4 py-4 text-left transition-colors duration-[var(--motion-quick)]",
                      active ? "bg-accent/8 shadow-[inset_3px_0_0_var(--color-accent)]" : "hover:bg-accent/6",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2 text-[11px] font-extrabold">
                      <span>{execution.agentId}</span>
                      <StatusBadge status={execution.status} />
                    </span>
                    <span className="text-[13px] leading-snug">{execution.objective}</span>
                    <span className="flex justify-between font-mono text-[10px] text-muted">
                      <span>{shortId(execution.executionId)}</span>
                      <span>{formatTime(execution.updatedAt)}</span>
                    </span>
                    {waiting && (
                      <span className="w-fit text-[10px] font-extrabold text-warn">Approval required</span>
                    )}
                  </button>
                );
              })}
            {mounted && !filtered.length && (
              <div className="px-4 py-10 text-sm text-muted">No executions match this inbox.</div>
            )}
            {!mounted && (
              <div className="grid gap-3 px-4 py-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-lg bg-ink/5" />
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="grid min-w-0 gap-4">
          {mounted && !selected && (
            <div className="grid min-h-80 place-items-center rounded-xl bg-canvas px-8 text-muted shadow-[var(--shadow-border)]">
              Select an execution to inspect its lifecycle.
            </div>
          )}

          {mounted && selected && (
            <>
              <section className="flex flex-col gap-4 rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)] sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                    Execution
                  </div>
                  <h3 className="mt-1 max-w-3xl font-display text-[1.6rem] leading-tight tracking-[-0.03em]">
                    {selected.objective}
                  </h3>
                  <div className="mt-2.5 flex flex-wrap gap-2 font-mono text-[10px] text-muted">
                    <span>{selected.executionId}</span>
                    <span>tenant {selected.tenantId}</span>
                    <span>
                      agent {selected.agentId}@{selected.agentVersion}
                    </span>
                    {system && <span>system {system.title}</span>}
                  </div>
                </div>
                <StatusBadge status={selected.status} />
              </section>

              <section className="overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]">
                <div className="flex items-center justify-between px-4 pt-4">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      State machine
                    </div>
                    <h3 className="font-display text-xl tracking-[-0.03em]">Execution lifecycle</h3>
                  </div>
                  <span className="text-[10px] text-muted">
                    {autoRun ? "live projection" : "paused"}
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 pb-5 pt-3">
                  {LIFECYCLE.map((stage) => {
                    const reached = selectedEvents.some((item) => item.status === stage);
                    const active = stage === selected.status;
                    return (
                      <div
                        key={stage}
                        className={cn(
                          "grid min-w-[104px] gap-1.5 text-[9px] font-extrabold leading-tight",
                          active ? "text-ink" : reached ? "text-ink/70" : "text-muted/70",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-[22px] place-items-center rounded-[7px]",
                            active
                              ? "bg-accent text-accent-fg"
                              : reached
                                ? "bg-accent/12 text-accent"
                                : "bg-ink/5",
                          )}
                        >
                          {reached ? "✓" : "·"}
                        </span>
                        <span>{humanStatus(stage)}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {pending && (
                <section className="flex flex-col gap-4 rounded-xl border border-warn/25 bg-warn/[0.045] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-warn">
                      Human approval gate
                    </div>
                    <h3 className="mt-1 font-display text-[1.35rem] tracking-[-0.03em]">
                      Side effects are waiting for an explicit decision
                    </h3>
                    <p className="mt-1.5 text-sm text-ink/70">{pending.reason}</p>
                    {pending.expiresAt && (
                      <div className="mt-1 text-[10px] text-muted">
                        Expires {formatTime(pending.expiresAt)}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="danger" onClick={() => onApprove("REJECTED")}>
                      Reject
                    </Button>
                    <Button variant="primary" onClick={() => onApprove("APPROVED")}>
                      Approve
                    </Button>
                  </div>
                </section>
              )}

              <section className="overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]">
                <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Agent contract
                    </div>
                    <h3 className="font-display text-xl tracking-[-0.03em]">Policy, tools & permissions</h3>
                  </div>
                  <span className="text-[10px] text-muted">{agentPermissions.length} configured</span>
                </div>
                <div className="grid gap-4 border-b border-ink/10 px-4 py-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Requested tools
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.request.requestedTools.length ? (
                        selected.request.requestedTools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md bg-accent/10 px-2 py-1.5 font-mono text-[10px] text-accent"
                          >
                            {tool}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted">None declared.</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Policy set
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.request.policySet.map((policy) => (
                        <span
                          key={policy}
                          className="rounded-md bg-ink/8 px-2 py-1.5 font-mono text-[10px] text-ink/80"
                        >
                          {policy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-2">
                  {agentPermissions.map((item) => (
                    <div
                      key={`${item.toolId}-${item.permission}`}
                      className="grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-0.5 border-b border-dashed border-ink/10 py-2.5 text-[10px] sm:grid-cols-[64px_minmax(100px,0.9fr)_minmax(100px,1fr)_85px] sm:items-center"
                    >
                      <span className={item.allowed ? "font-extrabold text-accent" : "font-extrabold text-danger"}>
                        {item.allowed ? "ALLOWED" : "DENIED"}
                      </span>
                      <strong>{item.toolId}</strong>
                      <span className="text-muted">{item.permission}</span>
                      <span className="text-muted">
                        {item.expiresAt ? `expires ${formatTime(item.expiresAt)}` : "no expiry"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
                <section className="rounded-xl bg-canvas shadow-[var(--shadow-border)]">
                  <div className="px-4 pt-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Event log
                    </div>
                    <h3 className="font-display text-xl tracking-[-0.03em]">What happened</h3>
                  </div>
                  <div className="px-4 pb-5 pt-3">
                    {selectedEvents.map((event) => (
                      <div
                        key={event.sequence}
                        className="relative grid grid-cols-[18px_minmax(0,1fr)] gap-2.5 pb-4 last:pb-0"
                      >
                        <span className="relative z-1 mt-1.5 size-2 rounded-full bg-accent" />
                        {event.sequence !== selectedEvents.length && (
                          <span className="absolute top-4 bottom-0 left-1 w-px bg-ink/10" />
                        )}
                        <div>
                          <div className="flex justify-between gap-3 text-xs">
                            <strong>{humanStatus(event.status)}</strong>
                            <span className="text-[10px] text-muted">{formatExact(event.timestamp)}</span>
                          </div>
                          <p className="mt-0.5 text-[12px] leading-snug text-ink/80">{eventSummary(event)}</p>
                          <div className="text-[10px] text-muted">
                            {event.type} · actor {event.actorId}
                          </div>
                          <details className="mt-1.5">
                            <summary className="cursor-pointer text-[10px] font-semibold text-muted">
                              Payload
                            </summary>
                            <pre className="mt-1.5 max-h-36 overflow-auto rounded-md bg-ink px-2.5 py-2 font-mono text-[10px] leading-relaxed text-paper">
                              {JSON.stringify(event.payload, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl bg-canvas shadow-[var(--shadow-border)]">
                  <div className="px-4 pt-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Proof
                    </div>
                    <h3 className="font-display text-xl tracking-[-0.03em]">Evidence & audit</h3>
                  </div>
                  <div className="border-b border-ink/10 px-4 py-4">
                    <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Evidence {selectedEvidence.length}
                    </div>
                    {selectedEvidence.slice(0, 8).map((item) => (
                      <div
                        key={item.evidenceId}
                        className="grid grid-cols-[78px_minmax(0,1fr)] gap-2 border-b border-dashed border-ink/10 py-2 text-[10px]"
                      >
                        <span className="font-extrabold">{item.kind}</span>
                        <span>{item.source}</span>
                        <code className="col-start-2 font-mono text-[9px] text-accent">
                          {item.payloadHash.slice(0, 16)}
                        </code>
                      </div>
                    ))}
                    {!selectedEvidence.length && (
                      <div className="text-xs text-muted">No evidence records yet.</div>
                    )}
                  </div>
                  <div className="border-b border-ink/10 px-4 py-4">
                    <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Audit {selectedAudit.length}
                    </div>
                    {selectedAudit.slice(0, 8).map((item) => (
                      <div
                        key={item.auditId}
                        className="grid grid-cols-[78px_minmax(0,1fr)] gap-2 border-b border-dashed border-ink/10 py-2 text-[10px]"
                      >
                        <span className={item.allowed ? "font-extrabold text-accent" : "font-extrabold text-danger"}>
                          {item.allowed ? "ALLOWED" : "DENIED"}
                        </span>
                        <span>{item.action}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-4">
                    <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Dispatch
                    </div>
                    {selectedDispatch ? (
                      <div className="grid grid-cols-[70px_1fr] gap-1.5 text-[11px]">
                        <span className="text-muted">queue</span>
                        <strong>{selectedDispatch.queueName}</strong>
                        <span className="text-muted">status</span>
                        <strong>{selectedDispatch.status}</strong>
                        <span className="text-muted">attempts</span>
                        <strong className="tabular-nums">{selectedDispatch.attempts}</strong>
                      </div>
                    ) : (
                      <div className="text-xs text-muted">No dispatch record.</div>
                    )}
                    {agent && (
                      <p className="mt-3 text-[11px] leading-relaxed text-muted">
                        {agent.title} · {agent.summary}
                      </p>
                    )}
                    {selected.failureReason && (
                      <div className="mt-3 rounded-md bg-danger/8 px-3 py-2 text-[11px] text-danger">
                        {selected.failureType}: {selected.failureReason}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </section>
    </AppShell>
  );
}

function Metric({
  label,
  value,
  accent,
  warn,
  danger,
}: {
  label: string;
  value: number;
  accent?: boolean;
  warn?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-canvas px-4 py-4 shadow-[var(--shadow-border)]">
      <span className="text-xs text-muted">{label}</span>
      <strong
        className={cn(
          "font-display text-[25px] tabular-nums",
          accent && "text-accent",
          warn && "text-warn",
          danger && "text-danger",
        )}
      >
        {value}
      </strong>
    </div>
  );
}
