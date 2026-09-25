import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as toolsForAgent, o as AGENTS, r as useLogonStore, s as POLICY_SETS } from "./router-Dmy58Kc5.mjs";
import { n as cn, t as AppShell } from "./app-shell-T45YdftK.mjs";
import { t as Button } from "./button-DtgpsKz3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compose-BWCPdVTx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	{
		id: "proof-wire",
		label: "Proof recovery",
		hint: "High-impact funds. Must wait for approval before commit.",
		agentId: "proof.auditor",
		objective: "Issue ₦4.2m recovery credit to vendor VT-441 after confirmed duplicate invoices",
		tools: [
			"crm.read",
			"evidence.ledger",
			"payments.wire"
		],
		policies: [
			"baseline",
			"high-impact",
			"africa-expansion"
		]
	},
	{
		id: "deny-all",
		label: "Fail-closed",
		hint: "deny-all blocks at the kernel boundary.",
		agentId: "proof.auditor",
		objective: "Attempt a proof audit under a fail-closed policy",
		tools: ["crm.read", "evidence.ledger"],
		policies: ["deny-all"]
	},
	{
		id: "outreach",
		label: "Blocked outreach",
		hint: "Tool is registered. Permission is denied.",
		agentId: "demand.scout",
		objective: "Send an unsolicited outreach sequence to Northstar's buying committee",
		tools: ["outreach.email"],
		policies: ["baseline"]
	},
	{
		id: "deploy",
		label: "Production deploy",
		hint: "Destructive change. Approval gate required.",
		agentId: "ops.courier",
		objective: "Deploy production runtime flags for courier revision r-204",
		tools: ["deploy.production"],
		policies: ["baseline"]
	}
];
function ComposePage() {
	const navigate = useNavigate();
	const start = useLogonStore((state) => state.start);
	const [agentId, setAgentId] = (0, import_react.useState)(AGENTS[0].agentId);
	const [objective, setObjective] = (0, import_react.useState)("Audit vendor invoices for duplicate payments and recommend a recovery action");
	const [tools, setTools] = (0, import_react.useState)(["crm.read", "evidence.ledger"]);
	const [policies, setPolicies] = (0, import_react.useState)(["baseline"]);
	const availableTools = (0, import_react.useMemo)(() => toolsForAgent(agentId), [agentId]);
	function toggle(list, value) {
		return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
	}
	function applyPreset(id) {
		const preset = PRESETS.find((item) => item.id === id);
		if (!preset) return;
		setAgentId(preset.agentId);
		setObjective(preset.objective);
		setTools([...preset.tools]);
		setPolicies([...preset.policies]);
	}
	function submit(event) {
		event.preventDefault();
		if (!objective.trim()) {
			toast("Objective is required.");
			return;
		}
		const executionId = start({
			agentId,
			objective: objective.trim(),
			requestedTools: tools,
			policySet: policies.length ? policies : ["baseline"]
		});
		toast("Execution accepted at INTAKE.");
		navigate({
			to: "/",
			search: {
				run: executionId,
				inbox: "all"
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent",
					children: "Compose"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.05em]",
					children: "Start a controlled execution."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[15px] leading-relaxed text-muted",
					children: "Models may propose. Policy, permission, and approval layers decide whether work proceeds. High-impact tools cannot skip the human gate, and side effects do not commit before it."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4",
			children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => applyPreset(preset.id),
				className: "min-h-20 rounded-xl bg-canvas px-4 py-3 text-left shadow-[var(--shadow-border)] hover:bg-accent/6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-extrabold",
					children: preset.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[12px] leading-snug text-muted",
					children: preset.hint
				})]
			}, preset.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-6 grid gap-6 rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)] sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
						children: "Agent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: agentId,
						onChange: (event) => {
							const next = event.target.value;
							setAgentId(next);
							const allowed = toolsForAgent(next).map((tool) => tool.toolId);
							setTools((current) => {
								const kept = current.filter((tool) => allowed.includes(tool));
								return kept.length ? kept : allowed.slice(0, 1);
							});
						},
						className: "h-12 rounded-md border border-ink/12 bg-paper px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
						children: AGENTS.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: agent.agentId,
							children: [
								agent.title,
								" · ",
								agent.agentId,
								"@",
								agent.version
							]
						}, agent.agentId))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
						children: "Objective"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: objective,
						onChange: (event) => setObjective(event.target.value),
						rows: 4,
						className: "rounded-md border border-ink/12 bg-paper px-3 py-3 text-sm leading-relaxed outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
						placeholder: "What outcome should this execution produce?"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
						children: "Requested tools"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: availableTools.map((tool) => {
							const on = tools.includes(tool.toolId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTools((current) => toggle(current, tool.toolId)),
								className: cn("min-h-16 rounded-lg border px-3 py-3 text-left transition-colors duration-[var(--motion-quick)]", on ? "border-accent/40 bg-accent/8" : "border-ink/10 bg-paper hover:border-ink/25"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 font-mono text-[11px] font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tool.toolId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase tracking-[0.08em] text-muted",
										children: tool.sideEffect
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[12px] leading-snug text-muted",
									children: tool.summary
								})]
							}, tool.toolId);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
						children: "Policy set"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: POLICY_SETS.map((policy) => {
							const on = policies.includes(policy.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPolicies((current) => toggle(current, policy.id)),
								className: cn("min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors duration-[var(--motion-quick)]", on ? "border-ink bg-ink text-paper" : "border-ink/12 bg-paper text-ink"),
								title: policy.hint,
								children: policy.label
							}, policy.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "inverse",
						children: "Submit to kernel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => void navigate({ to: "/" }),
						children: "Cancel"
					})]
				})
			]
		})
	] });
}
//#endregion
export { ComposePage as component };
