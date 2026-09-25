import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./app-shell-T45YdftK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DtgpsKz3.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[opacity,transform,background-color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-11 px-4", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-canvas text-ink border border-ink/12 hover:border-ink/30 shadow-[var(--shadow-border)]",
			danger: "bg-canvas text-danger border border-danger/25 hover:bg-danger/8",
			ghost: "bg-transparent text-ink hover:bg-ink/5",
			inverse: "bg-ink text-paper hover:opacity-90"
		},
		size: {
			default: "h-11",
			sm: "h-9 min-h-9 px-3 text-xs",
			lg: "h-12 px-5"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
