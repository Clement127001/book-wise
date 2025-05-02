import { initContract } from "@ts-rest/core";
import {
  UserBaseSchema,
  CreateUserSuccessSchema,
  UserDetailsSchema,
  GetAllUserDetailsQuerySchema,
  GetAllUserSchema,
  GetAllAccountRequestSchema,
  ChangeStatusRequestSchema,
} from "../user/schema";
import { SuccessSchema } from "../common";

const c = initContract();

export const userContract = c.router(
  {
    createUser: {
      method: "POST",
      path: "/createUser",
      body: UserBaseSchema,
      responses: {
        201: CreateUserSuccessSchema,
      },
    },
    getUserDetails: {
      method: "GET",
      path: "/userDetail",
      responses: {
        200: UserDetailsSchema,
      },
    },
    updateUserDetails: {
      method: "PATCH",
      path: "/updateUser",
      body: UserBaseSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    getAllAccountRequest: {
      method: "GET",
      path: "/allAccountRequest",
      query: GetAllUserDetailsQuerySchema,
      responses: {
        200: GetAllAccountRequestSchema,
      },
    },
    getAllUsers: {
      method: "GET",
      path: "allUser",
      query: GetAllUserDetailsQuerySchema,
      responses: { 200: GetAllUserSchema },
    },
    changeAccountStatus: {
      method: "PATCH",
      path: "/changeAccountStatus",
      body: ChangeStatusRequestSchema,
      responses: { 200: SuccessSchema },
    },
  },
  { pathPrefix: "/user" }
);
