import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { UploadMediaResultSchema } from "./schema";

const c = initContract();

export const uploadContract = c.router(
  {
    uploadMedia: {
      method: "POST",
      path: "/media",
      body: z.object({
        files: z.custom<File[]>(),
      }),
      responses: {
        201: UploadMediaResultSchema,
      },
    },
  },
  { pathPrefix: "/upload" }
);
