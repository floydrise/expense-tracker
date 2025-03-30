import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    };
    fetchTotal();
  }, []);

  return (
    <Card className={"w-[350px] m-auto"}>
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>Total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
