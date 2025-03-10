import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoleEnum } from "@/types/common";

const LoggedInUserHomePageAction = ({ role }: { role: UserRoleEnum }) => {
  return (
    <Button>
      {role === UserRoleEnum.ADMIN ? (
        <Link href={"/admin/dashboard"}>Explore Dashboard</Link>
      ) : (
        <Link href={"/user/home"}>Explore Books</Link>
      )}
    </Button>
  );
};

export default LoggedInUserHomePageAction;
