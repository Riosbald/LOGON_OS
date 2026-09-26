import assert from "node:assert/strict";
import { test } from "node:test";
import { advanceExecution, decideApproval, expireApprovals, startExecution } from "./engine.ts";
import { createEmptyKernel } from "./seed.ts";
import { canTransition } from "./state-machine.ts";

test("a registered tool does not grant permission", () => {
  const started = startExecution(
    createEmptyKernel(),
    {
      objective: "Send unsolicited outreach",
      agentId: "demand.scout",
      requestedTools: ["outreach.email"],
      policySet: ["baseline"],
    },
    1,
  );
  let state = started.state;
  for (let i = 0; i < 8; i += 1) {
    state = advanceExecution(state, started.executionId, 2 + i);
  }
  const execution = state.executions[started.executionId]!;
  assert.equal(execution.status, "FAILED");
  assert.equal(execution.failureType, "PERMISSION_DENIAL");
});

test("high-impact tools propose, then wait for approval before committing", () => {
  const started = startExecution(
    createEmptyKernel(),
    {
      objective: "Issue recovery credit after duplicate invoices",
      agentId: "proof.auditor",
      requestedTools: ["crm.read", "payments.wire"],
      policySet: ["baseline", "high-impact"],
    },
    1,
  );
  let state = started.state;
  for (let i = 0; i < 10; i += 1) {
    state = advanceExecution(state, started.executionId, 2 + i);
  }
  const execution = state.executions[started.executionId]!;
  assert.equal(execution.status, "APPROVAL");
  const toolEvidence = state.evidence.filter(
    (item) => item.executionId === started.executionId && item.kind === "TOOL_RESULT",
  );
  assert.equal(toolEvidence.length, 0);
  const pending = state.approvals.find(
    (item) => item.executionId === started.executionId && item.status === "PENDING",
  );
  assert.ok(pending);
});

test("approval commits tool evidence; rejection does not", () => {
  const started = startExecution(
    createEmptyKernel(),
    {
      objective: "Issue recovery credit after duplicate invoices",
      agentId: "proof.auditor",
      requestedTools: ["payments.wire"],
      policySet: ["baseline", "high-impact"],
    },
    1,
  );
  let state = started.state;
  for (let i = 0; i < 10; i += 1) {
    state = advanceExecution(state, started.executionId, 2 + i);
  }
  const approval = state.approvals.find((item) => item.status === "PENDING");
  assert.ok(approval);
  state = decideApproval(state, approval.approvalId, "APPROVED", "operator.ade", 20);
  for (let i = 0; i < 6; i += 1) {
    state = advanceExecution(state, started.executionId, 21 + i);
  }
  const committed = state.evidence.filter(
    (item) => item.executionId === started.executionId && item.kind === "TOOL_RESULT",
  );
  assert.ok(committed.length >= 1);
  assert.equal(state.executions[started.executionId]!.status, "LEARNING");
});

test("deny-all fails closed at intake", () => {
  const started = startExecution(
    createEmptyKernel(),
    {
      objective: "Anything",
      agentId: "proof.auditor",
      requestedTools: ["crm.read"],
      policySet: ["deny-all"],
    },
    1,
  );
  assert.equal(started.state.executions[started.executionId]!.status, "REJECTED");
  assert.equal(started.state.executions[started.executionId]!.failureType, "POLICY_DENIAL");
});

test("failed work cannot silently become success", () => {
  assert.equal(canTransition("FAILED", "LEARNING"), false);
  assert.equal(canTransition("REJECTED", "EXECUTION"), false);
  assert.equal(canTransition("VALIDATION", "APPROVAL"), true);
  assert.equal(canTransition("APPROVAL", "EXECUTION"), true);
});

test("expired approvals reject the execution", () => {
  const started = startExecution(
    createEmptyKernel(),
    {
      objective: "Deploy production flags",
      agentId: "ops.courier",
      requestedTools: ["deploy.production"],
      policySet: ["baseline"],
    },
    1,
  );
  let state = started.state;
  for (let i = 0; i < 10; i += 1) {
    state = advanceExecution(state, started.executionId, 2 + i);
  }
  assert.equal(state.executions[started.executionId]!.status, "APPROVAL");
  const approval = state.approvals.find((item) => item.status === "PENDING");
  assert.ok(approval?.expiresAt);
  const later = Date.parse(approval.expiresAt) + 1000;
  state = expireApprovals(state, later);
  assert.equal(state.approvals.find((item) => item.approvalId === approval.approvalId)?.status, "EXPIRED");
  assert.equal(state.executions[started.executionId]!.status, "REJECTED");
  assert.equal(state.executions[started.executionId]!.failureType, "TIMEOUT");
});
