import { Fragment } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LogOut } from "lucide-react";
import SidebarLink from "@/components/admin/sidebar/SidebarLink";
import UserAvatar from "@/components/common/UserAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserData } from "@/context/UserDataProvider";
import useLogout from "@/hooks/useLogout";
import { adminSidebarLinks } from "@/utils/admin/common";
import { getFullName } from "@/utils/common";

const LogoutConfirmationModal = dynamic(
  import("@/components/common/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const Sidebar = () => {
  const { userData } = useUserData();
  const {
    logoutConfirmationModalOpened,
    handleCloseLogoutConfirmationModal,
    handleOpenLogoutConfirmationModal,
    handleLogout,
  } = useLogout();
  const { firstname, lastname, avatarUrl, email } = userData;
  const fullName = getFullName(firstname, lastname);

  return (
    <>
      <section className="flex flex-col gap-4 justify-between p-4 h-screen">
        <section aria-description="admin sidebar" className="space-y-5">
          <Link
            href={"/admin/dashboard"}
            className="flex max-h-20 items-center gap-2 py-5 border-b-[1px] border-dashed border-app-gray-200 cursor-pointer"
          >
            <img className="w-10" src="/assets/admin/logo.svg" />
            <h1 className="text-[24px] font-semibold text-app-admin-primary-700">
              BookWise
            </h1>
          </Link>

          <nav className="space-y-3">
            {adminSidebarLinks.map((linkData) => (
              <Fragment key={linkData.label}>
                <SidebarLink {...linkData} />
              </Fragment>
            ))}
          </nav>
        </section>

        <section
          aria-description="admin-account"
          className="p-2 py-1.5 rounded-full  border-[1.5px] border-app-gray-200 shadow-sm  cursor-pointer flex gap-2 items-center"
        >
          <UserAvatar src={avatarUrl} name={fullName} />
          <div className="w-[115px]">
            <p className="font-medium truncate">{fullName}</p>
            <p className="text-app-gray-300 text-[12px] truncate">{email}</p>
          </div>

          <div>
            <Tooltip>
              <TooltipTrigger>
                <LogOut
                  size={32}
                  className="text-red-500 p-2 hover:bg-app-gray-100 rounded-full"
                  strokeWidth={2.4}
                  onClick={handleOpenLogoutConfirmationModal}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
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
