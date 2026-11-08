import { formatSalary } from "@/utils/formatSalary";
import Image from "next/image";
import ApplyButton from "./ApplyButton";
import { mapSkills } from "@/utils/mapSkills";
import { getRemainingTime } from "@/utils/getTimeAgo";
import closeInternship from "@/lib/utils/closeInternship";

export default function InternshipsCard({ internshipInfo }) {
  const internshipId = internshipInfo._id?.toString();
  let timeRemaining = getRemainingTime(internshipInfo.application_date);
  let isClosed = false;
  if (timeRemaining === "Closed") {
    isClosed = true;
    closeInternship(internshipId);
  }
  if (internshipInfo.isClosed) {
    timeRemaining = "Closed";
    isClosed = true;
  }

  return (
    <div className="flex items-center justify-between rounded-xl border-b-2 border-slate-200 bg-white pb-8 pt-4 pr-2 transition hover:border-green-200 md:items-start md:pl-4 md:pr-8">
      <div className="flex justify-start gap-2 md:gap-4">
        {" "}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 flex-shrink-0 select-none flex items-center justify-center overflow-hidden">
          <Image
            src={internshipInfo?.company_logo}
            width={64}
            height={64}
            alt="logo"
            className="object-contain w-12 h-12 md:w-14 md:h-14"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-xl text-slate-900">{internshipInfo.title}</div>
          <div className="grid gap-1.5 text-slate-500 select-none md:flex md:gap-4">
            <div className="flex gap-1">
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/company.svg" fill alt="company" />
              </div>
              {internshipInfo.company_name}
            </div>
            <div className="flex gap-1">
              {" "}
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/location.svg" fill alt="company" />
              </div>
              {internshipInfo.type === "remote"
                ? "remote"
                : `${internshipInfo.company_location} (${internshipInfo.type})`}
            </div>
            <div className="flex gap-1">
              {" "}
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/money-icon.svg" fill alt="company" />
              </div>
              {formatSalary(internshipInfo.salary)} / month
            </div>
            <div
              className={`w-fit flex items-center h-fit gap-1 ${timeRemaining === "Closed" && "bg-gray-300 px-1.5 rounded-xl"}`}
            >
              {" "}
              <div className="relative h-4 w-4 ">
                {" "}
                <Image src="/time-period.svg" fill alt="company" />
              </div>
              {timeRemaining}{" "}
            </div>
          </div>
          <div className="flex-wrap flex gap-1 md:gap-3 items-center">
            {internshipInfo.matchedSkills && (
              <div className="text-slate-500">Matched skills:</div>
            )}
            {internshipInfo.matchedSkills
              ? internshipInfo.matchedSkills.map(mapSkills)
              : internshipInfo?.required_skills?.map(mapSkills)}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center">
        {!isNaN(internshipInfo.matchScore) && (
          <div
            className={`rounded-2xl w-fit px-4  text-sm text-center py-0.5`}
            style={{ backgroundColor: internshipInfo.matchColour }}
          >
            {internshipInfo.matchScore}% Match
          </div>
        )}
        <ApplyButton
          internshipId={internshipId}
          isApplied={internshipInfo.isApplied}
          isClosed={isClosed}
        />
      </div>
    </div>
  );
}
