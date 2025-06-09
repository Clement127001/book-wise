import UserLayout from "@/components/layout/UserLayout";
import Head from "next/head";

const UserHomePage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | User - Home</title>
        <meta
          name="description"
          content="Explore within the wide variety of books available on Bookwise"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UserLayout>
        <div>Home page</div>
      </UserLayout>
    </>
  );
};

export default UserHomePage;
