import LoggedInUserHomePageAction from "@/components/HomePage/LoggedInUserHomePageAction";
import PublicUserHomePageAction from "@/components/HomePage/PublicUserHomePageAction";
import { UserRoleEnum } from "@/types/common";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const isLoggedIn = false;
  const role = UserRoleEnum.ADMIN;

  const router = useRouter();
  const query = router.query;

  const isUnauthorised = String(query.ua ?? "");

  useEffect(() => {
    if (!router.isReady || !isUnauthorised) return;

    if (isUnauthorised === "true") {
      toast.warning("Unauthorised", {
        description: "Login is required",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
    } else {
      toast.success("Logged out", {
        description: "Logged out successfully",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
    }
    delete query.ua;
    router.replace("/");
  }, [router.isReady, toast, isUnauthorised, query, router]);

  return (
    <div className="grid grid-cols-2 w-full gap-5 h-screen px-40 py-32 bg-gradient-to-br from-app-admin-primary-800  via-black via-30% to-black">
      <img
        src={"assets/home/home-page-cover.webp"}
        alt="explore book wise"
        className="rounded-xl object-cover h-[70vh] shadow-md shadow-[#EED1AC]"
      />
      <div className="flex flex-col self-center gap-4">
        <div className="flex max-h-20 items-center gap-4">
          <img className="w-20" src="assets/admin/admin-logo.svg" />
          <h1 className="text-[52px] font-semibold text-white">BookWise</h1>
        </div>
        <p className="text-app-gray-200 text-md tracking-normal leading-6">
          Book Wise is your smart companion for discovering, organizing, and
          tracking books effortlessly. Whether you're an avid reader or just
          getting started, it helps you explore recommendations and manage your
          personal library with ease. With intuitive features and a sleek
          interface, finding and keeping track of your favorite books has never
          been simpler. Elevate your reading experience with Book Wise—where
          every book finds its place! 📚✨
        </p>
        {isLoggedIn ? (
          <LoggedInUserHomePageAction role={role} />
        ) : (
          <PublicUserHomePageAction />
        )}
      </div>
    </div>
  );
}
