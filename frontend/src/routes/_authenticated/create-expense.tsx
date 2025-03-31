import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { api } from "@/lib/api.ts";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("An error occurred!");
      }
      navigate({ to: "/expenses" });
    },
  });

  return (
    <div>
      <h1 className={"md:m-4 ml-2 mt-2 text-lg"}>Create expense:</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={"max-w-xl p-2 m-auto"}
      >
        <div>
          <form.Field
            name={"title"}
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "* A title is required"
                  : value.length < 3
                    ? "* Title must be at least 3 characters"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
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
        <div>
          <form.Field
            name={"amount"}
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
