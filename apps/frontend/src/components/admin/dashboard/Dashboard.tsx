import { memo } from "react";

const Dashboard = memo(({ searchText }: { searchText: string }) => {
  return <div>Dashboard {searchText}</div>;
});

Dashboard.displayName = "DashboardComponent";
export default Dashboard;
