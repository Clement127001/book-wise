import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export interface CommonInputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  hForm: UseFormReturn<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  inputClassName?: string;
  showError?: boolean;
  readOnly?: boolean;
}

export interface OTPInputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  hForm: UseFormReturn<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  inputClassName?: string;
}
