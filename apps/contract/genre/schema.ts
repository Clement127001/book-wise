import { z } from "zod";

export const GetAllGenresSchema = z.object({
  genres: z
    .object({
      title: z.string(),
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .array(),
});
