import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPRequetSchema,
  LoginOTPVerifiedSuccessSchema,
  VerifyEmailOTPRequestSchema,
  emailVerficationSuccessSchema,
  emailVerificationRequestSchema,
} from "../common";

const c = initContract();

export const adminAuthContract = c.router(
  {
    generateAdminLoginOTP: {
      method: "POST",
      path: "/generate-admin-login-OTP",
      body: LoginOTPRequetSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifyAdminLoginOTP: {
      method: "POST",
      path: "/verify-admin-login-OTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: LoginOTPVerifiedSuccessSchema,
      },
    },
    generateAdminEmailVerficationOTP: {
      method: "POST",
      path: "/generate-admin-email-verfication-OTP",
      body: emailVerificationRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verfiyAdminEmailVerificationOTP: {
      method: "POST",
      path: "/verify-admin-email-verfication-OTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: emailVerficationSuccessSchema,
      },
    },
  },
  { pathPrefix: "/admin-auth" }
);
