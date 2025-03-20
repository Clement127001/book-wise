import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

const AdminPrimaryButton = ({
  children,
  className,
  type,
  disabled,
}: {
  children: ReactNode;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}) => {
  return (
    <Button
      className={`bg-app-admin-primary-700 hover:bg-app-admin-primary-800
                outline outline-2 outline-app-primary-700 border-[0.75px] border-app-primary-500 group rounded-[10px] text-[16px] text-white font-[500] min-h-[48px] disabled:border-0 disabled:shadow-none disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

export default AdminPrimaryButton;
