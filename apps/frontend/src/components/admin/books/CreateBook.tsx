import { SubmitHandler, useForm } from "react-hook-form";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import { BookFormType } from "@/types/admin";
import { defaultBookValues } from "@/utils/admin/book";

const CreateBook = () => {
  const bookForm = useForm<BookFormType>({
    defaultValues: defaultBookValues,
  });

  const { handleSubmit } = bookForm;

  const onSubmitForm: SubmitHandler<BookFormType> = (data) => {
    console.log(data);
  };

  return (
    <section className="py-10">
      <BackButton />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Button />
      </form>
    </section>
  );
};

export default CreateBook;
