import { z } from "zod";
import { BaseBookSchema, BookDetailsSchema } from "contract/book/schema";

export type BookFormType = Omit<z.infer<typeof BaseBookSchema>, "genreId"> & {
  genreId: { value: string; label: string } | null;
};

export type BookDetailsType = z.infer<typeof BookDetailsSchema>;
