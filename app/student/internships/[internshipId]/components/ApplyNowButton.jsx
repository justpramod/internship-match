"use client";
import handleApplyNowAction from "@/actions/student/handleApplyNowAction";
import LoadingButton from "@/components/ui/LoadingButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MessagePopup from "./MessagePopup";

export default function ApplyNowButton({
  internshipId,
  blockApply,
  isApplied,
}) {
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();
  async function handleApply() {
    try {
      setIsPending(true);
      const response = await handleApplyNowAction(internshipId);

      if (response) {
        setIsPending(false);
        setResponse(response);
      }
    } catch (error) {
      setIsPending(false);
      setResponse({ error: "Failed to  apply to the internship." });
    }
    router.refresh();
  }
  return (
    <>
      <button
        onClick={handleApply}
        className={`${blockApply ? "bg-gray-400 cursor-not-allowed " : "bg-[#15803d] cursor-pointer hover:opacity-70 active:opacity-50"} text-white py-2 px-6 rounded flex  items-center w-full justify-center  `}
        disabled={blockApply}
      >
        <div className="w-8 h-5 relative">
          {" "}
          <Image src="/apply-icon.svg" fill alt="apply-icon" />
        </div>
        {isApplied ? (
          "Applied"
        ) : (
          <div>
            <LoadingButton
              initialValue="Apply Now"
              pendingValue="Applying"
              isPending={isPending}
            />
          </div>
        )}
      </button>
      {response && (
        <MessagePopup response={response} setResponse={setResponse} />
      )}
    </>
  );
}
