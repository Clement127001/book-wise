import { initContract } from "@ts-rest/core";
import {
  BaseBookSchema,
  BookDetailsSchema,
  BookQuerySchema,
  GetAllBooksQuerySchema,
} from "./schema";
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
    getBookDetails: {
      method: "GET",
      path: "/details",
      query: BookQuerySchema,
      responses: {
        200: BookDetailsSchema,
      },
    },
    getAllBooks: {
      method: "GET",
      path: "/allBooks",
      query: GetAllBooksQuerySchema,
      responses: { 200: createPaginatedResponseSchema(BookDetailsSchema) },
    },
    deleteBook: {
      method: "DELETE",
      path: "/delete",
      body: BookQuerySchema,
      responses: { 200: SuccessSchema },
    },
  },
  { pathPrefix: "/book" }
);
