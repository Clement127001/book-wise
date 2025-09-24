import AdminLayout from "@/components/layout/AdminLayout";
import Wrapper from "@/components/admin/Wrapper";
import BackButton from "@/components/common/BackButton";
import EditBook from "@/components/admin/books/EditBook";
import Head from "next/head";

const EditBookPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - Edit book</title>
        <meta name="description" content="Edit the book detail." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <Wrapper>
          <div className="pt-10 w-full">
            <BackButton className="mb-3" />
            <EditBook />
          </div>
        </Wrapper>
      </AdminLayout>
    </>
  );
};

export default EditBookPage;
