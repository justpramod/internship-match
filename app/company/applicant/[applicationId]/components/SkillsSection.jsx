import Image from "next/image";
import SkillsBlock from "./SkillsBlock";

export default function SkillsSection({ applicantInfo }) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-5 justify-between">
      {" "}
      <div className=" bg-white rounded py-4 px-6 w-full">
        <div className="flex flex-col gap-3 items-start  h-fit">
          <div className="font-medium text-xl">Education</div>
          <div className="flex gap-2 items-start">
            <div className=" bg-gray-100 p-2 rounded">
              <div className="relative w-8 h-5 ">
                <Image
                  src={"/university-logo.svg"}
                  fill
                  sizes="5vw"
                  alt="university-icon"
                />
              </div>
            </div>
            <div>
              <p className="font-medium">{applicantInfo.university || "--"}</p>
              <p className="text-sm text-gray-500">
                {applicantInfo.major || "--"},{" "}
                {applicantInfo.batch_year || "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SkillsBlock
        title={"Matched Skills"}
        skillsList={applicantInfo?.matched_skills}
      />
      <SkillsBlock
        title={"Student Skills"}
        skillsList={applicantInfo?.skills}
      />
    </div>
  );
}
