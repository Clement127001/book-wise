import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { ChevronRight, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { CommonInput } from "@/components/form/CommonInput";
import { LoginOTPInput } from "@/components/form/LoginOTPInput";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { useTimer } from "@/hooks/useTimer";
import { getQueryClient } from "@/utils/api";
import { validateEmail, validateLoginOTP } from "@/utils/common";

export interface AdminLoginForm {
  email: string;
  otp: string | null;
}

export const defaultLoginFormValues: AdminLoginForm = {
  email: "",
  otp: null,
};

const AdminLogin = () => {
  const router = useRouter();
  const { timer, setTimer } = useTimer();
  const [isEmailVerified, setEmailVerified] = useState<boolean>(false);
  const adminLoginForm = useForm<AdminLoginForm>({
    defaultValues: defaultLoginFormValues,
  });
  const { makeApiCall } = useApi();
  const { handleSubmit, setFocus, getValues, watch } = adminLoginForm;

  const email = watch("email");
  const otp = watch("otp");

  const isEmailValid = validateEmail(email);
  const isOTPValid = validateLoginOTP(otp);

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
          Cookies.set("userToken", res.body.token, {
            expires: 7,
          });
          router.push("/admin/dashboard");
        }
      },
    });
  };

  const onLogin: SubmitHandler<AdminLoginForm> = () => {
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
    <div className="min-h-screen flex flex-col justify-center items-center">
      <section className="min-w-[90%] sm:min-w-[500px] flex flex-col items-center justify-center p-4 pt-12 shadow-xl rounded-xl">
        <img
          src={"/assets/admin/admin-logo.svg"}
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
              placeholder="e.g: johndoe12@gmail.com"
              registerOptions={{
                required: "Email is required",
                validate: (value) =>
                  (typeof value === "string" && validateEmail(value)) ||
                  "Please enter a valid email address",
              }}
            />
            {!isEmailVerified && (
              <Button
                className="w-full my-4 bg-app-admin-primary-700 hover:bg-app-admin-primary-800
                outline outline-2 outline-app-primary-700 border-[0.75px] border-app-primary-500 group rounded-[10px] text-[16px] text-white font-[500] min-h-[48px] disabled:border-0 disabled:shadow-none disabled:cursor-not-allowed"
                type="submit"
                disabled={!isEmailValid}
              >
                Send OTP
                <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
              </Button>
            )}

            {isEmailVerified && (
              <div className="mt-4">
                <LoginOTPInput
                  label={"Enter OTP"}
                  name="otp"
                  hForm={adminLoginForm}
                  registerOptions={{
                    required: "OTP is required",
                    validate: (value) =>
                      (typeof value === "string" && validateLoginOTP(value)) ||
                      "Please enter a valid OTP",
                  }}
                />

                <Button
                  className={`w-full mt-8 bg-app-primary-700 hover:bg-[#207F75] outline outline-2 outline-app-primary-700 border-[0.75px] cursor-pointer  border-app-primary-500 group rounded-[10px] text-[16px] font-[500] min-h-[44px] ${
                    !isOTPValid
                      ? "cursor-not-allowed border-0"
                      : "cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!isOTPValid}
                >
                  Verify OTP
                  <ChevronRight className="group-hover:scale-[1.35] group-hover:translate-x-2 ease-linear transition-[300ms]" />
                </Button>

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
  );
};

export default AdminLogin;
