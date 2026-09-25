import type { AgentDefinition, SystemId, ToolDefinition, ToolPermission } from "./types";

export const TENANT_ID = "logon.demo";
export const OPERATOR_ID = "operator.ade";
export const WORKER_ID = "logon.execution.worker";

export const AGENTS: AgentDefinition[] = [
  {
    agentId: "proof.auditor",
    version: "1.2.0",
    title: "Proof Auditor",
    systemId: "proof",
    summary: "Prospect to evidence-backed recommendation, approval, and measurement.",
  },
  {
    agentId: "assurance.sentinel",
    version: "0.9.4",
    title: "Assurance Sentinel",
    systemId: "assurance",
    summary: "Capability, misuse, and permission review before any go-live.",
  },
  {
    agentId: "intel.weaver",
    version: "1.1.1",
    title: "Intelligence Weaver",
    systemId: "intelligence",
    summary: "Ingest, normalize, verify, and surface change that matters.",
  },
  {
    agentId: "demand.scout",
    version: "1.0.3",
    title: "Demand Scout",
    systemId: "demand",
    summary: "Visibility to qualified booking without unsupervised outreach.",
  },
  {
    agentId: "ops.courier",
    version: "2.1.0",
    title: "Delivery Courier",
    systemId: "delivery",
    summary: "Configure, deploy, and monitor customer delivery work.",
  },
];

export const TOOLS: ToolDefinition[] = [
  {
    toolId: "crm.read",
    version: "1.4.0",
    owner: "LOG_ON",
    title: "CRM Read",
    summary: "Tenant-scoped customer and vendor records.",
    sideEffect: "READ",
    dataSensitivity: "INTERNAL",
    requiredPermission: "crm:read",
    allowedAgents: ["proof.auditor", "demand.scout", "intel.weaver", "ops.courier"],
    timeoutMs: 8000,
    maxRetries: 2,
    auditRequired: true,
  },
  {
    toolId: "evidence.ledger",
    version: "1.0.2",
    owner: "LOG_ON",
    title: "Evidence Ledger",
    summary: "Append hashed proof artifacts to the execution record.",
    sideEffect: "WRITE",
    dataSensitivity: "CONFIDENTIAL",
    requiredPermission: "evidence:write",
    allowedAgents: ["proof.auditor", "assurance.sentinel", "intel.weaver"],
    timeoutMs: 5000,
    maxRetries: 1,
    auditRequired: true,
  },
  {
    toolId: "report.compose",
    version: "0.8.0",
    owner: "LOG_ON",
    title: "Report Compose",
    summary: "Draft a measured outcome report from evidence.",
    sideEffect: "WRITE",
    dataSensitivity: "INTERNAL",
    requiredPermission: "report:write",
    allowedAgents: ["proof.auditor", "intel.weaver"],
    timeoutMs: 12000,
    maxRetries: 1,
    auditRequired: true,
  },
  {
    toolId: "payments.wire",
    version: "2.0.1",
    owner: "LOG_ON",
    title: "Payments Wire",
    summary: "High-impact funds movement. Always gated.",
    sideEffect: "TRANSACTION",
    dataSensitivity: "RESTRICTED",
    requiredPermission: "payments:wire",
    allowedAgents: ["proof.auditor", "ops.courier"],
    timeoutMs: 15000,
    maxRetries: 0,
    auditRequired: true,
  },
  {
    toolId: "outreach.email",
    version: "1.3.0",
    owner: "LOG_ON",
    title: "Outreach Email",
    summary: "External message to a prospect or customer.",
    sideEffect: "EXTERNAL_MESSAGE",
    dataSensitivity: "CONFIDENTIAL",
    requiredPermission: "crm:message",
    allowedAgents: ["demand.scout"],
    timeoutMs: 10000,
    maxRetries: 2,
    auditRequired: true,
  },
  {
    toolId: "deploy.production",
    version: "0.6.0",
    owner: "LOG_ON",
    title: "Production Deploy",
    summary: "Destructive production configuration change.",
    sideEffect: "DESTRUCTIVE",
    dataSensitivity: "RESTRICTED",
    requiredPermission: "deploy:production",
    allowedAgents: ["ops.courier"],
    timeoutMs: 20000,
    maxRetries: 0,
    auditRequired: true,
  },
  {
    toolId: "intel.ingest",
    version: "1.2.0",
    owner: "LOG_ON",
    title: "Intelligence Ingest",
    summary: "Pull and normalize market or customer signals.",
    sideEffect: "READ",
    dataSensitivity: "INTERNAL",
    requiredPermission: "intel:ingest",
    allowedAgents: ["intel.weaver", "demand.scout"],
    timeoutMs: 9000,
    maxRetries: 3,
    auditRequired: false,
  },
];

export const SYSTEMS: Array<{
  id: SystemId;
  index: string;
  title: string;
  loop: string;
  status: "live" | "next" | "later";
}> = [
  {
    id: "proof",
    index: "01",
    title: "Proof",
    loop: "Prospect → Audit → Recommendation → Approval → Automation → Measurement → Report",
    status: "live",
  },
  {
    id: "assurance",
    index: "02",
    title: "Assurance",
    loop: "Discover → Threat Model → Capability Test → Misuse Test → Oversight → Go-Live",
    status: "next",
  },
  {
    id: "intelligence",
    index: "03",
    title: "Intelligence",
    loop: "Source → Ingest → Normalize → Verify → Change Detection → Action",
    status: "live",
  },
  {
    id: "strategy",
    index: "04",
    title: "Strategy",
    loop: "Objective → Current State → Gap → Options → Plan → KPIs",
    status: "later",
  },
  {
    id: "demand",
    index: "05",
    title: "Demand",
    loop: "Prospect → Visibility → Outreach → Lead → Qualification → Booking",
    status: "next",
  },
  {
    id: "delivery",
    index: "06",
    title: "Delivery",
    loop: "Sale → Scope → Onboard → Configure → Deploy → Launch → Monitor",
    status: "live",
  },
  {
    id: "retention",
    index: "07",
    title: "Retention",
    loop: "Interaction → Sentiment → Issue → Recovery → Referral → Renewal",
    status: "later",
  },
  {
    id: "measurement",
    index: "08",
    title: "Measurement",
    loop: "Business outcomes + system metrics + customer outcomes",
    status: "next",
  },
  {
    id: "learning",
    index: "09",
    title: "Learning",
    loop: "Trace → Failure → Dataset → Evaluation → Regression → Improvement",
    status: "live",
  },
  {
    id: "board",
    index: "10",
    title: "Board",
    loop: "Goals → Intelligence → Strategy → Work Allocation → Oversight",
    status: "later",
  },
];

export const POLICY_SETS = [
  { id: "baseline", label: "baseline", hint: "Identity, objective, and evidence required." },
  { id: "high-impact", label: "high-impact", hint: "Forces an approval gate regardless of tool class." },
  { id: "africa-expansion", label: "africa-expansion", hint: "Adds regional evidence and dual-control on funds." },
  { id: "deny-all", label: "deny-all", hint: "Fail-closed test policy. Blocks at POLICY_CHECK." },
];

export function toolById(toolId: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.toolId === toolId);
}

export function agentById(agentId: string): AgentDefinition | undefined {
  return AGENTS.find((agent) => agent.agentId === agentId);
}

export function toolsForAgent(agentId: string): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.allowedAgents.includes(agentId));
}

export function defaultPermissions(): ToolPermission[] {
  const rows: ToolPermission[] = [];
  for (const tool of TOOLS) {
    for (const agentId of tool.allowedAgents) {
      const denied = tool.toolId === "outreach.email" && agentId === "demand.scout";
      rows.push({
        tenantId: TENANT_ID,
        agentId,
        toolId: tool.toolId,
        permission: tool.requiredPermission,
        allowed: !denied,
      });
    }
  }
  return rows;
}
