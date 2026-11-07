import Image from "next/image";
import { getMatchColour } from "@/lib/utils/getInternshipsWithMatchScore.js";
export default function TitleSection({ internshipData, isAdmin }) {
  const matchColour =
    internshipData.matchColour ||
    getMatchColour(internshipData.matchScore) ||
    "#e5e7eb";

  console.log(internshipData.company_logo);
  return (
    <div className="flex justify-between border-b pb-6">
      <div className="flex justify-start gap-5">
        {" "}
        <div className="relative w-18 h-18 border rounded">
          <Image
            fill
            alt="company-logo"
            src={internshipData?.company_logo}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold">{internshipData?.title}</div>
          <div className="text-[#15803d] font-medium text-[1.2rem] ">
            {internshipData?.company_name}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {!isAdmin && <div
          className={`flex gap-2 rounded-2xl py-1 px-2 text-[0.9rem] font-medium`}
          style={{ backgroundColor: matchColour }}
        >
          {" "}
          {internshipData.matchScore > 10 ? (
            <div>{internshipData.matchScore}%</div>
          ) : (
            <div>N/A</div>
          )}
          Match
        </div>}
        {internshipData.isClosed && (
          <div className="bg-gray-300 px-2 py-1 rounded-xl">Closed </div>
        )}
      </div>
    </div>
  );
}
