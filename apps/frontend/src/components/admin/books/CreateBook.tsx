import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import BookForm from "@/components/admin/books/BookForm";
import { toast } from "sonner";
import BackButton from "@/components/common/BackButton";
import { useApi } from "@/hooks/useApi";
import { defaultBookValues } from "@/utils/admin/book";
import { getQueryClient } from "@/utils/api";
import { BookFormType } from "@/types/admin/book";

const CreateBook = () => {
  const bookForm = useForm<BookFormType>({
    defaultValues: defaultBookValues,
  });
  const { makeApiCall } = useApi();
  const router = useRouter();

  const { handleSubmit } = bookForm;

  const onCreateBook: SubmitHandler<BookFormType> = (data) => {
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

    const transformedData = { ...data, genreId: genreId?.value, total: +total };

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().book.createBook.mutation({
          body: transformedData,
        });
      },
      successMsgProps: {
        title: "Book Added",
        description: "Book added successfully",
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

  const onSubmit = handleSubmit(onCreateBook);

  return (
    <section className="pt-10 w-full">
      <BackButton className="mb-3" />
      <BookForm onSubmit={onSubmit} bookForm={bookForm} />
    </section>
  );
};

export default CreateBook;
