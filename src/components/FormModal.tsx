/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CircleX, Loader, Plus, SquarePen, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";

import { FormContainerProps } from "./FormContainer";
import CategoriesForm from "./forms/CategoriesForm";
import { useCategories } from "@/hooks/useCategories";
import { useExistingItems } from "@/hooks/useExistingItems";
import ExpensesForm from "./forms/ExpensesForm";
 import { useExpenses } from "@/hooks/useExpenses";
import LoanForm from "./forms/LoanForm";
import { useLoans } from "@/hooks/useLoans";

const InventoryForm = dynamic(() => import("./forms/InventoryForm"), {
  loading: () => <Loader className="animate-spin" />,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => React.ReactNode;
} = {
  inventory: (setOpen, type, data, relatedData) => (
    <InventoryForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  categories: (setOpen, type, data, relatedData) => (
    <CategoriesForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  expenses: (setOpen, type, data, relatedData) => (
    <ExpensesForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  loans: (setOpen, type, data, relatedData) => (
    <LoanForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);
  const { deleteCategory } = useCategories();
  const { deleteExistingItem } = useExistingItems();
  const { deleteExpense } = useExpenses();
  const { deleteLoan } = useLoans();
  const deleteActionMap = {
    categories: (id: string) => deleteCategory(id.toString()),
    inventory: (id: string) => deleteExistingItem(id.toString()),
    expenses: (id: string) => deleteExpense(id.toString()),
    loans: (id: string) => deleteLoan(id.toString()),
    };  

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-[#FAE27C]"
      : type === "update"
      ? "bg-green-200"
      : "bg-red-300";

  const Form = () => {
    return type === "delete" && id ? (
      <div className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          هل أنت متأكد من حذف هذا العنصر؟
        </span>
        <button
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center cursor-pointer"
          onClick={() =>
            deleteActionMap[table as keyof typeof deleteActionMap](
              id.toString()
            )
          }
        >
          حذف
        </button>
      </div>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} p-2 flex items-center justify-center cursor-pointer rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {type === "create" ? (
          <Plus className="w-5 h-5 stroke-[2] shrink-0" />
        ) : type === "update" ? (
          <SquarePen className="w-4 h-4 stroke-[2] shrink-0" />
        ) : (
          <Trash className="w-4 h-4 stroke-[2] shrink-0" />
        )}
      </button>

      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <CircleX className="w-5 h-5 stroke-[2] shrink-0" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
