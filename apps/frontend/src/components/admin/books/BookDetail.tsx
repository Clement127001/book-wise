import { Calendar, Edit, Trash } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/common/ErrorMessage";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { Button } from "@/components/ui/button";
import useDeleteBook from "@/hooks/admin/useDeleteBook";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";

const DeleteConfirmationModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const BookDetail = ({}: {}) => {
  const router = useRouter();
  const {
    deleteBookId,
    deleteBookModalOpened,
    handleCloseDeleteModal,
    handleDeleteBook,
    handleOpenBookDeleteModal,
  } = useDeleteBook();

  const { id } = router.query;
  const bookId = (Array.isArray(id) ? id[0] : id) as string;

  const { isLoading, error, data } =
    getQueryClient().book.getBookDetails.useQuery(
      [contract.book.getBookDetails.path],
      { query: { id: bookId } }
    );

  if (error) return <ErrorMessage showErrorMessage error={error.body} />;

  if (isLoading) return <div>loading...</div>;

  const {
    title,
    createdAt,
    author,
    available,
    summary,
    genre,
    imageUrl,
    total,
    canDeleteBook,
  } = data.body;

  const availabilityPercentage = Math.round((available / total) * 100);
  const modifiedDate = new Date(createdAt).toLocaleString();

  return (
    <>
      <section className="space-y-8 py-6">
        <div className="flex  gap-8">
          <div className="bg-app-gray-100 p-4 rounded-lg">
            <img
              alt={title}
              src={imageUrl}
              className="rounded-md w-[300px] h-[200px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-1 text-md">
              <div className="flex items-center gap-2">
                <span className="text-app-gray-500">Created At :</span>
                <Calendar />
                <p>{modifiedDate}</p>
              </div>
              <h3 className="capitalize text-2xl tracking-wide font-semibold">
                {title}
              </h3>
              <p className="text-lg">By {author}</p>

              <p className="text-md">
                Availability:{" "}
                <span
                  className={`font-semibold ml-2 text-2xl ${
                    availabilityPercentage < 50
                      ? "text-app-accent-error-500"
                      : "text-app-accent-success-500"
                  }`}
                >
                  {available}
                </span>{" "}
                / {total}
              </p>

              <p className="text-app-gray-600 text-sm">{genre}</p>
            </div>

            <div className="flex gap-2 items-center pt-4">
              <Link href={"/admin/book/edit/" + id}>
                <AdminPrimaryButton
                  type="button"
                  className="min-w-[100px] rounded-md"
                >
                  <Edit strokeWidth={2.5} />
                  Edit Book
                </AdminPrimaryButton>
              </Link>
              {canDeleteBook && (
                <Button
                  onClick={() => {
                    handleOpenBookDeleteModal(bookId);
                  }}
                  className="bg-app-accent-error-500 hover:bg-app-accent-error-700 text-white"
                >
                  <Trash strokeWidth={2.5} />
                  Delete Book
                </Button>
              )}
            </div>
          </div>
        </div>
        <p className="line-clamp-6 text-md">{summary}</p>
      </section>

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

export default BookDetail;
