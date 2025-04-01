import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { api, getAllExpensesQueryOptions } from "@/lib/api.ts";
import { createExpenseSchema } from "../../../../server/types.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className={"text-red-500"}>
          * {field.state.meta.errors.map((err) => err.message).join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions,
      );
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("An error occurred!");
      }
      const newExpense = await res.json().then((data) => data[0]);
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses],
      });
      navigate({ to: "/expenses" });
      toast.success("Expense added")
    },
  });

  return (
    <div>
      <h1 className={"m-4 text-3xl flex justify-center"}>Create expense:</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={"flex flex-col max-w-xl p-2 m-auto"}
      >
        {/* Title */}
        <div>
          <form.Field
            name={"title"}
            validators={{
              onChange: createExpenseSchema.shape.title,
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name} className={"text-sm mb-1"}>
                  Title
                </Label>
                <Input
                  placeholder={"Title"}
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={"mb-2"}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        {/*Amount*/}
        <div>
          <form.Field
            name={"amount"}
            validators={{
              onChange: createExpenseSchema.shape.amount,
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name} className={"text-sm mb-1"}>
                  Amount
                </Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={"mb-2"}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        {/* Calendar */}
        <div className={""}>
          <form.Field
            name={"date"}
            validators={{
              onChange: createExpenseSchema.shape.date,
            }}
            children={(field) => (
              <>
                <Calendar
                  mode="single"
                  selected={new Date(field.state.value)}
                  onSelect={(date) =>
                    field.handleChange((date ?? new Date()).toISOString())
                  }
                  className="rounded-md border shadow max-w-fit m-auto"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className={"mt-4"} type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Submitting..." : "Create expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
