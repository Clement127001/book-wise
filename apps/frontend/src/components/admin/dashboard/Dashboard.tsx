import { memo } from "react";
import StatsList from "@/components/admin/dashboard/StatsList";
import Header from "@/components/admin/dashboard/Header";
import { dummyDashboardData } from "@/utils/admin/dashboard";

const Dashboard = memo(({ searchText }: { searchText: string }) => {
  const { barrowRequests, recentBooks, accountRequests } = dummyDashboardData;

  return (
    <div className="p-[24px__16px] h-[80vh]">
      <StatsList />
      <div className="grid grid-cols-2 h-full pt-4">
        <div className="col-span-1 grid grid-rows-2">
          <div className="p-4 relative space-y-2">
            <Header
              title="books request"
              redirectLink="/admin/borrow-request"
            />
            <ul className="space-y-3 relative h-[30vh] overflow-scroll">
              {barrowRequests.map((borrowRequest, idx) => {
                const { id, title } = borrowRequest;

                const isLastItem = idx === barrowRequests.length - 1;
                return (
                  <li
                    key={id}
                    className={`min-h-[80px] bg-app-admin-bg rounded-md ${
                      isLastItem ? "mb-30" : ""
                    }`}
                  >
                    {title}
                  </li>
                );
              })}
            </ul>

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-dashboard-gradient" />
          </div>
          <div className="p-4">
            <Header
              title="account request"
              redirectLink="/admin/account-request"
            />
          </div>
        </div>
        <div className="col-span-1  p-4">
          <Header
            title="recently added request"
            redirectLink="/admin/all-books"
          />
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
