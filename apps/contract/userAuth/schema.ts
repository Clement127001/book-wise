import { z } from "zod";
import { SuccessSchema } from "../common";

export const UserEmailVerfiedSuccessSchema = SuccessSchema.extend({
  verificationId: z.string(),
});
