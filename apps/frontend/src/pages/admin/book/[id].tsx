import AdminLayout from "@/components/layout/AdminLayout";
import Wrapper from "@/components/admin/Wrapper";
import BookDetail from "@/components/admin/books/BookDetail";
import BackButton from "@/components/common/BackButton";
import Head from "next/head";

const BookDetailsPage = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - View book details</title>
        <meta
          name="description"
          content="Get to know all about the book in Bookwise, edit book, delete book, and lot more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <Wrapper>
          <div className="pt-10 w-full">
            <BackButton className="mb-3" />
            <BookDetail />
          </div>
        </Wrapper>
      </AdminLayout>
    </>
  );
};

export default BookDetailsPage;
