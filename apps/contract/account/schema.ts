import { z } from "zod";
import { UserRoleEnum } from "../enum";

export const accountSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  id: z.string(),
  role: z.nativeEnum(UserRoleEnum),
  email: z.string(),
  avatarUrl: z.string().nullable(),
});
