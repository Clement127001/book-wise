import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoleEnum } from "contract/enum";

const LoggedInUserHomePageAction = ({ role }: { role: UserRoleEnum }) => {
  return (
    <>
      {role === UserRoleEnum.ADMIN ? (
        <Link href={"/admin/dashboard"}>
          <Button>Explore Dashboard</Button>
        </Link>
      ) : (
        <Link href={"/user/home"}>
          <Button>Explore Books</Button>
        </Link>
      )}
    </>
  );
};

export default LoggedInUserHomePageAction;
