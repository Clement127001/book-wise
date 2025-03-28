import { createContext, ReactNode, useContext } from "react";
import { UserDetailsInterface } from "@/types/common";
import { UseLogin } from "@/context/LoginProvider";
import { UserRoleEnum } from "contract/enum";
import { useRouter } from "next/router";
import { loginPages } from "@/utils/common";

const UserContext = createContext<UserDetailsInterface>(
  {} as UserDetailsInterface
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  //TODO: fetch user details and remove this dummy data
  const dummyData = { id: "1", name: "clement", role: UserRoleEnum.ADMIN };

  return (
    <UserContext.Provider value={{ userData: dummyData }}>
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

export const UseUserData = () => useContext(UserContext);
