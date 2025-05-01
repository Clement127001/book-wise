import { Plus } from "lucide-react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import AsyncSearchSelectField from "@/components/form/AsyncSearchSelectField/AsyncSearchSelectField";
import { getApiUrl } from "@/utils/env";
import ImageUpload from "@/components/form/ImageUpload";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { CommonInput } from "@/components/form/CommonInput";
import { CommonTextArea } from "@/components/form/CommonTextArea";
import { contract } from "contract";
import { BookFormType } from "@/types/admin";

const BookForm = ({
  bookForm,
  onSubmit,
  isEdit,
}: {
  bookForm: UseFormReturn<BookFormType>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isEdit?: boolean;
}) => {
  const getGenreOptions = async (val: string) => {
    try {
      const response = await fetch(
        getApiUrl() + contract.genre.getAllGenres.path
      );
      const data = await response.json();

      return data.genres
        .filter((genre: { id: string; title: string }) =>
          genre.title.toLowerCase().includes(val)
        )
        .map((genre: { id: string; title: string }) => ({
          value: genre.id,
          label: genre.title,
        }));
    } catch (err) {
      console.error("Error fetching genres", err);
      return [];
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-scroll px-4">
      <FormProvider {...bookForm}>
        <form onSubmit={onSubmit} className="py-3 pb-6 px-1 space-y-4">
          <CommonInput
            hForm={bookForm}
            label="book title"
            name="title"
            showError
            placeholder="Enter the book title"
            registerOptions={{
              required: "Book title is required",
              minLength: {
                value: 4,
                message: "Title should have 4 character at least",
              },
              maxLength: {
                value: 40,
                message: "Title should have 40 character at most",
              },
            }}
            inputClassName="rounded-md"
          />
          <CommonInput
            hForm={bookForm}
            label="author"
            name="author"
            showError
            placeholder="Enter the author name"
            registerOptions={{
              required: "Book title is required",
              minLength: {
                value: 4,
                message: "Author name should have 4 character at least",
              },
              maxLength: {
                value: 40,
                message: "Author name  should have 40 character at most",
              },
            }}
            inputClassName="rounded-md"
          />
          <AsyncSearchSelectField
            hForm={bookForm}
            rules={{
              required: "Genre is required",
            }}
            name={"genreId"}
            label="Genre"
            getOptions={getGenreOptions}
            isSearchable
            isMulti={false}
            instanceId="genre"
            isClearable
            placeholder="Enter the genre"
          />
          <CommonInput
            hForm={bookForm}
            type="number"
            label="total number of books"
            name="total"
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

          <ImageUpload name="imageUrl" label="Book Image" required />

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

          <AdminPrimaryButton type="submit" className="w-full group mt-20">
            <Plus
              strokeWidth={3}
              className="group-hover:scale-125 transition-transform duration-200 ease-in-out"
            />
            {isEdit ? "Edit Book" : "Create Book"}
          </AdminPrimaryButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default BookForm;
