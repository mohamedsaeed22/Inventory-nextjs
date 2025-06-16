import React from "react";
import Select from "react-select";
import { Control, Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  control: Control<any>;
  options?: Option[];
  placeholder: string;
  error?: string;
  label?: string;
  defaultValue?: string;
}

const SelectField: React.FC<Props> = ({
  name,
  control,
  options,
  placeholder,
  error,
  label,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <label className="text-xs text-gray-500">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            isClearable
            onChange={(selectedOption) => {
              field.onChange(selectedOption?.value ?? "");
            }}
            value={
              options?.find((option) => option.value === field.value) || null
            }
          />
        )}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
export default SelectField;
