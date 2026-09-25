import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./app-shell-T45YdftK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BnNqOcPL.js
var import_jsx_runtime = require_jsx_runtime();
function formatTime(value) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(value));
}
function formatExact(value) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}).format(new Date(value));
}
function humanStatus(status) {
	return status.replaceAll("_", " ");
}
function shortId(value) {
	return value.length > 16 ? value.slice(0, 14) : value;
}
function statusTone(status) {
	switch (status) {
		case "FAILED":
		case "REJECTED": return "danger";
		case "APPROVAL": return "warn";
		case "LEARNING": return "done";
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
		case "EVALUATION": return "live";
		default: return "neutral";
	}
}
function eventSummary(event) {
	const payload = event.payload;
	const reason = typeof payload.reason === "string" ? payload.reason : void 0;
	switch (event.status) {
		case "INTAKE": return `Kernel accepted the objective for ${String(payload.agentId ?? "the agent")}.`;
		case "CONTEXT": return "Tenant context was gathered from the controlled execution handler.";
		case "POLICY_CHECK": return reason ?? "Baseline policy was evaluated.";
		case "PLANNING": return "The requested tool plan was materialised. No side effects yet.";
		case "TOOL_PERMISSION_CHECK": return reason ?? "Each requested tool was checked against tenant grants.";
		case "ACTION": return payload.committed === false ? "Tools proposed work. Side effects are not committed." : "Tool action ran.";
		case "VALIDATION": return "Output was validated against the execution-output contract.";
		case "APPROVAL": return reason ?? "High-impact work is blocked until a human decides.";
		case "EXECUTION": return reason ?? "Kernel committed permitted side effects.";
		case "EVIDENCE": return "Evidence records were sealed onto the execution.";
		case "OUTCOME": return "Outcome was measured against the original objective.";
		case "EVALUATION": return "The run was evaluated for regression and completeness.";
		case "LEARNING": return "The loop closed. Traces are available for learning.";
		case "FAILED": return reason ?? "Execution failed closed.";
		case "REJECTED": return reason ?? "Execution was rejected. Work must not proceed.";
		default: return event.type;
	}
}
var tones = {
	live: "bg-accent/10 text-accent",
	warn: "bg-warn/12 text-warn",
	danger: "bg-danger/10 text-danger",
	done: "bg-ink/8 text-ink",
	neutral: "bg-ink/8 text-muted"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex w-fit items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]", tones[statusTone(status)]),
		children: humanStatus(status)
	});
}
function Badge({ children, tone = "neutral", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex w-fit items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]", tones[tone], className),
		children
	});
}
//#endregion
export { formatTime as a, formatExact as i, StatusBadge as n, humanStatus as o, eventSummary as r, shortId as s, Badge as t };
