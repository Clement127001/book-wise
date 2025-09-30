import { Fragment } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LogOut } from "lucide-react";
import SidebarLink from "@/components/admin/sidebar/SidebarLink";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GlitterButton from "@/components/common/glitterButtons/GlitterButtonUser";
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

        <div className="space-y-3">
          <GlitterButton
            aria-description="admin-account"
            className="p-1 py-1 rounded-full cursor-pointer flex items-centers"
            containerClassName="shadow-md max-w-full"
          >
            <div className="flex gap-2 items-center p-1">
              <UserAvatar src={avatarUrl} name={fullName} />
              <div className="z-50 flex gap-1 items-center max-w-[60%] overflow-hidden">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-start">
                      <p className="font-medium leading-5 truncate w-[80%]">
                        {fullName}
                      </p>
                      <p className="text-app-gray-300 text-[12px] truncate w-[80%]">
                        {email}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-app-user-primary">
                      Name : <span className="font-semibold">{fullName}</span>
                    </p>
                    <p>
                      Email :{" "}
                      <span className="text-sm font-semibold">{email}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </GlitterButton>

          <Button
            className="rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold w-full"
            onClick={handleOpenLogoutConfirmationModal}
          >
            Logout <LogOut strokeWidth={2.4} size={18} />
          </Button>
        </div>
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
