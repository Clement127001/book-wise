import Link from "next/link";
import { User, UserCog2Icon } from "lucide-react";
import GlitterButtonAdmin from "@/components/common/glitterButtons/GlitterButtonAdmin";
import GlitterButton from "@/components/common/glitterButtons/GlitterButtonUser";

const PublicUserHomePageAction = () => {
  return (
    <div className="flex gap-4">
      <Link href={"/admin/login"}>
        <GlitterButtonAdmin label="Login as Admin" Icon={UserCog2Icon} />
      </Link>
      <Link href={"/user/login"}>
        <GlitterButton label="Login as User" Icon={User}></GlitterButton>
      </Link>
    </div>
  );
};

export default PublicUserHomePageAction;
