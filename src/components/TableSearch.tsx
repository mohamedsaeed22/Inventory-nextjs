"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useDeferredValue } from "react";

const TableSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("SearchTerm") || "");
  const deferredSearch = useDeferredValue(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      const current = searchParams.get("SearchTerm") || "";
      if (deferredSearch === current) return;

      const params = new URLSearchParams(window.location.search);
      if (deferredSearch) {
        params.set("SearchTerm", deferredSearch);
      } else {
        params.delete("SearchTerm");
      }

      router.push(`${window.location.pathname}?${params.toString()}`);
    }, 200);

    return () => clearTimeout(handler);
  }, [deferredSearch, router, searchParams]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full md:w-auto flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src="/search.png" alt="ابحث" width={14} height={14} />
      <input
        type="text"
        placeholder="ابحث..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;
