import { initContract } from "@ts-rest/core";
import { adminAuthContract } from "./adminAuth/contract";
import { userAuthContract } from "./userAuth/contract";

const c = initContract();

export const authContract = c.router(
  {
    adminAuth: adminAuthContract,
    userAuth: userAuthContract,
  },
  { pathPrefix: "/auth" }
);
