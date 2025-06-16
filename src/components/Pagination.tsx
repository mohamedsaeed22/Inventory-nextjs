"use client";

import { useRouter } from "next/navigation";

const ITEM_PER_PAGE = 10;

const Pagination = ({ page, count, onChange }: { page: number; count: number; onChange: (page: number) => void }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

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
          changePage(page - 1);
        }}
      >
        السابق
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm cursor-pointer ${
                  page === pageIndex ? "bg-gray-500 text-white font-bold" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-300 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-black"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        التالي
      </button>
    </div>
  );
};

export default Pagination;
