import { UserRegisterType } from "@/types/user/register";
import { User, Mail } from "lucide-react";
export const registerSteps = [
  {
    icon: Mail,
    title: "Email Verification",
  },
  { icon: User, title: "User Details" },
];

export const registerMaxSteps = 2;

export const userRegisterDefaultValues: UserRegisterType = {
  email: "",
  otp: null,
  firstName: "",
  lastName: "",
  avatarUrl: null,
  identityCardUrl: null,
  verificationId: null,
};
