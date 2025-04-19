import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoleEnum } from "contract/enum";
import { useUserData } from "@/context/UserDataProvider";

const LoggedInUserHomePageAction = () => {
  const { userData } = useUserData();
  const role = userData.role;

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
