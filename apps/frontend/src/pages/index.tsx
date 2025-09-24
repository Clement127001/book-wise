import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";
import LoggedInUserHomePageAction from "@/components/HomePage/LoggedInUserHomePageAction";
import PublicUserHomePageAction from "@/components/HomePage/PublicUserHomePageAction";
import { UseLogin } from "@/context/LoginProvider";

export default function Home() {
  const { isLoggedIn } = UseLogin();

  const router = useRouter();
  const query = router.query;
  const path = router.pathname;

  const isUnauthorised = String(query.ua ?? "");

  useEffect(() => {
    if (!router.isReady || !isUnauthorised) return;

    if (isUnauthorised === "true") {
      toast.warning("Unauthorised", {
        description: "Please login to view the page",
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
    router.replace(path, undefined, { shallow: true });
  }, [router.isReady, isUnauthorised, query]);

  return (
    <div className="h-screen bg-user-gradient flex justify-center">
      <div className="flex flex-col justify-center items-center text-center max-w-[50%] gap-12">
        <div className="flex h-20 gap-4 w-fit">
          <img className="w-20" src="assets/admin/logo.svg" />
          <h1 className="text-[60px] font-semibold text-white">Book Wise</h1>
        </div>
        <p className="text-app-gray-200 text-lg  tracking-normal max-w-[40vw]">
          Book Wise is your smart companion for discovering, organizing, and
          tracking books effortlessly. With intuitive features and a sleek
          interface, finding and keeping track of your favorite books has never
          been simpler. Elevate your reading experience with Book Wise—where
          every book finds its place! 📚✨
        </p>
        {isLoggedIn ? (
          <LoggedInUserHomePageAction />
        ) : (
          <PublicUserHomePageAction />
        )}
      </div>
    </div>
  );
}
