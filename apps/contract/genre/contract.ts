import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { SuccessSchema } from "../common";
import { GetAllGenresSchema } from "./schema";

const c = initContract();

export const genreContract = c.router(
  {
    createGenre: {
      method: "POST",
      path: "/create",
      body: z.object({
        genre: z.string(),
      }),
      responses: {
        200: SuccessSchema,
      },
    },
    getAllGenres: {
      method: "GET",
      path: "/allGenres",
      responses: {
        200: GetAllGenresSchema,
      },
    },
  },
  { pathPrefix: "/genre" }
);
