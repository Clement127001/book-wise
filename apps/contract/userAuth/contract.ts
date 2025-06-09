import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPRequetSchema,
  VerifyEmailOTPRequestSchema,
  LoginOTPVerifiedSuccessSchema,
} from "../common";
import {
  UserEmailVERIFIEDSuccessSchema,
  UserEmailVerificationRequestSchema,
} from "../userAuth/schema";

const c = initContract();

export const userAuthContract = c.router(
  {
    generateUserEmailVerficationOTP: {
      method: "POST",
      path: "/generateUserEmailVerficationOTP",
      body: UserEmailVerificationRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verfiyUserEmailVerificationOTP: {
      method: "POST",
      path: "/verifyUserEmailVerficationOTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: UserEmailVERIFIEDSuccessSchema,
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
