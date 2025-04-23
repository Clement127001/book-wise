import { z } from "zod";

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) {
  return z.object({
    currentPageNumber: z.number(),
    currentPageSize: z.number(),
    totalItems: z.number(),
    totalPages: z.number(),
    results: z.array(itemSchema),
  });
}
