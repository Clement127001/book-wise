import { logout } from "@/utils/common";
import { useRouter } from "next/router";
import { useState } from "react";

const useLogout = () => {
  const [logoutConfirmationModalOpened, setLogoutConfirmationModalOpened] =
    useState<boolean>(false);
  const router = useRouter();

  const handleOpenLogoutConfirmationModal = () => {
    setLogoutConfirmationModalOpened(true);
  };

  const handleCloseLogoutConfirmationModal = () => {
    setLogoutConfirmationModalOpened(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/?ua=false");
  };

  return {
    logoutConfirmationModalOpened,
    handleCloseLogoutConfirmationModal,
    handleOpenLogoutConfirmationModal,
    handleLogout,
  };
};

export default useLogout;
