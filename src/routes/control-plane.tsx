import { createFileRoute } from "@tanstack/react-router";
import { ControlPlane, type InboxFilter } from "@/components/control-plane";

function parseInbox(value: unknown): InboxFilter {
  if (value === "active" || value === "approval" || value === "failed" || value === "done") return value;
  return "all";
}

export const Route = createFileRoute("/control-plane")({
  validateSearch: (search: Record<string, unknown>): { run?: string; inbox?: InboxFilter } => {
    const inbox = parseInbox(search.inbox);
    return { run: typeof search.run === "string" ? search.run : undefined, inbox: inbox === "all" ? undefined : inbox };
  },
  component: () => {
    const { run, inbox } = Route.useSearch();
    return <ControlPlane runId={run} inbox={inbox ?? "all"} />;
  },
});
