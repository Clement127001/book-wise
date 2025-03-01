import { z } from "zod";

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const LoginOTPSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
});

export const VerifyLoginOTPSchema = LoginOTPSchema.extend({
  otp: z.string().length(6, { message: "Please Provide a valid OTP" }),
});

export const OTPVerifiedReponseSchema = z.object({
  token: z.string(),
});
