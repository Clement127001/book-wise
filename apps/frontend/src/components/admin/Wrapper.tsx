import { useUserData } from "@/context/UserDataProvider";
import { getFullName } from "@/utils/common";
import { ReactNode } from "react";

const Wrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { userData } = useUserData();
  const { firstname, lastname } = userData;

  const fullName = getFullName(firstname, lastname);

  return (
    <div
      className={`rounded-l-[14px] h-full shadow-md p-6 border-[1.5px] border-app-gray-100 ${className}`}
    >
      <div className="w-full flex justify-between">
        <div>
          <h1 className="text-app-black-300 font-semibold text-xl leading-5">
            Welcome, {fullName}
          </h1>
          <p className="text-sm text-app-gray-500 leading-loose">
            Monitor all of your projects and tasks here
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Wrapper;
