import AdminLogin from "@/components/admin/AdminLogin";
import { UseLogin } from "@/context/LoginProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminLoginPage = () => {
  const { isLoggedIn } = UseLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>BookWise | admin | Login</title>
        <meta
          name="description"
          content="Access your account on Bookwise. Login to manage profiles, books, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLogin />
    </>
  );
};

export default AdminLoginPage;
