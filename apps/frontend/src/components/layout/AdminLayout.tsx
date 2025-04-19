import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-11">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div>{children}</div>
    </main>
  );
};

export default AdminLayout;
