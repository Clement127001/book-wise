import { z } from "zod";

export const GetAllGenresSchema = z.object({
  genres: z.string().array(),
});
