import { z } from "zod";
import { UploadMediaResultSchema } from "contract/upload/schema";
import { UserRoleEnum } from "contract/enum";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { GroupBase, StylesConfig } from "react-select";
import { accountSchema } from "contract/common";
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

export interface CustomSelectOption<T = string> {
  value: T;
  label: T;
  image?: string;
}

export interface AsyncSearchSelectFieldProps<
  T extends FieldValues = FieldValues
> {
  hForm: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  isDisabled?: boolean;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder?: string;
  getOptions: (v: string) => Promise<CustomSelectOption[]>;
  instanceId: string;
  showDropdownOnModal?: boolean;
  dropDownIcon?: React.ReactNode;
  customStyles?: StylesConfig<
    CustomSelectOption,
    boolean,
    GroupBase<CustomSelectOption>
  >;
  isMulti?: boolean;
  showAsterisk?: boolean;
  defaultMenuIsOpen?: boolean;
  controlShouldRenderValue?: boolean;
  backspaceRemovesValue?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  controlledMenuIsOpen?: boolean;
  selectedLength?: number;
}
