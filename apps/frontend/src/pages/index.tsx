import LoggedInUserHomePage from "@/components/HomePage/LoggedInUserHomePage";
import PublicUserHomePage from "@/components/HomePage/PublicUserHomePage";
import { UserRoleEnum } from "@/types/common";

export default function Home() {
  const isLoggedIn = true;
  const role = UserRoleEnum.USER;

  return (
    <div className="grid grid-cols-2 w-full gap-5 h-screen px-40 py-32 bg-gradient-to-br from-app-admin-primary-800  via-black via-30% to-black">
      <img
        src={"assets/home/home-page-cover.webp"}
        alt="explore book wise"
        className="rounded-xl object-cover h-[70vh] shadow-md shadow-[#EED1AC]"
      />
      <>
        {isLoggedIn ? (
          <LoggedInUserHomePage role={role} />
        ) : (
          <PublicUserHomePage />
        )}
      </>
    </div>
  );
}
