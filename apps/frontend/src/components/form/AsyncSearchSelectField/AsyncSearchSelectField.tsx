import { Controller, FieldValues } from "react-hook-form";
import AsyncSearchSelect from "@/components/form/AsyncSearchSelectField/AsyncSearchSelect";
import { AsyncSearchSelectFieldProps } from "@/types/common";
import { get } from "@/utils/common";

function AsyncSearchSelectField<T extends FieldValues>({
  hForm,
  name,
  label,
  isDisabled,
  rules,
  placeholder,
  getOptions,
  instanceId,
  showDropdownOnModal,
  dropDownIcon,
  customStyles,
  isMulti,
  defaultMenuIsOpen = false,
  controlShouldRenderValue = true,
  backspaceRemovesValue = true,
  isClearable,
  isSearchable,
  controlledMenuIsOpen,
}: AsyncSearchSelectFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = hForm;

  const error = get(errors, name);

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value: fieldValue, name, ref },
        }) => (
          <div className="w-full space-y-2">
            {label && (
              <p className="text-app-black-300 font-medium capitalize text-[16px]">
                {label}{" "}
                {rules?.required ? (
                  <span className="text-app-accent-error-500">*</span>
                ) : (
                  ""
                )}
              </p>
            )}
            <AsyncSearchSelect
              ref={ref}
              instanceId={instanceId}
              name={name}
              defaultMenuIsOpen={defaultMenuIsOpen}
              onChange={onChange}
              onMultipleChange={isMulti ? onChange : undefined}
              onBlur={onBlur}
              value={fieldValue}
              placeholder={placeholder ?? "Select a value"}
              isDisabled={isDisabled}
              isMulti={isMulti}
              getOptions={getOptions}
              showDropdownOnModal={showDropdownOnModal}
              dropDownIcon={dropDownIcon}
              customStyles={{
                container: (provided) => ({
                  ...provided,
                  cursor: "pointer",
                  position: "relative",
                }),
                control: (provided) => ({
                  ...provided,
                  borderRadius: "6px",
                  border: "1px solid #c1c1c1",
                  height: "48px",
                  minWidth: "100%",
                  overflowY: "scroll",
                  paddingBlock: 0,
                  marginTop: label ? 4 : 0,
                  background: "white",
                  color: "black",
                  boxShadow: "none",
                  "&:hover": {
                    border: "1px solid 	#8f8f8f",
                  },
                  outline: "none",
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 200,
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#919191",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "black",
                }),
                ...customStyles,
              }}
              isClearable={isClearable}
              isSearchable={isSearchable}
              controlShouldRenderValue={controlShouldRenderValue}
              backspaceRemovesValue={backspaceRemovesValue}
              controlledMenuIsOpen={controlledMenuIsOpen}
            />
            {Boolean(error) && (
              <p className="text-xs text-app-accent-error-500">
                {typeof error?.message === "string"
                  ? error.message
                  : "Field error"}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default AsyncSearchSelectField;
