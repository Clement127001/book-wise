import { FieldValues, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/components/ui/input-otp";
import { OTPInputProps } from "@/types/form";

export function LoginOTPInput<T extends FieldValues>({
  label,
  name,
  hForm,
  registerOptions,
  placeholder,
  wrapperClassName = "",
}: OTPInputProps<T>) {
  const {
    control,
    formState: { errors },
  } = hForm;

  return (
    <div className={`w-full space-y-2 ${wrapperClassName}`}>
      {label && (
        <Label
          htmlFor={name}
          className="text-app-black-300 dark:text-app-primary-300 capitalize text-[16px]"
        >
          {label}
        </Label>
      )}
      <div className="relative flex">
        <Controller
          control={control}
          name={name}
          rules={registerOptions}
          render={({ field }) => (
            <InputOTP
              onChange={field.onChange}
              value={field.value}
              disabled={field.disabled}
              maxLength={6}
              placeholder={placeholder}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        ></Controller>
      </div>
      {errors[name] && (
        <p className="text-xs text-app-accent-error-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
