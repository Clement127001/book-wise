import AllUsers from "@/components/admin/all-users/AllUsers";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";

const AllUsersPage = () => {
  return (
    <AdminLayout>
      <WrapperWithSearch MainComponent={AllUsers} />
    </AdminLayout>
  );
};

export default AllUsersPage;
