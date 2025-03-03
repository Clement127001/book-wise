import { z } from "zod";

export const CreateUserSchema = z.object({
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
  email: z.string().email({ message: "Please provide a valid email address" }),
  identityCardUrl: z.string().url({ message: "Please attach your ID card" }),
  avatarUrl: z.string().url().optional(),
  verficationId: z.string(),
});
