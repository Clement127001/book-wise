import { ReactNode } from "react";
import Navbar from "@/components/user/Navbar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-user-gradient">
      <Navbar />
      {children}
    </main>
  );
};

export default UserLayout;
