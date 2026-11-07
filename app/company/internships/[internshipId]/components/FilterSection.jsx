"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterSection({ search }) {
  const [sortByValue, setSortByValue] = useState(search.sortBy || "");

  const [statusValue, setStatusValue] = useState(search.status || "");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(search);

  console.log(pathname);
  console.log(searchParams);

  const statusValues = ["shortlisted", "pending"];

  function handleClearAll() {
    router.replace(pathname);
    setSortByValue("");
    setStatusValue("");
  }

  useEffect(() => {
    console.log(sortByValue);
    if (sortByValue === "" && statusValue === "") {
      router.replace(pathname);
      return;
    }
    const newSortByValue = sortByValue === "matchScore" ? sortByValue : null;
    const newStatusValue = statusValues.includes(statusValue)
      ? statusValue
      : null;

    let query = "";

    if (newSortByValue) {
      query += `sortBy=${newSortByValue}`;
    }
    if (newSortByValue && newStatusValue) {
      query += "&&";
    }
    if (newStatusValue) {
      query += `status=${newStatusValue}`;
    }

    router.replace(`${pathname}?${query}`);
  }, [sortByValue, statusValue]);

  return (
    <div className="flex flex-col gap-5 items-start bg-white rounded py-4 px-6 w-full">
      <div className=" w-full flex justify-between">
        <p className="text-xl font-medium">Filters</p>
        <p
          className=" cursor-pointer hover:underline"
          style={{ color: "#15803d" }}
          onClick={handleClearAll}
        >
          Clear All
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-medium">Sort By</div>
          <div className="flex gap-3 items-center">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              checked={sortByValue === ""}
              onChange={() => {
                setSortByValue("");
              }}
            />
            <p>Latest</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              className="w-5 h-5  cursor-pointer"
              type="checkbox"
              checked={sortByValue === "matchScore"}
              onChange={() => {
                setSortByValue("matchScore");
              }}
            />
            <p>Match Score</p>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-3">
          {" "}
          <div className="font-medium">Application Status</div>
          <div className="flex gap-3 items-center">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              checked={statusValue === ""}
              onChange={() => {
                setStatusValue("");
              }}
            />
            <p>All</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              checked={statusValue === "shortlisted"}
              onChange={() => {
                setStatusValue("shortlisted");
              }}
            />
            <p>Shortlisted</p>
          </div>{" "}
          <div className="flex gap-2 items-center">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              checked={statusValue === "pending"}
              onChange={() => {
                setStatusValue("pending");
              }}
            />
            <p>Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
