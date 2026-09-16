"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

export default function SectorSelector({
  availableSectors,
  handleSectorSelect,
  choose,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        {" "}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shadow-xs  h-fit bg-[#f5f6fc] rounded px-2 py-1 max-w-fit cursor-pointer "
        >
          {choose ? "Select Sector" : "+ Add Sector"}
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="computer science " />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Choose a sector">
              {availableSectors.map((item, index) => (
                <CommandItem
                  onSelect={() => {
                    handleSectorSelect(item._id);
                    setOpen(false);
                  }}
                  key={index}
                >
                  {item.name.toUpperCase()}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
