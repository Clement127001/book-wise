import Link from "next/link";
import { DatabaseZapIcon, UserCheck2 } from "lucide-react";
import GlitterButtonAdmin from "@/components/common/glitterButtons/GlitterButtonAdmin";
import GlitterButton from "@/components/common/glitterButtons/GlitterButtonUser";
import { useUserData } from "@/context/UserDataProvider";
import { UserRoleEnum } from "contract/enum";

const LoggedInUserHomePageAction = () => {
  const { userData } = useUserData();
  const role = userData.role;

  return (
    <>
      {role === UserRoleEnum.ADMIN ? (
        <Link href={"/admin/dashboard"}>
          <GlitterButtonAdmin
            label="Explore Dashboard"
            Icon={DatabaseZapIcon}
          />
        </Link>
      ) : (
        <Link href={"/user/home"}>
          <GlitterButton label="Explore Books" Icon={UserCheck2} />
        </Link>
      )}
    </>
  );
};

export default LoggedInUserHomePageAction;
