import { mapSkills } from "@/utils/mapSkills";
import Image from "next/image";
import Link from "next/link";

export default function NewApplicantCard({ applicantInfo }) {
  return (
    <div>
      {" "}
      <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start rounded py-4  md:px-6 justify-between w-full border-b">
        {" "}
        <div className="flex gap-5 items-start">
          {" "}
          <div>
            <div className="relative w-18 h-18 rounded-full overflow-hidden">
              <Image
                src={applicantInfo.profile_pic}
                fill
                alt="profile_pic"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex gap-4 items-center">
              <div className="text-xl font-medium">{applicantInfo.name}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center text-gray-500 font-medium">
              <div className="flex gap-1 items-center">
                <div className="relative w-5 h-5 shrink-0">
                  <Image
                    src={"/university-logo.svg"}
                    fill
                    alt="university-icon"
                  />
                </div>
                {applicantInfo.major || "--"},{" "}
                {applicantInfo.university || "--"}
              </div>
              <div className="flex items-center gap-0.5">
                <div className="relative w-4 h-5 ">
                  <Image src={"/applied-icon.svg"} fill alt="batch-icon" />
                </div>
                Batch {applicantInfo.batch_year || "--"}
              </div>

              <div className="flex items-center gap-1 text-[#2762ea]">
                <Link
                  className="flex items-center gap-1"
                  href={`/company/internships/${applicantInfo.internship_id}`}
                >
                  <span className="text-4xl">&middot;</span>{" "}
                  <p className="hover:underline hover:opacity-90 active:opacity-75">
                    {applicantInfo.internshipTitle || "--"}
                  </p>{" "}
                </Link>{" "}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {applicantInfo.matched_skills.length !== 0 ? (
                applicantInfo.matched_skills?.map(mapSkills)
              ) : (
                <div className="bg-[#f5f6fc] rounded-xl py-1 px-8 text-gray-600 select-none">
                  --
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full md:w-auto">
          <Link
            href={`/company/applicant/${applicantInfo._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded hover:opacity-80 active:opacity-60 hover:underline  flex justify-center items-center py-2 px-4 cursor-pointer"
          >
            <div>View Applicant</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
