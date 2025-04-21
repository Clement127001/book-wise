import { ChevronDown, ChevronUp } from "lucide-react";

const Stats = ({
  title,
  count,
  changeInCount,
}: {
  title: string;
  count: number;
  changeInCount: number;
}) => {
  const isIncreased = changeInCount > 0;
  const showChange = changeInCount != 0;

  return (
    <div className="bg-app-admin-bg border-app-admin-primary-100/20 p-4 rounded-[10px] w-full shadow-sm space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="font-medium text-md text-app-gray-800 capitalize">
          {title}
        </h3>
        {showChange && (
          <span
            className={`flex font-semibold items-center ${
              isIncreased
                ? "text-app-accent-success-500"
                : "text-app-accent-error-500"
            }`}
          >
            {isIncreased ? <ChevronUp /> : <ChevronDown />}
            {Math.abs(changeInCount)}
          </span>
        )}
      </div>

      <p className="text-[28px] font-medium">{count}</p>
    </div>
  );
};

export default Stats;
