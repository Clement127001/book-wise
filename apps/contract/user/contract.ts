import { z } from "zod";
import { initContract } from "@ts-rest/core";
import {
  GetAllUserDetailsQuerySchema,
  GetAllUserSchema,
  ChangeStatusRequestSchema,
  GetBorrowedBooks,
  GetAllAccountQuerySchema,
  GetAllAccountRequestSchema,
  UserBaseSchema,
  UserDetailsSchema,
} from "../user/schema";
import {
  PaginatedRequestSchema,
  SuccessSchema,
  CreateUserSuccessSchema,
} from "../common";

const c = initContract();

export const userContract = c.router(
  {
    createUser: {
      method: "POST",
      path: "/create-user",
      body: UserBaseSchema,
      responses: {
        201: CreateUserSuccessSchema,
      },
    },
    getUserDetails: {
      method: "GET",
      path: "/user-detail",
      responses: {
        200: UserDetailsSchema,
      },
    },
    getBorrowedBooks: {
      method: "GET",
      path: "/get-borrowe-books",
      query: PaginatedRequestSchema,
      responses: { 200: GetBorrowedBooks },
    },
    updateUserDetails: {
      method: "PATCH",
      path: "/update-user",
      body: UserBaseSchema,
      responses: {
        200: SuccessSchema,
      },
    },
    getAllAccountRequest: {
      method: "GET",
      path: "/all-account-request",
      query: GetAllAccountQuerySchema,
      responses: {
        200: GetAllAccountRequestSchema,
      },
    },
    getAllUsers: {
      method: "GET",
      path: "/all-users",
      query: GetAllUserDetailsQuerySchema,
      responses: { 200: GetAllUserSchema },
    },
    changeAccountStatus: {
      method: "PATCH",
      path: "/change-account-status",
      body: ChangeStatusRequestSchema,
      responses: { 200: SuccessSchema },
    },
    deleteUser: {
      method: "PATCH",
      path: "/delete",
      body: z.object({ id: z.string() }),
      responses: { 200: SuccessSchema },
    },
  },
  { pathPrefix: "/user" }
);
