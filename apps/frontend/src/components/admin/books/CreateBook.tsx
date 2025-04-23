import { SubmitHandler, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { CommonInput } from "@/components/form/CommonInput";
import { CommonTextArea } from "@/components/form/CommonTextArea";
import { BookFormType } from "@/types/admin";
import { defaultBookValues } from "@/utils/admin/book";
import { contract } from "contract";
import AsyncSearchSelectField from "@/components/form/AsyncSearchSelectField/AsyncSearchSelectField";
import { getApiUrl } from "@/utils/env";

const CreateBook = () => {
  const bookForm = useForm<BookFormType>({
    defaultValues: defaultBookValues,
  });

  const { handleSubmit } = bookForm;

  const onSubmitForm: SubmitHandler<BookFormType> = (data) => {
    console.log(data);
  };

  const getGenreOptions = async (_: string) => {
    try {
      const response = await fetch(
        getApiUrl() + contract.genre.getAllGenres.path
      );
      const data = await response.json();
      return data.genres.map((genre: { id: string; title: string }) => ({
        value: genre.id,
        label: genre.title,
      }));
    } catch (err) {
      console.error("Error fetching genres", err);
      return [];
    }
  };

  return (
    <section className="pt-10 w-full px-4">
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
            Create
          </AdminPrimaryButton>
        </form>
      </div>
    </section>
  );
};

export default CreateBook;
