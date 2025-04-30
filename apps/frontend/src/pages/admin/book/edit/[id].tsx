import AdminLayout from "@/components/layout/AdminLayout";
import Wrapper from "@/components/admin/Wrapper";
import BackButton from "@/components/common/BackButton";
import EditBook from "@/components/admin/books/EditBook";

const EditBookPage = () => {
  return (
    <AdminLayout>
      <Wrapper>
        <div className="pt-10 w-full">
          <BackButton className="mb-3" />
          <EditBook />
        </div>
      </Wrapper>
    </AdminLayout>
  );
};

export default EditBookPage;
