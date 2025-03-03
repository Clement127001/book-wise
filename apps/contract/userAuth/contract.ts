import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPSchema,
  VerifyLoginOTPSchema,
  LoginOTPVerifiedSchema,
} from "../common";
import { UserEmailVerfiedSuccessSchema } from "./schema";

const c = initContract();

export const userAuthContract = c.router(
  {
    generateUserLoginOTP: {
      method: "POST",
      path: "/generateUserLoginOTP",
      body: LoginOTPSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifyUserLoginOTP: {
      method: "POST",
      path: "/verifyUserLoginOTP",
      body: VerifyLoginOTPSchema,
      responses: {
        200: LoginOTPVerifiedSchema,
      },
    },
    generateUserEmailVerficationOTP: {
      method: "POST",
      path: "/generateUserEmailVerficationOTP",
      body: LoginOTPSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verfiyUserEmailVerificationOTP: {
      method: "POST",
      path: "/generateUserEmailVerficationOTP",
      body: VerifyLoginOTPSchema,
      responses: {
        201: UserEmailVerfiedSuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/userAuth",
  }
);
