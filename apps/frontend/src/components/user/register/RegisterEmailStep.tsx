import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronRight, RotateCw } from "lucide-react";
import { CommonInput } from "@/components/form/CommonInput";
import { OTPInput } from "@/components/form/OTPInput";
import { Button } from "@/components/ui/button";
import { UserRegisterType } from "@/types/userRegister";
import { validateEmail, validateOTP } from "@/utils/common";

const RegisterEmailStep = ({
  userRegisterForm,
  isEmailVerified,
  handleSendOTP,
  timer,
}: {
  userRegisterForm: UseFormReturn<UserRegisterType>;
  isEmailVerified: boolean;
  handleSendOTP: () => void;
  timer: number;
}) => {
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
        registerOptions={{
          required: "Email is required",
          validate: (value) =>
            (typeof value === "string" && validateEmail(value)) ||
            "Please enter a valid email address",
        }}
        labelClassName="text-white"
        inputClassName="bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white"
      />
      {!isEmailVerified && (
        <Button className="w-full my-4" type="submit" disabled={!isEmailValid}>
          Send OTP
          <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
        </Button>
      )}
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
            labelClassName="text-white"
            inputClassName="bg-[#232839] border-none hover:bg-[#23283990] focus:bg-[#23283990] !placeholder-gray-400 text-white !outline-none text-white"
          />

          <Button
            className={`w-full mt-8`}
            type="submit"
            disabled={!isOTPValid}
          >
            Verify OTP
            <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
          </Button>

          <div className="flex gap-3 font-normal text-[14px] mt-3 text-white">
            <p> Didn’t receive OTP ?</p>
            <p
              className={`flex gap-1 items-center ${
                timer > 0
                  ? "text-app-gray-300 cursor-not-allowed"
                  : "text-app-primary-700 cursor-pointer "
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
