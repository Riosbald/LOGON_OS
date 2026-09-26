import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createEmptyKernel, createSeed } from "./seed";
import { advanceExecution, decideApproval, startExecution, tickKernel } from "./engine";
import type { StartInput } from "./engine";
import type { KernelSnapshot } from "./types";
function pickSelected(executions: KernelSnapshot["executions"], fallback?: string) {
  if (fallback && executions[fallback]) return fallback;
  const rows = Object.values(executions);
  return (
    rows.find((item) => item.status === "APPROVAL")?.executionId ??
    rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.executionId
  );
}

interface LogonStore extends KernelSnapshot {
  hydrated: boolean;
  autoRun: boolean;
  selectedId: string | undefined;
  ensureSeeded: () => void;
  setSelected: (executionId: string | undefined) => void;
  setAutoRun: (value: boolean) => void;
  tick: () => void;
  step: (executionId: string | undefined) => void;
  start: (input: StartInput) => string;
  approve: (approvalId: string, status: "APPROVED" | "REJECTED", reason?: string) => void;
  resetDemo: () => void;
}

const empty = createEmptyKernel();

export const useLogonStore = create<LogonStore>()(
  persist(
    (set, get) => ({
      ...empty,
      hydrated: false,
      autoRun: true,
      selectedId: undefined,
      ensureSeeded: () => {
        const current = get();
        if (Object.keys(current.executions).length === 0) {
          const seeded = createSeed();
          const first = pickSelected(seeded.executions, current.selectedId);
          set({
            ...seeded,
            hydrated: true,
            autoRun: current.autoRun,
            selectedId: first,
          });
          return;
        }
        if (!current.hydrated) set({ hydrated: true });
      },
      setSelected: (executionId) => set({ selectedId: executionId }),
      setAutoRun: (value) => set({ autoRun: value }),
      tick: () => {
        const current = get();
        if (!current.hydrated) return;
        const next = tickKernel(current, Date.now());
        set({
          executions: next.executions,
          events: next.events,
          approvals: next.approvals,
          evidence: next.evidence,
          audit: next.audit,
          dispatch: next.dispatch,
        });
      },
      step: (executionId) => {
        const current = get();
        const target =
          executionId ??
          current.selectedId ??
          Object.values(current.executions).find(
            (item) => item.status !== "APPROVAL" && item.status !== "LEARNING" && item.status !== "FAILED" && item.status !== "REJECTED",
          )?.executionId;
        if (!target) return;
        const next = advanceExecution(current, target, Date.now());
        set({
          executions: next.executions,
          events: next.events,
          approvals: next.approvals,
          evidence: next.evidence,
          audit: next.audit,
          dispatch: next.dispatch,
          selectedId: target,
        });
      },
      start: (input) => {
        const current = get();
        const result = startExecution(current, input, Date.now());
        set({
          executions: result.state.executions,
          events: result.state.events,
          approvals: result.state.approvals,
          evidence: result.state.evidence,
          audit: result.state.audit,
          dispatch: result.state.dispatch,
          selectedId: result.executionId,
        });
        return result.executionId;
      },
      approve: (approvalId, status, reason) => {
        const current = get();
        const next = decideApproval(
          current,
          approvalId,
          status,
          current.principal.subjectId,
          Date.now(),
          reason,
        );
        set({
          executions: next.executions,
          events: next.events,
          approvals: next.approvals,
          evidence: next.evidence,
          audit: next.audit,
          dispatch: next.dispatch,
        });
      },
      resetDemo: () => {
        const seeded = createSeed();
        const first = pickSelected(seeded.executions);
        set({
          ...seeded,
          hydrated: true,
          autoRun: true,
          selectedId: first,
        });
      },
    }),
    {
      name: "logon-control-plane-v2",
      partialize: (state) => ({
        tenantId: state.tenantId,
        principal: state.principal,
        executions: state.executions,
        events: state.events,
        approvals: state.approvals,
        evidence: state.evidence,
        audit: state.audit,
        permissions: state.permissions,
        dispatch: state.dispatch,
        autoRun: state.autoRun,
        selectedId: state.selectedId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.ensureSeeded();
      },
    },
  ),
);
