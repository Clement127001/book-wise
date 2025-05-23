import AllBooks from "@/components/admin/all-books/AllBooks";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";

const AllBooksPage = () => {
  return (
    <AdminLayout>
      <WrapperWithSearch
        className={"bg-app-admin-bg/90"}
        MainComponent={AllBooks}
      />
    </AdminLayout>
  );
};

export default AllBooksPage;
