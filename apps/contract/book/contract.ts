import { initContract } from "@ts-rest/core";
import { BaseBookSchema, BookQuerySchema } from "./schema";
import { SuccessSchema } from "../common";
import { createPaginatedResponseSchema } from "../utils";

const c = initContract();

export const bookContract = c.router(
  {
    createBook: {
      method: "POST",
      path: "/create",
      body: BaseBookSchema,
      responses: {
        201: SuccessSchema,
      },
    },
    editBook: {
      method: "PATCH",
      path: "/edit",
      query: BookQuerySchema,
      body: BaseBookSchema,
      responses: { 200: SuccessSchema },
    },
    getBookDetail: {
      method: "GET",
      path: "/details",
      query: BookQuerySchema,
      responses: {
        200: BaseBookSchema,
      },
    },
    getAllBooks: {
      method: "GET",
      path: "/allBooks",
      responses: { 200: createPaginatedResponseSchema(BaseBookSchema) },
    },
    deleteBook: {
      method: "DELETE",
      path: "/delete",
      query: BookQuerySchema,
      responses: { 200: SuccessSchema },
    },
  },
  { pathPrefix: "/book" }
);
