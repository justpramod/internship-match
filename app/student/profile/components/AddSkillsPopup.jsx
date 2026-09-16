import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddSkillsPopup({ handleAddSkill, currentSkills }) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false); // controlled open state

  const handleAdd = () => {
    if (inputValue.trim() === "") return;

    const repeatedValue = currentSkills.filter(
      (item) => item.toLowerCase() === inputValue.toLowerCase().trim(),
    );

    setInputValue("");
    setOpen(false);
    if (!repeatedValue.length) handleAddSkill(inputValue);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center h-fit bg-[#f5f6fc] rounded px-2 py-1 max-w-fit">
          + Add Skill
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add new skill</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="flex w-full gap-2 border-2 text-xl rounded-2xl bg-white">
            <input
              placeholder="react"
              className="w-full px-2 py-1 text-md focus:outline-none focus:ring-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
            />
            <button
              type="button"
              className="rounded-2xl bg-[#2762ea] text-white py-2 px-3"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
