import BorrowRequest from "@/components/admin/borrow-request/BorrowRequest";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

const BorrowRequestPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - Borrow request</title>
        <meta
          name="description"
          content="View all the book request from users."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <WrapperWithSearch MainComponent={BorrowRequest} />
      </AdminLayout>
    </>
  );
};

export default BorrowRequestPage;
