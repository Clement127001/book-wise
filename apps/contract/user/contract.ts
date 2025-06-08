import { initContract } from "@ts-rest/core";
import {
  UserBaseSchema,
  CreateUserSuccessSchema,
  UserDetailsSchema,
  GetAllUserDetailsQuerySchema,
  GetAllUserSchema,
  ChangeStatusRequestSchema,
  GetBorrowedBooks,
  GetAllAccountQuerySchema,
  GetAllAccountRequestSchema,
} from "../user/schema";
import { PaginatedRequestSchema, SuccessSchema } from "../common";

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
    getBorrowedBooks: {
      method: "GET",
      path: "/getBorrowedBooks",
      query: PaginatedRequestSchema,
      responses: { 200: GetBorrowedBooks },
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
      query: GetAllAccountQuerySchema,
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
