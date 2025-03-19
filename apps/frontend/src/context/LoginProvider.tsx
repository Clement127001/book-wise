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
import { loginRestrictedPages, validateToken } from "@/utils/common";

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
    const token = Cookies.get("userToken");
    const isValidToken = validateToken(token);

    setIsLoggedIn(isValidToken);
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
