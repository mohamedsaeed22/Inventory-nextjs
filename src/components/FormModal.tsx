"use client";

import { CircleX, Loader, Plus, SquarePen, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import { deleteExistingItem } from "@/lib/api/existingItems";

const deleteActionMap = {
  inventory: deleteExistingItem,
};

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
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-[#FAE27C]"
      : type === "update"
      ? "bg-green-500"
      : "bg-red-500";

  const Form = () => {
    return type === "delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`min-w-[40px] min-h-[40px] p-2 flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {type === "create" ? (
          <Plus className="w-5 h-5 stroke-[2] shrink-0" />
        ) : type === "update" ? (
          <SquarePen className="w-5 h-5 stroke-[2] shrink-0" />
        ) : (
          <Trash className="w-5 h-5 stroke-[2] shrink-0" />
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
