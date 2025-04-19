import { z } from "zod";
import { accountSchema } from "contract/account/schema";
import { UploadMediaResultSchema } from "contract/upload/schema";
import { UserRoleEnum } from "contract/enum";
export interface ErrorStatusInterface {
  message: string;
}

interface ToastMessageProps {
  title: string;
  description: string;
  duration: number;
}

export interface PageLoaderProps {
  isPageLoaderVisible: boolean;
}

export type UserDetailsType = {
  userData: z.infer<typeof accountSchema>;
};

export interface MakeApiCallFunctionProps<T> {
  fetcherFn: () => Promise<T>;
  onSuccessFn?: (response: T) => void;
  onFailureFn?: (error: unknown) => void;
  successMsgProps?: ToastMessageProps;
  failureMsgProps?: ToastMessageProps;
  showLoader?: boolean;
  showFailureMsg?: boolean;
  finallyFn?: () => void;
}

export enum TrueFalseEnum {
  TRUE = "true",
  FALSE = "false",
}

export interface PageLoaderContextInterface {
  isPageLoaderVisible: boolean;
  hidePageLoader: () => void;
  showPageLoader: () => void;
}

export interface LoginContextInterface {
  isLoggedIn: boolean;
  refreshLoginState: () => void;
}

interface UserDataInterface {
  id: string;
  name: string;
  role: UserRoleEnum;
}

export interface UserDetailsInterface {
  userData: UserDataInterface;
}

export interface LoginType {
  email: string;
  otp: string | null;
}

export type UploadMediaResponseType = z.infer<typeof UploadMediaResultSchema>;
