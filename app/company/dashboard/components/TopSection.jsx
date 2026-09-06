import Image from "next/image";
import RoleInfoCard from "./RoleInfoCard";
import SelectFilter from "./SelectFilter";

export default function TopSection({ dashboardData, filter }) {
  const intersnhipDataForCards = [
    {
      title: "Released internships",
      logo: "/applied-icon.svg",
      value: dashboardData.totalInternshipsCount,
      message: "Total listings created by your company",
    },
    {
      title: "Open roles",
      logo: "/open-role-icon.svg",
      value: dashboardData.openInternshipsCount,
      message: "Currently accepting applications",
    },
    {
      title: "Closed roles",
      logo: "/closed-role-icon.svg",
      value: dashboardData.closedInternshipsCount,
      message: "Hiring completed",
    },
    {
      title: "Average per open role",
      logo: "/openings-icon.svg",
      value: dashboardData.AverageOpenApplicationsCount,
      message: "Applications per currently open internships",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Company Dashboard</h1>
          <div className="flex gap-2 items-center text-gray-500 text-sm">
            <p className="relative w-4 h-4">
              <Image src="/applied-icon.svg" alt="icon" fill />
            </p>
            {dashboardData.totalInternshipsCount || "--"} internships released
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-3 shadow-md flex flex-col gap-2">
          <div className="flex justify-end md:justify-start items-center">
            <SelectFilter filterValue={filter} />
          </div>
          <p className="text-2xl font-semibold">
            {dashboardData.totalApplicationsCount || "--"}
          </p>
          <p className="text-gray-500 text-sm">
            Total applications received across open and closed internship
            listings.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between">
        {intersnhipDataForCards.map((item, index) => {
          return <RoleInfoCard key={index} data={item} />;
        })}
      </div>
    </div>
  );
}
