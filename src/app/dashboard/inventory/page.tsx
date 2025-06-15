"use client";

import FormContainer from "@/components/FormContainer";
import Table from "@/components/Table";
import { useExistingItems } from "@/hooks/useExistingItems";
import { ExistingItem } from "@/types";
import { Loader } from "lucide-react";
import React from "react";

const columns = [
  {
    header: "اسم المنتج",
    accessor: "productName",
  },
  // {
  //   header: "الماركة (البرند)",
  //   accessor: "brand",
  // },
  {
    header: "السيريال",
    accessor: "serial",
  },
  {
    header: "الكمية",
    accessor: "quantity",
  },
  {
    header: "وحدة الكمية",
    accessor: "unit",
  },
  {
    header: "ملاحظات",
    accessor: "notes",
  },
  {
    header: "إجراءات",
    accessor: "actions",
  },
  // ...(role === "admin"
  //   ? [
  //       {
  //         header: "Actions",
  //         accessor: "action",
  //       },
  //     ]
  //   : []),
];

const Page = () => {
  const { existingItems, isLoading, isError, error } = useExistingItems();
  console.log(existingItems, isLoading, isError, error);

  const renderRow = (item: ExistingItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100"
    >
      <td className="flex items-center gap-4 py-2">
        <div className="flex flex-col">
          <h3 className="font-semibold ">{item.name}</h3>
          <span className="text-xs text-gray-500 ">({item?.brand})</span>
        </div>
      </td>
      <td className="md:table-cell">{item.serial}</td>
      <td className="md:table-cell">{item.quantity}</td>
      <td className="md:table-cell">{item.quantityEnum}</td>
      <td className="md:table-cell">{item.notes}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="inventory" type="update" data={item} />
          <FormContainer table="inventory" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>حدث خطأ ما</p>
          <p>{error?.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FormContainer table="inventory" type="create" />
      {isLoading ? (
        // center loader at page
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
          <Loader className="animate-spin" />
          <span className="text-gray-500">جاري التحميل ...</span>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={existingItems} />
      )}
    </div>
  );
};

export default Page;
