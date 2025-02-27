import { initContract } from "@ts-rest/core";
import {
  LoginOTPSchema,
  OTPVerifiedReponseSchema,
  VerifyLoginOTPSchema,
} from "../../auth/common";
import { SuccessSchema } from "../../common";

const c = initContract();

export const userAuthContract = c.router(
  {
    // generateUserLoginOTP: {
    //   method: "POST",
    //   path: "/generateUserLoginOTP",
    //   body: LoginOTPSchema,
    //   responses: {
    //     200: SuccessSchema,
    //   },
    // },
    // verifyUserLoginOTP: {
    //   method: "POST",
    //   path: "/verifyUserLoginOTP",
    //   body: VerifyLoginOTPSchema,
    //   responses: {
    //     200: OTPVerifiedReponseSchema,
    //   },
    // },
    generateUserEmailVerficationOTP: {
      method: "GET",
      path: "/generateUserEmailVerficationOTP",
      // body: LoginOTPSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    // verfiyUserEmailVerificationOTP: {
    //   method: "POST",
    //   path: "/generateUserEmailVerficationOTP",
    //   body: VerifyLoginOTPSchema,
    //   responses: {
    //     200: OTPVerifiedReponseSchema,
    //   },
    // },
  },
  {
    pathPrefix: "/user",
  }
);
