import Sidebar from "@/components/admin/sidebar/Sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-11">
      <aside className="col-span-2 fixed">
        <Sidebar />
      </aside>
      <div className="col-span-9 h-screen relative left-[280px]">
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
