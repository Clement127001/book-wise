import Link from "next/link";
import { Button } from "../ui/button";

const PublicUserHomePageAction = () => {
  return (
    <div className="flex gap-4">
      <Link href={"/admin/login"}>
        <Button>Login as Admin</Button>
      </Link>
      <Link href={"/user/login"}>
        <Button>Login as User</Button>
      </Link>
    </div>
  );
};

export default PublicUserHomePageAction;
