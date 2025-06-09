import AllBooks from "@/components/admin/all-books/AllBooks";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

const AllBooksPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - All books</title>
        <meta
          name="description"
          content="Explore all the wide variety of books available on Bookwise, edit book, delete book. Everything is under your control."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <WrapperWithSearch
          className={"bg-app-admin-bg/90"}
          MainComponent={AllBooks}
        />
      </AdminLayout>
    </>
  );
};

export default AllBooksPage;
