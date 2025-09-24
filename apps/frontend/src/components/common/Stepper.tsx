import { Fragment } from "react";
import Step from "@/components/common/Step";
import { StepDataType } from "@/types/user/register";
import { StepValueType } from "@/types/common";

const Stepper = ({
  stepData,
  stepValues,
  maxStep,
  isAdmin,
}: {
  stepData: StepDataType[];
  stepValues: StepValueType;
  maxStep: number;
  isAdmin?: boolean;
}) => {
  return (
    <div className="hidden sm:flex gap-4 mt-4 w-fit  py-[8px] items-center">
      {stepData.map((step, index) => {
        const { title } = step;
        const currentStepValue = index + 1;
        const { maxAllowedStep } = stepValues;
        const isStepCompleted = currentStepValue <= maxAllowedStep;

        return (
          <Fragment key={title}>
            <Step
              stepTitle={title}
              isStepCompleted={isStepCompleted}
              containerClassName={`${index + 1 == maxStep ? "mr-3" : "mr-0"}`}
              stepValue={index + 1}
              isAdmin={isAdmin}
            />
            {index == 0 && (
              <div className="min-w-12 h-[2px] bg-app-gray-100 rounded-full"></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
