import Head from "next/head";
import UserLogin from "@/components/user/UserLogin";
import { UseLogin } from "@/context/LoginProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";

const UserLoginPage = () => {
  const { isLoggedIn } = UseLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [router.isReady, isLoggedIn]);

  return (
    <>
      <Head>
        <title>BookWise | User | Login</title>
        <meta
          name="description"
          content="Access your account on Bookwise. Login to view books, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UserLogin />
    </>
  );
};

export default UserLoginPage;
