import { z } from "zod";

export const UploadResultSchema = z.object({
  url: z.string(),
  key: z.string(),
  type: z.string(),
  isUploaded: z.boolean(),
  message: z.string(),
});

export const UploadMediaResultSchema = z.object({
  data: UploadResultSchema,
});
