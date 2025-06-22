"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  existingItemSchema,
  ExistingItemSchema,
} from "@/lib/validations/formValidationSchemas";
import SelectField from "../SelectField";
import { useExistingItems } from "@/hooks/useExistingItems";
import { getAllCategories } from "@/lib/api/categories";

const InventoryForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ExistingItemSchema>({
    resolver: zodResolver(existingItemSchema),
    defaultValues: {
      id: data?.id,
      name: data?.name || "",
      brand: data?.brand || "",
      serial: data?.serial || "",
      quantity: data?.quantity?.toString() || undefined,
      quantityEnum: data?.quantityEnum || undefined,
      sqId: data?.sqId?.toString() || undefined,
      notes: data?.notes || "",
    },
  });
  const { createExistingItem, updateExistingItem } = useExistingItems();
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
      createExistingItem(formData);
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
      updateExistingItem({
        id: data?.id?.toString() || "",
        existingItemData: formData,
      });
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
          placeholder="اختر الصنف"
          error={errors?.sqId?.message}
          defaultValue={type === "update" ? data?.sqId?.toString() : undefined}
          isAsync={true}
          asyncOptions={{
            queryKey: ["categories"],
            queryFn: getAllCategories,
            dataMapper: (category: any) => ({
              label: category.name,
              value: category.id.toString(),
            }),
          }}
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
        className={`bg-blue-400 text-white p-2 rounded-md w-max self-center ${
          !isDirty && !!data
            ? "bg-gray-400 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        disabled={!isDirty && !!data}
      >
        {type === "create" ? "اضافة" : "تعديل"}
      </button>
    </form>
  );
};

export default InventoryForm;
