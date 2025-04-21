import Stats from "@/components/admin/dashboard/Stats";
import { dummyDashboardData } from "@/utils/admin/dashboard";

const StatsList = () => {
  const { stats } = dummyDashboardData;
  const {
    borrowedBooks,
    borrowedBooksDelta,
    totalUsers,
    totalBooks,
    totalUsersDelta,
    totalBooksDelta,
  } = stats;

  return (
    <div className="flex gap-4">
      <Stats
        title="Barrowed Books"
        count={borrowedBooks}
        changeInCount={borrowedBooksDelta}
      />
      <Stats
        title="total users"
        count={totalUsers}
        changeInCount={totalUsersDelta}
      />
      <Stats
        title="total Books"
        count={totalBooks}
        changeInCount={totalBooksDelta}
      />
    </div>
  );
};

export default StatsList;
