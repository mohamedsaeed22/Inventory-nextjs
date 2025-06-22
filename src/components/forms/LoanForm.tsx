"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  loanSchema,
  LoanSchema,
} from "@/lib/validations/formValidationSchemas";
import { useLoans } from "@/hooks/useLoans";
import { ExistingItem, Loan } from "@/types";
import SelectField from "../SelectField";
import { getAllExistingItems } from "@/lib/api/existingItems";

const CategoriesForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data: Loan;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<LoanSchema>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      id: data?.id,
      toWhom: data?.toWhom || "",
      isReturned:
        (data?.isReturned?.toString() as "true" | "false") || undefined,
      notes: data?.notes || "",
      existingItemId: data?.existingItemId?.toString() || "",
    },
  });
  const router = useRouter();
  const { createLoan, updateLoan } = useLoans();
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (type === "create") {
      formData.append("toWhom", data.toWhom);
      formData.append("isReturned", data.isReturned.toString());
      formData.append("notes", data.notes || "");
      formData.append("existingItemId", data.existingItemId);
      createLoan(formData);
      setOpen(false);
      router.refresh();
    } else {
      formData.append("toWhom", data.toWhom);
      formData.append("isReturned", data.isReturned.toString());
      formData.append("notes", data.notes || "");
      formData.append("existingItemId", data.existingItemId);
      updateLoan({
        id: data.id?.toString() || "",
        loanData: formData,
      });
      setOpen(false);
      router.refresh();
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-center">
        {type === "create" ? "اضافة سلف" : "تعديل السلف"}
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
          placeholder="اختر العهدة"
          error={errors?.existingItemId?.message}
          defaultValue={
            type === "update" ? data?.existingItemId?.toString() : undefined
          }
          isAsync={true}
          asyncOptions={{
            queryKey: ["existingItems"],
            queryFn: getAllExistingItems,
            dataMapper: (existingItem: ExistingItem) => ({
              label: existingItem.name,
              value: existingItem.id.toString(),
            }),
          }}
        />
        <InputField
          label="اسم المسلم له"
          name="toWhom"
          defaultValue={data?.toWhom}
          register={register}
          error={errors?.toWhom}
        />
        <SelectField
          control={control}
          label="هل تم العودة"
          name="isReturned"
          options={[
            { label: "نعم", value: "true" },
            { label: "لا", value: "false" },
          ]}
          placeholder="اختر هل تم العودة"
          defaultValue={
            type === "update" ? data?.isReturned?.toString() : undefined
          }
          error={errors?.isReturned?.message}
        />

        <InputField
          label="ملاحظات"
          name="notes"
          defaultValue={data?.notes}
          register={register}
          error={errors?.notes}
        />
      </div>

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

export default CategoriesForm;
