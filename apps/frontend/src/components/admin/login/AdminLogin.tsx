import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import BackButton from "@/components/common/BackButton";
import { useApi } from "@/hooks/useApi";
import { useTimer } from "@/hooks/useTimer";
import { getQueryClient } from "@/utils/api";
import { defaultLoginFormValues } from "@/utils/admin/login";
import { LoginType } from "@/types/common";
import Link from "next/link";
import Login from "@/components/common/Login";

const AdminLogin = () => {
  const router = useRouter();
  const { timer, setTimer } = useTimer();
  const [isEmailVerified, setEmailVerified] = useState<boolean>(false);
  const adminLoginForm = useForm<LoginType>({
    defaultValues: defaultLoginFormValues,
    mode: "onSubmit",
  });
  const { makeApiCall } = useApi();
  const { handleSubmit, setFocus, getValues } = adminLoginForm;

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
      <BackButton url="/" />
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
              <Login
                loginForm={adminLoginForm}
                isEmailVerified={isEmailVerified}
                handleSendOTP={handleResendOTP}
                timer={timer}
              />
            </form>
          </div>
          <p className="text-gray-600 font-[450] text-left mb-4">
            Don't have account?
            <Link
              href={"/admin/register"}
              className="text-app-admin-primary-700 ml-2"
            >
              register
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
