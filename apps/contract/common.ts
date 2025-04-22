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

export const PaginatedRequestSchema = z.object({
  searchText: z.string(),
  locations: z.string().transform((val) => val.split(",")),
  roles: z.string().transform((val) => val.split("|")), // using | instead of , since some of the values themselves contains ,
  pageNumber: z.string().transform(Number),
  pageSize: z.string().transform(Number),
});
