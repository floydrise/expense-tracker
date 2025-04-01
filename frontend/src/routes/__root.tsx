import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  return (
    <div
      className={
        "p-4 flex justify-between items-center"
      }
    >
      <Link to="/">
        <img
          src={"./public/favicon.ico"}
          width={50}
          height={50}
          alt={"app logo"}
        />
      </Link>
      <div className="flex gap-4">
        <Link
          to="/"
          className="[&.active]:font-bold [&.active]:text-white text-gray-300 hidden sm:block"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="[&.active]:font-bold [&.active]:text-white text-gray-300"
        >
          About
        </Link>
        <Link
          to="/expenses"
          className="[&.active]:font-bold [&.active]:text-white text-gray-300"
        >
          Expenses
        </Link>
        <Link
          to="/create-expense"
          className="[&.active]:font-bold [&.active]:text-white text-gray-300"
        >
          Create
        </Link>
        <Link
          to="/profile"
          className="[&.active]:font-bold [&.active]:text-white text-gray-300"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
