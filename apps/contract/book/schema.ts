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
  total: z.number(),
  imageUrl: z.string(),
  summary: z
    .string()
    .trim()
    .min(10, { message: "Summary should have at least 10 character at least" })
    .max(2000, {
      message: "Summary should have at least 2000 character at most",
    }),
});

export const BookDetailsSchema = BaseBookSchema.omit({ genreId: true }).extend({
  id: z.string(),
  available: z.number(),
  genre: z.string(),
  canBorrowBook: z.boolean().optional(),
  canDeleteBook: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BookQuerySchema = z.object({ id: z.string() });
