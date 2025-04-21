import Sidebar from "@/components/admin/sidebar/Sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-11 w-full">
      <aside className="col-span-2">
        <Sidebar />
      </aside>
      <div className="col-span-9 h-screen">{children}</div>
    </main>
  );
};

export default AdminLayout;
