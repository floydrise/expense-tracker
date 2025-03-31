import { createFileRoute } from "@tanstack/react-router";
import { userQueryOption } from "@/lib/api.ts";
import { useQuery } from "@tanstack/react-query";
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption);

  if (isPending) return "Loading ...";
  if (error) return "Not authorised";

  return (
    <div>
      <p>
        Hello {data.user.given_name} {data.user.family_name}
      </p>
        <a href={"/api/logout"}><Button>Logout</Button></a>
    </div>
  );
}
