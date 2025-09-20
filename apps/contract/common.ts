import { z } from "zod";
import { UserAccountStatus, UserRoleEnum } from "./enum";

export const BaseResponseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const EmailSchema = z
  .string()
  .email({ message: "Please provide a valid email address" });

export const LoginOTPRequetSchema = z.object({
  email: EmailSchema,
});

export const LoginOTPVerifiedSuccessSchema = SuccessSchema.extend({
  token: z.string(),
});

export const CreateUserSuccessSchema = LoginOTPVerifiedSuccessSchema;

export const emailVerificationRequestSchema = LoginOTPRequetSchema;

export const emailVerficationSuccessSchema = SuccessSchema.extend({
  verificationId: z.string(),
});

export const VerifyEmailOTPRequestSchema = z.object({
  email: EmailSchema,
  otp: z.string().min(6, { message: "OTP should have 6 characters atleast" }),
});

export const PaginatedRequestSchema = z.object({
  pageNumber: z.string().transform(Number),
  pageSize: z.string().transform(Number),
});

const accountBaseSchema = z.object({
  firstname: z
    .string()
    .min(4, { message: "User first name should have 4 character atleast" })
    .max(20, {
      message:
        "User last name is too long. User first name should have 20 character atmost",
    }),
  lastname: z
    .string()
    .min(1, { message: "User last name should have 1 character atleast" })
    .max(20, {
      message:
        "User last name is too long. User name should have 20 character atmost",
    }),
  email: EmailSchema,
  avatarUrl: z.string().url().optional(),
});

export const accountSchema = accountBaseSchema.extend({
  id: z.string(),
  role: z.nativeEnum(UserRoleEnum),
});

export const UserBaseSchema = accountBaseSchema.extend({
  identityCardUrl: z.string().url({ message: "Please attach your ID card" }),
  verficationId: z.string(),
});

export const UserDetailsSchema = UserBaseSchema.omit({
  verficationId: true,
})
  .extend({ verificationStatus: z.nativeEnum(UserAccountStatus) })
  .merge(BaseResponseSchema);
