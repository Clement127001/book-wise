import { memo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import StatsList from "@/components/admin/dashboard/StatsList";
import { dummyDashboardData } from "@/utils/admin/dashboard";
import DashboardListContainer from "@/components/admin/dashboard/DashboardListContainer";

const Dashboard = memo(() => {
  //TODO: for now the data is dummy, need to integrate with the api
  const { barrowRequests } = dummyDashboardData;

  return (
    <div className="p-[24px__16px] h-[80vh]">
      <StatsList />
      <div className="grid grid-cols-2 h-full pt-5 gap-5">
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

        <div className="col-span-1 relative">
          <DashboardListContainer
            title="recently added request"
            redirectLink="/admin/all-books"
          >
            <Link
              href={"/admin/book/create"}
              className="bg-app-admin-bg w-full p-4 rounded-md cursor-pointer flex items-center gap-4 group font-medium"
            >
              <Plus
                className="bg-white p-1 rounded-full group-hover:scale-110 transition-transform duration-200 ease-in-out"
                size={32}
                strokeWidth={1.5}
              />
              Add New Books
            </Link>
            <ul className="space-y-2 relative h-[50vh] overflow-scroll">
              {barrowRequests.map((borrowRequest, idx) => {
                const { id, title } = borrowRequest;

                const isLastItem = idx === barrowRequests.length - 1;
                return (
                  <li
                    key={id}
                    className={`min-h-[80px]  border-app-admin-primary-100/20 rounded-md ${
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

Dashboard.displayName = "DashboardComponent";
export default Dashboard;
