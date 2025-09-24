import { z } from "zod";
import {
  accountBaseSchema,
  BaseResponseSchema,
  PaginatedRequestSchema,
} from "../common";
import { createPaginatedResponseSchema } from "../utils";
import { BorrowedBookStatusEnum, UserAccountStatus } from "../enum";

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

export const GetAllUserDetailsQuerySchema = PaginatedRequestSchema.extend({
  searchText: z.string().trim(),
  sortByAlphabeticOrder: z.string(),
});

export const GetAllAccountQuerySchema = PaginatedRequestSchema.extend({
  searchText: z.string().trim(),
  sortByCreatedTime: z.string(),
});

export const UserBaseSchema = accountBaseSchema.extend({
  identityCardUrl: z.string().url({ message: "Please attach your ID card" }),
  verficationId: z.string(),
});

export const UserDetailsSchema = UserBaseSchema.omit({
  verficationId: true,
})
  .extend({ verificationStatus: z.nativeEnum(UserAccountStatus) })
  .merge(BaseResponseSchema);

const GetAllUsersBaseSchema = UserDetailsSchema.omit({
  verificationStatus: true,
});

export const GetAllAccountRequestSchema = createPaginatedResponseSchema(
  GetAllUsersBaseSchema
);

export const GetAllUserSchema = createPaginatedResponseSchema(
  GetAllUsersBaseSchema.extend({
    borrowedBooksCount: z.number(),
    canDeleteByAdmin: z.boolean(),
  })
);

export const ChangeStatusRequestSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(UserAccountStatus),
});
