"use client";
import FormContainer from "@/components/FormContainer";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import { useExistingItems } from "@/hooks/useExistingItems";
import { ExistingItem } from "@/types";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

const columns = [
  {
    header: "اسم المنتج",
    accessor: "productName",
  },
  {
    header: "الماركة (البراند)",
    accessor: "brand",
  },
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
    header: "الاجراءات",
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("SearchTerm") || "";
  const pageNumber = searchParams.get("pageNumber") || 1;
  const pageSize = searchParams.get("pageSize") || 10;
  const { existingItems, isLoading, isError, error, pagination } =
    useExistingItems(searchTerm, Number(pageNumber), Number(pageSize));

  const renderRow = (item: ExistingItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100"
    >
      <td className="py-3">{item.name}</td>
      <td>{item.brand}</td>
      <td>{item.serial}</td>
      <td>{item.quantity}</td>
      <td>{item.quantityEnum}</td>
      <td>{item.notes}</td>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">العهده</h1>
        <TableSearch />
        <FormContainer table="inventory" type="create" />
      </div>
      {isLoading ? (
        // center loader at page
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
          <Loader className="animate-spin" />
          <span className="text-gray-500">جاري التحميل ...</span>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={existingItems} />
      )}
      <Pagination
        page={Number(pageNumber)}
        count={pagination?.TotalRecords || 0}
        onChange={(page) => {
          router.push(
            `/dashboard/inventory?pageNumber=${page}&pageSize=${pageSize}&SearchTerm=${searchTerm}`
          );
        }}
      />
    </div>
  );
};

export default Page;
