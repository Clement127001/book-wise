import { initContract } from "@ts-rest/core";
import { CreateUserSchema } from "@/user/schema";
import { SuccessSchema } from "@/common";

const c = initContract();

export const userContract = c.router(
  {
    createUser: {
      method: "POST",
      path: "/createUser",
      body: CreateUserSchema,
      responses: {
        200: SuccessSchema,
      },
    },
  },
  { pathPrefix: "/user" }
);
