import type { ExecutionEvent, ExecutionStatus } from "./types";

export function formatTime(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatExact(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

export function humanStatus(status: string): string {
  return status.replaceAll("_", " ");
}

export function shortId(value: string): string {
  return value.length > 16 ? value.slice(0, 14) : value;
}

export function statusTone(
  status: ExecutionStatus | string,
): "live" | "warn" | "danger" | "neutral" | "done" {
  switch (status) {
    case "FAILED":
    case "REJECTED":
      return "danger";
    case "APPROVAL":
      return "warn";
    case "LEARNING":
      return "done";
    case "EXECUTION":
    case "ACTION":
    case "VALIDATION":
    case "EVIDENCE":
    case "OUTCOME":
    case "INTAKE":
    case "CONTEXT":
    case "POLICY_CHECK":
    case "PLANNING":
    case "TOOL_PERMISSION_CHECK":
    case "EVALUATION":
      return "live";
    default:
      return "neutral";
  }
}

export function eventSummary(event: ExecutionEvent): string {
  const payload = event.payload;
  const reason = typeof payload.reason === "string" ? payload.reason : undefined;

  switch (event.status) {
    case "INTAKE":
      return `Kernel accepted the objective for ${String(payload.agentId ?? "the agent")}.`;
    case "CONTEXT":
      return "Tenant context was gathered from the controlled execution handler.";
    case "POLICY_CHECK":
      return reason ?? "Baseline policy was evaluated.";
    case "PLANNING":
      return "The requested tool plan was materialised. No side effects yet.";
    case "TOOL_PERMISSION_CHECK":
      return reason ?? "Each requested tool was checked against tenant grants.";
    case "ACTION":
      return payload.committed === false
        ? "Tools proposed work. Side effects are not committed."
        : "Tool action ran.";
    case "VALIDATION":
      return "Output was validated against the execution-output contract.";
    case "APPROVAL":
      return reason ?? "High-impact work is blocked until a human decides.";
    case "EXECUTION":
      return reason ?? "Kernel committed permitted side effects.";
    case "EVIDENCE":
      return "Evidence records were sealed onto the execution.";
    case "OUTCOME":
      return "Outcome was measured against the original objective.";
    case "EVALUATION":
      return "The run was evaluated for regression and completeness.";
    case "LEARNING":
      return "The loop closed. Traces are available for learning.";
    case "FAILED":
      return reason ?? "Execution failed closed.";
    case "REJECTED":
      return reason ?? "Execution was rejected. Work must not proceed.";
    default:
      return event.type;
  }
}
