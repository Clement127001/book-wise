import { z } from "zod";
import { EmailSchema } from "../common";

export const verifyAdminRequestSchema = z.object({
  email: EmailSchema,
});
