import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserData } from "@/context/UserDataProvider";
import { UserRoleEnum } from "contract/enum";
import { UseLogin } from "@/context/LoginProvider";

const PageRestriction = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { userData } = useUserData();
  const path = router.asPath;

  useEffect(() => {
    if (!router.isReady) return;

    if (path.startsWith("/admin") && userData.role === UserRoleEnum.USER) {
      router.push("/");
      return;
    } else if (
      path.startsWith("/user") &&
      userData.role === UserRoleEnum.ADMIN
    ) {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

const PageRestrictionProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = UseLogin();

  if (!isLoggedIn) {
    return children;
  }

  return <PageRestriction>{children}</PageRestriction>;
};

export default PageRestrictionProvider;
