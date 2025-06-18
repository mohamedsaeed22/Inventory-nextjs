"use client";
import FormContainer from "@/components/FormContainer";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import { Expense } from "@/types";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useExpenses } from "@/hooks/useExpenses";

const columns = [
  {
    header: "اسم العهده",
    accessor: "name",
  },
  {
    header: "الكمية المصروفة",
    accessor: "dispensedQuantity",
  },
  {
    header: " تاريخ الصرف",
    accessor: "createdDate",
  },
  {
    header: "اسم المسلم",
    accessor: "deliveredName",
  },
  {
    header: "اسم المستلم",
    accessor: "receiverName",
  },
  {
    header: "جهة الاستلام",
    accessor: "toWhom",
  },
  {
    header: "ملاحظات",
    accessor: "notes",
  },
  {
    header: "الاجراءات",
    accessor: "actions",
  },
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("SearchTerm") || "";
  const pageNumber = searchParams.get("pageNumber") || 1;
  const pageSize = searchParams.get("pageSize") || 10;
  const { expenses, isLoading, isError, error, pagination } = useExpenses(
    searchTerm,
    Number(pageNumber),
    Number(pageSize)
  );

  const renderRow = (item: Expense) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100"
    >
      <td className="py-3">{item.existingItem.name}</td>
      <td>{item.dispensedQuantity}</td>
      <td>
        {item.createdDate
          ? new Date(item.createdDate).toLocaleDateString()
          : "-"}
      </td>
      <td>{item.deliveredName}</td>
      <td>{item.receiverName}</td>
      <td>{item.toWhom}</td>
      <td>{item.notes || "-"}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="expenses" type="update" data={item} />
          <FormContainer table="expenses" type="delete" id={item.id} />
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
        <h1 className="text-2xl font-bold">المصروفات</h1>
        <TableSearch />
        <FormContainer table="expenses" type="create" />
      </div>
      {isLoading ? (
        // center loader at page
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
          <Loader className="animate-spin" />
          <span className="text-gray-500">جاري التحميل ...</span>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={expenses} />
      )}
      {/* if array is empty remove the pagination */}
      {expenses.length > 0 && (
      <Pagination
        page={Number(pageNumber)}
        count={pagination?.TotalRecords || 0}
        onChange={(page) => {
          router.push(
            `/dashboard/expenses?pageNumber=${page}&pageSize=${pageSize}&SearchTerm=${searchTerm}`
          );
          }}
        />
      )}
    </div>
  );
};

export default Page;
