import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as TOOLS, o as AGENTS, r as useLogonStore } from "./router-Dmy58Kc5.mjs";
import { t as AppShell } from "./app-shell-T45YdftK.mjs";
import { t as Badge } from "./badge-BnNqOcPL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registry-DXHchGWE.js
var import_jsx_runtime = require_jsx_runtime();
function RegistryPage() {
	const permissions = useLogonStore((state) => state.permissions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent",
					children: "Registry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.05em]",
					children: "A registered tool does not grant permission."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[15px] leading-relaxed text-muted",
					children: "Tenant, agent, tool, and permission must match. High-impact side effects still require an approval gate even when the agent is allowlisted. Demand Scout's outreach grant is deliberately denied in this tenant — a registered tool is not a permission."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-8 grid gap-4 lg:grid-cols-2",
			children: AGENTS.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
							children: agent.systemId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl tracking-[-0.03em]",
							children: agent.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-[10px] text-muted",
							children: [
								agent.agentId,
								"@",
								agent.version
							]
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: agent.summary
				})]
			}, agent.agentId))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-ink/10 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
						children: "Tools"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl tracking-[-0.03em]",
						children: "Capability catalog"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-[minmax(140px,1.1fr)_90px_110px_minmax(160px,1fr)_minmax(140px,0.8fr)] gap-3 border-b border-ink/10 px-5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted md:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tool" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Effect" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sensitivity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Allowed agents" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Permission" })
					]
				}),
				TOOLS.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 border-b border-ink/10 px-5 py-4 md:grid-cols-[minmax(140px,1.1fr)_90px_110px_minmax(160px,1fr)_minmax(140px,0.8fr)] md:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[12px] font-semibold",
							children: tool.toolId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] text-muted",
							children: tool.summary
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: tool.sideEffect === "READ" || tool.sideEffect === "WRITE" ? "live" : "warn",
							children: tool.sideEffect
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted",
							children: tool.dataSensitivity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: tool.allowedAgents.map((agentId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-ink/6 px-1.5 py-1 font-mono text-[9px]",
								children: agentId
							}, agentId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px]",
							children: tool.requiredPermission
						})
					]
				}, tool.toolId))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-ink/10 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
					children: "Tenant grants"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl tracking-[-0.03em]",
					children: "Explicit permissions"
				})]
			}), permissions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 border-b border-ink/10 px-5 py-3 text-[12px] sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: item.allowed ? "font-semibold text-accent" : "font-semibold text-danger",
						children: item.allowed ? "ALLOWED" : "DENIED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px]",
						children: item.agentId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px]",
						children: item.toolId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: item.permission
					})
				]
			}, `${item.agentId}-${item.toolId}-${item.permission}`))]
		})
	] });
}
//#endregion
export { RegistryPage as component };
