import { UserBaseSchema } from "../user/schema";

export const CreateAdminSchema = UserBaseSchema.omit({
  verficationId: true,
  identityCardUrl: true,
});
