import { initContract } from "@ts-rest/core";
import {
  LoginOTPRequetSchema,
  LoginOTPVerifiedSuccessSchema,
  PaginatedRequestSchema,
  SuccessSchema,
  VerifyEmailOTPRequestSchema,
} from "../common";
import { verifyAdminRequestSchema } from "../admin/schema";
import { GetAllAdminSchema } from "./schema";

const c = initContract();

export const superadminContract = c.router(
  {
    generateSuperadminLoginOTP: {
      method: "POST",
      path: "/generate-superadmin-login-OTP",
      body: LoginOTPRequetSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    verifySuperadminLoginOTP: {
      method: "POST",
      path: "/verify-superadmin-login-OTP",
      body: VerifyEmailOTPRequestSchema,
      responses: {
        200: LoginOTPVerifiedSuccessSchema,
      },
    },
    listAdmin: {
      method: "GET",
      path: "/list-admin",
      query: PaginatedRequestSchema,
      responses: { 200: GetAllAdminSchema },
    },
    verifyAdmin: {
      method: "PATCH",
      path: "/verify",
      body: verifyAdminRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/superadmin",
  }
);
