export interface ErrorStatusInterface {
  message: string;
}

interface ToastMessageProps {
  title: string;
  description: string;
  duration: number;
}

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

export enum UserRoleEnum {
  ADMIN = "Admin",
  USER = "User",
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
