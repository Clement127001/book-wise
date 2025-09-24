import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LucideProps } from "lucide-react";

const MenuLinkItems = ({
  path,
  label,
  Icon,
}: {
  path: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  const router = useRouter();
  const isActive = router.pathname.includes(path);

  return (
    <Link href={path} scroll>
      <div
        className={`flex p-3 hover:bg-app-gray-100/10 rounded-sm w-full items-center gap-4 text-md  ${
          isActive ? "text-black" : "text-white"
        }`}
      >
        <Icon size={18} />
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default MenuLinkItems;
