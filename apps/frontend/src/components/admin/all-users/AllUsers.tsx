import { memo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AllUsersTable from "@/components/admin/all-users/AllUsersTable";
import { useQueryState } from "@/hooks/useQueryState";
import { UserAccountListType } from "@/types/admin";

const AllUsers = memo(({ searchText }: { searchText: string }) => {
  const [allUserQuery, setAllUserQuery] = useQueryState<UserAccountListType>(
    "orderByAlphabet",
    {
      sortInAsc: false,
      currentPage: 1,
    }
  );

  const handlePageNumberChange = (page: number) => {
    setAllUserQuery({ ...allUserQuery, currentPage: page });
  };

  const handleToggleSortOrder = () => {
    setAllUserQuery({
      ...allUserQuery,
      sortInAsc: !allUserQuery.sortInAsc,
    });
  };

  return (
    <section className="bg-white p-4 mt-6 rounded-xl min-h-[85vh]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[20px]">Account Request</h3>

        <Button
          className="bg-transparent border-[1px] py-2 border-app-gray-200 hover:bg-gray-50"
          onClick={handleToggleSortOrder}
        >
          {allUserQuery.sortInAsc ? "Z-A" : "A-Z"}
          <ArrowUpDown />
        </Button>
      </div>
      <AllUsersTable
        searchText={searchText}
        handlePageNumberChange={handlePageNumberChange}
        allUserQuery={allUserQuery}
      />
    </section>
  );
});

AllUsers.displayName = "AllUsersComponent";
export default AllUsers;
