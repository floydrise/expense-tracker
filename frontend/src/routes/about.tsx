import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-10">
      <h1 className={"text-xl"}>Simple expense tracker app</h1>
      <ul className={"list-disc"}>
        <li>Create account</li>
        <li>Add new expenses</li>
        <li>Track expenses</li>
        <li>Delete expenses</li>
      </ul>
    </div>
  );
}
