import Image from "next/image";
import InternshipInfoSections from "./InternshipInfoSections";
import WithdrawButton from "@/app/student/applied/WithdrawButton";

export default async function ApplicationDetailsSection({ internshipData }) {
  const colorsMap = {
    pending: "#dbeafe",
    accepted: "#bfdbfe",
    rejected: "#fee2e2",
  };
  const dataArray = [
    {
      name: "Status",
      value: internshipData.status,
      iconSrc: "/status-icon.svg",
      bgColour: colorsMap[internshipData.status],
    },
    {
      name: "Applied Date",
      value: internshipData.appliedDate?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      iconSrc: "/applied-date-icon.svg",
    },
  ];

  const messageMap = {
    accepted: "You’ve been selected! Check your email for next steps.",
    rejected: "Not selected this time.",
  };

  return (
    <div className="bg-white p-5 rounded flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">Application Details</div>
        <div className="flex flex-col gap-2">
          {dataArray.map((item, index) => (
            <InternshipInfoSections key={index} item={item} />
          ))}
        </div>
        {internshipData.status === "pending" ? (
          <div className="flex justify-center">
            <WithdrawButton
              internshipId={internshipData.internshipId}
              isClosed={internshipData.isClosed}
            />{" "}
          </div>
        ) : (
          <div
            className="text-center rounded px-2 py-1"
            style={{ backgroundColor: colorsMap[internshipData.status] }}
          >
            {messageMap[internshipData.status]}
          </div>
        )}
      </div>
    </div>
  );
}
