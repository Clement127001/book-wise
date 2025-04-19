import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldValues } from "react-hook-form";
import { CommonInputProps } from "@/types/form";

export function CommonInput<T extends FieldValues>({
  label,
  name,
  hForm,
  registerOptions,
  icon,
  type = "text",
  placeholder,
  disabled = false,
  wrapperClassName = "",
  inputClassName = "",
  showError = true,
  readOnly = false,
  labelClassName = "",
}: CommonInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = hForm;

  return (
    <section className={`w-full space-y-2 ${wrapperClassName}`}>
      {label && (
        <Label
          htmlFor={name}
          className={`text-app-black-300 dark:text-app-primary-300 capitalize text-[16px] ${labelClassName}`}
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
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`min-h-[48px] w-full bg-white  placeholder:text-[14px] border-[1px] border-[#c1c1c1] text-app-primary-900 placeholder-app-gray-300 focus:ring-0  focus:border-app-gray-300 focus:bg-gray-50  hover:bg-gray-50  font-[450] 
            placeholder:font-normal rounded-[12px] !text-[16px] shadow-freelancer read-only:placeholder:text-app-black-300 read-only:placeholder:text-[16px] read-only:placeholder:font-normal pl-3 md:pl-4 ${inputClassName}`}
          readOnly={readOnly}
          {...register(name, registerOptions)}
        />
        {icon && (
          <div className="absolute flex items-center right-3 top-1/2 transform -translate-y-1/2 text-app-primary-400 dark:text-app-primary-300">
            {icon}
          </div>
        )}
      </div>
      {showError && errors[name] && (
        <p className="text-xs text-app-accent-error-500">
          {errors[name]?.message as string}
        </p>
      )}
    </section>
  );
}
