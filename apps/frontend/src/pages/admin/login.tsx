import { UseLogin } from "@/context/LoginProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminLoginPage = () => {
  const { isLoggedIn } = UseLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return <div>Admin login page </div>;
};

export default AdminLoginPage;
