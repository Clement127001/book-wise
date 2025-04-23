import { Ref, forwardRef, useEffect, useState } from "react";
import {
  components,
  CSSObjectWithLabel,
  GroupBase,
  MultiValue,
  PropsValue,
  SingleValue,
  StylesConfig,
  ControlProps,
  MultiValueProps,
  MenuListProps,
  OptionProps,
  SingleValueProps,
  InputProps,
  PlaceholderProps,
  IndicatorSeparatorProps,
  SelectInstance,
  NoticeProps,
} from "react-select";
import AsyncSelect from "react-select/async";
import { Noop } from "react-hook-form";
import { Check, X } from "lucide-react";
import { CustomSelectOption } from "@/types/common";

const getStyles = (
  customStyles:
    | StylesConfig<CustomSelectOption, boolean, GroupBase<CustomSelectOption>>
    | undefined
) => {
  return {
    control: (
      baseStyles: CSSObjectWithLabel,
      props: ControlProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) => ({
      ...baseStyles,
      maxWidth: "200px",
      ":hover": {
        backgroundColor: "rgb(249 250 251)",
      },
      ...customStyles?.control?.(baseStyles, props),
    }),
    input: (
      baseStyles: CSSObjectWithLabel,
      props: InputProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        overflowX: "scroll",
        maxHeight: "50px",
        overflowY: "hidden",
        fontSize: "16px",
        fontWeight: 500,
        ":disabled": {
          cursor: "not-allowed",
        },
        ...customStyles?.input?.(baseStyles, props),
      } as CSSObjectWithLabel),
    placeholder: (
      baseStyles: CSSObjectWithLabel,
      props: PlaceholderProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        color: "grey",
        fontSize: "14px",
        fontWeight: "400",
        ...customStyles?.placeholder?.(baseStyles, props),
      } as CSSObjectWithLabel),
    menuPortal: (baseStyles: CSSObjectWithLabel, props: any) =>
      ({
        ...baseStyles,
        fontSize: "16px",
        backgroundColor: "white",
        color: "white",
        zIndex: 999,
        ...customStyles?.menuPortal?.(baseStyles, props),
      } as CSSObjectWithLabel),
    indicatorSeparator: (
      baseStyles: CSSObjectWithLabel,
      props: IndicatorSeparatorProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        display: "none",
        ...customStyles?.indicatorSeparator?.(baseStyles, props),
      } as CSSObjectWithLabel),
    option: (
      baseStyles: CSSObjectWithLabel,
      props: OptionProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        ":hover": {
          ...baseStyles[":active"],
          backgroundColor: "rgb(249 250 251)",
          cursor: "pointer",
        },
        ":disabled": {
          cursor: "not-allowed",
        },
        wordWrap: "break-word",
        padding: 8,
        backgroundColor: "transparent",
        borderRadius: 6,
        color: "#191919",
        fontSize: "15px",
        fontWeight: 500,
        cursor: "pointer",
        ...customStyles?.option?.(baseStyles, props),
      } as CSSObjectWithLabel),
    noOptionsMessage: (
      baseStyles: CSSObjectWithLabel,
      props: NoticeProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        padding: "10px",
        backgroundColor: "white",
        color: "black",
        fontSize: "15px",
        zIndex: 1000,
        ...customStyles?.noOptionsMessage?.(baseStyles, props),
      } as CSSObjectWithLabel),
    menu: (baseStyles: CSSObjectWithLabel) =>
      ({
        ...baseStyles,
        background: "white",
        borderRadius: 10,
        borderColor: "white",
        outline: "none",
        zIndex: 1000,
      } as CSSObjectWithLabel),
    menuList: (
      baseStyles: CSSObjectWithLabel,
      props: MenuListProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        backgroundColor: "white",
        borderRadius: 10,
        outline: "1px solid #e1e7ef",
        padding: 6,
        zIndex: 1000,
        maxHeight: "200px",
        overflowX: "auto",
        ...customStyles?.menuList?.(baseStyles, props),
      } as CSSObjectWithLabel),
    multiValue: (
      baseStyles: CSSObjectWithLabel,
      props: MultiValueProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        backgroundColor: "hsl(175, 63%, 26%)",
        maxWidth: "140px",
        paddingInline: "4px",
        borderRadius: 8,
        borderColor: "white",
        overflow: "scroll",
        fontWeight: 400,
        ...customStyles?.multiValue?.(baseStyles, props),
      } as CSSObjectWithLabel),
    singleValue: (
      baseStyles: CSSObjectWithLabel,
      props: SingleValueProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        textTransform: "capitalize",
        color: "black",
        fontSize: 15,
        fontWeight: 500,
        ...customStyles?.singleValue?.(baseStyles, props),
      } as CSSObjectWithLabel),
    multiValueLabel: (
      baseStyles: CSSObjectWithLabel,
      props: MultiValueProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        color: "white",
        paddingRight: "16px",
        textTransform: "capitalize",
        ...customStyles?.multiValueLabel?.(baseStyles, props),
      } as CSSObjectWithLabel),
    multiValueRemove: (
      baseStyles: CSSObjectWithLabel,
      props: MultiValueProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) =>
      ({
        ...baseStyles,
        ":hover": {
          ...baseStyles[":active"],
          backgroundColor: "transparent",
        },
        color: "white",
        ...customStyles?.multiValueRemove?.(baseStyles, props),
      } as CSSObjectWithLabel),
    loadingIndicator: () =>
      ({
        display: "none",
      } as CSSObjectWithLabel),
  };
};

const AsyncSearchSelect = forwardRef(
  (
    {
      name,
      isDisabled,
      value,
      onChange,
      onMultipleChange,
      placeholder,
      getOptions,
      instanceId,
      showDropdownOnModal,
      dropDownIcon,
      customStyles,
      isMulti,
      onBlur,
      controlShouldRenderValue = true,
      backspaceRemovesValue = true,
      isClearable = true,
      isSearchable = true,
      defaultMenuIsOpen = true,
      controlledMenuIsOpen,
      requiredCount,
    }: {
      name?: string;
      isDisabled?: boolean;
      value: PropsValue<CustomSelectOption>;
      onChange?: (value: CustomSelectOption | null) => void;
      onMultipleChange?: (value: CustomSelectOption[]) => void;
      onBlur?: Noop;
      placeholder?: string;
      getOptions: (v: string) => Promise<CustomSelectOption[]>;
      instanceId: string;
      showDropdownOnModal?: boolean;
      defaultMenuIsOpen?: boolean;
      dropDownIcon?: React.ReactNode;
      customStyles?: StylesConfig<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >;
      isMulti?: boolean;
      controlShouldRenderValue?: boolean;
      backspaceRemovesValue?: boolean;
      isClearable?: boolean;
      isSearchable?: boolean;
      controlledMenuIsOpen?: boolean;
      requiredCount?: number;
    },
    ref: Ref<
      SelectInstance<CustomSelectOption, boolean, GroupBase<CustomSelectOption>>
    > | null
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState(defaultMenuIsOpen);

    const DropDownIndicator = (props: any) => {
      if (dropDownIcon === undefined) {
        return null;
      }
      return (
        <components.DropdownIndicator {...props}>
          {dropDownIcon}
        </components.DropdownIndicator>
      );
    };

    const OptionComponent = (props: OptionProps<CustomSelectOption>) => (
      <components.Option {...props}>
        <div className="flex justify-between items-center">
          <p>{props.data.label}</p>
          {props.isSelected && (
            <Check
              size={15}
              strokeWidth={2.5}
              className="text-app-accent-success-700 flex-shrink-0"
            />
          )}
        </div>
      </components.Option>
    );

    const MultiValue = (
      props: MultiValueProps<
        CustomSelectOption,
        boolean,
        GroupBase<CustomSelectOption>
      >
    ) => {
      const maxToShow = 1;
      const { getValue, index } = props;
      //for rendering only the last select element
      return index === getValue().length - maxToShow ? (
        <components.MultiValue {...props} />
      ) : undefined;
    };

    const ClearIndicator = (props: any) => {
      return (
        <components.ClearIndicator {...props}>
          <X
            className={
              "bg-gray-200 absolute top-[35%] right-2 rounded-full p-[3px] text-gray-400 cursor-pointer w-4 h-4"
            }
          />
        </components.ClearIndicator>
      );
    };

    const onSelect = (
      value:
        | MultiValue<CustomSelectOption>
        | SingleValue<CustomSelectOption>
        | null
    ) => {
      if (value === null) {
        onChange?.(null);
        return;
      }
      if (isMulti && onMultipleChange) {
        onMultipleChange([...(value as MultiValue<CustomSelectOption>)]);
        return;
      }
      onChange?.(value as SingleValue<CustomSelectOption>);
    };

    useEffect(() => {
      if (!controlledMenuIsOpen) {
        return;
      }
      setMenuIsOpen(controlledMenuIsOpen);
    }, [controlledMenuIsOpen]);

    return (
      <AsyncSelect
        ref={ref}
        aria-label={`searchField-${name}`}
        instanceId={instanceId}
        name={name}
        onChange={onSelect}
        cacheOptions
        defaultOptions
        isClearable={isClearable}
        isSearchable={isSearchable}
        loadOptions={getOptions}
        hideSelectedOptions={false}
        defaultMenuIsOpen={defaultMenuIsOpen}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        closeMenuOnSelect={!isMulti}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        isDisabled={isDisabled}
        styles={getStyles(customStyles)}
        isOptionDisabled={(option: CustomSelectOption<string>) => {
          if (
            isMulti &&
            Array.isArray(value) &&
            requiredCount &&
            value.length === requiredCount
          ) {
            const isOptionSelected = value.some(
              (selectedOption) => selectedOption.value === option.value
            );
            return !isOptionSelected;
          }
          return false;
        }}
        isMulti={isMulti}
        components={{
          Option: OptionComponent,
          DropdownIndicator: DropDownIndicator,
          ClearIndicator: ClearIndicator,
          MultiValue: MultiValue,
        }}
        menuPortalTarget={showDropdownOnModal === true ? document.body : null}
        controlShouldRenderValue={controlShouldRenderValue}
        backspaceRemovesValue={backspaceRemovesValue}
      />
    );
  }
);
AsyncSearchSelect.displayName = "AsyncSearchSelect";
export default AsyncSearchSelect;
