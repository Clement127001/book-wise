import { loggedUserNavItems } from "@/utils/user/navbar";
import Link from "next/link";
import NavLinkButton from "./navbar/NavLinkButton";
import UserAvatar from "../common/UserAvatar";
import { useUserData } from "@/context/UserDataProvider";

const Navbar = () => {
  const { userData } = useUserData();

  const { firstname, lastname } = userData;
  const fullName = firstname + " " + lastname;

  return (
    <nav className="w-full flex justify-between">
      <Link href={"/user/home"}>
        <img src={"/assets/user/user-logo.svg"} alt="Home" />
      </Link>

      <div className="flex gap-10 items-center">
        {loggedUserNavItems.map((navItem) => (
          <NavLinkButton {...navItem} />
        ))}
        <div className="flex gap-3 items-center">
          <UserAvatar src={userData.avatarUrl ?? undefined} name={fullName} />
          <p className="text-white">{firstname}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
