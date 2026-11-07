"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import { useEffect, useState } from "react";
export default function ConfirmPopup({
  value,
  applicantName,
  handleResponse,
  errorInfo,
  pendingInfo,
}) {
  const [open, setOpen] = useState(false);
  const message =
    value === "Shortlist"
      ? "Shortlist this candidate?"
      : "Reject this candidate?";

  const status = value === "Shortlist" ? "accepted" : "rejected";

  const colour = value === "Shortlist" ? "#86efac" : "#ef8686";

  useEffect(() => {
    if (!open) {
      errorInfo.setError(null);
      pendingInfo.setIsPending(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      <DialogTrigger>
        <div
          className={`flex items-center hover:opacity-70 active:opacity-50 transition-all duration-100 ease-in-out h-10 ${value === "Shortlist" ? "bg-[#15803d] text-white" : " bg-[#f5f6fc] border"} cursor-pointer rounded px-6 py-1 max-w-fit`}
        >
          {value}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-medium"> {message}</div>
            <div className="flex justify-center font-medium text-xl">
              {applicantName}
            </div>
          </div>
          <div>
            {errorInfo.error && (
              <p className="text-red-400 flex justify-center">
                {errorInfo.error}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-8 select-none">
            <button
              disabled={pendingInfo.isPending}
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded border cursor-pointer bg-white  hover:opacity-70 active:opacity-50"
            >
              No
            </button>
            <button
              disabled={pendingInfo.isPending}
              className="px-6 py-2 rounded cursor-pointer hover:opacity-70 active:opacity-50"
              type="button"
              onClick={() => {
                handleResponse(status);
              }}
              style={{ backgroundColor: colour }}
            >
              <LoadingButton
                initialValue="Yes"
                pendingValue="."
                isPending={pendingInfo.isPending}
              />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
