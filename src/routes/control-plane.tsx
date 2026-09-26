import { createFileRoute } from "@tanstack/react-router";
import { ControlPlane, type InboxFilter } from "@/components/control-plane";

function parseInbox(value: unknown): InboxFilter {
  if (value === "active" || value === "approval" || value === "failed" || value === "done") {
    return value;
  }
  return "all";
}

function ControlPlaneRouteComponent() {
  const { run, inbox } = Route.useSearch();
  return <ControlPlane {...(run === undefined ? {} : { runId: run })} inbox={inbox ?? "all"} />;
}

export const Route = createFileRoute("/control-plane")({
  head: () => ({
    meta: [
      { title: "LOG_ON Control Plane — Executions, Approvals, Evidence & Audit" },
      {
        name: "description",
        content:
          "The operational surface of the LOG_ON OS: execution explorer, approval centre, tool and model registry, evaluations, policy, audit and intelligence.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { run?: string; inbox?: InboxFilter } => {
    const inbox = parseInbox(search["inbox"]);
    const validated: { run?: string; inbox?: InboxFilter } = {};
    if (typeof search["run"] === "string") validated.run = search["run"];
    if (inbox !== "all") validated.inbox = inbox;
    return validated;
  },
  component: ControlPlaneRouteComponent,
});
