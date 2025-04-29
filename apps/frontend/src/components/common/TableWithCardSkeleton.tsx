import { Fragment } from "react";

const TableWithCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full hidden md:flex flex-col gap-2">
        <div className="w-full h-10 bg-app-gray-200 rounded-[10px] mb-4"></div>
        <div className="w-full h-10 bg-gray-200 rounded-[8px] mb-2"></div>
        <div className="w-full h-10 bg-gray-200 rounded-[8px] mb-2"></div>
        <div className="w-full h-10 bg-gray-200 rounded-[8px] mb-2"></div>
        <div className="w-full h-10 bg-gray-200 rounded-[8px] mb-2"></div>
        <div className="w-full h-10 bg-gray-200 rounded-[8px] mb-2"></div>
      </div>
      <div className="grid md:hidden  max-[550px]:grid-cols-1 grid-cols-2 gap-4 w-full">
        {Array(6)
          .fill(0)
          .map((bill) => (
            <Fragment key={bill}>
              <div className="w-full min-h-[200px] rounded-[12px] bg-gray-200 p-3">
                <div className="flex">
                  <div className="w-full flex flex-col gap-2">
                    <div className="h-8 w-[30%] bg-app-gray-200 rounded-sm" />
                    <div className="h-6 w-[50%] bg-app-gray-200 rounded-sm" />
                    <div />
                  </div>
                  <div className="h-6 w-[40%] bg-app-gray-200 rounded-sm" />
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default TableWithCardSkeleton;
