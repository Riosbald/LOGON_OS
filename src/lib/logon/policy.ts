import type { ExecutionRequest, ToolDefinition } from "./types";

export interface PolicyDecision {
  allowed: boolean;
  requiresApproval: boolean;
  reason: string;
}

const highImpact = new Set(["TRANSACTION", "DESTRUCTIVE"]);

export function evaluateExecutionPolicy(request: ExecutionRequest): PolicyDecision {
  if (!request.objective.trim()) {
    return { allowed: false, requiresApproval: false, reason: "Objective is required." };
  }

  if (request.policySet.includes("deny-all")) {
    return {
      allowed: false,
      requiresApproval: false,
      reason: "Policy set deny-all blocked this execution at the kernel boundary.",
    };
  }

  const dualControl =
    request.policySet.includes("africa-expansion") &&
    (request.requiresApproval || request.requestedTools.length > 0);

  return {
    allowed: true,
    requiresApproval: request.requiresApproval || dualControl,
    reason: dualControl
      ? "africa-expansion is in force. Funds movement and high-impact work require dual-control."
      : "Execution request satisfies baseline kernel policy.",
  };
}

export function evaluateToolPolicy(
  request: ExecutionRequest,
  tool: ToolDefinition,
): PolicyDecision {
  if (!tool.allowedAgents.includes(request.identity.agentId)) {
    return {
      allowed: false,
      requiresApproval: false,
      reason: `Agent ${request.identity.agentId} is not allowlisted for ${tool.toolId}.`,
    };
  }

  const africaFunds =
    request.policySet.includes("africa-expansion") && tool.sideEffect === "TRANSACTION";
  const approval = request.requiresApproval || highImpact.has(tool.sideEffect) || africaFunds;

  return {
    allowed: true,
    requiresApproval: approval,
    reason: africaFunds
      ? `${tool.toolId} is allowed, but africa-expansion requires dual-control before funds move.`
      : approval
        ? `${tool.toolId} is allowed but requires an approval gate.`
        : `${tool.toolId} is allowed under the registered policy.`,
  };
}
