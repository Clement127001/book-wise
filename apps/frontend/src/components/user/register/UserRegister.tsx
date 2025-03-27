import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useTimer } from "@/hooks/useTimer";
import { useRouter } from "next/router";
import Stepper from "@/components/user/register/Stepper";
import {
  registerMaxSteps,
  registerSteps,
  userRegisterDefaultValues,
} from "@/utils/user/register";
import { useEffect, useState } from "react";
import { StepValueType, UserRegisterType } from "@/types/userRegister";
import { SubmitHandler, useForm } from "react-hook-form";

const UserRegister = () => {
  const { timer, setTimer } = useTimer();
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const router = useRouter();
  const [registerStepValues, setRegisterStepValues] = useState<StepValueType>({
    activeStep: 1,
    maxAllowedStep: 1,
  });

  const userRegisterForm = useForm<UserRegisterType>({
    mode: "onChange",
    defaultValues: userRegisterDefaultValues,
  });

  const { handleSubmit, setFocus } = userRegisterForm;

  const handleSendOTP = () => {};

  const handleVerifyOTP = () => {};

  const handleRegister: SubmitHandler<UserRegisterType> = (data) => {
    const { otp } = data;

    if (isEmailVerified && otp === null) {
      handleSendOTP();
      return;
    }

    if (registerStepValues.activeStep === 1) {
      handleVerifyOTP();
      return;
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (registerStepValues.activeStep === 1) {
      setFocus("email");
    } else {
      setFocus("firstName");
    }
  }, [registerStepValues.activeStep]);

  return (
    <div className="min-h-screen flex justify-center  flex-col p-4 sm:p-6 md:p-8 bg-user-gradient">
      <BackButton
        handleBack={handleBack}
        className={"text-black font-semibold bg-app-user-primary"}
      />

      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <section className="min-w-[90%] sm:min-w-[480px] flex flex-col items-center justify-center p-4 py-[40px] shadow-xl rounded-[20px] outline outline-[1.5px] bg-user-login-gradient">
          <img
            src={"/assets/user/user-logo.svg"}
            alt={"logo"}
            className={"h-8 w-[192px]"}
          />
          <div className="p-[24px] lg:p-[24px__16px]  rounded-[18px] w-full sm:max-w-[450px]">
            <div className="flex flex-col gap-2 md:gap-[10px]">
              <h1 className="text-[24px] md:text-[28px] font-[600] text-white">
                Create Your Library Account
              </h1>
              <p className="text-app-gray-100 text-[14px] leading-5">
                Please complete all fields and upload a valid university ID to
                gain access to the library
              </p>
            </div>

            <div className="flex w-full justify-center my-6">
              <Stepper
                maxStep={registerMaxSteps}
                stepData={registerSteps}
                stepValues={registerStepValues}
              />
            </div>

            <form
              onSubmit={handleSubmit(onRegister)}
              className="space-y-8 mt-8 md:mt-10"
            ></form>
          </div>

          <p className="text-white self-start px-4">
            Have an account already?
            <Link href={"/user/login"} className="text-app-user-primary ml-2">
              Login
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserRegister;
