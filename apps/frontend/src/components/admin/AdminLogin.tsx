import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { ChevronRight, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { CommonInput } from "@/components/form/CommonInput";
import { OTPInput } from "@/components/form/OTPInput";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import BackButton from "@/components/common/BackButton";
import { useApi } from "@/hooks/useApi";
import { useTimer } from "@/hooks/useTimer";
import { getQueryClient } from "@/utils/api";
import { validateEmail, validateOTP } from "@/utils/common";
import { defaultLoginFormValues } from "@/utils/admin/login";
import { LoginType } from "@/types/common";

const AdminLogin = () => {
  const router = useRouter();
  const { timer, setTimer } = useTimer();
  const [isEmailVerified, setEmailVerified] = useState<boolean>(false);
  const adminLoginForm = useForm<LoginType>({
    defaultValues: defaultLoginFormValues,
  });
  const { makeApiCall } = useApi();
  const { handleSubmit, setFocus, getValues, watch } = adminLoginForm;

  const email = watch("email");
  const otp = watch("otp");

  const isEmailValid = validateEmail(email);
  const isOTPValid = validateOTP(otp);

  const handleBack = () => {
    router.push("/");
  };

  const handleSendOTP = () => {
    const email = getValues("email");

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().adminAuth.generateAdminLoginOTP.mutation({
          body: {
            email: email.toLowerCase(),
          },
        });
      },
      successMsgProps: {
        title: "OTP Sent",
        description: "OTP sent to your email",
        duration: 2000,
      },
      onSuccessFn: () => {
        setEmailVerified(true);
        setTimer(60);
        setFocus("otp");
      },
    });
  };

  const handleVerifyOTP = () => {
    const email = getValues("email");
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
        return await getQueryClient().adminAuth.verifyAdminLoginOTP.mutation({
          body: {
            email: email.toLowerCase(),
            otp,
          },
        });
      },
      successMsgProps: {
        title: "Login successful",
        description: "Logged In successfully",
        duration: 2000,
      },

      onSuccessFn: (res) => {
        if (res.status === 201 && res.body) {
          const responseBody = res.body as { token: string };
          Cookies.set("userToken", responseBody.token, {
            expires: 7,
          });
          router.push("/admin/dashboard");
        }
      },
    });
  };

  const onLogin: SubmitHandler<LoginType> = () => {
    if (!isEmailVerified) {
      handleSendOTP();
      return;
    }

    handleVerifyOTP();
  };

  const handleResendOTP = () => {
    if (timer > 0) return;
    handleSendOTP();
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className="min-h-screen flex justify-center  flex-col p-4 sm:p-6 md:p-8">
      <BackButton handleBack={handleBack} />
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <section className="min-w-[90%] sm:min-w-[480px] flex flex-col items-center justify-center p-4 pt-12 shadow-xl rounded-xl outline outline-[1.5px] outline-app-gray-100">
          <img
            src={"/assets/admin/logo.svg"}
            alt={"logo"}
            className={"h-12 w-[192px]"}
          />
          <div className="bg-white shadow-freelancer p-[52px_16px] md:p-[64px_24px] lg:p-[32px]  rounded-[18px] w-full sm:max-w-[450px]">
            <div className="flex flex-col items-center  gap-2 md:gap-[10px]">
              <h1 className="text-[32px] md:text-[40px] font-[600]">Login</h1>
            </div>
            <form
              onSubmit={handleSubmit(onLogin)}
              className="space-y-8 mt-8 md:mt-10"
            >
              <CommonInput
                hForm={adminLoginForm}
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
              />
              {!isEmailVerified && (
                <AdminPrimaryButton
                  className="w-full my-4"
                  type="submit"
                  disabled={!isEmailValid}
                >
                  Send OTP
                  <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
                </AdminPrimaryButton>
              )}

              {isEmailVerified && (
                <div className="mt-4">
                  <OTPInput
                    label={"Enter OTP"}
                    name="otp"
                    hForm={adminLoginForm}
                    registerOptions={{
                      required: "OTP is required",
                      validate: (value) =>
                        (typeof value === "string" && validateOTP(value)) ||
                        "Please enter a valid OTP",
                    }}
                  />

                  <AdminPrimaryButton
                    className={`w-full mt-8`}
                    type="submit"
                    disabled={!isOTPValid}
                  >
                    Verify OTP
                    <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
                  </AdminPrimaryButton>

                  <div className="flex gap-3 font-normal text-[14px] mt-3">
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
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
