import { initContract } from "@ts-rest/core";
import { adminAuthContract } from "./adminAuth/contract";
import { userAuthContract } from "./userAuth/contract";
import { userContract } from "./user/contract";
import { uploadContract } from "./upload/contract";

const c = initContract();

export const contract = c.router({
  adminAuth: adminAuthContract,
  userAuth: userAuthContract,
  user: userContract,
  upload: uploadContract,
});
