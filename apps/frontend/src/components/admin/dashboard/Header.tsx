import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = ({
  title,
  redirectLink,
}: {
  title: string;
  redirectLink: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <h4 className="font-semibold capitalize text[20px]">{title}</h4>
      <Link href={redirectLink}>
        <Button className="bg-app-admin-bg/80 hover:bg-app-admin-bg  text-app-admin-primary-700 p-3">
          View All
        </Button>
      </Link>
    </div>
  );
};

export default Header;
