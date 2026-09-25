import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TERMINAL_STATUSES, c as SYSTEMS, r as useLogonStore } from "./router-Dmy58Kc5.mjs";
import { n as cn, t as AppShell } from "./app-shell-T45YdftK.mjs";
import { t as Badge } from "./badge-BnNqOcPL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/systems-DAzUMo4p.js
var import_jsx_runtime = require_jsx_runtime();
function SystemsPage() {
	const executions = useLogonStore((state) => state.executions);
	const rows = Object.values(executions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent",
					children: "Operating systems"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.05em]",
					children: "One kernel. Ten business loops. Proof first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[15px] leading-relaxed text-muted",
					children: "Do not build the full platform before proving one complete loop — one vertical, one workflow, one measurable outcome. System 1 is live in this control plane."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-8 grid gap-3 md:grid-cols-2",
			children: SYSTEMS.map((system) => {
				const runs = rows.filter((item) => item.systemId === system.id);
				const waiting = runs.filter((item) => item.status === "APPROVAL").length;
				const live = runs.filter((item) => !TERMINAL_STATUSES.has(item.status) && item.status !== "APPROVAL").length;
				const closed = runs.filter((item) => item.status === "LEARNING").length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)]", system.status === "live" && "ring-1 ring-accent/25"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-muted",
								children: system.index
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: system.status === "live" ? "live" : system.status === "next" ? "warn" : "neutral",
								children: system.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-[1.7rem] tracking-[-0.03em]",
							children: system.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: system.loop
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-3 gap-2 text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-xl tabular-nums",
									children: live
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Approval"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-xl tabular-nums text-warn",
									children: waiting
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Closed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-xl tabular-nums",
									children: closed
								})] })
							]
						})
					]
				}, system.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/compose",
				className: "inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-medium text-paper transition-opacity duration-[var(--motion-quick)] hover:opacity-90",
				children: "Run a Proof execution"
			})
		})
	] });
}
//#endregion
export { SystemsPage as component };
