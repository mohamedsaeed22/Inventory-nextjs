/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  categorySchema,
  CategorySchema,
} from "@/lib/validations/formValidationSchemas";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types";

const CategoriesForm = ({
  type,
  data,
  setOpen,
 }: {
  type: "create" | "update";
  data: Category;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: data?.name || "",
      number: Number(data?.number) || undefined,
      id: data?.id,
    },
  });
  const router = useRouter();
  const { createCategory, updateCategory } = useCategories();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (type === "create") {
      formData.append("name", data.name);
      formData.append("number", data.number.toString());
      createCategory(formData);
      setOpen(false);
      router.refresh();
    } else {
      formData.append("name", data.name);
      formData.append("number", data.number.toString());
      updateCategory({
        id: data.id as number,
        categoryData: formData,
      });
      setOpen(false);
      router.refresh();
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-center">
        {type === "create" ? "اضافة صنف" : "تعديل الصنف"}
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
          label="اسم الصنف"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="السيريال"
          name="number"
          defaultValue={data?.number.toString()}
          register={register}
          error={errors?.number}
          type="number"
        />
      </div>

      <button
        // if disabled then show button with bg-gray-400 text-white
        className={`bg-blue-400 text-white p-2 rounded-md w-max self-center cursor-pointer ${
          !isDirty && !!data ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={!isDirty && !!data}
      >
        {type === "create" ? "اضافة" : "تعديل"}
      </button>
    </form>
  );
};

export default CategoriesForm;
