import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().min(1).positive(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long!" })
    .max(100, { message: "Title must be at max 100 characters long!" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {message: "Amount must be a positive number!"}),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
