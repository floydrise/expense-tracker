import { createFileRoute } from "@tanstack/react-router";
import { userQueryOption } from "@/lib/api.ts";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption);

  if (isPending) return "Loading ...";
  if (error) return "Not authorised";

  return (
    <div className={"flex flex-col justify-center items-center mt-10 gap-4"}>
      <div className={"flex items-center gap-2"}>
        <Avatar className={"w-12 h-12"}>
          <AvatarImage
            src={"https://github.com/shadcn.png"}
            alt={data.user.given_name}
          />
          <AvatarFallback>{data.user.given_name}</AvatarFallback>
        </Avatar>
        <h1 className={"text-lg"}>
          {data.user.given_name} {data.user.family_name}
        </h1>
      </div>
      <a href={"/api/logout"}>
        <Button>Logout</Button>
      </a>
    </div>
  );
}
