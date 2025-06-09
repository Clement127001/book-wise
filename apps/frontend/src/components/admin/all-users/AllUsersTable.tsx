import ErrorMessage from "@/components/common/ErrorMessage";
import TableWithCardSkeleton from "@/components/common/TableWithCardSkeleton";
import usePreviewIdCard from "@/hooks/admin/usePreviewIdCard";
import { useApi } from "@/hooks/useApi";
import { UserAccountListType } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getQueryClient } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { contract } from "contract";
import dynamic from "next/dynamic";
import { Fragment, memo, useState } from "react";
import Pagination from "@/components/common/Pagination";
import { Eye, Trash } from "lucide-react";
import UserAvatar from "@/components/common/UserAvatar";

const IdCardPreviewModal = dynamic(
  import("@/components/admin/account-request/IdCardPreviewModal").then(
    (mod) => mod.default
  ),
  { ssr: false }
);

const DeleteUserConfirmationModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const AllUsersTable = memo(
  ({
    searchText,
    handlePageNumberChange,
    allUserQuery,
  }: {
    searchText: string;
    handlePageNumberChange: (val: number) => void;
    allUserQuery: UserAccountListType;
  }) => {
    const { activeIdCardData, openIdPreview, hideIdPreviewModal } =
      usePreviewIdCard();
    const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null);

    const { makeApiCall } = useApi();
    const invaldationQueryClient = useQueryClient();
    const { currentPage, sortInAsc } = allUserQuery;

    const { data, isLoading, error } =
      getQueryClient().user.getAllUsers.useQuery(
        [contract.user.getAllUsers.path, searchText, currentPage, sortInAsc],
        {
          query: {
            pageNumber: String(currentPage),
            pageSize: String(5),
            searchText,
            sortByAlphabeticOrder: String(sortInAsc),
          },
        }
      );

    if (error) {
      return <ErrorMessage error={error.body} redirectLink="/" />;
    }

    if (isLoading) return <TableWithCardSkeleton />;

    const handleOpenDeleteUserModal = (id: string) => {
      setActiveDeleteId(id);
    };

    const handleCloseDeleteUserModal = () => {
      setActiveDeleteId(null);
    };

    const handleDeleteUser = () => {
      if (!activeDeleteId) return;

      makeApiCall({
        fetcherFn: async () => {
          return await getQueryClient().user.deleteUser.mutation({
            body: {
              id: activeDeleteId,
            },
          });
        },
        successMsgProps: {
          title: "User Deleted",
          description: "User deleted successfully!",
          duration: 3000,
        },
        failureMsgProps: {
          title: "Error occurred",
          description: "Failed to delete user",
          duration: 3000,
        },

        onSuccessFn: () => {
          invaldationQueryClient.invalidateQueries({
            queryKey: [contract.user.getAllUsers.path],
          });
          setActiveDeleteId(null);
        },
      });
    };

    const showDeleteModal = activeDeleteId !== null;
    const showIdPreview = activeIdCardData !== null;

    const { results, totalPages } = data.body;

    const showAllUser = results.length > 0;

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
            {showAllUser && (
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
                    canDeleteByAdmin,
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
                        <TableCell
                          className="px-4 text-[#110F43] cursor-pointer"
                          onClick={() => {
                            openIdPreview({
                              idCardUrl: identityCardUrl,
                              fullName,
                            });
                          }}
                        >
                          {identityCardUrl ? (
                            <p className="text-app-admin-primary-500 hover:text-app-admin-primary-700 flex gap-2 items-center">
                              <Eye />
                              View ID Card
                            </p>
                          ) : (
                            <p className="text-app-gray-600">
                              No ID card present
                            </p>
                          )}
                        </TableCell>

                        <TableCell className="px-4">
                          {canDeleteByAdmin ? (
                            <div
                              className="p-[6px__4px] w-fit hover:bg-white rounded-sm cursor-pointer"
                              onClick={() => {
                                handleOpenDeleteUserModal(id);
                              }}
                            >
                              <Trash className="h-5 text-app-accent-error-500" />
                            </div>
                          ) : (
                            <p className="text-app-gray-500">
                              Can't delete user
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            )}
          </Table>

          {!showAllUser && (
            <p className="w-full text-center font-medium text-app-accent-error-500 py-10">
              No account request found
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangePageNumber={handlePageNumberChange}
          />
        </div>

        {showIdPreview && (
          <IdCardPreviewModal
            data={activeIdCardData}
            opened={showIdPreview}
            onClose={hideIdPreviewModal}
          />
        )}

        {showDeleteModal && (
          <DeleteUserConfirmationModal
            opened={showDeleteModal}
            onClose={handleCloseDeleteUserModal}
            title="Delete User"
            description="Are you sure you want to delete this user? This action cannot be reverted back"
            confirmText="Yes, Delete"
            onClickConfirm={handleDeleteUser}
          />
        )}
      </>
    );
  }
);

export default AllUsersTable;
