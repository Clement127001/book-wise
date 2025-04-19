import { LucideProps } from "lucide-react";

export type StepDataType = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
};

export type StepValueType = {
  activeStep: number;
  maxAllowedStep: number;
};

export type UserRegisterType = {
  email: string;
  otp: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  identityCardUrl: string | null;
  verificationId: string | null;
};
