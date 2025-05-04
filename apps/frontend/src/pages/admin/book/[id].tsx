import AdminLayout from "@/components/layout/AdminLayout";
import Wrapper from "@/components/admin/Wrapper";
import BookDetail from "@/components/admin/books/BookDetail";
import BackButton from "@/components/common/BackButton";

const BookDetailsPage = () => {
  return (
    <AdminLayout>
      <Wrapper>
        <div className="pt-10 w-full">
          <BackButton className="mb-3" />
          <BookDetail />
        </div>
      </Wrapper>
    </AdminLayout>
  );
};

export default BookDetailsPage;
