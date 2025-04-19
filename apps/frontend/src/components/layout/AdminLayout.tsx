import Sidebar from "@/components/admin/sidebar/Sidebar";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import { AdminLayoutProps } from "@/types/admin";

const AdminLayout = ({ MainComponent }: AdminLayoutProps) => {
  return (
    <main className="grid grid-cols-11">
      <aside className="col-span-2">
        <Sidebar />
      </aside>
      <WrapperWithSearch MainComponent={MainComponent} />
    </main>
  );
};

export default AdminLayout;
