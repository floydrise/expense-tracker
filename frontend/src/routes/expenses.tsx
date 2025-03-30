import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  return <div className="p-2">Show all expenses</div>;
}
