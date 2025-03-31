import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().min(1).positive(),
  title: z.string(),
  amount: z.string(),
});

const createPostSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: "50" },
  { id: 2, title: "Utilities", amount: "100" },
  { id: 3, title: "Rent", amount: "1000" },
];

const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));
    return c.json({ expenses });
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })
  .get("/total-spent", getUser, (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + +expense.amount,
      0,
    );
    return c.json({ total });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const user = c.var.user;
    const expense = c.req.valid("json");

    const result = await db
      .insert(expensesTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    return c.json(result, 201);
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) return c.notFound();
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
export default expensesRoute;
