import { Controller, FieldValues } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { CommonInputProps } from "@/types/form";

export function CommonTextArea<T extends FieldValues>({
  label,
  name,
  hForm,
  placeholder,
  registerOptions,
  wrapperClassName = "",
  inputClassName = "",
}: CommonInputProps<T>) {
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
          {registerOptions?.required ? (
            <span className="text-app-accent-error-500 ml-1">*</span>
          ) : (
            ""
          )}
        </Label>
      )}
      <div className="relative">
        <Controller
          control={control}
          name={name}
          rules={registerOptions}
          render={({ field }) => (
            <Textarea
              placeholder={placeholder}
              onChange={field.onChange}
              rows={5}
              value={field.value}
              className={`min-h-[48px] w-full bg-white  placeholder:text-[14px] border-[1px] border-[#c1c1c1] text-app-primary-900 placeholder-app-gray-300 focus:ring-0  focus:border-app-gray-300 focus:bg-gray-50  hover:bg-gray-50  font-[450] 
            placeholder:font-normal rounded-[12px] !text-[16px] shadow-freelancer read-only:placeholder:text-app-black-300 read-only:placeholder:text-[16px] read-only:placeholder:font-normal pl-3 md:pl-4 ${inputClassName}`}
            />
          )}
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-app-accent-error-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
