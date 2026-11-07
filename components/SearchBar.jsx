"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchBar({ placeholder }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue === "") return;

    //check if there is filter
    const filter = searchParams.get("filter");
    if (filter) {
      router.replace(`${pathname}?search=${inputValue}&filter=${filter}`);
      return;
    }
    router.replace(`${pathname}?search=${inputValue}`);
    setInputValue("");
    inputRef?.current?.blur();
  }

  return (
    <div className="w-full">
      {" "}
      <div className="rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/5">
        {" "}
        <form
          className="flex justify-between gap-4 px-2 py-1"
          onSubmit={handleSubmit}
        >
          {" "}
          <input
            ref={inputRef}
            className="w-full bg-transparent px-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            placeholder={`${placeholder}`}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            type="submit"
            className="rounded-xl bg-green-700 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
