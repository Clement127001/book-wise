import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { getQueryClient } from "@/utils/api";
import { useRouter } from "next/router";
import { contract } from "contract";

const useDeleteBook = () => {
  const [deleteBookModalOpened, setDeleteBookModalOpened] =
    useState<boolean>(false);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);

  const invalidationQueryClient = useQueryClient();
  const { makeApiCall } = useApi();
  const router = useRouter();

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
        router.push("/admin/all-books");
      },
    });
  };

  return {
    deleteBookModalOpened,
    deleteBookId,
    handleCloseDeleteModal,
    handleOpenBookDeleteModal,
    handleDeleteBook,
  };
};

export default useDeleteBook;
