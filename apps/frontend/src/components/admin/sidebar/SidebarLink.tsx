import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarLink = ({
  Icon,
  label,
  redirectLink,
}: {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  redirectLink: string;
}) => {
  const router = useRouter();
  const isActive = router.asPath.includes(redirectLink);

  return (
    <Link
      href={redirectLink}
      className={`p-3 flex items-center gap-4  ${
        isActive
          ? "hover:bg-app-admin-primary-700 bg-app-admin-primary-700"
          : "hover:bg-app-gray-100"
      } rounded-lg group`}
    >
      <Icon
        className={` ${
          isActive ? "text-white" : "text-app-gray-300 group-hover:text-black"
        }`}
        strokeWidth={1.7}
      />
      <p
        className={`capitalize font-medium ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default SidebarLink;
