import CreateBook from "@/components/admin/books/CreateBook";
import Wrapper from "@/components/admin/Wrapper";
import AdminLayout from "@/components/layout/AdminLayout";

const CreateBookPage = () => {
  return (
    <AdminLayout>
      <Wrapper className="bg-app-admin-bg/90">
        <CreateBook />
      </Wrapper>
    </AdminLayout>
  );
};

export default CreateBookPage;
