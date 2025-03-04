import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const onClickHi = () => {
    toast.loading("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      duration: 1000,
      cancel: {
        label: "cancel",
        onClick: () => {},
      },
    });
  };
  return (
    <div className="">
      <h1 className="text-app-accent-success-700">This is the new app</h1>
      <Button onClick={onClickHi}>hi</Button>
    </div>
  );
}
