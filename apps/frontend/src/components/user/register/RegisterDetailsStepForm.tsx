import { CommonInput } from "@/components/form/CommonInput";
import ImageUpload from "@/components/ImageUpload";
import { UserRegisterType } from "@/types/userRegister";
import { UseFormReturn } from "react-hook-form";

const RegisterDetailsStepForm = ({
  userRegisterForm,
}: {
  userRegisterForm: UseFormReturn<UserRegisterType>;
}) => {
  return (
    <>
      <ImageUpload
        name="identityCardUrl"
        label="Identity Card Image"
        required
      />
      <CommonInput
        hForm={userRegisterForm}
        name="firstName"
        showError
        label="First Name"
        placeholder="John"
        registerOptions={{
          required: "First name is required",
          minLength: {
            value: 4,
            message: "First name should have 4 character atleast",
          },
          maxLength: {
            value: 20,
            message: "First name shoudl have 20 character atmost",
          },
        }}
        labelClassName="text-white"
        inputClassName="bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white"
      />
      <CommonInput
        hForm={userRegisterForm}
        name="lastName"
        showError
        label="Last Name"
        placeholder="Doe"
        registerOptions={{
          required: "Last name is required",
          minLength: {
            value: 4,
            message: "Last name should have 4 character atleast",
          },
          maxLength: {
            value: 20,
            message: "Last name shoudl have 20 character atmost",
          },
        }}
        labelClassName="text-white"
        inputClassName="bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white"
      />
    </>
  );
};

export default RegisterDetailsStepForm;
