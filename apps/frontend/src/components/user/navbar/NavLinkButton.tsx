import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconType } from "@/types/common";

const NavLinkButton = ({
  label,
  path,
  Icon,
}: {
  label: string;
  path: string;
  Icon?: IconType;
}) => {
  const router = useRouter();
  const isActive = router.pathname.includes(path);

  return (
    <Link href={path} className="cursor-pointer">
      <div className="relative">
        <Button
          className={`cursor-pointer text-[16px] font-normal gap-3 p-0 min-h-[40px]
        transition-colors duration-300 bg-transparent w-fit shadow-none  hover:bg-transparent hover:cursor-pointer  ${
          isActive
            ? " text-app-user-primary shadow-freelancer"
            : "text-white hover:text-app-user-primary"
        }`}
        >
          {Icon && <Icon strokeWidth={2.5} />}
          <p className="font-medium capitalize">{label}</p>
        </Button>

        {isActive && (
          <div className="bg-app-user-primary  h-1 rounded-t-sm block absolute w-full bottom-[-10px]" />
        )}
      </div>
    </Link>
  );
};

export default NavLinkButton;
