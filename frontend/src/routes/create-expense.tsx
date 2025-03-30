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
      <h1 className={"md:m-4 ml-2 mt-2 text-lg"}>Create expense:</h1>
      <form className={"max-w-xl p-2 m-auto"}>
        <Label htmlFor="title" className={"text-sm mb-1"}>
          Title
        </Label>
        <Input type="text" id="title" placeholder="Title" className={"mb-2"}/>
        <Label htmlFor="amount" className={"text-sm mb-1"}>
          Amount
        </Label>
        <Input type="number" id="amount" placeholder="Amount" className={"mb-2"}/>
        <Button className={"mt-4"} type={"submit"}>
          Create expense
        </Button>
      </form>
    </div>
  );
}
