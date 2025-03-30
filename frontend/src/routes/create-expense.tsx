import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  return (
    <div>
      <h1>Create expense:</h1>
      <form className={"max-w-xl m-auto"}>
        <Label htmlFor="title" className={"text-lg mb-2"}>
          Title
        </Label>
        <Input type="text" id="title" placeholder="Title" />
        <Label htmlFor="amount" className={"text-lg mb-2"}>
          Amount
        </Label>
        <Input type="number" id="amount" placeholder="Amount" />
        <Button className={"mt-4"} type={"submit"}>
          Create expense
        </Button>
      </form>
    </div>
  );
}
