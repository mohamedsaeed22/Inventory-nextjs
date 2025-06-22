"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

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
  const [goToPage, setGoToPage] = useState("");

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

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      changePage(pageNum);
      setGoToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  // Generate page numbers with ellipsis for better UX
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show pages 2, 3, 4, 5, 6, 7, ..., last
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first, ..., last-6, last-5, last-4, last-3, last-2, last-1, last
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first, ..., current-1, current, current+1, ..., last
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between py-4 px-4">
      {/* Left - Go to page input */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 font-medium">اذهب إلى:</span>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="الرقم"
            className="w-16 h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center"
          />
          <button
            onClick={handleGoToPage}
            disabled={
              !goToPage ||
              parseInt(goToPage) < 1 ||
              parseInt(goToPage) > totalPages
            }
            className="px-3 py-1 text-xs bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            اذهب
          </button>
        </div>
      </div>

      {/* Center - Navigation buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          disabled={!hasPrev}
          onClick={() => changePage(currentPage - 1)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md border text-sm font-medium
            transition-all duration-200 ease-in-out
            ${
              hasPrev
                ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-sm"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
          aria-label="السابق"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNum, index) => (
            <div key={index}>
              {pageNum === "..." ? (
                <span className="px-2 py-1 text-gray-400 text-sm">...</span>
              ) : (
                <button
                  onClick={() => changePage(pageNum as number)}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-md border text-sm font-medium
                    transition-all duration-200 ease-in-out
                    ${
                      currentPage === pageNum
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm hover:bg-emerald-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-emerald-200 hover:text-emerald-600"
                    }
                  `}
                >
                  {pageNum}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          disabled={!hasNext}
          onClick={() => changePage(currentPage + 1)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md border text-sm font-medium
            transition-all duration-200 ease-in-out
            ${
              hasNext
                ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-sm"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
          aria-label="التالي"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Right - Page info */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 font-medium">الصفحة:</span>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold text-emerald-600">
            {currentPage}
          </span>
          <span className="text-sm text-gray-400">من</span>
          <span className="text-sm font-medium text-gray-700">
            {totalPages}
          </span>
        </div>
        {pagination?.TotalRecords && (
          <div className="flex items-center space-x-1 ml-3">
            <span className="text-xs text-gray-500">
              ({pagination.TotalRecords} عنصر)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
