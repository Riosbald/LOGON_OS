import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { statusTone, humanStatus } from "@/lib/logon/format";

const tones: Record<string, string> = {
  live: "bg-accent/10 text-accent",
  warn: "bg-warn/12 text-warn",
  danger: "bg-danger/10 text-danger",
  done: "bg-ink/8 text-ink",
  neutral: "bg-ink/8 text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
        tones[statusTone(status)],
      )}
    >
      {humanStatus(status)}
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}