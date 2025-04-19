import { createContext, ReactNode, useContext } from "react";
import { UseLogin } from "@/context/LoginProvider";
import { useRouter } from "next/router";
import { loginPages } from "@/utils/common";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";
import { accountSchema } from "contract/account/schema";
import { z } from "zod";

type UserDetailsType = {
  userData: z.infer<typeof accountSchema>;
};

const UserContext = createContext<UserDetailsType>({} as UserDetailsType);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } =
    getQueryClient().account.getAccountDetail.useQuery([
      contract.account.getAccountDetail.path,
    ]);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>error occurred</div>;

  if (!data) return <div>no user found</div>;

  const userData = data.body;

  return (
    <UserContext.Provider value={{ userData: userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = UseLogin();

  const router = useRouter();
  const path = router.asPath;

  if (!isLoggedIn || loginPages.includes(path)) return <>{children}</>;

  return <UserProvider>{children}</UserProvider>;
};

export const useUserData = () => useContext(UserContext);
