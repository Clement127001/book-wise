import { initContract } from "@ts-rest/core";
import { adminAuthContract } from "@/auth/adminAuth/contract";
import { userAuthContract } from "@/auth/userAuth/contract";

const c = initContract();

export const authContract = c.router(
  {
    adminAuth: adminAuthContract,
    userAuth: userAuthContract,
  },
  { pathPrefix: "/auth" }
);
