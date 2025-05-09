import { initContract } from "@ts-rest/core";
import { accountSchema } from "./schema";

const c = initContract();

export const accountContract = c.router(
  {
    getAccountDetail: {
      method: "GET",
      path: "/details",
      responses: {
        200: accountSchema,
      },
    },
  },
  { pathPrefix: "/account" }
);
