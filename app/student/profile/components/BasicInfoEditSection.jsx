"use client";

import LoadingButton from "@/components/ui/LoadingButton";
import Image from "next/image";

export default function BasicInfoEditSection({
  editingInfo,
  isPending,
  handleCancel,
  title,
}) {
  return (
    <div className="flex items-center justify-between ">
      <div className={` font-medium ${title ? "text-xl" : "text-2xl"}`}>
        {title ? title : "Basic Information"}
      </div>
      {!editingInfo.editing ? (
        <button
          type="button"
          onClick={() => editingInfo.setEditing(true)}
          className="shadow-xs h-10 bg-[#f5f6fc] rounded px-2 py-1  flex items-center gap-1 cursor-pointer"
        >
          <div className="relative w-5 h-4">
            {" "}
            <Image src="/edit-logo.svg" fill alt="edit-logo" />
          </div>
          Edit
        </button>
      ) : (
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="shadow-xs h-10 bg-[#f5f6fc] rounded px-2 py-1 disabled:opacity-70  cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#15803d] h-10 text-white px-2 py-1 flext justify-center min-w-30 rounded flex items-center gap-2 disabled:opacity-70  cursor-pointer"
          >
            <LoadingButton
              initialValue="Save"
              pendingValue="Saving"
              isPending={isPending}
            />{" "}
          </button>{" "}
        </div>
      )}
    </div>
  );
}
