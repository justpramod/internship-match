import { getTimeAgo } from "@/utils/getTimeAgo";
import { mapSkills } from "@/utils/mapSkills";
import Image from "next/image";
import Link from "next/link";

export default function ReleasedIternshipCard({ internshipInfo }) {
  const pendingCount =
    internshipInfo.totalApplications -
    (internshipInfo.acceptedCount + internshipInfo.rejectedCount);
  return (
    <div className="border-b flex flex-col gap-3 md:pr-2">
      <div className="flex justify-between">
        <div className="text-xl font-medium">{internshipInfo.title}</div>
        <div
          className={`${internshipInfo.isClosed ? "bg-gray-200 opacity-80" : "bg-[#d1fae5]"} px-2 rounded-xl py-1 h-fit`}
        >
          {internshipInfo.isClosed ? "Closed" : "Open"}
        </div>
      </div>
      <div className="flex gap-3 text-gray-500 ">
        <div className="flex gap-1 items-center">
          <div className="relative w-4 h-4">
            <Image src="/location-logo.svg" fill alt="type-icon" />
          </div>
          {internshipInfo.type}
        </div>
        <div className="flex gap-1 items-center">
          {" "}
          <div className="relative w-4 h-4">
            <Image src="/time-period.svg" fill alt="type-icon" />
          </div>
          Posted {getTimeAgo(internshipInfo.createdAt)}
        </div>
      </div>
      <div className="flex flex-wrap  gap-3">
        {internshipInfo.required_skills?.map(mapSkills)}
      </div>
      <div className="border-t border-gray-100  flex justify-between py-7 items-center">
        <div className="flex flex-col md:flex-row gap-5 ">
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">
              {internshipInfo.totalApplications}
            </div>
            <div className="text-gray-500 text-[0.9rem]">Total Applicants</div>
          </div>
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">
              {internshipInfo.acceptedCount}
            </div>
            <div className="text-gray-500 text-[0.9rem]">Shortlisted</div>
          </div>
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">
              {internshipInfo.rejectedCount}
            </div>
            <div className="text-gray-500 text-[0.9rem]">Rejected</div>
          </div>
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">{pendingCount}</div>
            <div className="text-gray-500 text-[0.9rem]">Pending</div>
          </div>
        </div>
        <div>
          <Link href={`internships/${internshipInfo._id}`}>
            {" "}
            <div className="border p-2 rounded bg-[#f5f6fc] hover:underline transition-all duration-100 ease-in-out hover:opacity-70 active:opacity-50 select-none cursor-pointer">
              View Applicants
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
