import { Check } from "lucide-react";

const Step = ({
  stepTitle,
  isStepCompleted,
  containerClassName,
  stepValue,
  isAdmin,
}: {
  stepTitle: string;
  isStepCompleted: boolean;
  containerClassName: string;
  stepValue: number;
  isAdmin?: boolean;
}) => {
  let stepperClassName = "";
  let stepTextClassName = "";

  if (isStepCompleted) {
    if (isAdmin) {
      stepperClassName = "bg-app-admin-primary-700 text-white ";
      stepTextClassName = "text-black";
    } else {
      stepperClassName = "bg-app-user-primary text-black";
      stepTextClassName = "text-white";
    }

    stepperClassName +=
      "group-hover:scale-105 ease-linear transition-all border-0";
  } else {
    stepperClassName = "bg-transparent text-app-gray-200  cursor-not-allowed";
    stepTextClassName = "text-app-gray-200";
  }

  return (
    <div className={`flex gap-2 items-center group ${containerClassName}`}>
      <div
        className={` flex items-center justify-center border border-1 rounded-full w-[24px] h-[24px] cursor-pointer font-light border-app-gray-200  ${stepperClassName}`}
      >
        {isStepCompleted ? <Check strokeWidth={3} size={15} /> : stepValue}
      </div>

      <p className={`text-[13px] font-normal ${stepTextClassName}`}>
        {stepTitle}
      </p>
    </div>
  );
};

export default Step;
