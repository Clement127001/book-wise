import { accountBaseSchema } from "../common";
import { createPaginatedResponseSchema } from "../utils";

export const GetAllAdminSchema =
  createPaginatedResponseSchema(accountBaseSchema);
