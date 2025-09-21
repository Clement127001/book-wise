import { initContract } from "@ts-rest/core";
import { CreateUserSuccessSchema, SuccessSchema } from "../common";
import { AdminBaseSchema, verifyAdminRequestSchema } from "./schema";

const c = initContract();

export const adminContract = c.router(
  {
    createAdmin: {
      method: "POST",
      path: "/createAdmin",
      body: AdminBaseSchema,
      responses: { 201: CreateUserSuccessSchema },
    },
    verifyAdmin: {
      method: "PATCH",
      path: "/verify",
      body: verifyAdminRequestSchema,
      responses: {
        200: SuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/admin",
  }
);
