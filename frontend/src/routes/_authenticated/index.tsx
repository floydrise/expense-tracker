import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  return await res.json();
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error occured" + error.message;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className={"w-[320px] md:w-[350px] m-auto mt-10"}
    >
      <Card>
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>Total amount spent</CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? <Skeleton className="h-4 w-12" /> : data.total}
        </CardContent>
      </Card>
    </motion.div>
  );
}
