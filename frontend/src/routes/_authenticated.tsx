import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOption } from "@/lib/api.ts";
import {Button} from "@/components/ui/button.tsx";

const Login = () => {
  return <div className={"flex flex-col justify-center items-center gap-2 mt-10"}>
    <h1 className={"text-xl font-bold"}>You have to login!</h1>
    <a href={"/api/login"}><Button>Login</Button></a>
  </div>;
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const queryClient = context.queryClient;
      return await queryClient.fetchQuery(userQueryOption);
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
