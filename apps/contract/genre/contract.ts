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
        title: z
          .string()
          .trim()
          .min(4, { message: "Genre title should have 4 character alteast" }),
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
