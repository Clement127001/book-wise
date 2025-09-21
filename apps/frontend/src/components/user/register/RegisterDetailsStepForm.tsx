import { UseFormReturn } from "react-hook-form";
import { CommonInput } from "@/components/form/CommonInput";
import ImageUpload from "@/components/form/ImageUpload";
import { registerType } from "@/types/user/register";
import { adminRegisterType } from "@/types/admin/register";

const RegisterDetailsStepForm = ({
  userRegisterForm,
  isAdmin,
}: {
  userRegisterForm: UseFormReturn<registerType | adminRegisterType>;
  isAdmin?: boolean;
}) => {
  return (
    <>
      <ImageUpload
        name="avatarUrl"
        label="Profile Image"
        required
        isAdmin={isAdmin}
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
        labelClassName={isAdmin ? "text-black" : "text-white"}
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
        labelClassName={isAdmin ? "text-black" : "text-white"}
        inputClassName="bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white"
      />
      {!isAdmin && (
        <ImageUpload
          name="identityCardUrl"
          label="Identity Card Image"
          required
        />
      )}
    </>
  );
};

export default RegisterDetailsStepForm;
