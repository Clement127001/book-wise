import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPRequetSchema,
  VerifyEmailOTPRequestSchema,
  LoginOTPVerifiedSuccessSchema,
  emailVerficationSuccessSchema,
  emailVerificationRequestSchema,
} from "../common";

const c = initContract();

export const userAuthContract = c.router(
  {
    generateUserEmailVerficationOTP: {
      method: "POST",
      path: "/generate-user-email-verfication-OTP",
      body: emailVerificationRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verfiyUserEmailVerificationOTP: {
      method: "POST",
      path: "/verify-user-email-verfication-OTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: emailVerficationSuccessSchema,
      },
    },
    generateUserLoginOTP: {
      method: "POST",
      path: "/generate-user-login-OTP",
      body: LoginOTPRequetSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifyUserLoginOTP: {
      method: "POST",
      path: "/verify-user-login-OTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        200: LoginOTPVerifiedSuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/user-auth",
  }
);
