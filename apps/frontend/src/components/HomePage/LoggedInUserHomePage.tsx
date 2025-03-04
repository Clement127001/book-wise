import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoleEnum } from "@/types/common";

const LoggedInUserHomePage = ({ role }: { role: UserRoleEnum }) => {
  return (
    <div className="flex flex-col self-center gap-4">
      <div className="flex max-h-20 items-center gap-4">
        <img className="w-20" src="assets/admin/admin-logo.svg" />
        <h1 className="text-[52px] font-semibold">BookWise</h1>
      </div>
      <p className="text-app-gray-600 text-md tracking-normal leading-6">
        Book Wise is your smart companion for discovering, organizing, and
        tracking books effortlessly. Whether you're an avid reader or just
        getting started, it helps you explore recommendations and manage your
        personal library with ease. With intuitive features and a sleek
        interface, finding and keeping track of your favorite books has never
        been simpler. Elevate your reading experience with Book Wise—where every
        book finds its place! 📚✨
      </p>

      <Button className="w-fit px-4 py-6 bg-app-admin-primary-700 hover:bg-app-admin-primary-800 tracking-wider">
        {role === UserRoleEnum.ADMIN ? (
          <Link href={"/admin/dashboard"}>Explore Dashboard</Link>
        ) : (
          <Link href={"/user/home"}>Explore Books</Link>
        )}
      </Button>
    </div>
  );
};

export default LoggedInUserHomePage;
