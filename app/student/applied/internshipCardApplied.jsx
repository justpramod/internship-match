import { formatSalary } from "@/utils/formatSalary";
import Image from "next/image";
import ViewButton from "./ViewButton";
import WithdrawButton from "./WithdrawButton";
import { getTimeAgo } from "@/utils/getTimeAgo";

export default function InternshipCardApplied({ internshipData, companyLogo }) {
  const internshipInfo = internshipData.internship;
  const internshipId = internshipInfo._id.toString();

  const colorsMap = {
    pending: "#dbeafe",
    accepted: "#bfdbfe",
    rejected: "#fee2e2",
  };
  return (
    <div className=" flex flex-col  gap-4 border-b-2 border-gray-200 pt-4 pb-5  pl-4 pr-8 bg-white rounded-xl">
      {" "}
      <div className="flex justify-between">
        <div className="flex justify-start gap-4">
          {" "}
          <div className="relative w-16 h-16 rounded-full  select-none">
            <Image
              src={companyLogo}
              fill
              alt="logo"
              className="object-cover"
            />{" "}
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-xl ">{internshipInfo.title}</div>
            <div className="flex flex-col md:flex-row md:gap-4 gap-2 text-gray-600 select-none">
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
              <div className="flex gap-1">
                {" "}
                <div className="relative h-4 w-4 top-1">
                  {" "}
                  <Image src="/calendar-icon.svg" fill alt="company" />
                </div>
                Applied: {getTimeAgo(internshipData.applied_date)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex  gap-8 items-center">
          <div
            className={`rounded-xl text-center px-2.5 py-1`}
            style={{ backgroundColor: colorsMap[`${internshipData.status}`] }}
          >
            {internshipData.status}{" "}
          </div>
        </div>
      </div>
      <hr className="w-full border border-gray-100" />
      <div className="flex justify-end ">
        <div className="flex gap-10 items-center">
          {internshipData.status === "pending" && (
            <div>
              <WithdrawButton
                internshipId={internshipId}
                isClosed={internshipInfo.isClosed}
              />
            </div>
          )}
          <div>
            <ViewButton internshipId={internshipId} />
          </div>
        </div>
      </div>
    </div>
  );
}
