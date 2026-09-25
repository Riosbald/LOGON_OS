import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useLogonStore } from "./router-Dmy58Kc5.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-T45YdftK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "Control plane"
	},
	{
		to: "/compose",
		label: "New execution"
	},
	{
		to: "/registry",
		label: "Registry"
	},
	{
		to: "/systems",
		label: "Systems"
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const principal = useLogonStore((state) => state.principal);
	const autoRun = useLogonStore((state) => state.autoRun);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-dvh max-w-[1540px] px-4 pb-10 pt-5 sm:px-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-11 place-items-center rounded-[13px] bg-ink font-display text-2xl leading-none text-paper",
							children: "L"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
							children: "LOG_ON OS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-[19px] leading-none tracking-[-0.03em]",
							children: "Control Plane"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-wrap gap-1.5",
						"aria-label": "Primary",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("inline-flex min-h-11 items-center rounded-md px-3.5 text-sm font-medium transition-colors duration-[var(--motion-quick)]", active ? "bg-ink text-paper" : "text-ink/80 hover:bg-ink/6"),
								children: item.label
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-x-2.5 gap-y-0.5 rounded-[10px] border border-ink/10 bg-canvas/70 px-2.5 py-1.5 text-[10px] sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "col-span-2 font-semibold sm:col-span-1",
									children: principal.subjectId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: principal.tenantId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: principal.roles.join(" · ")
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", mounted && autoRun ? "bg-accent" : "bg-muted") }), mounted && autoRun ? "Kernel live" : "Kernel paused"]
						})]
					})
				]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-5 flex flex-col gap-1.5 px-1 font-mono text-[10px] text-muted sm:flex-row sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LOG_ON · Execution is controlled by the kernel." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Can do ≠ may do." })]
			})
		]
	});
}
//#endregion
export { cn as n, AppShell as t };
