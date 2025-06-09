import { memo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountRequestTable from "@/components/admin/account-request/AccountRequestTable";
import { useQueryState } from "@/hooks/useQueryState";
import { UserAccountListType } from "@/types/admin";

const AccountRequest = memo(({ searchText }: { searchText: string }) => {
  const [accountRequestQuery, setAccountRequestQuery] =
    useQueryState<UserAccountListType>("orderByAlphabet", {
      sortInAsc: false,
      currentPage: 1,
    });

  const handlePageNumberChange = (page: number) => {
    setAccountRequestQuery({ ...accountRequestQuery, currentPage: page });
  };

  const handleToggleSortOrder = () => {
    setAccountRequestQuery({
      ...accountRequestQuery,
      sortInAsc: !accountRequestQuery.sortInAsc,
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
          {accountRequestQuery.sortInAsc
            ? "Recent to Oldest"
            : "Oldest to Recent"}
          <ArrowUpDown />
        </Button>
      </div>

      <AccountRequestTable
        searchText={searchText}
        handlePageNumberChange={handlePageNumberChange}
        accountRequestQuery={accountRequestQuery}
      />
    </section>
  );
});

AccountRequest.displayName = "AccountRequestComponent";
export default AccountRequest;
