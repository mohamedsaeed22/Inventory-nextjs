"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
  pagination?: {
    CurrentPage?: number;
    TotalPages?: number;
    PageSize?: number;
    TotalRecords?: number;
    HasPrivous?: boolean;
    HasNext?: boolean;
  };
}

const Pagination = ({ page, count, onChange, pagination }: PaginationProps) => {
  const router = useRouter();

  // Use the new pagination structure if available, otherwise fall back to the old logic
  const currentPage = pagination?.CurrentPage || page;
  const totalPages =
    pagination?.TotalPages || Math.ceil(count / (pagination?.PageSize || 10));
  const hasPrev =
    pagination?.HasPrivous !== undefined ? pagination.HasPrivous : page - 1 > 0;
  const hasNext =
    pagination?.HasNext !== undefined
      ? pagination.HasNext
      : page * (pagination?.PageSize || 10) < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("pageNumber", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
    onChange(newPage);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-300 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-black"
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        السابق
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm cursor-pointer ${
                currentPage === pageIndex
                  ? "bg-gray-500 text-white font-bold"
                  : ""
              }`}
              onClick={() => {
                changePage(pageIndex);
              }}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-300 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-black"
        disabled={!hasNext}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        التالي
      </button>
    </div>
  );
};

export default Pagination;
