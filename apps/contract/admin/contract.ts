import { initContract } from "@ts-rest/core";
import {
  CreateUserSuccessSchema,
  UserBaseSchema,
  SuccessSchema,
} from "../common";
import { verifyAdminRequestSchema } from "./schema";

const c = initContract();

export const adminContract = c.router(
  {
    createAdmin: {
      method: "POST",
      path: "/createAdmin",
      body: UserBaseSchema,
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
