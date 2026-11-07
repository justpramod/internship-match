"use client";

import Link from "next/link";
import DetailedInfoSection from "./DetailedInfoSection";
import SummaryInfoSection from "./SummaryInfoSection";
import { useActionState, useEffect } from "react";
import handlePostNewInternshipAction from "@/actions/company/handlePostNewInternhsipAction";
import LoadingButton from "@/components/ui/LoadingButton";
import { useRouter } from "next/navigation";

export default function InternshipForm({ allSectors }) {
  const [state, formAction, isPending] = useActionState(
    handlePostNewInternshipAction,
    null,
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.replace("/company/internships");
    }
  }, [state, router]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };
  return (
    <form
      className="flex flex-col gap-8"
      onKeyDown={handleKeyDown}
      action={formAction}
    >
      <SummaryInfoSection
        rawData={state?.rawData}
        errorMessageArray={state?.messageArray}
      />
      <DetailedInfoSection
        allSectors={allSectors}
        state={state}
        isPending={isPending}
      />
      <div className="flex justify-end gap-8 px-7 items-center">
        <Link href={"/company/internships"}>
          <button
            type="button"
            className="bg-white  py-2 px-6 rounded cursor-pointer"
          >
            Cancel
          </button>
        </Link>
        <button
          disabled={isPending}
          type="submit"
          className="bg-[#15803d] text-white py-2 px-6 rounded cursor-pointer"
        >
          <LoadingButton
            initialValue="Post Internship"
            pendingValue="Posting"
            isPending={isPending}
          />
        </button>
      </div>
    </form>
  );
}
