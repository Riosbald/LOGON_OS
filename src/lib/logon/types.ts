export type ExecutionStatus =
  | "INTAKE"
  | "CONTEXT"
  | "POLICY_CHECK"
  | "PLANNING"
  | "TOOL_PERMISSION_CHECK"
  | "ACTION"
  | "VALIDATION"
  | "APPROVAL"
  | "EXECUTION"
  | "EVIDENCE"
  | "OUTCOME"
  | "EVALUATION"
  | "LEARNING"
  | "FAILED"
  | "REJECTED";

export type FailureType =
  | "MODEL_FAILURE"
  | "TOOL_FAILURE"
  | "POLICY_DENIAL"
  | "PERMISSION_DENIAL"
  | "VALIDATION_FAILURE"
  | "TIMEOUT"
  | "EXTERNAL_SYSTEM_FAILURE"
  | "HUMAN_REJECTION"
  | "UNKNOWN_OUTCOME";

export type SideEffectClass =
  | "READ"
  | "WRITE"
  | "EXTERNAL_MESSAGE"
  | "TRANSACTION"
  | "DESTRUCTIVE";

export type DataSensitivity = "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "RESTRICTED";

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export type DispatchStatus =
  | "queued"
  | "dispatched"
  | "blocked_approval"
  | "completed"
  | "failed";

export type SystemId =
  | "proof"
  | "assurance"
  | "intelligence"
  | "strategy"
  | "demand"
  | "delivery"
  | "retention"
  | "measurement"
  | "learning"
  | "board";

export interface ExecutionIdentity {
  executionId: string;
  tenantId: string;
  actorId: string;
  agentId: string;
  agentVersion: string;
}

export interface ExecutionRequest {
  identity: ExecutionIdentity;
  objective: string;
  context: Record<string, unknown>;
  policySet: string[];
  requestedTools: string[];
  requiresApproval: boolean;
  evidenceRequired: boolean;
  createdAt: string;
}

export interface ToolDefinition {
  toolId: string;
  version: string;
  owner: string;
  title: string;
  summary: string;
  sideEffect: SideEffectClass;
  dataSensitivity: DataSensitivity;
  requiredPermission: string;
  allowedAgents: string[];
  timeoutMs: number;
  maxRetries: number;
  auditRequired: boolean;
}

export interface ToolPermission {
  tenantId: string;
  agentId: string;
  toolId: string;
  permission: string;
  allowed: boolean;
  expiresAt?: string;
}

export interface ExecutionEvent {
  executionId: string;
  sequence: number;
  type: string;
  status: ExecutionStatus;
  timestamp: string;
  actorId: string;
  payload: Record<string, unknown>;
}

export interface EvidenceRecord {
  evidenceId: string;
  executionId: string;
  tenantId: string;
  kind: "INPUT" | "TOOL_RESULT" | "VALIDATION" | "APPROVAL" | "OUTPUT" | "ERROR";
  source: string;
  payloadHash: string;
  createdAt: string;
}

export interface AuditRecord {
  auditId: string;
  executionId: string;
  tenantId: string;
  action: string;
  actorId: string;
  allowed: boolean;
  reason: string;
  createdAt: string;
}

export interface ApprovalRecord {
  approvalId: string;
  executionId: string;
  tenantId: string;
  requestedBy: string;
  reason: string;
  status: ApprovalStatus;
  decidedBy?: string;
  decidedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface DispatchRecord {
  executionId: string;
  queueName: string;
  status: DispatchStatus;
  attempts: number;
  lockedUntil?: string;
  lastError?: string;
  createdAt: string;
  dispatchedAt?: string;
}

export interface AgentDefinition {
  agentId: string;
  version: string;
  title: string;
  systemId: SystemId;
  summary: string;
}

export interface ExecutionRecord {
  executionId: string;
  tenantId: string;
  actorId: string;
  agentId: string;
  agentVersion: string;
  objective: string;
  status: ExecutionStatus;
  systemId: SystemId;
  request: {
    policySet: string[];
    requestedTools: string[];
    requiresApproval: boolean;
    evidenceRequired: boolean;
    context: Record<string, unknown>;
  };
  createdAt: string;
  updatedAt: string;
  failureType?: FailureType;
  failureReason?: string;
}

export interface KernelSnapshot {
  tenantId: string;
  principal: {
    subjectId: string;
    tenantId: string;
    roles: string[];
    authentication: "DEV";
  };
  executions: Record<string, ExecutionRecord>;
  events: ExecutionEvent[];
  approvals: ApprovalRecord[];
  evidence: EvidenceRecord[];
  audit: AuditRecord[];
  permissions: ToolPermission[];
  dispatch: Record<string, DispatchRecord>;
}

export const LIFECYCLE: ExecutionStatus[] = [
  "INTAKE",
  "CONTEXT",
  "POLICY_CHECK",
  "PLANNING",
  "TOOL_PERMISSION_CHECK",
  "ACTION",
  "VALIDATION",
  "APPROVAL",
  "EXECUTION",
  "EVIDENCE",
  "OUTCOME",
  "EVALUATION",
  "LEARNING",
];

export const TERMINAL_STATUSES: ReadonlySet<ExecutionStatus> = new Set([
  "FAILED",
  "REJECTED",
  "LEARNING",
]);

export const ACTIVE_STATUSES: ReadonlySet<ExecutionStatus> = new Set([
  "INTAKE",
  "CONTEXT",
  "POLICY_CHECK",
  "PLANNING",
  "TOOL_PERMISSION_CHECK",
  "ACTION",
  "VALIDATION",
  "EXECUTION",
  "EVIDENCE",
  "OUTCOME",
  "EVALUATION",
]);
