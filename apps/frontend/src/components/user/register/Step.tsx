import { Check } from "lucide-react";

const Step = ({
  stepTitle,
  isStepCompleted,
  containerClassName,
  stepValue,
}: {
  stepTitle: string;
  isStepCompleted: boolean;
  containerClassName: string;
  stepValue: number;
}) => {
  return (
    <div className={`flex gap-2 items-center group ${containerClassName}`}>
      <div
        className={` flex items-center justify-center border border-1 rounded-full w-[24px] h-[24px] cursor-pointer  font-light border-app-gray-200  ${
          isStepCompleted
            ? "bg-app-user-primary text-black group-hover:scale-105 ease-linear transition-all border-0"
            : "bg-transparent text-app-gray-200  cursor-not-allowed"
        }`}
      >
        {isStepCompleted ? <Check strokeWidth={3} size={15} /> : stepValue}
      </div>

      <p
        className={`text-[13px] font-normal ${
          isStepCompleted ? " text-white" : "text-app-gray-200"
        }`}
      >
        {stepTitle}
      </p>
    </div>
  );
};

export default Step;
