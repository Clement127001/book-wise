import { CreateUserSchema } from "../user/schema";

export const CreateAdminSchema = CreateUserSchema.omit({
  verficationId: true,
  identityCardUrl: true,
});
