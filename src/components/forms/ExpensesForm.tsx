"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  expenseSchema,
  ExpenseSchema,
} from "@/lib/validations/formValidationSchemas";
import SelectField from "../SelectField";
import { ExistingItem, Expense } from "@/types";
import { useExpenses } from "@/hooks/useExpenses";

const ExpensesForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: Expense;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
  });
  const { existingItems } = relatedData || {};
  const { createExpense, updateExpense } = useExpenses();
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (type === "create") {
      formData.append("dispensedQuantity", data.dispensedQuantity.toString());
      formData.append("existingItemId", data?.existingItemId?.toString() || "");
      formData.append("toWhom", data?.toWhom || "");
      formData.append("receiverName", data?.receiverName || "");
      formData.append("deliveredName", data?.deliveredName || "");
      formData.append("notes", data?.notes || "");
      createExpense(formData);
      setOpen(false);
      router.refresh();
    } else {
      formData.append("dispensedQuantity", data.dispensedQuantity.toString());
      formData.append("existingItemId", data?.existingItemId?.toString() || "");
      formData.append("toWhom", data?.toWhom || "");
      formData.append("receiverName", data?.receiverName || "");
      formData.append("deliveredName", data?.deliveredName || "");
      formData.append("notes", data?.notes || "");
      updateExpense({ id: data?.id?.toString() || "", expenseData: formData });
      setOpen(false);
      router.refresh();
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-center">
        {type === "create" ? "اضافة مصروف" : "تعديل المصروف"}
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
        <SelectField
          label="العهدة"
          name="existingItemId"
          control={control}
          options={
            existingItems?.map((existingItem: ExistingItem) => ({
              label: existingItem.name,
              value: existingItem.id.toString(),
            })) || []
          }
          placeholder="اختر العهدة"
          error={errors?.existingItemId?.message}
          defaultValue={
            type === "update" ? data?.existingItemId?.toString() : undefined
          }
        />

        <InputField
          label="الكمية المصروفة"
          name="dispensedQuantity"
          defaultValue={data?.dispensedQuantity?.toString() || undefined}
          register={register}
          error={errors?.dispensedQuantity}
          type="number"
        />
        <InputField
          label="المسلم"
          name="deliveredName"
          defaultValue={data?.deliveredName || undefined}
          register={register}
          error={errors?.deliveredName}
        />
        <InputField
          label="المستلم"
          name="receiverName"
          defaultValue={data?.receiverName || undefined}
          register={register}
          error={errors?.receiverName}
        />
        <InputField
          label="جهه الاستلام"
          name="toWhom"
          defaultValue={data?.toWhom || undefined}
          register={register}
          error={errors?.toWhom}
        />
        <InputField
          label="ملاحظات"
          name="notes"
          defaultValue={data?.notes || undefined}
          register={register}
          error={errors?.notes}
        />
      </div>
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

export default ExpensesForm;
