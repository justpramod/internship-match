"use client";

import handleAddSectorAction from "@/actions/admin/handleAddSectorAction";
import { useActionState, useEffect, useRef } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
export default function AddNewSectorSection() {
  const [state, formAction, isPending] = useActionState(
    handleAddSectorAction,
    null,
  );

  const inputRef = useRef(null);

  useEffect(() => {
    if (!state?.error) {
      inputRef.current.blur()
    }
  }, [state?.error]);

  return (
    <div className="p-5 bg-white flex flex-col rounded gap-3">
      <p className="font-medium">Add New Sector</p>
      <div className="flex flex-col gap-1">
        <p>Sector Name</p>
        <form className="flex gap-6 items-center" action={formAction}>
          <input ref={inputRef} className="border-2 px-2 py-1 flex-1 min-w-0 rounded" name="sector" />
          <button type="submit" className="bg-[#15803d] text-white py-2 px-3 rounded cursor-pointer flex items-center justify-center  ">
            <LoadingButton
              isPending={isPending}
              initialValue="Add Sector"
              pendingValue="Adding"
            />
          </button>

        </form>
        {state?.error && (
          <p className="text-red-400 flex justify-center">{state.error}</p>
        )}


      </div>
    </div>
  );
}
