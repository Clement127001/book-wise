import { z } from "zod";

export const verifyAdminRequestSchema = z.object({
  email: z.string(),
});
