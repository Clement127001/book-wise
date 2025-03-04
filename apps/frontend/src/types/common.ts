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
