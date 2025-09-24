import AllUsers from "@/components/admin/all-users/AllUsers";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

const AllUsersPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | User - Verified user</title>
        <meta name="description" content="List all the verified users." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <WrapperWithSearch
          MainComponent={AllUsers}
          className={"bg-app-admin-bg/90"}
        />
      </AdminLayout>
    </>
  );
};

export default AllUsersPage;
