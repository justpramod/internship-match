"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import { useEffect, useState } from "react";
export default function ConfirmPopup({
  trigger,
  message,
  handleResponse,
  errorInfo,
  pendingInfo,
}) {
  const [open, setOpen] = useState(false);

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
          className={`flex border  items-center hover:opacity-70 active:opacity-50 transition-all duration-100 ease-in-out h-10  cursor-pointer rounded px-6 py-1 max-w-fit`}
          style={{ backgroundColor: trigger.color, color: trigger.textColor || "black" }}
        >

          {trigger.value}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-medium"> {message.title}</div>
            <div className=" text-xl text-gray-500">
              {message.value}&nbsp;<span className="font-medium text-gray-600"> {message.unit}</span>?
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
              onClick={async () => {
                const closePopup = await handleResponse(trigger.value);
                console.log(closePopup);
                if (closePopup) { setOpen(false) }
              }}
              className="px-6 bg-[#15803d] py-2 rounded text-white cursor-pointer hover:opacity-70 active:opacity-50"
              type="button"

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
