import { SubmitHandler, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { CommonInput } from "@/components/form/CommonInput";
import { CommonTextArea } from "@/components/form/CommonTextArea";
import { BookFormType } from "@/types/admin";
import { defaultBookValues } from "@/utils/admin/book";

const CreateBook = () => {
  const bookForm = useForm<BookFormType>({
    defaultValues: defaultBookValues,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = bookForm;

  const onSubmitForm: SubmitHandler<BookFormType> = (data) => {
    console.log(data);
  };

  return (
    <section className="pt-10 w-full">
      <BackButton className="mb-3" />
      <div className="max-h-[80vh] overflow-y-scroll">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="py-3 pb-6 px-1 space-y-4"
        >
          <CommonInput
            hForm={bookForm}
            label="book title"
            name="title"
            showError
            placeholder="Enter the book title"
            registerOptions={{
              required: "Book title is required",
            }}
            inputClassName="rounded-md"
          />
          <CommonInput
            hForm={bookForm}
            label="author"
            name="title"
            showError
            placeholder="Enter the author name"
            registerOptions={{
              required: "Book title is required",
            }}
            inputClassName="rounded-md"
          />
          <CommonInput
            hForm={bookForm}
            label="genre"
            name="genreId"
            showError
            placeholder="Enter the genre"
            registerOptions={{
              required: "Genre is required",
            }}
            inputClassName="rounded-md"
          />
          <CommonInput
            hForm={bookForm}
            type="number"
            label="total number of books"
            name="genreId"
            showError
            placeholder="Enter the number between 1 to 100"
            registerOptions={{
              required: "Total number of books is required",
              min: {
                value: 1,
                message: "Total number of books cannot be lesser than 1",
              },
              max: {
                value: 100,
                message: "Total number of books cannot be greater than 100",
              },
            }}
            inputClassName="rounded-md"
          />

          <CommonTextArea
            hForm={bookForm}
            label="summary"
            name="summary"
            placeholder="Enter Summary"
            registerOptions={{
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary need to be at least 10 characters",
              },
              maxLength: {
                value: 2000,
                message: "Summary needs to be at most 2000 characters",
              },
            }}
            inputClassName="rounded-md"
          />

          <AdminPrimaryButton
            disabled={!isValid}
            type="submit"
            className="w-full group mt-20"
          >
            <Plus
              strokeWidth={3}
              className="group-hover:scale-125 transition-transform duration-200 ease-in-out"
            />
            Create
          </AdminPrimaryButton>
        </form>
      </div>
    </section>
  );
};

export default CreateBook;
