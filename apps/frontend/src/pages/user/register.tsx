import UserRegister from "@/components/user/register/UserRegister";
import { UseLogin } from "@/context/LoginProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserRegisterPage = () => {
  const { isLoggedIn } = UseLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Bookwise | User - Register</title>
      </Head>
      <UserRegister />
    </>
  );
};

export default UserRegisterPage;
