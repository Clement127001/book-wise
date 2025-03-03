import { z } from "zod";
import { LoginOTPRequetSchema, SuccessSchema } from "../common";

export const UserEmailVerificationRequestSchema = LoginOTPRequetSchema;

export const UserEmailVerfiedSuccessSchema = SuccessSchema.extend({
  verificationId: z.string(),
});
