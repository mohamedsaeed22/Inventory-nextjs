"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  existingItemSchema,
  ExistingItemSchema,
  ExpenseSchema,
} from "@/lib/validations/formValidationSchemas";
import SelectField from "../SelectField";
import { useExistingItems } from "@/hooks/useExistingItems";
import { Category } from "@/types";
import { useExpenses } from "@/hooks/useExpenses";
import { createExistingItem, updateExistingItem } from "@/lib/api/existingItems";

const InventoryForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ExistingItemSchema>({
    resolver: zodResolver(existingItemSchema),
  });
  console.log(data);
  const { categories } = relatedData;
  const { createExpense, updateExpense } = useExpenses();
  const onSubmit = handleSubmit((data) => {
    // create the form data
    const formData = new FormData();
    if (type === "create") {
      formData.append("name", data.name);
      formData.append("brand", data.brand);
      formData.append("serial", data.serial);
      formData.append("quantity", data.quantity);
      formData.append("quantityEnum", data.quantityEnum);
      formData.append("sqId", data.sqId);
      formData.append("notes", data.notes || "");
      createExistingItem(formData as unknown as ExistingItemSchema);
      setOpen(false);
      router.refresh();
    } else {
      formData.append("name", data.name);
      formData.append("brand", data.brand);
      formData.append("serial", data.serial);
      formData.append("quantity", data.quantity);
      formData.append("quantityEnum", data.quantityEnum);
      formData.append("sqId", data.sqId);
      formData.append("notes", data.notes || "");
      updateExistingItem(data?.id?.toString() || "", formData as unknown as ExistingItemSchema);
      setOpen(false);
      router.refresh();
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-center">
        {type === "create" ? "اضافة عهدة" : "تعديل العهدة"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {type === "update" && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id.toString()}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <InputField
          label="اسم العهدة"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="الماركة"
          name="brand"
          defaultValue={data?.brand}
          register={register}
          error={errors?.brand}
        />
        <InputField
          label="السيريال"
          name="serial"
          defaultValue={data?.serial}
          register={register}
          error={errors?.serial}
        />
        <InputField
          label="الكمية"
          name="quantity"
          defaultValue={data?.quantity}
          register={register}
          error={errors?.quantity}
          type="number"
        />

        <SelectField
          label="وحده الكمية"
          control={control}
          name="quantityEnum"
          error={errors?.quantityEnum?.message}
          options={[
            { label: "قطعة", value: "UNIT" },
            { label: "كيلو", value: "METER" },
          ]}
          placeholder="وحده الكمية"
          defaultValue={type === "update" ? data?.quantityEnum : undefined}
        />
        <SelectField
          label="الصنف"
          name="sqId"
          control={control}
          options={
            categories?.map((category: Category) => ({
              label: category.name,
              value: category.id.toString(),
            })) || []
          }
          placeholder="اختر الصنف"
          error={errors?.sqId?.message}
          defaultValue={type === "update" ? data?.sqId?.toString() : undefined}
        />
      </div>
      <InputField
        label="ملاحظات"
        name="notes"
        defaultValue={data?.notes}
        register={register}
        error={errors?.notes}
      />
      {/* isdirty is true then show button */}
      <button
        className="bg-blue-400 text-white p-2 rounded-md w-max self-center cursor-pointer"
        // disabled={!isDirty && !!data}
      >
        {type === "create" ? "اضافة" : "تعديل"}
      </button>
    </form>
  );
};

export default InventoryForm;
