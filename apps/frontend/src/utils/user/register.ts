import { UserRegisterType } from "@/types/userRegister";
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
  avatarUrl:
    "https://bookwisemedia.s3.us-east-1.amazonaws.com/clement_18-1743069631056.webp",
  identityCardUrl: null,
  verificationId: null,
};
