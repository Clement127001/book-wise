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
      path: "/generateAdminLoginOTP",
      body: LoginOTPRequetSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifyAdminLoginOTP: {
      method: "POST",
      path: "/verifyAdminLoginOTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: LoginOTPVerifiedSuccessSchema,
      },
    },
    generateAdminEmailVerficationOTP: {
      method: "POST",
      path: "/generateAdminEmailVerficationOTP",
      body: emailVerificationRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verfiyAdminEmailVerificationOTP: {
      method: "POST",
      path: "/verifyAdminEmailVerficationOTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        201: emailVerficationSuccessSchema,
      },
    },
  },
  { pathPrefix: "/adminAuth" }
);
