import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardListContainer = ({
  title,
  redirectLink,
  children,
}: {
  title: string;
  redirectLink: string;
  children: ReactNode;
}) => {
  return (
    <div className="p-4 relative space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold capitalize text[20px]">{title}</h4>
        <Link href={redirectLink}>
          <Button className="bg-app-admin-bg/80 hover:bg-app-admin-bg  text-app-admin-primary-700 p-3">
            View All
          </Button>
        </Link>
      </div>
      {children}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-dashboard-gradient" />
    </div>
  );
};

export default DashboardListContainer;
