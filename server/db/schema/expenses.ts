import {
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  },
);

export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long!" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a positive value (max 2 digits after decimal point)",
  }),
});
export const selectExpensesSchema = createSelectSchema(expenses);
