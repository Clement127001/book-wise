import { initContract } from "@ts-rest/core";
import { CreateUserSchema, CreateUserSuccessSchema } from "../user/schema";

const c = initContract();

export const userContract = c.router(
  {
    createUser: {
      method: "POST",
      path: "/createUser",
      body: CreateUserSchema,
      responses: {
        201: CreateUserSuccessSchema,
      },
    },
  },
  { pathPrefix: "/user" }
);
