import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Layout for /systems and marketing children. Kernel index is /systems/. */
export const Route = createFileRoute("/systems")({
  component: () => <Outlet />,
});
