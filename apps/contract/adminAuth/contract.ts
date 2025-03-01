import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPSchema,
  OTPVerifiedReponseSchema,
  VerifyLoginOTPSchema,
} from "@/common";

const c = initContract();

export const adminAuthContract = c.router(
  {
    generateAdminLoginOTP: {
      method: "POST",
      path: "/generateAdminLoginOTP",
      body: LoginOTPSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifyAdminLoginOTP: {
      method: "POST",
      path: "/verifyAdminLoginOTP",
      body: VerifyLoginOTPSchema,
      responses: {
        200: OTPVerifiedReponseSchema,
      },
    },
  },
  { pathPrefix: "/admin" }
);
