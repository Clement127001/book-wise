import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import BookForm from "@/components/admin/books/BookForm";
import { useApi } from "@/hooks/useApi";
import { BookDetailsType, BookFormType } from "@/types/admin";
import { CustomSelectOption } from "@/types/common";
import { getQueryClient } from "@/utils/api";

const EditBookForm = ({ data }: { data: BookDetailsType }) => {
  const { id, title, author, genre, genreId, total, imageUrl, summary } = data;
  const selectedGenre: CustomSelectOption = { value: genreId, label: genre };

  const router = useRouter();
  const { makeApiCall } = useApi();
  const bookForm = useForm<BookFormType>({
    defaultValues: {
      title,
      author,
      genreId: selectedGenre,
      total,
      imageUrl,
      summary,
    },
  });

  const { handleSubmit } = bookForm;

  const onEditBook: SubmitHandler<BookFormType> = (data) => {
    const { genreId, total } = data;

    if (!genreId) {
      toast.warning("Please select genre", {
        description: "Genre can'be empty",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
      return;
    }

    const transformedData = {
      ...data,
      genreId: genreId?.value,
      total: +total,
    };

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().book.editBook.mutation({
          query: { id },
          body: transformedData,
        });
      },
      successMsgProps: {
        title: "Book Edited",
        description: "Book edited successfully",
        duration: 3000,
      },
      failureMsgProps: {
        title: "Error occurred",
        description: "Failed to add book",
        duration: 3000,
      },
      onSuccessFn: () => {
        router.push("/admin/all-books");
      },
    });
  };

  const onSubmit = handleSubmit(onEditBook);

  return <BookForm bookForm={bookForm} onSubmit={onSubmit} isEdit />;
};

export default EditBookForm;
