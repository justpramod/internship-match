"use client";

import SectorSelector from "@/app/student/profile/components/SectorSelector";
import { useState } from "react";

export default function SectorSection({ allSectors, error }) {
  const [selectedSector, setSelectedSector] = useState({ _id: "", name: "" });

  function handleSectorSelect(sectorId) {
    const sector = allSectors.find((item) => item._id === sectorId);
    setSelectedSector(sector);
  }
  function handleRemoveSector() {
    setSelectedSector({ _id: "", name: "" });
  }
  return (
    <div className="flex flex-col gap-1 ">
      <div className="text-[1.1rem] font-semibold">Sector</div>
      <div
        className={`flex justify-between gap-2 border px-2 py-1 md:pl-2 md:pr-5 ${error.get("sectorId") && !selectedSector?.name && "border-red-400 focus:outline-none"}`}
      >
        <input type="hidden" name="sectorId" value={selectedSector._id} />
        <div className="flex items-center">
          {" "}
          {selectedSector.name.length === 0 ? (
            <div className="text-gray-400 ">
              Select the sector of the internship.
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#f5f6fc] rounded-xl px-2 py-1 font-medium">
              {selectedSector.name}
              <button
                type="button"
                onClick={() => handleRemoveSector()}
                className="hover:opacity-70  cursor-pointer text-gray-600 rounded-full bg-gray-500 w-5 text-xs h-5 flex justify-center items-center text-white"
              >
                {" "}
                x
              </button>
            </div>
          )}
        </div>

        <SectorSelector
          availableSectors={allSectors}
          handleSectorSelect={handleSectorSelect}
          choose={true}
        />
      </div>
      <span className="text-sm text-red-400">
        {!selectedSector?.name && error.get("sectorId")}
      </span>
    </div>
  );
}
