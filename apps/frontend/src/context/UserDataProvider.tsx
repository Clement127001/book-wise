import { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import { UseLogin } from "@/context/LoginProvider";
import { loginPages, loginRestrictedPages } from "@/utils/common";
import { getQueryClient } from "@/utils/api";
import { contract } from "contract";
import { UserDetailsType } from "@/types/common";

const UserContext = createContext<UserDetailsType>({} as UserDetailsType);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } =
    getQueryClient().account.getAccountDetail.useQuery([
      contract.account.getAccountDetail.path,
    ]);

  console.log(data);

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
  const path = router.pathname;

  if (!isLoggedIn && loginRestrictedPages.includes(path)) return <></>;
  if (!isLoggedIn || loginPages.includes(path)) return <>{children}</>;

  return <UserProvider>{children}</UserProvider>;
};

export const useUserData = () => useContext(UserContext);
