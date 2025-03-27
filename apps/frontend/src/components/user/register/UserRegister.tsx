import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import Stepper from "@/components/user/register/Stepper";
import RegisterEmailStep from "@/components/user/register/RegisterEmailStep";
import ImageUpload from "@/components/ImageUpload";
import { useTimer } from "@/hooks/useTimer";
import { useApi } from "@/hooks/useApi";
import { StepValueType, UserRegisterType } from "@/types/userRegister";
import {
  registerMaxSteps,
  registerSteps,
  userRegisterDefaultValues,
} from "@/utils/user/register";
import { getQueryClient } from "@/utils/api";

const UserRegister = () => {
  const { timer, setTimer } = useTimer();
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const router = useRouter();
  const [registerStepValues, setRegisterStepValues] = useState<StepValueType>({
    activeStep: 1,
    maxAllowedStep: 1,
  });
  const { makeApiCall } = useApi();

  const userRegisterForm = useForm<UserRegisterType>({
    mode: "onChange",
    defaultValues: userRegisterDefaultValues,
  });

  const { handleSubmit, getValues, setFocus, setValue } = userRegisterForm;

  const handleSendOTP = () => {
    const email = getValues("email").toLowerCase();

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().userAuth.generateUserEmailVerficationOTP.mutation(
          {
            body: { email },
          }
        );
      },
      successMsgProps: {
        title: "OTP Sent",
        description: "OTP sent to your email",
        duration: 2000,
      },
      onSuccessFn: () => {
        setIsEmailVerified(true);
        setTimer(60);
        setFocus("otp");
      },
    });
  };

  const handleVerifyOTP = () => {
    const email = getValues("email").toLowerCase();
    const otp = getValues("otp");

    if (otp === null) {
      toast.warning("Invalid OTP", {
        description: "Please Enter a valid otp",
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

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().userAuth.verfiyUserEmailVerificationOTP.mutation(
          {
            body: {
              email,
              otp,
            },
          }
        );
      },
      successMsgProps: {
        title: "Email verified",
        description: "Email verified successfully",
        duration: 2000,
      },
      onSuccessFn: (res) => {
        if (res.status == 201 && res.body.verificationId) {
          setValue("verificationId", res.body.verificationId);
          setRegisterStepValues({
            activeStep: 2,
            maxAllowedStep: 2,
          });
        }
      },
    });
  };

  const onRegister: SubmitHandler<UserRegisterType> = (data) => {
    const { otp } = data;

    if (!isEmailVerified && otp === null) {
      handleSendOTP();
      return;
    }

    if (registerStepValues.activeStep === 1) {
      handleVerifyOTP();
      return;
    }

    //TODO: add register user
  };

  const handleBack = () => {
    router.back();
  };

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

            <div className="flex w-full justify-center m-[24px__0px__20px__0px]">
              <Stepper
                maxStep={registerMaxSteps}
                stepData={registerSteps}
                stepValues={registerStepValues}
              />
            </div>
            <FormProvider {...userRegisterForm}>
              <form onSubmit={handleSubmit(onRegister)} className="space-y-8">
                {registerStepValues.activeStep === 1 && (
                  <RegisterEmailStep
                    userRegisterForm={userRegisterForm}
                    isEmailVerified={isEmailVerified}
                    handleSendOTP={handleSendOTP}
                    timer={timer}
                  />
                )}

                {registerStepValues.activeStep == 2 && (
                  <ImageUpload name="avatarUrl" label="Avatar Image" required />
                )}
              </form>
            </FormProvider>
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
