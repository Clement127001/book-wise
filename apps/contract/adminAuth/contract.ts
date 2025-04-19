import { initContract } from "@ts-rest/core";
import {
  SuccessSchema,
  LoginOTPRequetSchema,
  LoginOTPVerifiedSuccessSchema,
  VerifyEmailOTPRequestSchema,
} from "../common";
import { CreateAdminSchema } from "./schema";

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
    createAdmin: {
      method: "POST",
      path: "/create",
      body: CreateAdminSchema,
      responses: {
        200: SuccessSchema,
      },
    },
  },
  { pathPrefix: "/adminAuth" }
);
