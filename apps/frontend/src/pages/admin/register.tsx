import AdminRegister from "@/components/admin/register/AdminRegister";
import Head from "next/head";

const AdminLoginPage = () => {
  return (
    <>
      <Head>
        <title>BookWise | Admin - Register</title>
        <meta
          name="description"
          content="Access your account on Bookwise. Register to manage profiles, books, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminRegister />
    </>
  );
};

export default AdminLoginPage;
