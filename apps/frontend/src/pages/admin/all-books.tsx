import AllBooks from "@/components/admin/all-books/AllBooks";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";

const AllBoooksPage = () => {
  return (
    <AdminLayout>
      <WrapperWithSearch MainComponent={AllBooks} />
    </AdminLayout>
  );
};

export default AllBoooksPage;
