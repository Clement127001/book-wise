import { Fragment, useState } from "react";
import { Edit, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/common/Pagination";
import TableWithCardSkeleton from "@/components/common/TableWithCardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApi } from "@/hooks/useApi";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";

const DeleteConfirmationModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const BooksTable = ({
  searchText,
  allBooksSearchQuery,
  handlePageNumberChange,
}: {
  searchText: string;
  allBooksSearchQuery: {
    currentPage: number;
    sortInAsc: boolean;
  };
  handlePageNumberChange: (val: number) => void;
}) => {
  const { currentPage, sortInAsc } = allBooksSearchQuery;
  const [deleteBookModalOpened, setDeleteBookModalOpened] =
    useState<boolean>(false);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const { makeApiCall } = useApi();
  const invalidationQueryClient = useQueryClient();

  const { data, isLoading, error } = getQueryClient().book.getAllBooks.useQuery(
    [contract.book.getAllBooks.path, searchText, currentPage, sortInAsc],
    { query: { pageNumber: String(currentPage), pageSize: String(10) } }
  );

  if (error) {
    return <ErrorMessage error={error.body} redirectLink="/" />;
  }

  if (isLoading) return <TableWithCardSkeleton />;

  const { results, totalPages } = data.body;

  const handleOpenBookDeleteModal = (id: string) => {
    setDeleteBookId(id);
    setDeleteBookModalOpened(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteBookId(null);
    setDeleteBookModalOpened(false);
  };

  const handleDeleteBook = () => {
    if (!deleteBookId) return;

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().book.deleteBook.mutation({
          body: { id: deleteBookId },
        });
      },
      successMsgProps: {
        title: "Book Deleted",
        description: "Book deleted successfully",
        duration: 3000,
      },
      failureMsgProps: {
        title: "Delete failed",
        description: "Failed to delete book!",
        duration: 3000,
      },
      onSuccessFn: () => {
        invalidationQueryClient.invalidateQueries({
          queryKey: [contract.book.getAllBooks.path],
        });
        handleCloseDeleteModal();
      },
    });
  };

  return (
    <>
      <div className="pt-6">
        <Table className="w-full text-left">
          <TableHeader className="bg-[#E2E8F0] text-[16px] ">
            <TableRow>
              <TableHead className="min-w-[300px] px-8 rounded-l-[10px] py-4 flex-shrink-0">
                Book Title
              </TableHead>
              <TableHead className="min-w-[140px]">Author</TableHead>
              <TableHead className="min-w-[100px]">Genre</TableHead>
              <TableHead className="min-w-[140px]">Date Created</TableHead>
              <TableHead className="min-w-[140px] rounded-r-[10px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-6 border-t-0 border-b-0" />

            {results.map((book, index) => {
              const {
                id,
                title,
                imageUrl,
                author,
                genre,
                // createdAt,
                canDeleteBook,
              } = book;

              return (
                <Fragment key={index}>
                  <TableRow className="text-[16px] font-normal hover:bg-gray-100">
                    <TableCell className="px-4 text-[#110F43]">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl}
                          className="w-14 h-14 object-cover rounded-sm shadow-sm"
                        />
                        <p className="font-medium line-clamp-1">{title}</p>
                      </div>
                    </TableCell>
                    <TableCell>{author}</TableCell>
                    <TableCell>{genre}</TableCell>
                    <TableCell>{"date"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link
                          href={"/admin/book/edit/" + 1}
                          className="p-[6px__4px] hover:bg-white rounded-sm cursor-pointer"
                        >
                          <Edit className="h-5 text-app-admin-primary-500" />
                        </Link>
                        {canDeleteBook && (
                          <div
                            className="p-[6px__4px] hover:bg-white rounded-sm cursor-pointer"
                            onClick={() => {
                              handleOpenBookDeleteModal(id);
                            }}
                          >
                            <Trash className="h-5 text-app-accent-error-500" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePageNumber={handlePageNumberChange}
        />
      </div>

      {deleteBookModalOpened && deleteBookId && (
        <DeleteConfirmationModal
          opened={deleteBookModalOpened}
          onClose={handleCloseDeleteModal}
          title="Delete Book"
          description="Are you sure you want to delete the selected book? This action cannot be reverted back"
          confirmText="Yes, Delete"
          onClickConfirm={handleDeleteBook}
        />
      )}
    </>
  );
};

export default BooksTable;
