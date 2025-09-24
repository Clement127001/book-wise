import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronRight, RotateCw } from "lucide-react";
import { CommonInput } from "@/components/form/CommonInput";
import { OTPInput } from "@/components/form/OTPInput";
import { Button } from "@/components/ui/button";

import { validateEmail, validateOTP } from "@/utils/common";
import { registerType } from "@/types/user/register";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { useRouter } from "next/router";

const RegisterEmailStep = ({
  userRegisterForm,
  isEmailVerified,
  handleSendOTP,
  timer,
}: {
  userRegisterForm: UseFormReturn<registerType>;
  isEmailVerified: boolean;
  handleSendOTP: () => void;
  timer: number;
}) => {
  const router = useRouter();
  const pathName = router.pathname;
  const isAdmin = pathName === "/admin/register";

  const { setFocus, watch } = userRegisterForm;

  const email = watch("email");
  const isEmailValid = validateEmail(email);
  const otp = watch("otp");
  const isOTPValid = validateOTP(otp);

  const handleResendOTP = () => {
    if (timer > 0) return;
    handleSendOTP();
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <>
      <CommonInput
        hForm={userRegisterForm}
        label="email address"
        name="email"
        showError
        placeholder="e.g: johndoe12@gmail.com"
        labelClassName={isAdmin ? "text-black" : "text-white"}
        registerOptions={{
          required: "Email is required",
          validate: (value) =>
            (typeof value === "string" && validateEmail(value)) ||
            "Please enter a valid email address",
        }}
        inputClassName={
          isAdmin
            ? ""
            : "bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white"
        }
      />
      {!isEmailVerified &&
        (isAdmin ? (
          <AdminPrimaryButton
            className="w-full my-4"
            type="submit"
            disabled={!isEmailValid}
          >
            Send OTP
            <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
          </AdminPrimaryButton>
        ) : (
          <Button
            className="w-full my-4"
            type="submit"
            disabled={!isEmailValid}
          >
            Send OTP
            <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
          </Button>
        ))}

      {isEmailVerified && (
        <div className="mt-4">
          <OTPInput
            label={"Enter OTP"}
            name="otp"
            hForm={userRegisterForm}
            registerOptions={{
              required: "OTP is required",
              validate: (value) =>
                (typeof value === "string" && validateOTP(value)) ||
                "Please enter a valid OTP",
            }}
            labelClassName={isAdmin ? "text-black" : "text-white"}
            inputClassName={
              isAdmin
                ? ""
                : "bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white !outline-none text-white"
            }
          />

          {isAdmin ? (
            <AdminPrimaryButton
              className={`w-full mt-8`}
              type="submit"
              disabled={!isOTPValid}
            >
              Verify OTP
              <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
            </AdminPrimaryButton>
          ) : (
            <Button
              className={`w-full mt-8`}
              type="submit"
              disabled={!isOTPValid}
            >
              Verify OTP
              <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
            </Button>
          )}

          <div
            className={`flex gap-3 font-[450] text-[14px] mt-3 ${
              isAdmin ? "text-black" : "text-white"
            }`}
          >
            <p> Didn’t receive OTP ?</p>
            <p
              className={`flex gap-1 items-center ${
                timer > 0
                  ? "text-app-gray-300 cursor-not-allowed"
                  : isAdmin
                  ? "text-app-admin-primary-700"
                  : "text-app-user-primary cursor-pointer"
              }`}
              onClick={handleResendOTP}
            >
              {timer > 0 ? (
                `Resend OTP (${timer}s)`
              ) : (
                <>
                  <RotateCw size={19} /> Resend OTP
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterEmailStep;
