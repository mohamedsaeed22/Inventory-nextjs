"use client";
import FormContainer from "@/components/FormContainer";
import TableSearch from "@/components/TableSearch";
import Table from "@/components/Table";
import { Loan } from "@/types";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useLoans } from "@/hooks/useLoans";

const columns = [
  {
    header: "اسم العهده",
    accessor: "name",
  },
  {
    header: "تاريخ الخروج",
    accessor: "createdDate",
  },
  {
    header: "المستلم",
    accessor: "toWhom",
  },
  {
    header: "تم التسليم",
    accessor: "isReturned",
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
  const { loans, isLoading, isError, error, pagination } = useLoans(
    searchTerm,
    Number(pageNumber),
    Number(pageSize)
  );

  const renderRow = (item: Loan) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        <div className="flex items-center">
          <span className="truncate max-w-[120px]" title={item.name}>
            {item.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {item.createdDate
          ? new Date(item.createdDate).toLocaleDateString()
          : "-"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <span className="font-medium">{item.toWhom}</span>
      </td>
      <td className="px-6 py-4 text-sm">
        {item.isReturned ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            تم العودة
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            لم يتم العودة
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <span className="truncate max-w-[150px]" title={item.notes || "-"}>
          {item.notes || "-"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <FormContainer table="loans" type="update" data={item} />
          <FormContainer table="loans" type="delete" id={item.id} />
        </div>
      </td>
    </>
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
        <h1 className="text-2xl font-bold">السلف</h1>
        <TableSearch />
        <FormContainer table="loans" type="create" />
      </div>
      {isLoading ? (
        // center loader at page
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
          <Loader className="animate-spin" />
          <span className="text-gray-500">جاري التحميل ...</span>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={loans} />
      )}
      {/* if array is empty remove the pagination */}
      {loans.length > 0 && (
        <Pagination
          page={Number(pageNumber)}
          count={pagination?.TotalRecords || 0}
          pagination={pagination}
          onChange={(page) => {
            router.push(
              `/dashboard/loans?pageNumber=${page}&SearchTerm=${searchTerm}`
            );
          }}
        />
      )}
    </div>
  );
};

export default Page;
