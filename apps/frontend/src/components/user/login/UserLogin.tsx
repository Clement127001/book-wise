import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BackButton from "@/components/common/BackButton";
import Login from "@/components/common/Login";
import { useApi } from "@/hooks/useApi";
import { useTimer } from "@/hooks/useTimer";
import { LoginType } from "@/types/common";
import { defaultLoginFormValues } from "@/utils/admin/login";
import { getQueryClient } from "@/utils/api";

const UserLogin = () => {
  const router = useRouter();
  const { timer, setTimer } = useTimer();

  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const userLoginForm = useForm<LoginType>({
    defaultValues: defaultLoginFormValues,
    mode: "onSubmit",
  });

  const { makeApiCall } = useApi();
  const { handleSubmit, setFocus, getValues } = userLoginForm;

  const handleSendOTP = () => {
    const email = getValues("email");

    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().userAuth.generateUserLoginOTP.mutation({
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
        setIsEmailVerified(true);
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
        return await getQueryClient().userAuth.verifyUserLoginOTP.mutation({
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
          router.push("/user/home/");
        }
      },
    });
  };

  const onLogin = () => {
    if (!isEmailVerified) {
      handleSendOTP();
      return;
    }

    handleVerifyOTP();
  };

  return (
    <div className="min-h-screen flex justify-center  flex-col p-4 sm:p-6 md:p-8 bg-user-gradient">
      <BackButton
        url="/"
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
                Welcome Back to the BookWise
              </h1>
              <p className="text-app-gray-100 text-[14px] leading-5">
                Access the vast collection of resources, and stay updated
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onLogin)}
              className="space-y-8 mt-8 md:mt-10"
            >
              <Login
                loginForm={userLoginForm}
                isEmailVerified={isEmailVerified}
                timer={timer}
                handleSendOTP={handleSendOTP}
              />
            </form>
          </div>

          <p className="text-white self-start px-4">
            Don't have account ?
            <Link
              href={"/user/register"}
              className="text-app-user-primary ml-2"
            >
              register
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserLogin;
