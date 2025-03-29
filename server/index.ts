import { Hono } from "hono";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono()
  .use("*", logger())
  .use("/favicon.ico", serveStatic({ path: "./favicon.ico" }))
  .route("/api/expenses", expensesRoute);

export default app;
