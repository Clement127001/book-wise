import { z } from "zod";

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const LoginOTPRequetSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
});

export const VerifyEmailOTPRequestSchema = LoginOTPRequetSchema.extend({
  otp: z.string().length(6, { message: "Please Provide a valid OTP" }),
});

export const LoginOTPVerifiedSuccessSchema = SuccessSchema.extend({
  token: z.string(),
});

export const emailVerificationRequestSchema = LoginOTPRequetSchema;

export const emailVerficationSuccessSchema = SuccessSchema.extend({
  verificationId: z.string(),
});

export const PaginatedRequestSchema = z.object({
  pageNumber: z.string().transform(Number),
  pageSize: z.string().transform(Number),
});

export const BaseResponseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
