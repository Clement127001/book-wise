import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(10, { message: "User name should have 10 character atleast" })
    .max(40, {
      message:
        "User name is too long. User name should have 40 character atmost",
    }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  identityCardUrl: z.string().url({ message: "Please attach your ID card" }),
  avatarUrl: z.string().url().optional(),
});
