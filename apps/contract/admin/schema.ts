import { z } from "zod";
import { EmailSchema, accountBaseSchema } from "../common";

export const verifyAdminRequestSchema = z.object({
  email: EmailSchema,
});

export const AdminBaseSchema = accountBaseSchema.extend({
  verficationId: z.string(),
});
