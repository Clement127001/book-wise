import AdminLogin from "@/components/admin/login/AdminLogin";
import Head from "next/head";

const AdminLoginPage = () => {
  return (
    <>
      <Head>
        <title>BookWise | admin - Login</title>
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
