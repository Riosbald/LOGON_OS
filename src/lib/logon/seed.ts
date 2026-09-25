import { defaultPermissions, TENANT_ID, OPERATOR_ID } from "./catalog";
import { advanceExecution, decideApproval, startExecution } from "./engine";
import type { KernelSnapshot } from "./types";

function emptySnapshot(): KernelSnapshot {
  return {
    tenantId: TENANT_ID,
    principal: {
      subjectId: OPERATOR_ID,
      tenantId: TENANT_ID,
      roles: ["ADMIN", "APPROVER"],
      authentication: "DEV",
    },
    executions: {},
    events: [],
    approvals: [],
    evidence: [],
    audit: [],
    permissions: defaultPermissions(),
    dispatch: {},
  };
}

function replay(state: KernelSnapshot, executionId: string, steps: number, origin: number) {
  let next = state;
  for (let i = 0; i < steps; i += 1) {
    next = advanceExecution(next, executionId, origin + (i + 1) * 40_000);
  }
  return next;
}

export function createSeed(now = Date.now()): KernelSnapshot {
  let state = emptySnapshot();

  const proof = startExecution(
    state,
    {
      objective: "Issue ₦4.2m recovery credit to vendor VT-441 after confirmed duplicate invoices",
      agentId: "proof.auditor",
      requestedTools: ["crm.read", "evidence.ledger", "payments.wire"],
      policySet: ["baseline", "high-impact", "africa-expansion"],
      actorId: OPERATOR_ID,
      context: { customer: "Acme Logistics", systemId: "proof" },
    },
    now - 1000 * 60 * 28,
  );
  state = replay(proof.state, proof.executionId, 8, now - 1000 * 60 * 28);

  const intel = startExecution(
    state,
    {
      objective: "Normalize Lagos market signals for the weekly intelligence briefing",
      agentId: "intel.weaver",
      requestedTools: ["intel.ingest", "evidence.ledger", "report.compose"],
      policySet: ["baseline"],
      actorId: OPERATOR_ID,
      context: { region: "LAG", systemId: "intelligence" },
    },
    now - 1000 * 60 * 12,
  );
  state = replay(intel.state, intel.executionId, 6, now - 1000 * 60 * 12);

  const done = startExecution(
    state,
    {
      objective: "Produce the evidence pack for Harmony Foods' completed proof loop",
      agentId: "proof.auditor",
      requestedTools: ["crm.read", "evidence.ledger", "report.compose"],
      policySet: ["baseline"],
      actorId: OPERATOR_ID,
      context: { customer: "Harmony Foods", systemId: "proof" },
    },
    now - 1000 * 60 * 180,
  );
  state = replay(done.state, done.executionId, 16, now - 1000 * 60 * 180);

  const denied = startExecution(
    state,
    {
      objective: "Deploy production runtime flags for an unverified courier revision",
      agentId: "ops.courier",
      requestedTools: ["deploy.production"],
      policySet: ["baseline"],
      actorId: OPERATOR_ID,
      context: { change: "runtime-flags", systemId: "delivery" },
    },
    now - 1000 * 60 * 90,
  );
  state = replay(denied.state, denied.executionId, 8, now - 1000 * 60 * 90);
  const pending = state.approvals.find(
    (item) => item.executionId === denied.executionId && item.status === "PENDING",
  );
  if (pending) {
    state = decideApproval(
      state,
      pending.approvalId,
      "REJECTED",
      OPERATOR_ID,
      now - 1000 * 60 * 70,
      "Unverified agent revision. Production deploy is not permitted.",
    );
  }

  const perm = startExecution(
    state,
    {
      objective: "Send an unsolicited outreach sequence to Northstar's buying committee",
      agentId: "demand.scout",
      requestedTools: ["outreach.email"],
      policySet: ["baseline"],
      actorId: OPERATOR_ID,
      context: { account: "Northstar", systemId: "demand" },
    },
    now - 1000 * 60 * 50,
  );
  state = replay(perm.state, perm.executionId, 8, now - 1000 * 60 * 50);

  const intake = startExecution(
    state,
    {
      objective: "Scope onboarding for new Proof customer Northstar and prepare the audit plan",
      agentId: "proof.auditor",
      requestedTools: ["crm.read", "evidence.ledger", "report.compose"],
      policySet: ["baseline"],
      actorId: OPERATOR_ID,
      context: { customer: "Northstar", systemId: "proof" },
    },
    now - 1000 * 20,
  );
  state = intake.state;

  return state;
}

export function createEmptyKernel(): KernelSnapshot {
  return emptySnapshot();
}
