import { z } from "zod";

export const BaseBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, { message: "Title should have 4 character at least" })
    .max(40, { message: "Title should have 40 character at most" }),
  author: z
    .string()
    .trim()
    .min(4, { message: "Author name should have 4 character at least" })
    .max(40, { message: "Author name  should have 40 character at most" }),
  genreId: z.string(),
  total: z
    .number()
    .min(1, { message: "Books count should be more than 0" })
    .max(100, { message: "Books count should be less than 100" }),
  imageUrl: z.string(),
  summary: z
    .string()
    .trim()
    .min(10, { message: "Summary should have atleast 10 character atleast" })
    .max(2000, {
      message: "Summary should have atleast 2000 character atmost",
    }),
});

export const BookDetailsSchema = BaseBookSchema.omit({ genreId: true }).extend({
  available: z.number(),
  genre: z.string(),
});

export const BookQuerySchema = z.object({ id: z.string() });
