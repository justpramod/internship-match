"use client";

import LoadingButton from "@/components/ui/LoadingButton";
import Image from "next/image";

export default function EditSection({
  editingInfo,
  isPending,
  titleInfo,
  handleCancel,
  handleSave,
}) {
  return (
    <div className="flex justify-between ">
      <div>
        <div className=" font-medium text-2xl">{titleInfo.title}</div>
        <div className="text-gray-600">{titleInfo?.text}</div>
      </div>
      {!editingInfo.editing ? (
        <button
          type="button"
          onClick={() => editingInfo.setEditing(true)}
          className="shadow-xs h-10 bg-[#f5f6fc] rounded px-2 py-1 width: , text flex items-center gap-1"
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
            className="shadow-xs h-10 bg-[#f5f6fc] rounded px-2 py-1 text disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="bg-[#15803d] h-10 text-white px-2 py-1 flext justify-center min-w-30 rounded flex items-center gap-2 disabled:opacity-70"
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
