import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPRequetSchema,
  LoginOTPVerifiedSuccessSchema,
  VerifyEmailOTPRequestSchema,
} from "contract/common";

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
  },
  { pathPrefix: "/adminAuth" }
);
