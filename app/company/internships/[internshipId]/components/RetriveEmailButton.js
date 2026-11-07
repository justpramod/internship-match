"use client";

import LoadingButton from "@/components/ui/LoadingButton";
import Image from "next/image";
import { useState } from "react";

export default function RetriveEmailButton({
  applicantsList,
  internshipTitle,
}) {
  const [isPending, setIsPending] = useState(false);

  function escapeCSV(value) {
    return `"${String(value).replace(/"/g, '""')}"`;
  }
  function handleOnClick() {
    setIsPending(true);
    let shortlistedApplicantsString = "Name,Email";

    applicantsList.forEach((item) => {
      if (item.status === "accepted") {
        shortlistedApplicantsString += `\n${escapeCSV(item.name)},${escapeCSV(item.email)}`;
      }
    });
    const csvString = [shortlistedApplicantsString];
    const emailBlob = new Blob(csvString, {
      type: "text/csv",
    });

    const url = URL.createObjectURL(emailBlob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${internshipTitle}-shortlisted.csv`;
    document.body.append(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      URL.revokeObjectURL(url);
      setIsPending(false);
    }, 100);
  }
  function checkEmpty() {
    const accepted = applicantsList.find((i) => i.status === "accepted");
    if (!accepted) return true;
    return false;
  }
  return (
    <>
      <button
        disabled={isPending || checkEmpty()}
        onClick={handleOnClick}
        className={`flex items-center w-68 gap-2 ${checkEmpty() ? "bg-gray-400 " : "bg-[#15803d] "}  text-white py-2 px-6 rounded-xl cursor-pointer hover:opacity-80 active:opacity-70`}
      >
        {" "}
        <div className="relative h-5 w-5">
          <Image src="/email-shortlist-logo.svg" fill alt="email-logo" />
        </div>
        <div className="w-full flex justify-center">
          {" "}
          <LoadingButton
            initialValue=" Retrive shortlisted email"
            isPending={isPending}
          />{" "}
        </div>
      </button>
    </>
  );
}
