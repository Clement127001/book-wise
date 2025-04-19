import UserRegister from "@/components/user/register/UserRegister";
import Head from "next/head";

const UserRegisterPage = () => {
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
