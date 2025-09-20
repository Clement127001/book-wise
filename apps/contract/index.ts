import { initContract } from "@ts-rest/core";
import { adminAuthContract } from "./adminAuth/contract";
import { userAuthContract } from "./userAuth/contract";
import { userContract } from "./user/contract";
import { uploadContract } from "./upload/contract";
import { accountContract } from "./account/contract";
import { genreContract } from "./genre/contract";
import { bookContract } from "./book/contract";
import { adminContract } from "./admin/contract";

const c = initContract();

export const contract = c.router({
  adminAuth: adminAuthContract,
  admin: adminContract,
  userAuth: userAuthContract,
  user: userContract,
  upload: uploadContract,
  account: accountContract,
  genre: genreContract,
  book: bookContract,
});
