import Link from "next/link";
import { LucideProps } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

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
        className={`flex p-2 hover:bg-gray-100  rounded-sm w-full items-center gap-2 text-md  ${
          isActive ? "text-black" : "text-white hover:text-black"
        }`}
      >
        <Icon size={18} />
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default MenuLinkItems;
