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
import ConfirmDialog from "./ConfirmDialog";

const InventoryForm = dynamic(() => import("./forms/InventoryForm"), {
  loading: () => <Loader className="animate-spin" />,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any
  ) => React.ReactNode;
} = {
  inventory: (setOpen, type, data) => (
    <InventoryForm type={type} data={data} setOpen={setOpen} />
  ),
  categories: (setOpen, type, data) => (
    <CategoriesForm type={type} data={data} setOpen={setOpen} />
  ),
  expenses: (setOpen, type, data) => (
    <ExpensesForm type={type} data={data} setOpen={setOpen} />
  ),
  loans: (setOpen, type, data) => (
    <LoanForm type={type} data={data} setOpen={setOpen} />
  ),
};

const FormModal = ({ table, type, data, id }: FormContainerProps) => {
  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  const handleDelete = () => {
    if (id) {
      deleteActionMap[table as keyof typeof deleteActionMap](id.toString());
    }
  };

  const getTableName = (table: string) => {
    const tableNames: { [key: string]: string } = {
      inventory: "العهد",
      categories: "الاصناف",
      expenses: "المصروفات",
      loans: "السلف",
    };
    return tableNames[table] || table;
  };

  const Form = () => {
    return type === "create" || type === "update"
      ? forms[table](setOpen, type, data)
      : "Form not found!";
  };

  return (
    <>
      <button
        className={`${size} p-2 flex items-center justify-center cursor-pointer rounded-full ${bgColor}`}
        onClick={() => {
          if (type === "delete") {
            setShowDeleteDialog(true);
          } else {
            setOpen(true);
          }
        }}
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

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من حذف هذا العنصر من ${getTableName(table)}؟`}
        confirmText="حذف"
        cancelText="إلغاء"
      />
    </>
  );
};

export default FormModal;
