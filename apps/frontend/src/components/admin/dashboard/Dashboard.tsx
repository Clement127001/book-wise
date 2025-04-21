import { memo } from "react";
import StatsList from "@/components/admin/dashboard/StatsList";
import { dummyDashboardData } from "@/utils/admin/dashboard";
import DashboardListContainer from "./DashboardListContainer";
import { Plus } from "lucide-react";
import Link from "next/link";

const Dashboard = memo(({ searchText }: { searchText: string }) => {
  const { barrowRequests, recentBooks, accountRequests } = dummyDashboardData;

  return (
    <div className="p-[24px__16px] h-[80vh]">
      <StatsList />
      <div className="grid grid-cols-2 h-full pt-4">
        <div className="col-span-1 grid grid-rows-2">
          <DashboardListContainer
            title="books request"
            redirectLink="/admin/borrow-request"
          >
            <ul className="space-y-2 relative h-[24vh] overflow-scroll">
              {barrowRequests.map((borrowRequest, idx) => {
                const { id, title } = borrowRequest;

                const isLastItem = idx === barrowRequests.length - 1;
                return (
                  <li
                    key={id}
                    className={`min-h-[80px] bg-app-admin-bg border-app-admin-primary-100/20 rounded-md ${
                      isLastItem ? "mb-30" : ""
                    }`}
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </DashboardListContainer>

          <DashboardListContainer
            title="account request"
            redirectLink="/admin/account-request"
          >
            <ul className="space-y-2 relative h-[24vh] overflow-scroll">
              {barrowRequests.map((borrowRequest, idx) => {
                const { id, title } = borrowRequest;

                const isLastItem = idx === barrowRequests.length - 1;
                return (
                  <li
                    key={id}
                    className={`min-h-[80px] bg-app-admin-bg border-[1px] border-app-admin-primary-100/20 rounded-md ${
                      isLastItem ? "mb-30" : ""
                    }`}
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </DashboardListContainer>
        </div>

        <div className="col-span-1  p-4  relative">
          <DashboardListContainer
            title="recently added request"
            redirectLink="/admin/all-books"
          >
            <Link href={"/admin/book/create"}>
              <button className="bg-app-admin-bg w-full p-4 rounded-md cursor-pointer">
                <Plus
                  className="bg-white p-1 rounded-full"
                  size={32}
                  strokeWidth={1.5}
                />
              </button>
            </Link>
            <ul className="space-y-2 relative h-[50vh] overflow-scroll">
              {barrowRequests.map((borrowRequest, idx) => {
                const { id, title } = borrowRequest;

                const isLastItem = idx === barrowRequests.length - 1;
                return (
                  <li
                    key={id}
                    className={`min-h-[80px] bg-app-admin-bg border-[1px] border-app-admin-primary-100/20 rounded-md ${
                      isLastItem ? "mb-30" : ""
                    }`}
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </DashboardListContainer>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
