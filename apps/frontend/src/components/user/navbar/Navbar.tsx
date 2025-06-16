import { Fragment, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LogOut } from "lucide-react";
import NavLinkButton from "@/components/user/navbar/NavLinkButton";
import UserAvatar from "@/components/common/UserAvatar";
import MenuLinkItems from "@/components/user/navbar/MenuLinkItems";
import { useUserData } from "@/context/UserDataProvider";
import useLogout from "@/hooks/useLogout";
import { loggedUserNavItems, ProfileMenuItems } from "@/utils/user/navbar";

const LogoutConfirmationModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const Navbar = () => {
  const { userData } = useUserData();
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  const {
    logoutConfirmationModalOpened,
    handleCloseLogoutConfirmationModal,
    handleOpenLogoutConfirmationModal,
    handleLogout,
  } = useLogout();

  const { firstname, lastname } = userData;
  const fullName = firstname + " " + lastname;

  const handleToggleUserProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  return (
    <>
      <nav className="w-full flex justify-between">
        <Link href={"/user/home"}>
          <img src={"/assets/user/user-logo.svg"} alt="Home" />
        </Link>

        <div className="flex gap-10 items-center">
          {loggedUserNavItems.map((navItem) => (
            <NavLinkButton {...navItem} />
          ))}
          <div className="relative">
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={handleToggleUserProfileDropdown}
            >
              <UserAvatar
                src={userData.avatarUrl ?? undefined}
                name={fullName}
              />
              <p className="text-white">{firstname}</p>
            </div>

            {showProfileDropdown && (
              <div className="absolute  flex flex-col gap-2 bg-app-gray-800 min-w-[200px]  rounded-[10px] top-[74px] p-3 right-0">
                {ProfileMenuItems.map((menuItem) => (
                  <Fragment key={menuItem.label}>
                    <MenuLinkItems {...menuItem} />
                  </Fragment>
                ))}
                <div
                  className="flex p-3 text-red-500 hover:bg-app-gray-100/10 rounded-sm w-full items-center gap-4 text-md cursor-pointer"
                  onClick={handleOpenLogoutConfirmationModal}
                >
                  <LogOut size={18} />
                  <p>Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {logoutConfirmationModalOpened && (
        <LogoutConfirmationModal
          opened={logoutConfirmationModalOpened}
          onClose={handleCloseLogoutConfirmationModal}
          title="Log Out"
          description="Are you sure you want to log out? You will need to sign in again to access your account."
          confirmText="Yes, Logout"
          onClickConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
