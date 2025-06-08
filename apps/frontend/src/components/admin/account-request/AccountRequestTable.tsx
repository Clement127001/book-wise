import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import TableWithCardSkeleton from "@/components/common/TableWithCardSkeleton";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountRequestQuery } from "@/types/admin";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";
import { Eye, Trash, XCircle } from "lucide-react";
import { Fragment, memo } from "react";

const AccountRequestTable = memo(
  ({
    searchText,
    handlePageNumberChange,
    accountRequestQuery,
  }: {
    searchText: string;
    handlePageNumberChange: (val: number) => void;
    accountRequestQuery: AccountRequestQuery;
  }) => {
    const { currentPage, sortInAsc } = accountRequestQuery;

    const { data, isLoading, error } =
      getQueryClient().user.getAllAccountRequest.useQuery(
        [
          contract.user.getAllAccountRequest.path,
          searchText,
          currentPage,
          sortInAsc,
        ],
        {
          query: {
            pageNumber: String(currentPage),
            pageSize: String(5),
            searchText,
            sortByCreatedTime: String(sortInAsc),
          },
        }
      );

    if (error) {
      return <ErrorMessage error={error.body} redirectLink="/" />;
    }

    if (isLoading) return <TableWithCardSkeleton />;

    const { results, totalPages } = data.body;

    console.log(totalPages);
    const showAccountRequest = results.length > ~~0;

    return (
      <>
        <div className="pt-6">
          <Table className="w-full text-left">
            <TableHeader className="bg-[#E2E8F0] text-[16px]">
              <TableRow>
                <TableHead className="min-w-[300px] px-8 rounded-l-[10px] py-4 flex-shrink-0">
                  Name
                </TableHead>
                <TableHead className="min-w-[140px]">Date Joined</TableHead>
                <TableHead className="min-w-[140px]">ID card</TableHead>
                <TableHead className="min-w-[140px] rounded-r-[10px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            {showAccountRequest && (
              <TableBody>
                <TableRow className="h-6 border-t-0 border-b-0" />

                {results.map((accountRequest) => {
                  const {
                    id,
                    firstname,
                    lastname,
                    avatarUrl,
                    email,
                    createdAt,
                    identityCardUrl,
                  } = accountRequest;

                  const fullName = firstname + " " + lastname;
                  const modifiedDate = new Date(createdAt).toLocaleString();

                  return (
                    <Fragment key={id}>
                      <TableRow className="text-[16px] font-normal hover:bg-gray-100">
                        <TableCell className="px-4 text-[#110F43] flex gap-4 items-center">
                          <UserAvatar name={fullName} src={avatarUrl} />
                          <div className="space-y-1">
                            <h4 className="text-lg">{fullName}</h4>
                            <p className="text-app-gray-600">{email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 text-[#110F43]">
                          {modifiedDate}
                        </TableCell>
                        <TableCell className="px-4 text-[#110F43]">
                          {identityCardUrl ? (
                            <p className="text-app-admin-primary-500 flex gap-2 items-center">
                              <Eye />
                              View ID Card
                            </p>
                          ) : (
                            <p className="text-app-gray-600">
                              No ID card present
                            </p>
                          )}
                        </TableCell>

                        <TableCell className="div flex gap-3 items-center">
                          <Button
                            className={
                              "bg-app-accent-success-200 text-app-accent-success-600 hover:bg-app-accent-success-400 hover:text-app-accent-success-700"
                            }
                          >
                            Approve Account
                          </Button>
                          <div
                            className="p-[6px__4px] hover:bg-white rounded-sm cursor-pointer"
                            onClick={() => {}}
                          >
                            <XCircle className="h-5 text-app-accent-error-500" />
                          </div>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            )}
          </Table>

          {!showAccountRequest && (
            <p className="w-full text-center font-medium text-app-accent-error-500 py-10">
              No account request found for given filters
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangePageNumber={handlePageNumberChange}
          />
        </div>
      </>
    );
  }
);

export default AccountRequestTable;
