import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { LogOut } from "lucide-react";
import SidebarLink from "@/components/admin/SidebarLink";
import UserAvatar from "@/components/common/UserAvatar";
import { useUserData } from "@/context/UserDataProvider";
import { adminSidebarLinks } from "@/utils/admin/common";
import { getFullName, logout } from "@/utils/common";
import { useRouter } from "next/router";

const LogoutConfirmationModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const Sidebar = () => {
  const [logoutConfirmationModalOpened, setLogoutConfirmationModalOpened] =
    useState<boolean>(false);
  const router = useRouter();
  const { userData } = useUserData();
  const { firstname, lastname, avatarUrl, email } = userData;
  const fullName = getFullName(firstname, lastname);

  const handleCloseLogoutConfirmationModal = () => {
    setLogoutConfirmationModalOpened(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/?ua=false");
  };

  return (
    <>
      <section className="flex flex-col gap-4 justify-between p-4 h-screen">
        <section aria-description="admin sidebar" className="space-y-5">
          <div className="flex max-h-20 items-center gap-2 py-5 border-b-[1px] border-dashed border-app-gray-200">
            <img className="w-10" src="/assets/admin/logo.svg" />
            <h1 className="text-[24px] font-semibold text-app-admin-primary-700">
              BookWise
            </h1>
          </div>

          <nav className="space-y-2">
            {adminSidebarLinks.map((linkData) => (
              <Fragment key={linkData.label}>
                <SidebarLink {...linkData} />
              </Fragment>
            ))}
          </nav>
        </section>

        <section
          aria-description="admin-account"
          className="p-2 rounded-full border border-app-gray-200 shadow-sm  cursor-pointer flex gap-2 items-center"
        >
          <UserAvatar src={avatarUrl} name={fullName} />

          <div className="w-[140px] overflow-y-scroll text-nowrap">
            <h4 className="font-medium">{fullName}</h4>
            <p className="text-app-gray-300 text-[12px] text-ellipsis">
              {email}
            </p>
          </div>

          <LogOut
            size={32}
            className="text-red-500 p-2 hover:bg-app-gray-100 rounded-full"
            strokeWidth={2.4}
            onClick={() => {
              setLogoutConfirmationModalOpened(true);
            }}
          />
        </section>
      </section>

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

export default Sidebar;
