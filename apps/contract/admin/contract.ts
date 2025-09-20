import { initContract } from "@ts-rest/core";
import { z } from "Zod";
import { CreateUserSuccessSchema, UserBaseSchema } from "../user/schema";
import { verifyAdminRequestSchema } from "./schema";
import { SuccessSchema } from "../common";

const c = initContract();

export const adminContract = c.router(
  {
    createAdmin: {
      method: "POST",
      path: "/createAdmin",
      body: UserBaseSchema,
      responses: { 201: SuccessSchema },
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
