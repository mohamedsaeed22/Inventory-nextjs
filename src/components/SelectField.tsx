/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import { Control, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

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
  asyncOptions?: {
    queryKey: string[];
    queryFn: (
      searchTerm?: string,
      pageNumber?: number,
      pageSize?: number
    ) => Promise<any>;
    dataMapper: (item: any) => Option;
  };
  isAsync?: boolean;
}

const SelectField: React.FC<Props> = ({
  name,
  control,
  options,
  placeholder,
  error,
  label,
  defaultValue,
  asyncOptions,
  isAsync = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [allOptions, setAllOptions] = useState<Option[]>([]);

  // Reset state when search term changes
  useEffect(() => {
    setPage(1);
    setAllOptions([]);
  }, [searchTerm]);

  const { data: asyncData, isLoading } = useQuery({
    queryKey: [...(asyncOptions?.queryKey || []), searchTerm, page],
    queryFn: () => asyncOptions?.queryFn(searchTerm, page, 50),
    enabled: isAsync && !!asyncOptions,
  });

  // Move the success logic to useEffect
  useEffect(() => {
    if (asyncData && isAsync) {
      console.log("Async data received:", asyncData);
      if (asyncData?.data && Array.isArray(asyncData.data)) {
        const newOptions = asyncData.data.map(asyncOptions!.dataMapper);
        console.log("Mapped options:", newOptions);
        if (page === 1) {
          setAllOptions(newOptions);
        } else {
          setAllOptions((prev) => [...prev, ...newOptions]);
        }
      }
    }
  }, [asyncData, isAsync, page, asyncOptions]);

  const handleMenuScrollToBottom = useCallback(() => {
    if (isAsync && asyncData && "pagination" in asyncData) {
      console.log("Pagination data:", asyncData.pagination); // Debug log

      // Parse pagination if it's a string
      const pagination =
        typeof asyncData.pagination === "string"
          ? JSON.parse(asyncData.pagination)
          : asyncData.pagination;

      console.log("Parsed pagination:", pagination); // Debug log

      // Try different possible property names
      const currentPage =
        pagination.currentPage ||
        pagination.PageNumber ||
        pagination.pageNumber ||
        1;
      const totalPages =
        pagination.totalPages ||
        pagination.TotalPages ||
        pagination.totalPages ||
        1;

      console.log("Current page:", currentPage, "Total pages:", totalPages); // Debug log

      if (currentPage < totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  }, [isAsync, asyncData]);

  const handleInputChange = useCallback((newValue: string) => {
    setSearchTerm(newValue);
  }, []);

  const displayOptions = isAsync ? allOptions : options || [];

  console.log("Display options:", displayOptions); // Debug log

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
            options={displayOptions}
            placeholder={placeholder}
            isClearable
            isLoading={isLoading}
            onInputChange={isAsync ? handleInputChange : undefined}
            onMenuScrollToBottom={
              isAsync ? handleMenuScrollToBottom : undefined
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption?.value ?? "");
            }}
            value={
              displayOptions?.find((option) => option.value === field.value) ||
              null
            }
            filterOption={isAsync ? () => true : undefined}
            isSearchable={true}
            noOptionsMessage={() => "لا توجد خيارات"}
            loadingMessage={() => "جاري التحميل..."}
          />
        )}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

export default SelectField;
