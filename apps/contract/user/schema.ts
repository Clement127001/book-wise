import { z } from "zod";
import {
  BaseResponseSchema,
  LoginOTPVerifiedSuccessSchema,
  PaginatedRequestSchema,
} from "../common";
import { createPaginatedResponseSchema } from "../utils";
import { BorrowedBookStatusEnum, UserAccountStatus } from "../enum";

export const UserBaseSchema = z.object({
  firstname: z
    .string()
    .min(4, { message: "User first name should have 4 character atleast" })
    .max(20, {
      message:
        "User last name is too long. User first name should have 20 character atmost",
    }),
  lastname: z
    .string()
    .min(1, { message: "User last name should have 1 character atleast" })
    .max(20, {
      message:
        "User last name is too long. User name should have 20 character atmost",
    }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  identityCardUrl: z.string().url({ message: "Please attach your ID card" }),
  avatarUrl: z.string().url().optional(),
  verficationId: z.string(),
});

export const CreateUserSuccessSchema = LoginOTPVerifiedSuccessSchema;

export const UserDetailsSchema = UserBaseSchema.omit({
  verficationId: true,
})
  .extend({ verificationStatus: z.nativeEnum(UserAccountStatus) })
  .merge(BaseResponseSchema);

export const GetAllAccountQuerySchema = PaginatedRequestSchema.extend({
  searchText: z.string().trim(),
  sortByCreatedTime: z.string(),
});

export const GetAllUserDetailsQuerySchema = PaginatedRequestSchema.extend({
  searchText: z.string().trim(),
  sortByAlphabeticOrder: z.string(),
});

const GetAllUsersBaseSchema = UserDetailsSchema.omit({
  verificationStatus: true,
});

export const GetAllAccountRequestSchema = createPaginatedResponseSchema(
  GetAllUsersBaseSchema
);

export const GetAllUserSchema = createPaginatedResponseSchema(
  GetAllUsersBaseSchema.extend({
    borrowedBooksCount: z.number(),
  })
);

export const GetBorrowedBooks = createPaginatedResponseSchema(
  z.object({
    id: z.string(),
    imageUrl: z.string(),
    title: z.string(),
    genre: z.string(),
    borrowedDate: z.date(),
    status: z.nativeEnum(BorrowedBookStatusEnum),
  })
);

export const ChangeStatusRequestSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(UserAccountStatus),
});
