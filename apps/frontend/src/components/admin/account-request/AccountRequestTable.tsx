import { Fragment, memo, useState } from "react";
import dynamic from "next/dynamic";
import { Eye, XCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
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
import { useApi } from "@/hooks/useApi";
import usePreviewIdCard from "@/hooks/admin/usePreviewIdCard";
import { UserAccountListType, ChangeStatusModalType } from "@/types/admin/user";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";
import { UserAccountStatus } from "contract/enum";

const IdCardPreviewModal = dynamic(
  import("@/components/admin/account-request/IdCardPreviewModal").then(
    (mod) => mod.default
  ),
  { ssr: false }
);

const ChangeStatusModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const AccountRequestTable = memo(
  ({
    searchText,
    handlePageNumberChange,
    accountRequestQuery,
  }: {
    searchText: string;
    handlePageNumberChange: (val: number) => void;
    accountRequestQuery: UserAccountListType;
  }) => {
    const [activeStatusWithId, setActiveStatusWithId] =
      useState<ChangeStatusModalType | null>(null);
    const { activeIdCardData, openIdPreview, hideIdPreviewModal } =
      usePreviewIdCard();

    const { makeApiCall } = useApi();
    const invaldationQueryClient = useQueryClient();

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

    const showAccountRequest = results.length > 0;

    const showIdPreview = activeIdCardData !== null;

    const changeStatusActive = activeStatusWithId;
    const showApproveAccountModal =
      changeStatusActive &&
      activeStatusWithId.status === UserAccountStatus.VERIFIED;
    const showRejectAccountModal =
      changeStatusActive &&
      activeStatusWithId.status === UserAccountStatus.DENIED;

    const handleOpenChangeStatusModal = (data: ChangeStatusModalType) => {
      setActiveStatusWithId(data);
    };

    const handleChangeStatus = () => {
      if (!activeStatusWithId) return;

      const { id, status } = activeStatusWithId;
      const isAccepted = status === UserAccountStatus.VERIFIED;

      makeApiCall({
        fetcherFn: async () => {
          return await getQueryClient().user.changeAccountStatus.mutation({
            body: {
              id: id,
              status: status,
            },
          });
        },
        successMsgProps: {
          title: "Status Changed",
          description: `Account ${
            isAccepted ? "accepted" : "rejected"
          } successfully`,
          duration: 3000,
        },
        failureMsgProps: {
          title: "Error occurred",
          description: "Failed to change status",
          duration: 3000,
        },

        onSuccessFn: () => {
          invaldationQueryClient.invalidateQueries({
            queryKey: [contract.user.getAllAccountRequest.path],
          });
          setActiveStatusWithId(null);
        },
      });
    };

    const handleCloseChangeStatusModal = () => {
      setActiveStatusWithId(null);
    };

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
                        <TableCell className="px-4 text-[#110F43] cursor-pointer">
                          {identityCardUrl ? (
                            <p
                              className="text-app-admin-primary-500 hover:text-app-admin-primary-700 flex gap-2 items-center"
                              onClick={() => {
                                openIdPreview({
                                  idCardUrl: identityCardUrl,
                                  fullName,
                                });
                              }}
                            >
                              <Eye />
                              View ID Card
                            </p>
                          ) : (
                            <p className="text-app-gray-600">
                              No ID card present
                            </p>
                          )}
                        </TableCell>

                        <TableCell className="flex gap-3 items-center">
                          <Button
                            className={
                              "bg-app-accent-success-300 text-app-accent-success-600 hover:bg-app-accent-success-400 hover:text-app-accent-success-700"
                            }
                            onClick={() => {
                              handleOpenChangeStatusModal({
                                id,
                                status: UserAccountStatus.VERIFIED,
                              });
                            }}
                          >
                            Approve Account
                          </Button>
                          <div
                            className="p-[6px__4px] hover:bg-white rounded-sm cursor-pointer"
                            onClick={() => {
                              handleOpenChangeStatusModal({
                                id,
                                status: UserAccountStatus.DENIED,
                              });
                            }}
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
              No account request found
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangePageNumber={handlePageNumberChange}
          />
        </div>

        {activeIdCardData && (
          <IdCardPreviewModal
            data={activeIdCardData}
            opened={showIdPreview}
            onClose={hideIdPreviewModal}
          />
        )}

        {showApproveAccountModal && (
          <ChangeStatusModal
            opened={showApproveAccountModal}
            onClose={handleCloseChangeStatusModal}
            title="Approve account"
            description="Approve the student’s account request and grant access. A confirmation email will be sent upon approval."
            confirmText="Yes, Approve"
            onClickConfirm={handleChangeStatus}
            confirmClassname={
              "bg-app-accent-success-300 border-app-accent-success-200 text-app-accent-success-600 hover:bg-app-accent-success-400 hover:text-app-accent-success-700"
            }
          />
        )}

        {showRejectAccountModal && (
          <ChangeStatusModal
            opened={showRejectAccountModal}
            onClose={handleCloseChangeStatusModal}
            title="Reject account"
            description="Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."
            confirmText="Yes, Reject"
            onClickConfirm={handleChangeStatus}
          />
        )}
      </>
    );
  }
);

export default AccountRequestTable;
