import { payloadHash } from "./hash";
import { checkToolPermission } from "./permissions";
import { evaluateExecutionPolicy, evaluateToolPolicy } from "./policy";
import { assertTransition } from "./state-machine";
import { agentById, toolById } from "./catalog";
import type {
  ApprovalRecord,
  DispatchRecord,
  EvidenceRecord,
  ExecutionEvent,
  ExecutionRecord,
  ExecutionRequest,
  ExecutionStatus,
  FailureType,
  KernelSnapshot,
  SystemId,
} from "./types";
import { TERMINAL_STATUSES } from "./types";
import { WORKER_ID } from "./catalog";

function nowIso(now: number) {
  return new Date(now).toISOString();
}

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function asRequest(execution: ExecutionRecord): ExecutionRequest {
  return {
    identity: {
      executionId: execution.executionId,
      tenantId: execution.tenantId,
      actorId: execution.actorId,
      agentId: execution.agentId,
      agentVersion: execution.agentVersion,
    },
    objective: execution.objective,
    context: execution.request.context,
    policySet: execution.request.policySet,
    requestedTools: execution.request.requestedTools,
    requiresApproval: execution.request.requiresApproval,
    evidenceRequired: execution.request.evidenceRequired,
    createdAt: execution.createdAt,
  };
}

function appendEvent(
  state: KernelSnapshot,
  executionId: string,
  status: ExecutionStatus,
  actorId: string,
  payload: Record<string, unknown>,
  timestamp: string,
): ExecutionEvent {
  const sequence =
    state.events.filter((event) => event.executionId === executionId).length + 1;
  const event: ExecutionEvent = {
    executionId,
    sequence,
    type: `EXECUTION_${status}`,
    status,
    timestamp,
    actorId,
    payload,
  };
  state.events.push(event);
  return event;
}

function appendAudit(
  state: KernelSnapshot,
  record: {
    executionId: string;
    tenantId: string;
    action: string;
    actorId: string;
    allowed: boolean;
    reason: string;
  },
  timestamp: string,
) {
  state.audit.unshift({
    auditId: id("aud"),
    createdAt: timestamp,
    ...record,
  });
}

function appendEvidence(
  state: KernelSnapshot,
  record: {
    executionId: string;
    tenantId: string;
    kind: EvidenceRecord["kind"];
    source: string;
    payload: unknown;
  },
  timestamp: string,
) {
  state.evidence.unshift({
    evidenceId: id("evd"),
    executionId: record.executionId,
    tenantId: record.tenantId,
    kind: record.kind,
    source: record.source,
    payloadHash: payloadHash(record.payload),
    createdAt: timestamp,
  });
}

function setDispatch(
  state: KernelSnapshot,
  executionId: string,
  patch: Partial<DispatchRecord>,
  timestamp: string,
) {
  const current = state.dispatch[executionId];
  const next: DispatchRecord = {
    executionId,
    queueName: current?.queueName ?? "logon.execution",
    status: current?.status ?? "queued",
    attempts: current?.attempts ?? 0,
    createdAt: current?.createdAt ?? timestamp,
  };
  if (current?.lockedUntil) next.lockedUntil = current.lockedUntil;
  if (current?.lastError) next.lastError = current.lastError;
  if (current?.dispatchedAt) next.dispatchedAt = current.dispatchedAt;
  if (patch.queueName) next.queueName = patch.queueName;
  if (patch.status) next.status = patch.status;
  if (patch.attempts !== undefined) next.attempts = patch.attempts;
  if (patch.lockedUntil) next.lockedUntil = patch.lockedUntil;
  if (patch.lastError) next.lastError = patch.lastError;
  if (patch.dispatchedAt) next.dispatchedAt = patch.dispatchedAt;
  state.dispatch[executionId] = next;
}

function transition(
  state: KernelSnapshot,
  executionId: string,
  status: ExecutionStatus,
  actorId: string,
  payload: Record<string, unknown>,
  timestamp: string,
  extras: Partial<Pick<ExecutionRecord, "failureType" | "failureReason">> = {},
) {
  const execution = state.executions[executionId];
  if (!execution) throw new Error(`Unknown execution: ${executionId}`);
  if (execution.status !== status) {
    assertTransition(execution.status, status);
  }
  execution.status = status;
  execution.updatedAt = timestamp;
  if (extras.failureType) execution.failureType = extras.failureType;
  if (extras.failureReason) execution.failureReason = extras.failureReason;
  appendEvent(state, executionId, status, actorId, payload, timestamp);
}

export interface StartInput {
  objective: string;
  agentId: string;
  requestedTools: string[];
  policySet: string[];
  requiresApproval?: boolean;
  context?: Record<string, unknown>;
  actorId?: string;
  tenantId?: string;
}

export function startExecution(
  snapshot: KernelSnapshot,
  input: StartInput,
  now: number,
): { state: KernelSnapshot; executionId: string; blocked?: string } {
  const state = clone(snapshot);
  const timestamp = nowIso(now);
  const agent = agentById(input.agentId);
  if (!agent) {
    throw new Error(`Unknown agent: ${input.agentId}`);
  }

  const objective = input.objective.trim();
  const executionId = id("exec");
  const actorId = input.actorId ?? snapshot.principal.subjectId;
  const tenantId = input.tenantId ?? snapshot.tenantId;
  const systemId = (input.context?.["systemId"] as SystemId | undefined) ?? agent.systemId;
  const requiresApproval =
    Boolean(input.requiresApproval) ||
    input.policySet.includes("high-impact") ||
    input.requestedTools.some((toolId) => {
      const tool = toolById(toolId);
      return tool?.sideEffect === "TRANSACTION" || tool?.sideEffect === "DESTRUCTIVE";
    });

  const execution: ExecutionRecord = {
    executionId,
    tenantId,
    actorId,
    agentId: agent.agentId,
    agentVersion: agent.version,
    objective: objective || "(missing objective)",
    status: "INTAKE",
    systemId,
    request: {
      policySet: input.policySet.length ? input.policySet : ["baseline"],
      requestedTools: input.requestedTools,
      requiresApproval,
      evidenceRequired: true,
      context: { systemId, ...input.context },
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  state.executions[executionId] = execution;

  const request = asRequest(execution);
  const decision = evaluateExecutionPolicy(request);
  appendAudit(
    state,
    {
      executionId,
      tenantId,
      action: "EXECUTION_POLICY_CHECK",
      actorId,
      allowed: decision.allowed,
      reason: decision.reason,
    },
    timestamp,
  );
  appendEvidence(
    state,
    {
      executionId,
      tenantId,
      kind: "INPUT",
      source: "control-plane",
      payload: {
        objective: execution.objective,
        agentId: agent.agentId,
        requestedTools: input.requestedTools,
        policySet: execution.request.policySet,
      },
    },
    timestamp,
  );

  if (!decision.allowed) {
    execution.status = "REJECTED";
    execution.failureType = "POLICY_DENIAL";
    execution.failureReason = decision.reason;
    appendEvent(state, executionId, "REJECTED", actorId, { reason: decision.reason }, timestamp);
    setDispatch(state, executionId, { status: "failed", lastError: decision.reason, attempts: 0 }, timestamp);
    return { state, executionId, blocked: decision.reason };
  }

  appendEvent(
    state,
    executionId,
    "INTAKE",
    actorId,
    {
      objective: execution.objective,
      agentId: agent.agentId,
      agentVersion: agent.version,
    },
    timestamp,
  );
  setDispatch(state, executionId, { status: "queued", attempts: 0 }, timestamp);
  return { state, executionId };
}

function permissionFor(
  state: KernelSnapshot,
  execution: ExecutionRecord,
  toolId: string,
) {
  return state.permissions.find(
    (row) =>
      row.tenantId === execution.tenantId &&
      row.agentId === execution.agentId &&
      row.toolId === toolId,
  );
}

function simulateToolResult(toolId: string, execution: ExecutionRecord) {
  switch (toolId) {
    case "crm.read":
      return { records: 18, account: "Acme Logistics", region: "LAG" };
    case "evidence.ledger":
      return { appended: true, kinds: ["INPUT", "TOOL_RESULT"] };
    case "report.compose":
      return { draft: "Q3 duplicate-invoice recovery", pages: 6 };
    case "payments.wire":
      return { instrument: "NGN-WIRE", amount: "4200000", beneficiary: "VT-441" };
    case "outreach.email":
      return { to: "prospect@example.com", template: "proof-intro" };
    case "deploy.production":
      return { target: "prod-eu-west", change: "runtime-flags" };
    case "intel.ingest":
      return { sources: 4, normalized: 112, duplicates: 9 };
    default:
      return { toolId, objective: execution.objective };
  }
}

export function advanceExecution(
  snapshot: KernelSnapshot,
  executionId: string,
  now: number,
  actorId = WORKER_ID,
): KernelSnapshot {
  const state = clone(snapshot);
  const execution = state.executions[executionId];
  if (!execution) return state;
  if (TERMINAL_STATUSES.has(execution.status) || execution.status === "APPROVAL") {
    return state;
  }

  const timestamp = nowIso(now);
  const request = asRequest(execution);

  switch (execution.status) {
    case "INTAKE": {
      setDispatch(state, executionId, { status: "dispatched", attempts: 1, dispatchedAt: timestamp }, timestamp);
      transition(state, executionId, "CONTEXT", actorId, {
        source: "controlled-execution-handler",
        gathered: Object.keys(execution.request.context),
      }, timestamp);
      break;
    }
    case "CONTEXT": {
      transition(state, executionId, "POLICY_CHECK", actorId, {
        policySet: execution.request.policySet,
      }, timestamp);
      break;
    }
    case "POLICY_CHECK": {
      const decision = evaluateExecutionPolicy(request);
      appendAudit(state, {
        executionId,
        tenantId: execution.tenantId,
        action: "POLICY_CHECK",
        actorId,
        allowed: decision.allowed,
        reason: decision.reason,
      }, timestamp);
      if (!decision.allowed) {
        transition(state, executionId, "REJECTED", actorId, { reason: decision.reason }, timestamp, {
          failureType: "POLICY_DENIAL",
          failureReason: decision.reason,
        });
        setDispatch(state, executionId, { status: "failed", lastError: decision.reason }, timestamp);
      } else {
        transition(state, executionId, "PLANNING", actorId, {
          reason: decision.reason,
          requiresApproval: decision.requiresApproval,
        }, timestamp);
      }
      break;
    }
    case "PLANNING": {
      const plan = execution.request.requestedTools.map((toolId) => {
        const tool = toolById(toolId);
        return {
          toolId,
          sideEffect: tool?.sideEffect ?? "READ",
          known: Boolean(tool),
        };
      });
      transition(state, executionId, "TOOL_PERMISSION_CHECK", actorId, { plan }, timestamp);
      break;
    }
    case "TOOL_PERMISSION_CHECK": {
      const tools = execution.request.requestedTools;
      let denied: { toolId: string; reason: string } | undefined;
      let needsApproval = execution.request.requiresApproval;

      for (const toolId of tools) {
        const tool = toolById(toolId);
        if (!tool) {
          denied = { toolId, reason: `Unknown tool: ${toolId}` };
          break;
        }
        const policy = evaluateToolPolicy(request, tool);
        appendAudit(state, {
          executionId,
          tenantId: execution.tenantId,
          action: `TOOL_POLICY:${toolId}`,
          actorId,
          allowed: policy.allowed,
          reason: policy.reason,
        }, timestamp);
        if (!policy.allowed) {
          denied = { toolId, reason: policy.reason };
          break;
        }
        if (policy.requiresApproval) needsApproval = true;
        const permission = checkToolPermission(request, tool, permissionFor(state, execution, toolId));
        appendAudit(state, {
          executionId,
          tenantId: execution.tenantId,
          action: `TOOL_PERMISSION:${toolId}`,
          actorId,
          allowed: permission.allowed,
          reason: permission.reason,
        }, timestamp);
        if (!permission.allowed) {
          denied = { toolId, reason: permission.reason };
          break;
        }
      }

      if (denied) {
        const failureType: FailureType = denied.reason.startsWith("Unknown")
          ? "TOOL_FAILURE"
          : "PERMISSION_DENIAL";
        transition(state, executionId, "FAILED", actorId, denied, timestamp, {
          failureType,
          failureReason: denied.reason,
        });
        setDispatch(state, executionId, { status: "failed", lastError: denied.reason }, timestamp);
        appendEvidence(state, {
          executionId,
          tenantId: execution.tenantId,
          kind: "ERROR",
          source: denied.toolId,
          payload: denied,
        }, timestamp);
        break;
      }

      execution.request.requiresApproval = needsApproval;
      transition(state, executionId, "ACTION", actorId, {
        tools,
        committed: false,
        requiresApproval: needsApproval,
        reason: needsApproval
          ? "Tools are permitted. Proposed work will be validated, then gated."
          : "All requested tools are permitted without an approval gate.",
      }, timestamp);
      break;
    }
    case "ACTION": {
      const proposed = execution.request.requestedTools.map((toolId) => ({
        toolId,
        result: simulateToolResult(toolId, execution),
      }));
      execution.request.context = {
        ...execution.request.context,
        proposedResults: proposed,
      };
      transition(state, executionId, "VALIDATION", actorId, {
        proposed,
        committed: false,
        reason: "Proposal recorded. Side effects are not committed.",
      }, timestamp);
      break;
    }
    case "VALIDATION": {
      appendEvidence(state, {
        executionId,
        tenantId: execution.tenantId,
        kind: "VALIDATION",
        source: "kernel.validator",
        payload: { ok: true, schema: "execution-output/v1", committed: false },
      }, timestamp);
      if (execution.request.policySet.includes("africa-expansion")) {
        appendEvidence(state, {
          executionId,
          tenantId: execution.tenantId,
          kind: "VALIDATION",
          source: "policy.africa-expansion",
          payload: { dualControl: true, region: execution.request.context["region"] ?? "LAG" },
        }, timestamp);
      }

      if (execution.request.requiresApproval) {
        const reason =
          execution.request.policySet.includes("africa-expansion")
            ? "africa-expansion dual-control: a human must approve before side effects commit."
            : "High-impact action requires an explicit human decision before side effects commit.";
        const approval: ApprovalRecord = {
          approvalId: id("apr"),
          executionId,
          tenantId: execution.tenantId,
          requestedBy: actorId,
          reason,
          status: "PENDING",
          createdAt: timestamp,
          expiresAt: nowIso(now + 1000 * 60 * 60 * 6),
        };
        state.approvals.unshift(approval);
        transition(state, executionId, "APPROVAL", actorId, {
          approvalId: approval.approvalId,
          reason,
        }, timestamp);
        setDispatch(state, executionId, { status: "blocked_approval" }, timestamp);
      } else {
        transition(state, executionId, "EXECUTION", actorId, {
          reason: "Validation passed. Side effects may proceed.",
        }, timestamp);
      }
      break;
    }
    case "EXECUTION": {
      const proposed = Array.isArray(execution.request.context["proposedResults"])
        ? (execution.request.context["proposedResults"] as Array<{ toolId: string; result: unknown }>)
        : execution.request.requestedTools.map((toolId) => ({
            toolId,
            result: simulateToolResult(toolId, execution),
          }));
      for (const item of proposed) {
        appendEvidence(state, {
          executionId,
          tenantId: execution.tenantId,
          kind: "TOOL_RESULT",
          source: item.toolId,
          payload: item.result,
        }, timestamp);
      }
      setDispatch(state, executionId, { status: "dispatched", attempts: 2, dispatchedAt: timestamp }, timestamp);
      transition(state, executionId, "EVIDENCE", actorId, {
        sideEffects: execution.request.requestedTools,
        committed: true,
        reason: "Kernel committed permitted side effects.",
      }, timestamp);
      break;
    }
    case "EVIDENCE": {
      appendEvidence(state, {
        executionId,
        tenantId: execution.tenantId,
        kind: "OUTPUT",
        source: "kernel.evidence",
        payload: { objective: execution.objective, status: "sealed" },
      }, timestamp);
      transition(state, executionId, "OUTCOME", actorId, {
        measured: true,
      }, timestamp);
      break;
    }
    case "OUTCOME": {
      transition(state, executionId, "EVALUATION", actorId, {
        outcome: "completed",
        system: execution.systemId,
      }, timestamp);
      break;
    }
    case "EVALUATION": {
      transition(state, executionId, "LEARNING", actorId, {
        dataset: "proof-loop",
        regression: "none",
      }, timestamp);
      setDispatch(state, executionId, { status: "completed" }, timestamp);
      break;
    }
    default:
      break;
  }

  return state;
}

export function expireApprovals(snapshot: KernelSnapshot, now: number): KernelSnapshot {
  const pending = snapshot.approvals.filter(
    (item) => item.status === "PENDING" && item.expiresAt && Date.parse(item.expiresAt) <= now,
  );
  if (!pending.length) return snapshot;

  const state = clone(snapshot);
  const timestamp = nowIso(now);

  for (const stale of pending) {
    const approval = state.approvals.find((item) => item.approvalId === stale.approvalId);
    if (!approval || approval.status !== "PENDING") continue;
    approval.status = "EXPIRED";

    const execution = state.executions[approval.executionId];
    if (!execution || execution.status !== "APPROVAL") continue;

    const message = "Approval expired. High-impact work must not proceed.";
    transition(state, execution.executionId, "REJECTED", WORKER_ID, {
      approvalId: approval.approvalId,
      reason: message,
    }, timestamp, {
      failureType: "TIMEOUT",
      failureReason: message,
    });
    setDispatch(state, execution.executionId, { status: "failed", lastError: message }, timestamp);
    appendAudit(state, {
      executionId: execution.executionId,
      tenantId: execution.tenantId,
      action: "APPROVAL_EXPIRED",
      actorId: WORKER_ID,
      allowed: false,
      reason: message,
    }, timestamp);
  }

  return state;
}

export function tickKernel(snapshot: KernelSnapshot, now: number): KernelSnapshot {
  let state = expireApprovals(snapshot, now);
  const runnable = Object.values(state.executions)
    .filter((item) => !TERMINAL_STATUSES.has(item.status) && item.status !== "APPROVAL")
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));

  for (const execution of runnable) {
    state = advanceExecution(state, execution.executionId, now);
  }
  return state;
}

export function decideApproval(
  snapshot: KernelSnapshot,
  approvalId: string,
  status: "APPROVED" | "REJECTED",
  decidedBy: string,
  now: number,
  reason?: string,
): KernelSnapshot {
  const state = clone(snapshot);
  const timestamp = nowIso(now);
  const approval = state.approvals.find((item) => item.approvalId === approvalId);
  if (!approval) throw new Error(`Approval not found: ${approvalId}`);
  if (approval.status !== "PENDING") throw new Error(`Approval is not pending: ${approvalId}`);

  const execution = state.executions[approval.executionId];
  if (!execution) throw new Error(`Execution not found: ${approval.executionId}`);
  if (execution.status !== "APPROVAL") {
    throw new Error("Approval is not bound to an execution in APPROVAL.");
  }

  approval.status = status;
  approval.decidedBy = decidedBy;
  approval.decidedAt = timestamp;

  appendAudit(state, {
    executionId: execution.executionId,
    tenantId: execution.tenantId,
    action: "APPROVAL_DECISION",
    actorId: decidedBy,
    allowed: status === "APPROVED",
    reason: reason ?? (status === "APPROVED" ? "Approved by control-plane principal." : "Rejected by control-plane principal."),
  }, timestamp);
  appendEvidence(state, {
    executionId: execution.executionId,
    tenantId: execution.tenantId,
    kind: "APPROVAL",
    source: decidedBy,
    payload: { approvalId, status, reason },
  }, timestamp);

  if (status === "APPROVED") {
    transition(state, execution.executionId, "EXECUTION", decidedBy, {
      approvalId,
      reason: reason ?? "Human approval granted. Kernel may commit side effects.",
    }, timestamp);
    setDispatch(state, execution.executionId, { status: "dispatched", dispatchedAt: timestamp, attempts: 2 }, timestamp);
  } else {
    const message = reason ?? "Human rejection. Work must not proceed.";
    transition(state, execution.executionId, "REJECTED", decidedBy, { approvalId, reason: message }, timestamp, {
      failureType: "HUMAN_REJECTION",
      failureReason: message,
    });
    setDispatch(state, execution.executionId, { status: "failed", lastError: message }, timestamp);
  }

  return state;
}

export function pendingApprovals(state: KernelSnapshot, executionId: string) {
  return state.approvals.filter(
    (item) => item.executionId === executionId && item.status === "PENDING",
  );
}
