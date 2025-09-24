import AccountRequest from "@/components/admin/account-request/AccountRequest";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

const AccountRequestPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - Account Request</title>
        <meta
          name="description"
          content="List all the account request within in the platform, verify accounts to let the user to borrow books and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <WrapperWithSearch
          MainComponent={AccountRequest}
          className={"bg-app-admin-bg/90"}
        />
      </AdminLayout>
    </>
  );
};

export default AccountRequestPage;
