"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  existingItemSchema,
  ExistingItemSchema,
} from "@/lib/validations/formValidationSchemas";
import SelectField from "../SelectField";
import { useExistingItems } from "@/hooks/useExistingItems";

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExistingItemSchema>({
    resolver: zodResolver(existingItemSchema),
  });
  const { createExistingItem } = useExistingItems();

  const onSubmit = handleSubmit((data) => {
    createExistingItem(data);
    // formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    // if (state.success) {
    //   toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
    //   setOpen(false);
    //   router.refresh();
    // }
  }, [router, type, setOpen]);

  const { teachers } = relatedData;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-center">
        {type === "create" ? "اضافة عهدة" : "تعديل العهدة"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <InputField
          label="اسم العهدة"
          name="Name"
          defaultValue={data?.Name}
          register={register}
          error={errors?.Name}
        />
        <InputField
          label="الماركة"
          name="Brand"
          defaultValue={data?.Brand}
          register={register}
          error={errors?.Brand}
        />
        <InputField
          label="السيريال"
          name="Serial"
          defaultValue={data?.Serial}
          register={register}
          error={errors?.Serial}
        />
        <InputField
          label="الكمية"
          name="Quantity"
          defaultValue={data?.Quantity}
          register={register}
          error={errors?.Quantity}
        />

        <SelectField
          label="وحده الكمية"
          control={control}
          name="QuantityEnum"
          error={errors?.QuantityEnum?.message}
          options={[
            { label: "قطعة", value: "UNIT" },
            { label: "كيلو", value: "METER" },
          ]}
          placeholder="وحده الكمية"
        />

        <SelectField
          label="الصنف"
          name="SqId"
          control={control}
          options={[
            { label: "مواد غذائية", value: "FOOD" },
            { label: "مواد غير غذائية", value: "NON_FOOD" },
          ]}
          placeholder="اختر الصنف"
          error={errors?.SqId?.message}
        />
      </div>
      <InputField
        label="ملاحظات"
        name="Notes"
        defaultValue={data?.Notes}
        register={register}
        error={errors?.Notes}
      />

      <button className="bg-blue-400 text-white p-2 rounded-md w-max self-center cursor-pointer">
        {type === "create" ? "اضافة" : "تعديل"}
      </button>
    </form>
  );
};

export default InventoryForm;
