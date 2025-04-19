import Sidebar from "@/components/admin/Sidebar";
import WrapperWithSearch from "../admin/WrapperWithSearch";
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
