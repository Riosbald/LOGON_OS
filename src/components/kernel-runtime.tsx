import { useEffect, type ReactNode } from "react";
import { useLogonStore } from "@/lib/logon/store";

export function KernelRuntime({ children }: { children: ReactNode }) {
  const autoRun = useLogonStore((state) => state.autoRun);
  const tick = useLogonStore((state) => state.tick);
  const ensureSeeded = useLogonStore((state) => state.ensureSeeded);

  useEffect(() => {
    ensureSeeded();
  }, [ensureSeeded]);

  useEffect(() => {
    if (!autoRun) return;
    const id = window.setInterval(() => tick(), 1100);
    return () => window.clearInterval(id);
  }, [autoRun, tick]);

  return children;
}
