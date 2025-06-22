"use client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const columns = [
  {
    header: "اسم الصنف",
    accessor: "Name",
  },
  {
    header: "السيريال",
    accessor: "Number",
  },
  {
    header: "الاجراءات",
    accessor: "Actions",
  },
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("SearchTerm") || "";
  const pageNumber = searchParams.get("pageNumber") || 1;
  const pageSize = searchParams.get("pageSize") || 10;
  const { categories, isLoading, isError, error, pagination } = useCategories(
    searchTerm,
    Number(pageNumber),
    Number(pageSize)
  );

  const renderRow = (item: Category) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        <div className="flex items-center">
          {/* <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-green-600 text-xs font-semibold">
              {item.name.charAt(0).toUpperCase()}
            </span>
          </div> */}
          <span className="truncate max-w-[120px]" title={item.name}>
            {item.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 font-mono">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {item.number}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <FormContainer table="categories" type="update" data={item} />
          <FormContainer table="categories" type="delete" id={item.id} />
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
        <h1 className="text-2xl font-bold">الاصناف</h1>
        <TableSearch />
        <FormContainer table="categories" type="create" />
      </div>
      {isLoading ? (
        // center loader at page
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
          <Loader className="animate-spin" />
          <span className="text-gray-500">جاري التحميل ...</span>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={categories} />
      )}
      {/* if array is empty remove the pagination */}
      {categories.length > 0 && (
        <Pagination
          page={Number(pageNumber)}
          count={pagination?.TotalRecords || 0}
          pagination={pagination}
          onChange={(page) => {
            router.push(
              `/dashboard/categories?pageNumber=${page}&SearchTerm=${searchTerm}`
            );
          }}
        />
      )}
    </div>
  );
};

export default Page;
