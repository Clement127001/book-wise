import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPRequetSchema,
  VerifyEmailOTPRequestSchema,
  LoginOTPVerifiedSuccessSchema,
} from "../common";
import {
  emailVerficationSuccessSchema,
  emailVerificationRequestSchema,
} from "../common";

const c = initContract();

export const userAuthContract = c.router(
  {
    generateUserEmailVerficationOTP: {
      method: "POST",
      path: "/generateUserEmailVerficationOTP",
      body: emailVerificationRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verfiyUserEmailVerificationOTP: {
      method: "POST",
      path: "/verifyUserEmailVerficationOTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: emailVerficationSuccessSchema,
      },
    },
    generateUserLoginOTP: {
      method: "POST",
      path: "/generateUserLoginOTP",
      body: LoginOTPRequetSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifyUserLoginOTP: {
      method: "POST",
      path: "/verifyUserLoginOTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        200: LoginOTPVerifiedSuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/userAuth",
  }
);
