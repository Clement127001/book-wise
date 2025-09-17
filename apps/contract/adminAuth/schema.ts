import { z } from "zod";
import { UserBaseSchema } from "../user/schema";

export const CreateAdminSchema = UserBaseSchema.omit({
  verficationId: true,
  identityCardUrl: true,
});

export const verifyAdminRequestSchema = z.object({
  email: z.string(),
});
