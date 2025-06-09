import CreateBook from "@/components/admin/books/CreateBook";
import Wrapper from "@/components/admin/Wrapper";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

const CreateBookPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - Add new book</title>
        <meta
          name="description"
          content="Add new book to the wonderful collection in Bookwise"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <Wrapper className="bg-app-admin-bg/90">
          <CreateBook />
        </Wrapper>
      </AdminLayout>
    </>
  );
};

export default CreateBookPage;
