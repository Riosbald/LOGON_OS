import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dmy58Kc5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TENANT_ID = "logon.demo";
var OPERATOR_ID = "operator.ade";
var WORKER_ID = "logon.execution.worker";
var AGENTS = [
	{
		agentId: "proof.auditor",
		version: "1.2.0",
		title: "Proof Auditor",
		systemId: "proof",
		summary: "Prospect to evidence-backed recommendation, approval, and measurement."
	},
	{
		agentId: "assurance.sentinel",
		version: "0.9.4",
		title: "Assurance Sentinel",
		systemId: "assurance",
		summary: "Capability, misuse, and permission review before any go-live."
	},
	{
		agentId: "intel.weaver",
		version: "1.1.1",
		title: "Intelligence Weaver",
		systemId: "intelligence",
		summary: "Ingest, normalize, verify, and surface change that matters."
	},
	{
		agentId: "demand.scout",
		version: "1.0.3",
		title: "Demand Scout",
		systemId: "demand",
		summary: "Visibility to qualified booking without unsupervised outreach."
	},
	{
		agentId: "ops.courier",
		version: "2.1.0",
		title: "Delivery Courier",
		systemId: "delivery",
		summary: "Configure, deploy, and monitor customer delivery work."
	}
];
var TOOLS = [
	{
		toolId: "crm.read",
		version: "1.4.0",
		owner: "LOG_ON",
		title: "CRM Read",
		summary: "Tenant-scoped customer and vendor records.",
		sideEffect: "READ",
		dataSensitivity: "INTERNAL",
		requiredPermission: "crm:read",
		allowedAgents: [
			"proof.auditor",
			"demand.scout",
			"intel.weaver",
			"ops.courier"
		],
		timeoutMs: 8e3,
		maxRetries: 2,
		auditRequired: true
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
		allowedAgents: [
			"proof.auditor",
			"assurance.sentinel",
			"intel.weaver"
		],
		timeoutMs: 5e3,
		maxRetries: 1,
		auditRequired: true
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
		timeoutMs: 12e3,
		maxRetries: 1,
		auditRequired: true
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
		timeoutMs: 15e3,
		maxRetries: 0,
		auditRequired: true
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
		timeoutMs: 1e4,
		maxRetries: 2,
		auditRequired: true
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
		timeoutMs: 2e4,
		maxRetries: 0,
		auditRequired: true
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
		timeoutMs: 9e3,
		maxRetries: 3,
		auditRequired: false
	}
];
var SYSTEMS = [
	{
		id: "proof",
		index: "01",
		title: "Proof",
		loop: "Prospect → Audit → Recommendation → Approval → Automation → Measurement → Report",
		status: "live"
	},
	{
		id: "assurance",
		index: "02",
		title: "Assurance",
		loop: "Discover → Threat Model → Capability Test → Misuse Test → Oversight → Go-Live",
		status: "next"
	},
	{
		id: "intelligence",
		index: "03",
		title: "Intelligence",
		loop: "Source → Ingest → Normalize → Verify → Change Detection → Action",
		status: "live"
	},
	{
		id: "strategy",
		index: "04",
		title: "Strategy",
		loop: "Objective → Current State → Gap → Options → Plan → KPIs",
		status: "later"
	},
	{
		id: "demand",
		index: "05",
		title: "Demand",
		loop: "Prospect → Visibility → Outreach → Lead → Qualification → Booking",
		status: "next"
	},
	{
		id: "delivery",
		index: "06",
		title: "Delivery",
		loop: "Sale → Scope → Onboard → Configure → Deploy → Launch → Monitor",
		status: "live"
	},
	{
		id: "retention",
		index: "07",
		title: "Retention",
		loop: "Interaction → Sentiment → Issue → Recovery → Referral → Renewal",
		status: "later"
	},
	{
		id: "measurement",
		index: "08",
		title: "Measurement",
		loop: "Business outcomes + system metrics + customer outcomes",
		status: "next"
	},
	{
		id: "learning",
		index: "09",
		title: "Learning",
		loop: "Trace → Failure → Dataset → Evaluation → Regression → Improvement",
		status: "live"
	},
	{
		id: "board",
		index: "10",
		title: "Board",
		loop: "Goals → Intelligence → Strategy → Work Allocation → Oversight",
		status: "later"
	}
];
var POLICY_SETS = [
	{
		id: "baseline",
		label: "baseline",
		hint: "Identity, objective, and evidence required."
	},
	{
		id: "high-impact",
		label: "high-impact",
		hint: "Forces an approval gate regardless of tool class."
	},
	{
		id: "africa-expansion",
		label: "africa-expansion",
		hint: "Adds regional evidence and dual-control on funds."
	},
	{
		id: "deny-all",
		label: "deny-all",
		hint: "Fail-closed test policy. Blocks at POLICY_CHECK."
	}
];
function toolById(toolId) {
	return TOOLS.find((tool) => tool.toolId === toolId);
}
function agentById(agentId) {
	return AGENTS.find((agent) => agent.agentId === agentId);
}
function toolsForAgent(agentId) {
	return TOOLS.filter((tool) => tool.allowedAgents.includes(agentId));
}
function defaultPermissions() {
	const rows = [];
	for (const tool of TOOLS) for (const agentId of tool.allowedAgents) {
		const denied = tool.toolId === "outreach.email" && agentId === "demand.scout";
		rows.push({
			tenantId: TENANT_ID,
			agentId,
			toolId: tool.toolId,
			permission: tool.requiredPermission,
			allowed: !denied
		});
	}
	return rows;
}
function canonicalJson(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value);
	if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
	const record = value;
	return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`;
}
function payloadHash(value) {
	const json = canonicalJson(value);
	let h = 2166136261;
	for (let i = 0; i < json.length; i += 1) {
		h ^= json.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16).padStart(8, "0") + (Math.imul(h ^ json.length, 2654435769) >>> 0).toString(16).padStart(8, "0");
}
function checkToolPermission(request, tool, permission) {
	if (!permission) return {
		allowed: false,
		reason: "No explicit tenant/agent/tool permission exists."
	};
	if (permission.tenantId !== request.identity.tenantId) return {
		allowed: false,
		reason: "Permission belongs to a different tenant."
	};
	if (permission.agentId !== request.identity.agentId || permission.toolId !== tool.toolId) return {
		allowed: false,
		reason: "Permission does not match the requesting agent and tool."
	};
	if (!permission.allowed || permission.permission !== tool.requiredPermission) return {
		allowed: false,
		reason: "Required permission was not granted."
	};
	if (permission.expiresAt && Date.parse(permission.expiresAt) <= Date.now()) return {
		allowed: false,
		reason: "Permission has expired."
	};
	return {
		allowed: true,
		reason: "Explicit permission granted."
	};
}
var highImpact = /* @__PURE__ */ new Set(["TRANSACTION", "DESTRUCTIVE"]);
function evaluateExecutionPolicy(request) {
	if (!request.objective.trim()) return {
		allowed: false,
		requiresApproval: false,
		reason: "Objective is required."
	};
	if (request.policySet.includes("deny-all")) return {
		allowed: false,
		requiresApproval: false,
		reason: "Policy set deny-all blocked this execution at the kernel boundary."
	};
	const dualControl = request.policySet.includes("africa-expansion") && (request.requiresApproval || request.requestedTools.length > 0);
	return {
		allowed: true,
		requiresApproval: request.requiresApproval || dualControl,
		reason: dualControl ? "africa-expansion is in force. Funds movement and high-impact work require dual-control." : "Execution request satisfies baseline kernel policy."
	};
}
function evaluateToolPolicy(request, tool) {
	if (!tool.allowedAgents.includes(request.identity.agentId)) return {
		allowed: false,
		requiresApproval: false,
		reason: `Agent ${request.identity.agentId} is not allowlisted for ${tool.toolId}.`
	};
	const africaFunds = request.policySet.includes("africa-expansion") && tool.sideEffect === "TRANSACTION";
	const approval = request.requiresApproval || highImpact.has(tool.sideEffect) || africaFunds;
	return {
		allowed: true,
		requiresApproval: approval,
		reason: africaFunds ? `${tool.toolId} is allowed, but africa-expansion requires dual-control before funds move.` : approval ? `${tool.toolId} is allowed but requires an approval gate.` : `${tool.toolId} is allowed under the registered policy.`
	};
}
var transitions = {
	INTAKE: ["CONTEXT", "FAILED"],
	CONTEXT: ["POLICY_CHECK", "FAILED"],
	POLICY_CHECK: [
		"PLANNING",
		"REJECTED",
		"FAILED"
	],
	PLANNING: ["TOOL_PERMISSION_CHECK", "FAILED"],
	TOOL_PERMISSION_CHECK: [
		"ACTION",
		"APPROVAL",
		"REJECTED",
		"FAILED"
	],
	ACTION: ["VALIDATION", "FAILED"],
	VALIDATION: [
		"APPROVAL",
		"EXECUTION",
		"FAILED"
	],
	APPROVAL: [
		"EXECUTION",
		"REJECTED",
		"FAILED"
	],
	EXECUTION: ["EVIDENCE", "FAILED"],
	EVIDENCE: ["OUTCOME", "FAILED"],
	OUTCOME: ["EVALUATION", "FAILED"],
	EVALUATION: ["LEARNING", "FAILED"],
	LEARNING: [],
	FAILED: [],
	REJECTED: []
};
function canTransition(from, to) {
	return transitions[from].includes(to);
}
function assertTransition(from, to) {
	if (!canTransition(from, to)) throw new Error(`Invalid execution transition: ${from} -> ${to}`);
}
var LIFECYCLE = [
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
	"LEARNING"
];
var TERMINAL_STATUSES = /* @__PURE__ */ new Set([
	"FAILED",
	"REJECTED",
	"LEARNING"
]);
function nowIso(now) {
	return new Date(now).toISOString();
}
function id(prefix) {
	return `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
}
function clone(value) {
	return structuredClone(value);
}
function asRequest(execution) {
	return {
		identity: {
			executionId: execution.executionId,
			tenantId: execution.tenantId,
			actorId: execution.actorId,
			agentId: execution.agentId,
			agentVersion: execution.agentVersion
		},
		objective: execution.objective,
		context: execution.request.context,
		policySet: execution.request.policySet,
		requestedTools: execution.request.requestedTools,
		requiresApproval: execution.request.requiresApproval,
		evidenceRequired: execution.request.evidenceRequired,
		createdAt: execution.createdAt
	};
}
function appendEvent(state, executionId, status, actorId, payload, timestamp) {
	const event = {
		executionId,
		sequence: state.events.filter((event) => event.executionId === executionId).length + 1,
		type: `EXECUTION_${status}`,
		status,
		timestamp,
		actorId,
		payload
	};
	state.events.push(event);
	return event;
}
function appendAudit(state, record, timestamp) {
	state.audit.unshift({
		auditId: id("aud"),
		createdAt: timestamp,
		...record
	});
}
function appendEvidence(state, record, timestamp) {
	state.evidence.unshift({
		evidenceId: id("evd"),
		executionId: record.executionId,
		tenantId: record.tenantId,
		kind: record.kind,
		source: record.source,
		payloadHash: payloadHash(record.payload),
		createdAt: timestamp
	});
}
function setDispatch(state, executionId, patch, timestamp) {
	const current = state.dispatch[executionId];
	const next = {
		executionId,
		queueName: current?.queueName ?? "logon.execution",
		status: current?.status ?? "queued",
		attempts: current?.attempts ?? 0,
		createdAt: current?.createdAt ?? timestamp
	};
	if (current?.lockedUntil) next.lockedUntil = current.lockedUntil;
	if (current?.lastError) next.lastError = current.lastError;
	if (current?.dispatchedAt) next.dispatchedAt = current.dispatchedAt;
	if (patch.queueName) next.queueName = patch.queueName;
	if (patch.status) next.status = patch.status;
	if (patch.attempts !== void 0) next.attempts = patch.attempts;
	if (patch.lockedUntil) next.lockedUntil = patch.lockedUntil;
	if (patch.lastError) next.lastError = patch.lastError;
	if (patch.dispatchedAt) next.dispatchedAt = patch.dispatchedAt;
	state.dispatch[executionId] = next;
}
function transition(state, executionId, status, actorId, payload, timestamp, extras = {}) {
	const execution = state.executions[executionId];
	if (!execution) throw new Error(`Unknown execution: ${executionId}`);
	if (execution.status !== status) assertTransition(execution.status, status);
	execution.status = status;
	execution.updatedAt = timestamp;
	if (extras.failureType) execution.failureType = extras.failureType;
	if (extras.failureReason) execution.failureReason = extras.failureReason;
	appendEvent(state, executionId, status, actorId, payload, timestamp);
}
function startExecution(snapshot, input, now) {
	const state = clone(snapshot);
	const timestamp = nowIso(now);
	const agent = agentById(input.agentId);
	if (!agent) throw new Error(`Unknown agent: ${input.agentId}`);
	const objective = input.objective.trim();
	const executionId = id("exec");
	const actorId = input.actorId ?? snapshot.principal.subjectId;
	const tenantId = input.tenantId ?? snapshot.tenantId;
	const systemId = input.context?.systemId ?? agent.systemId;
	const requiresApproval = Boolean(input.requiresApproval) || input.policySet.includes("high-impact") || input.requestedTools.some((toolId) => {
		const tool = toolById(toolId);
		return tool?.sideEffect === "TRANSACTION" || tool?.sideEffect === "DESTRUCTIVE";
	});
	const execution = {
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
			context: {
				systemId,
				...input.context
			}
		},
		createdAt: timestamp,
		updatedAt: timestamp
	};
	state.executions[executionId] = execution;
	const decision = evaluateExecutionPolicy(asRequest(execution));
	appendAudit(state, {
		executionId,
		tenantId,
		action: "EXECUTION_POLICY_CHECK",
		actorId,
		allowed: decision.allowed,
		reason: decision.reason
	}, timestamp);
	appendEvidence(state, {
		executionId,
		tenantId,
		kind: "INPUT",
		source: "control-plane",
		payload: {
			objective: execution.objective,
			agentId: agent.agentId,
			requestedTools: input.requestedTools,
			policySet: execution.request.policySet
		}
	}, timestamp);
	if (!decision.allowed) {
		execution.status = "REJECTED";
		execution.failureType = "POLICY_DENIAL";
		execution.failureReason = decision.reason;
		appendEvent(state, executionId, "REJECTED", actorId, { reason: decision.reason }, timestamp);
		setDispatch(state, executionId, {
			status: "failed",
			lastError: decision.reason,
			attempts: 0
		}, timestamp);
		return {
			state,
			executionId,
			blocked: decision.reason
		};
	}
	appendEvent(state, executionId, "INTAKE", actorId, {
		objective: execution.objective,
		agentId: agent.agentId,
		agentVersion: agent.version
	}, timestamp);
	setDispatch(state, executionId, {
		status: "queued",
		attempts: 0
	}, timestamp);
	return {
		state,
		executionId
	};
}
function permissionFor(state, execution, toolId) {
	return state.permissions.find((row) => row.tenantId === execution.tenantId && row.agentId === execution.agentId && row.toolId === toolId);
}
function simulateToolResult(toolId, execution) {
	switch (toolId) {
		case "crm.read": return {
			records: 18,
			account: "Acme Logistics",
			region: "LAG"
		};
		case "evidence.ledger": return {
			appended: true,
			kinds: ["INPUT", "TOOL_RESULT"]
		};
		case "report.compose": return {
			draft: "Q3 duplicate-invoice recovery",
			pages: 6
		};
		case "payments.wire": return {
			instrument: "NGN-WIRE",
			amount: "4200000",
			beneficiary: "VT-441"
		};
		case "outreach.email": return {
			to: "prospect@example.com",
			template: "proof-intro"
		};
		case "deploy.production": return {
			target: "prod-eu-west",
			change: "runtime-flags"
		};
		case "intel.ingest": return {
			sources: 4,
			normalized: 112,
			duplicates: 9
		};
		default: return {
			toolId,
			objective: execution.objective
		};
	}
}
function advanceExecution(snapshot, executionId, now, actorId = WORKER_ID) {
	const state = clone(snapshot);
	const execution = state.executions[executionId];
	if (!execution) return state;
	if (TERMINAL_STATUSES.has(execution.status) || execution.status === "APPROVAL") return state;
	const timestamp = nowIso(now);
	const request = asRequest(execution);
	switch (execution.status) {
		case "INTAKE":
			setDispatch(state, executionId, {
				status: "dispatched",
				attempts: 1,
				dispatchedAt: timestamp
			}, timestamp);
			transition(state, executionId, "CONTEXT", actorId, {
				source: "controlled-execution-handler",
				gathered: Object.keys(execution.request.context)
			}, timestamp);
			break;
		case "CONTEXT":
			transition(state, executionId, "POLICY_CHECK", actorId, { policySet: execution.request.policySet }, timestamp);
			break;
		case "POLICY_CHECK": {
			const decision = evaluateExecutionPolicy(request);
			appendAudit(state, {
				executionId,
				tenantId: execution.tenantId,
				action: "POLICY_CHECK",
				actorId,
				allowed: decision.allowed,
				reason: decision.reason
			}, timestamp);
			if (!decision.allowed) {
				transition(state, executionId, "REJECTED", actorId, { reason: decision.reason }, timestamp, {
					failureType: "POLICY_DENIAL",
					failureReason: decision.reason
				});
				setDispatch(state, executionId, {
					status: "failed",
					lastError: decision.reason
				}, timestamp);
			} else transition(state, executionId, "PLANNING", actorId, {
				reason: decision.reason,
				requiresApproval: decision.requiresApproval
			}, timestamp);
			break;
		}
		case "PLANNING":
			transition(state, executionId, "TOOL_PERMISSION_CHECK", actorId, { plan: execution.request.requestedTools.map((toolId) => {
				const tool = toolById(toolId);
				return {
					toolId,
					sideEffect: tool?.sideEffect ?? "READ",
					known: Boolean(tool)
				};
			}) }, timestamp);
			break;
		case "TOOL_PERMISSION_CHECK": {
			const tools = execution.request.requestedTools;
			let denied;
			let needsApproval = execution.request.requiresApproval;
			for (const toolId of tools) {
				const tool = toolById(toolId);
				if (!tool) {
					denied = {
						toolId,
						reason: `Unknown tool: ${toolId}`
					};
					break;
				}
				const policy = evaluateToolPolicy(request, tool);
				appendAudit(state, {
					executionId,
					tenantId: execution.tenantId,
					action: `TOOL_POLICY:${toolId}`,
					actorId,
					allowed: policy.allowed,
					reason: policy.reason
				}, timestamp);
				if (!policy.allowed) {
					denied = {
						toolId,
						reason: policy.reason
					};
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
					reason: permission.reason
				}, timestamp);
				if (!permission.allowed) {
					denied = {
						toolId,
						reason: permission.reason
					};
					break;
				}
			}
			if (denied) {
				const failureType = denied.reason.startsWith("Unknown") ? "TOOL_FAILURE" : "PERMISSION_DENIAL";
				transition(state, executionId, "FAILED", actorId, denied, timestamp, {
					failureType,
					failureReason: denied.reason
				});
				setDispatch(state, executionId, {
					status: "failed",
					lastError: denied.reason
				}, timestamp);
				appendEvidence(state, {
					executionId,
					tenantId: execution.tenantId,
					kind: "ERROR",
					source: denied.toolId,
					payload: denied
				}, timestamp);
				break;
			}
			execution.request.requiresApproval = needsApproval;
			transition(state, executionId, "ACTION", actorId, {
				tools,
				committed: false,
				requiresApproval: needsApproval,
				reason: needsApproval ? "Tools are permitted. Proposed work will be validated, then gated." : "All requested tools are permitted without an approval gate."
			}, timestamp);
			break;
		}
		case "ACTION": {
			const proposed = execution.request.requestedTools.map((toolId) => ({
				toolId,
				result: simulateToolResult(toolId, execution)
			}));
			execution.request.context = {
				...execution.request.context,
				proposedResults: proposed
			};
			transition(state, executionId, "VALIDATION", actorId, {
				proposed,
				committed: false,
				reason: "Proposal recorded. Side effects are not committed."
			}, timestamp);
			break;
		}
		case "VALIDATION":
			appendEvidence(state, {
				executionId,
				tenantId: execution.tenantId,
				kind: "VALIDATION",
				source: "kernel.validator",
				payload: {
					ok: true,
					schema: "execution-output/v1",
					committed: false
				}
			}, timestamp);
			if (execution.request.policySet.includes("africa-expansion")) appendEvidence(state, {
				executionId,
				tenantId: execution.tenantId,
				kind: "VALIDATION",
				source: "policy.africa-expansion",
				payload: {
					dualControl: true,
					region: execution.request.context.region ?? "LAG"
				}
			}, timestamp);
			if (execution.request.requiresApproval) {
				const reason = execution.request.policySet.includes("africa-expansion") ? "africa-expansion dual-control: a human must approve before side effects commit." : "High-impact action requires an explicit human decision before side effects commit.";
				const approval = {
					approvalId: id("apr"),
					executionId,
					tenantId: execution.tenantId,
					requestedBy: actorId,
					reason,
					status: "PENDING",
					createdAt: timestamp,
					expiresAt: nowIso(now + 216e5)
				};
				state.approvals.unshift(approval);
				transition(state, executionId, "APPROVAL", actorId, {
					approvalId: approval.approvalId,
					reason
				}, timestamp);
				setDispatch(state, executionId, { status: "blocked_approval" }, timestamp);
			} else transition(state, executionId, "EXECUTION", actorId, { reason: "Validation passed. Side effects may proceed." }, timestamp);
			break;
		case "EXECUTION": {
			const proposed = Array.isArray(execution.request.context.proposedResults) ? execution.request.context.proposedResults : execution.request.requestedTools.map((toolId) => ({
				toolId,
				result: simulateToolResult(toolId, execution)
			}));
			for (const item of proposed) appendEvidence(state, {
				executionId,
				tenantId: execution.tenantId,
				kind: "TOOL_RESULT",
				source: item.toolId,
				payload: item.result
			}, timestamp);
			setDispatch(state, executionId, {
				status: "dispatched",
				attempts: 2,
				dispatchedAt: timestamp
			}, timestamp);
			transition(state, executionId, "EVIDENCE", actorId, {
				sideEffects: execution.request.requestedTools,
				committed: true,
				reason: "Kernel committed permitted side effects."
			}, timestamp);
			break;
		}
		case "EVIDENCE":
			appendEvidence(state, {
				executionId,
				tenantId: execution.tenantId,
				kind: "OUTPUT",
				source: "kernel.evidence",
				payload: {
					objective: execution.objective,
					status: "sealed"
				}
			}, timestamp);
			transition(state, executionId, "OUTCOME", actorId, { measured: true }, timestamp);
			break;
		case "OUTCOME":
			transition(state, executionId, "EVALUATION", actorId, {
				outcome: "completed",
				system: execution.systemId
			}, timestamp);
			break;
		case "EVALUATION":
			transition(state, executionId, "LEARNING", actorId, {
				dataset: "proof-loop",
				regression: "none"
			}, timestamp);
			setDispatch(state, executionId, { status: "completed" }, timestamp);
	}
	return state;
}
function expireApprovals(snapshot, now) {
	const pending = snapshot.approvals.filter((item) => item.status === "PENDING" && item.expiresAt && Date.parse(item.expiresAt) <= now);
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
			reason: message
		}, timestamp, {
			failureType: "TIMEOUT",
			failureReason: message
		});
		setDispatch(state, execution.executionId, {
			status: "failed",
			lastError: message
		}, timestamp);
		appendAudit(state, {
			executionId: execution.executionId,
			tenantId: execution.tenantId,
			action: "APPROVAL_EXPIRED",
			actorId: WORKER_ID,
			allowed: false,
			reason: message
		}, timestamp);
	}
	return state;
}
function tickKernel(snapshot, now) {
	let state = expireApprovals(snapshot, now);
	const runnable = Object.values(state.executions).filter((item) => !TERMINAL_STATUSES.has(item.status) && item.status !== "APPROVAL").sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
	for (const execution of runnable) state = advanceExecution(state, execution.executionId, now);
	return state;
}
function decideApproval(snapshot, approvalId, status, decidedBy, now, reason) {
	const state = clone(snapshot);
	const timestamp = nowIso(now);
	const approval = state.approvals.find((item) => item.approvalId === approvalId);
	if (!approval) throw new Error(`Approval not found: ${approvalId}`);
	if (approval.status !== "PENDING") throw new Error(`Approval is not pending: ${approvalId}`);
	const execution = state.executions[approval.executionId];
	if (!execution) throw new Error(`Execution not found: ${approval.executionId}`);
	if (execution.status !== "APPROVAL") throw new Error("Approval is not bound to an execution in APPROVAL.");
	approval.status = status;
	approval.decidedBy = decidedBy;
	approval.decidedAt = timestamp;
	appendAudit(state, {
		executionId: execution.executionId,
		tenantId: execution.tenantId,
		action: "APPROVAL_DECISION",
		actorId: decidedBy,
		allowed: status === "APPROVED",
		reason: reason ?? (status === "APPROVED" ? "Approved by control-plane principal." : "Rejected by control-plane principal.")
	}, timestamp);
	appendEvidence(state, {
		executionId: execution.executionId,
		tenantId: execution.tenantId,
		kind: "APPROVAL",
		source: decidedBy,
		payload: {
			approvalId,
			status,
			reason
		}
	}, timestamp);
	if (status === "APPROVED") {
		transition(state, execution.executionId, "EXECUTION", decidedBy, {
			approvalId,
			reason: reason ?? "Human approval granted. Kernel may commit side effects."
		}, timestamp);
		setDispatch(state, execution.executionId, {
			status: "dispatched",
			dispatchedAt: timestamp,
			attempts: 2
		}, timestamp);
	} else {
		const message = reason ?? "Human rejection. Work must not proceed.";
		transition(state, execution.executionId, "REJECTED", decidedBy, {
			approvalId,
			reason: message
		}, timestamp, {
			failureType: "HUMAN_REJECTION",
			failureReason: message
		});
		setDispatch(state, execution.executionId, {
			status: "failed",
			lastError: message
		}, timestamp);
	}
	return state;
}
function emptySnapshot() {
	return {
		tenantId: TENANT_ID,
		principal: {
			subjectId: OPERATOR_ID,
			tenantId: TENANT_ID,
			roles: ["ADMIN", "APPROVER"],
			authentication: "DEV"
		},
		executions: {},
		events: [],
		approvals: [],
		evidence: [],
		audit: [],
		permissions: defaultPermissions(),
		dispatch: {}
	};
}
function replay(state, executionId, steps, origin) {
	let next = state;
	for (let i = 0; i < steps; i += 1) next = advanceExecution(next, executionId, origin + (i + 1) * 4e4);
	return next;
}
function createSeed(now = Date.now()) {
	let state = emptySnapshot();
	const proof = startExecution(state, {
		objective: "Issue ₦4.2m recovery credit to vendor VT-441 after confirmed duplicate invoices",
		agentId: "proof.auditor",
		requestedTools: [
			"crm.read",
			"evidence.ledger",
			"payments.wire"
		],
		policySet: [
			"baseline",
			"high-impact",
			"africa-expansion"
		],
		actorId: OPERATOR_ID,
		context: {
			customer: "Acme Logistics",
			systemId: "proof"
		}
	}, now - 168e4);
	state = replay(proof.state, proof.executionId, 8, now - 168e4);
	const intel = startExecution(state, {
		objective: "Normalize Lagos market signals for the weekly intelligence briefing",
		agentId: "intel.weaver",
		requestedTools: [
			"intel.ingest",
			"evidence.ledger",
			"report.compose"
		],
		policySet: ["baseline"],
		actorId: OPERATOR_ID,
		context: {
			region: "LAG",
			systemId: "intelligence"
		}
	}, now - 72e4);
	state = replay(intel.state, intel.executionId, 6, now - 72e4);
	const done = startExecution(state, {
		objective: "Produce the evidence pack for Harmony Foods' completed proof loop",
		agentId: "proof.auditor",
		requestedTools: [
			"crm.read",
			"evidence.ledger",
			"report.compose"
		],
		policySet: ["baseline"],
		actorId: OPERATOR_ID,
		context: {
			customer: "Harmony Foods",
			systemId: "proof"
		}
	}, now - 108e5);
	state = replay(done.state, done.executionId, 16, now - 108e5);
	const denied = startExecution(state, {
		objective: "Deploy production runtime flags for an unverified courier revision",
		agentId: "ops.courier",
		requestedTools: ["deploy.production"],
		policySet: ["baseline"],
		actorId: OPERATOR_ID,
		context: {
			change: "runtime-flags",
			systemId: "delivery"
		}
	}, now - 54e5);
	state = replay(denied.state, denied.executionId, 8, now - 54e5);
	const pending = state.approvals.find((item) => item.executionId === denied.executionId && item.status === "PENDING");
	if (pending) state = decideApproval(state, pending.approvalId, "REJECTED", OPERATOR_ID, now - 42e5, "Unverified agent revision. Production deploy is not permitted.");
	const perm = startExecution(state, {
		objective: "Send an unsolicited outreach sequence to Northstar's buying committee",
		agentId: "demand.scout",
		requestedTools: ["outreach.email"],
		policySet: ["baseline"],
		actorId: OPERATOR_ID,
		context: {
			account: "Northstar",
			systemId: "demand"
		}
	}, now - 3e6);
	state = replay(perm.state, perm.executionId, 8, now - 3e6);
	state = startExecution(state, {
		objective: "Scope onboarding for new Proof customer Northstar and prepare the audit plan",
		agentId: "proof.auditor",
		requestedTools: [
			"crm.read",
			"evidence.ledger",
			"report.compose"
		],
		policySet: ["baseline"],
		actorId: OPERATOR_ID,
		context: {
			customer: "Northstar",
			systemId: "proof"
		}
	}, now - 2e4).state;
	return state;
}
function createEmptyKernel() {
	return emptySnapshot();
}
var empty = createEmptyKernel();
var useLogonStore = create()(persist((set, get) => ({
	...empty,
	hydrated: false,
	autoRun: true,
	selectedId: void 0,
	ensureSeeded: () => {
		const current = get();
		if (Object.keys(current.executions).length === 0) {
			const seeded = createSeed();
			const first = Object.values(seeded.executions).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
			set({
				...seeded,
				hydrated: true,
				autoRun: current.autoRun,
				selectedId: current.selectedId ?? first?.executionId
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
			dispatch: next.dispatch
		});
	},
	step: (executionId) => {
		const current = get();
		const target = executionId ?? current.selectedId ?? Object.values(current.executions).find((item) => item.status !== "APPROVAL" && item.status !== "LEARNING" && item.status !== "FAILED" && item.status !== "REJECTED")?.executionId;
		if (!target) return;
		const next = advanceExecution(current, target, Date.now());
		set({
			executions: next.executions,
			events: next.events,
			approvals: next.approvals,
			evidence: next.evidence,
			audit: next.audit,
			dispatch: next.dispatch,
			selectedId: target
		});
	},
	start: (input) => {
		const result = startExecution(get(), input, Date.now());
		set({
			executions: result.state.executions,
			events: result.state.events,
			approvals: result.state.approvals,
			evidence: result.state.evidence,
			audit: result.state.audit,
			dispatch: result.state.dispatch,
			selectedId: result.executionId
		});
		return result.executionId;
	},
	approve: (approvalId, status, reason) => {
		const current = get();
		const next = decideApproval(current, approvalId, status, current.principal.subjectId, Date.now(), reason);
		set({
			executions: next.executions,
			events: next.events,
			approvals: next.approvals,
			evidence: next.evidence,
			audit: next.audit,
			dispatch: next.dispatch
		});
	},
	resetDemo: () => {
		const seeded = createSeed();
		const first = Object.values(seeded.executions).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
		set({
			...seeded,
			hydrated: true,
			autoRun: true,
			selectedId: first?.executionId
		});
	}
}), {
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
		selectedId: state.selectedId
	}),
	onRehydrateStorage: () => (state) => {
		state?.ensureSeeded();
	}
}));
function KernelRuntime({ children }) {
	const autoRun = useLogonStore((state) => state.autoRun);
	const tick = useLogonStore((state) => state.tick);
	const ensureSeeded = useLogonStore((state) => state.ensureSeeded);
	(0, import_react.useEffect)(() => {
		ensureSeeded();
	}, [ensureSeeded]);
	(0, import_react.useEffect)(() => {
		if (!autoRun) return;
		const id = window.setInterval(() => tick(), 1100);
		return () => window.clearInterval(id);
	}, [autoRun, tick]);
	return children;
}
var styles_default = "/assets/styles-swHwuqdd.css";
var APP_NAME = "LOG_ON";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "LOG_ON control plane — see what every agent is doing, why it is allowed, and what evidence it produced."
			},
			{
				name: "theme-color",
				content: "#1A5C48"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KernelRuntime, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				toastOptions: { className: "font-sans border border-ink/10 bg-canvas text-ink shadow-[var(--shadow-border)]" }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-BTXCfMiJ.mjs");
function parseInbox(value) {
	if (value === "active" || value === "approval" || value === "failed" || value === "done") return value;
	return "all";
}
var Route$3 = createFileRoute("/")({
	validateSearch: (search) => {
		const inbox = parseInbox(search.inbox);
		return {
			run: typeof search.run === "string" ? search.run : void 0,
			inbox: inbox === "all" ? void 0 : inbox
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./compose-BWCPdVTx.mjs");
var Route$2 = createFileRoute("/compose")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./registry-DXHchGWE.mjs");
var Route$1 = createFileRoute("/registry")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./systems-DAzUMo4p.mjs");
var Route = createFileRoute("/systems")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	ComposeRoute: Route$2.update({
		id: "/compose",
		path: "/compose",
		getParentRoute: () => Route$4
	}),
	RegistryRoute: Route$1.update({
		id: "/registry",
		path: "/registry",
		getParentRoute: () => Route$4
	}),
	SystemsRoute: Route.update({
		id: "/systems",
		path: "/systems",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { TERMINAL_STATUSES as a, SYSTEMS as c, toolsForAgent as d, LIFECYCLE as i, TOOLS as l, Route$3 as n, AGENTS as o, useLogonStore as r, POLICY_SETS as s, router_exports as t, agentById as u };
