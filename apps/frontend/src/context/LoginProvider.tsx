import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { LoginContextInterface } from "@/types/common";
import { loginPages, loginRestrictedPages } from "@/utils/common";

const LoginContext = createContext<LoginContextInterface>({
  isLoggedIn: false,
  refreshLoginState: () => {},
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = router.asPath;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLogInChecked, setIsLogInChecked] = useState<boolean>(false);

  const refreshLoginState = () => {
    const cookie = Cookies.get("userToken");
    const isValidCookie = cookie !== undefined && cookie.length !== 0;
    setIsLoggedIn(isValidCookie);
    setIsLogInChecked(true);
  };

  useEffect(() => {
    refreshLoginState();
  }, [path]);

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (!token && loginRestrictedPages.includes(path)) {
      setIsLogInChecked(false);
      router.push("/?ua=true");
    }
  }, [router, path, isLoggedIn]);

  if (loginPages.includes(path)) {
    return <>{children}</>;
  }

  if (!isLogInChecked) {
    return <div className="w-[100vw] h-[100vh] bg-app-gray-700"></div>;
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, refreshLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export const UseLogin = () => useContext(LoginContext);
