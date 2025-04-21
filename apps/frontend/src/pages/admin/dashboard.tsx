import AdminLayout from "@/components/layout/AdminLayout";
import Wrapper from "@/components/admin/Wrapper";
import Dashboard from "@/components/admin/dashboard/Dashboard";

const dashboard = () => {
  return (
    <AdminLayout>
      <Wrapper>
        <Dashboard />
      </Wrapper>
    </AdminLayout>
  );
};

export default dashboard;
