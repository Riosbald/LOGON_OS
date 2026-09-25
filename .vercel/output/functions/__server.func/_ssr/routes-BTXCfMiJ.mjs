import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as TERMINAL_STATUSES, c as SYSTEMS, i as LIFECYCLE, n as Route$3, r as useLogonStore, u as agentById } from "./router-Dmy58Kc5.mjs";
import { n as cn, t as AppShell } from "./app-shell-T45YdftK.mjs";
import { t as Button } from "./button-DtgpsKz3.mjs";
import { a as formatTime, i as formatExact, n as StatusBadge, o as humanStatus, r as eventSummary, s as shortId } from "./badge-BnNqOcPL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BTXCfMiJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "active",
		label: "Active"
	},
	{
		id: "approval",
		label: "Approval"
	},
	{
		id: "failed",
		label: "Failed"
	},
	{
		id: "done",
		label: "Closed"
	}
];
var INVARIANTS = [
	{
		kicker: "Capability",
		title: "Can do ≠ may do"
	},
	{
		kicker: "Registry",
		title: "Registered ≠ permitted"
	},
	{
		kicker: "Side effects",
		title: "Propose ≠ commit"
	},
	{
		kicker: "Proof",
		title: "Audit ≠ evidence"
	}
];
function ControlPlane({ runId, inbox = "all" }) {
	const navigate = useNavigate({ from: "/" });
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const ensureSeeded = useLogonStore((state) => state.ensureSeeded);
	const executionsMap = useLogonStore((state) => state.executions);
	const events = useLogonStore((state) => state.events);
	const approvals = useLogonStore((state) => state.approvals);
	const evidence = useLogonStore((state) => state.evidence);
	const audit = useLogonStore((state) => state.audit);
	const permissions = useLogonStore((state) => state.permissions);
	const dispatch = useLogonStore((state) => state.dispatch);
	const selectedId = useLogonStore((state) => state.selectedId);
	const setSelected = useLogonStore((state) => state.setSelected);
	const autoRun = useLogonStore((state) => state.autoRun);
	const setAutoRun = useLogonStore((state) => state.setAutoRun);
	const step = useLogonStore((state) => state.step);
	const approve = useLogonStore((state) => state.approve);
	const resetDemo = useLogonStore((state) => state.resetDemo);
	(0, import_react.useEffect)(() => {
		ensureSeeded();
		setMounted(true);
	}, [ensureSeeded]);
	(0, import_react.useEffect)(() => {
		if (runId) setSelected(runId);
	}, [runId, setSelected]);
	const executions = (0, import_react.useMemo)(() => Object.values(executionsMap).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [executionsMap]);
	const filtered = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return executions.filter((item) => {
			if (inbox === "active" && (TERMINAL_STATUSES.has(item.status) || item.status === "APPROVAL")) return false;
			if (inbox === "approval" && item.status !== "APPROVAL") return false;
			if (inbox === "failed" && item.status !== "FAILED" && item.status !== "REJECTED") return false;
			if (inbox === "done" && item.status !== "LEARNING") return false;
			if (!needle) return true;
			return item.objective.toLowerCase().includes(needle) || item.agentId.toLowerCase().includes(needle) || item.executionId.toLowerCase().includes(needle) || item.status.toLowerCase().includes(needle);
		});
	}, [
		executions,
		inbox,
		query
	]);
	const selected = runId && executionsMap[runId] || selectedId && executionsMap[selectedId] || filtered[0] || executions[0];
	const selectedEvents = selected ? events.filter((item) => item.executionId === selected.executionId) : [];
	const selectedApprovals = selected ? approvals.filter((item) => item.executionId === selected.executionId) : [];
	const selectedEvidence = selected ? evidence.filter((item) => item.executionId === selected.executionId) : [];
	const selectedAudit = selected ? audit.filter((item) => item.executionId === selected.executionId) : [];
	const pending = selectedApprovals.find((item) => item.status === "PENDING");
	const agent = selected ? agentById(selected.agentId) : void 0;
	const system = selected ? SYSTEMS.find((item) => item.id === selected.systemId) : void 0;
	const selectedDispatch = selected ? dispatch[selected.executionId] : void 0;
	const agentPermissions = selected ? permissions.filter((item) => item.agentId === selected.agentId) : [];
	const recent = [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 6);
	const metrics = {
		total: executions.length,
		active: executions.filter((item) => !TERMINAL_STATUSES.has(item.status) && item.status !== "APPROVAL").length,
		approvals: executions.filter((item) => item.status === "APPROVAL").length,
		failures: executions.filter((item) => item.status === "FAILED" || item.status === "REJECTED").length
	};
	function selectRun(executionId) {
		setSelected(executionId);
		navigate({ search: (prev) => ({
			...prev,
			run: executionId
		}) });
	}
	function setInbox(next) {
		navigate({ search: (prev) => ({
			...prev,
			inbox: next
		}) });
	}
	function onApprove(status) {
		if (!pending) return;
		approve(pending.approvalId, status);
		toast(status === "APPROVED" ? "Approval recorded. Kernel may commit side effects." : "Rejection recorded. Work will not proceed.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent",
						children: "Durable execution / human oversight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.05em]",
						children: "See what every agent is doing, why it is allowed, and what evidence it produced."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-muted",
						children: "The kernel remains authoritative. This console observes lifecycle state and returns bounded human decisions — it is not a second workflow engine."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => setAutoRun(!autoRun),
						children: ["Auto ", autoRun ? "on" : "off"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => step(selected?.executionId),
						children: "Step kernel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => resetDemo(),
						children: "Reset demo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/compose",
						className: "inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-medium text-paper transition-opacity duration-[var(--motion-quick)] hover:opacity-90",
						children: "New execution"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: INVARIANTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-canvas px-4 py-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
					children: item.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-display text-lg tracking-[-0.03em]",
					children: item.title
				})]
			}, item.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Executions",
					value: mounted ? metrics.total : 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Active",
					value: mounted ? metrics.active : 0,
					accent: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Awaiting approval",
					value: mounted ? metrics.approvals : 0,
					warn: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Failed / rejected",
					value: mounted ? metrics.failures : 0,
					danger: mounted && metrics.failures > 0
				})
			]
		}),
		mounted && recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-3 overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
					children: "Kernel activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted",
					children: autoRun ? "live projection" : "paused"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-px border-t border-ink/10 bg-ink/5 sm:grid-cols-2 xl:grid-cols-3",
				children: recent.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectRun(event.executionId),
					className: "bg-canvas px-4 py-3 text-left hover:bg-accent/6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: event.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-muted",
							children: formatTime(event.timestamp)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-2 text-[12px] leading-snug",
						children: eventSummary(event)
					})]
				}, `${event.executionId}-${event.sequence}`))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-ink/10 px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
								children: "Execution inbox"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl tracking-[-0.03em]",
								children: "Runs"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-7 place-items-center rounded-full bg-ink text-[11px] font-extrabold text-paper tabular-nums",
								children: mounted ? filtered.length : 0
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1",
							children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setInbox(item.id),
								className: cn("h-8 rounded-md px-2.5 text-[11px] font-semibold", inbox === item.id ? "bg-ink text-paper" : "bg-ink/6 text-ink/80 hover:bg-ink/10"),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Search executions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search objective, agent, id",
								className: "h-10 w-full rounded-md border border-ink/12 bg-paper px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					mounted && filtered.map((execution) => {
						const active = execution.executionId === selected?.executionId;
						const waiting = execution.status === "APPROVAL";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => selectRun(execution.executionId),
							className: cn("relative grid w-full gap-1.5 border-b border-ink/10 px-4 py-4 text-left transition-colors duration-[var(--motion-quick)]", active ? "bg-accent/8 shadow-[inset_3px_0_0_var(--color-accent)]" : "hover:bg-accent/6"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between gap-2 text-[11px] font-extrabold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: execution.agentId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: execution.status })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[13px] leading-snug",
									children: execution.objective
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex justify-between font-mono text-[10px] text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shortId(execution.executionId) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(execution.updatedAt) })]
								}),
								waiting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-fit text-[10px] font-extrabold text-warn",
									children: "Approval required"
								})
							]
						}, execution.executionId);
					}),
					mounted && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-10 text-sm text-muted",
						children: "No executions match this inbox."
					}),
					!mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 px-4 py-4",
						children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-lg bg-ink/5" }, index))
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4",
				children: [mounted && !selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid min-h-80 place-items-center rounded-xl bg-canvas px-8 text-muted shadow-[var(--shadow-border)]",
					children: "Select an execution to inspect its lifecycle."
				}), mounted && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-4 rounded-xl bg-canvas p-5 shadow-[var(--shadow-border)] sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
									children: "Execution"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 max-w-3xl font-display text-[1.6rem] leading-tight tracking-[-0.03em]",
									children: selected.objective
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2.5 flex flex-wrap gap-2 font-mono text-[10px] text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected.executionId }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["tenant ", selected.tenantId] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"agent ",
											selected.agentId,
											"@",
											selected.agentVersion
										] }),
										system && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["system ", system.title] })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selected.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
								children: "State machine"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl tracking-[-0.03em]",
								children: "Execution lifecycle"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted",
								children: autoRun ? "live projection" : "paused"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto px-4 pb-5 pt-3",
							children: LIFECYCLE.map((stage) => {
								const reached = selectedEvents.some((item) => item.status === stage);
								const active = stage === selected.status;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("grid min-w-[104px] gap-1.5 text-[9px] font-extrabold leading-tight", active ? "text-ink" : reached ? "text-ink/70" : "text-muted/70"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-[22px] place-items-center rounded-[7px]", active ? "bg-accent text-accent-fg" : reached ? "bg-accent/12 text-accent" : "bg-ink/5"),
										children: reached ? "✓" : "·"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: humanStatus(stage) })]
								}, stage);
							})
						})]
					}),
					pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-4 rounded-xl border border-warn/25 bg-warn/[0.045] p-5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-warn",
								children: "Human approval gate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-[1.35rem] tracking-[-0.03em]",
								children: "Side effects are waiting for an explicit decision"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-ink/70",
								children: pending.reason
							}),
							pending.expiresAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10px] text-muted",
								children: ["Expires ", formatTime(pending.expiresAt)]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => onApprove("REJECTED"),
								children: "Reject"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								onClick: () => onApprove("APPROVED"),
								children: "Approve"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "overflow-hidden rounded-xl bg-canvas shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-ink/10 px-4 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
									children: "Agent contract"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl tracking-[-0.03em]",
									children: "Policy, tools & permissions"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted",
									children: [agentPermissions.length, " configured"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 border-b border-ink/10 px-4 py-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
									children: "Requested tools"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: selected.request.requestedTools.length ? selected.request.requestedTools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-accent/10 px-2 py-1.5 font-mono text-[10px] text-accent",
										children: tool
									}, tool)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: "None declared."
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
									children: "Policy set"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: selected.request.policySet.map((policy) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-ink/8 px-2 py-1.5 font-mono text-[10px] text-ink/80",
										children: policy
									}, policy))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 pb-2",
								children: agentPermissions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-0.5 border-b border-dashed border-ink/10 py-2.5 text-[10px] sm:grid-cols-[64px_minmax(100px,0.9fr)_minmax(100px,1fr)_85px] sm:items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: item.allowed ? "font-extrabold text-accent" : "font-extrabold text-danger",
											children: item.allowed ? "ALLOWED" : "DENIED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.toolId }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: item.permission
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: item.expiresAt ? `expires ${formatTime(item.expiresAt)}` : "no expiry"
										})
									]
								}, `${item.toolId}-${item.permission}`))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl bg-canvas shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
									children: "Event log"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl tracking-[-0.03em]",
									children: "What happened"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 pb-5 pt-3",
								children: selectedEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative grid grid-cols-[18px_minmax(0,1fr)] gap-2.5 pb-4 last:pb-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative z-1 mt-1.5 size-2 rounded-full bg-accent" }),
										event.sequence !== selectedEvents.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-4 bottom-0 left-1 w-px bg-ink/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between gap-3 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: humanStatus(event.status) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted",
													children: formatExact(event.timestamp)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-[12px] leading-snug text-ink/80",
												children: eventSummary(event)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] text-muted",
												children: [
													event.type,
													" · actor ",
													event.actorId
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
												className: "mt-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
													className: "cursor-pointer text-[10px] font-semibold text-muted",
													children: "Payload"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
													className: "mt-1.5 max-h-36 overflow-auto rounded-md bg-ink px-2.5 py-2 font-mono text-[10px] leading-relaxed text-paper",
													children: JSON.stringify(event.payload, null, 2)
												})]
											})
										] })
									]
								}, event.sequence))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl bg-canvas shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-4 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
										children: "Proof"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl tracking-[-0.03em]",
										children: "Evidence & audit"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-ink/10 px-4 py-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
											children: ["Evidence ", selectedEvidence.length]
										}),
										selectedEvidence.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[78px_minmax(0,1fr)] gap-2 border-b border-dashed border-ink/10 py-2 text-[10px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-extrabold",
													children: item.kind
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.source }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
													className: "col-start-2 font-mono text-[9px] text-accent",
													children: item.payloadHash.slice(0, 16)
												})
											]
										}, item.evidenceId)),
										!selectedEvidence.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted",
											children: "No evidence records yet."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-ink/10 px-4 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
										children: ["Audit ", selectedAudit.length]
									}), selectedAudit.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-[78px_minmax(0,1fr)] gap-2 border-b border-dashed border-ink/10 py-2 text-[10px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: item.allowed ? "font-extrabold text-accent" : "font-extrabold text-danger",
											children: item.allowed ? "ALLOWED" : "DENIED"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.action })]
									}, item.auditId))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-4 py-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted",
											children: "Dispatch"
										}),
										selectedDispatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[70px_1fr] gap-1.5 text-[11px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted",
													children: "queue"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedDispatch.queueName }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted",
													children: "status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedDispatch.status }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted",
													children: "attempts"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "tabular-nums",
													children: selectedDispatch.attempts
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted",
											children: "No dispatch record."
										}),
										agent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-[11px] leading-relaxed text-muted",
											children: [
												agent.title,
												" · ",
												agent.summary
											]
										}),
										selected.failureReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-md bg-danger/8 px-3 py-2 text-[11px] text-danger",
											children: [
												selected.failureType,
												": ",
												selected.failureReason
											]
										})
									]
								})
							]
						})]
					})
				] })]
			})]
		})
	] });
}
function Metric({ label, value, accent, warn, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-xl bg-canvas px-4 py-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: cn("font-display text-[25px] tabular-nums", accent && "text-accent", warn && "text-warn", danger && "text-danger"),
			children: value
		})]
	});
}
function Home() {
	const { run, inbox } = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlPlane, {
		runId: run,
		inbox: inbox ?? "all"
	});
}
//#endregion
export { Home as component };
