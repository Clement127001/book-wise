import Sidebar from "@/components/admin/sidebar/Sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-11">
      <aside className="col-span-2">
        <Sidebar />
      </aside>
      {children}
    </main>
  );
};

export default AdminLayout;
