import { useRouter } from "next/router";
import ErrorMessage from "@/components/common/ErrorMessage";
import EditBookForm from "@/components/admin/books/EditBookForm";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";

const EditBook = () => {
  const router = useRouter();

  const { id } = router.query;
  const bookId = (Array.isArray(id) ? id[0] : id) as string;

  const { isLoading, error, data } =
    getQueryClient().book.getBookDetails.useQuery(
      [contract.book.getBookDetails.path, bookId],
      { query: { id: bookId } }
    );

  if (error) return <ErrorMessage showErrorMessage error={error.body} />;

  if (isLoading) return <div>loading...</div>;

  return <EditBookForm data={data.body} />;
};

export default EditBook;
