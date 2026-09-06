import getDashboardData from "@/lib/utils/company/getDashboardData";
import TopSection from "./components/TopSection";
import MostAppliedGraphSection from "./components/MostAppliedGraphSection";
import ApplicationStatusGraphSection from "./components/ApplicationStatusGraphSection";
import NewApplicantsSection from "./components/NewApplicantsSection";

export default async function Dashboard({ searchParams }) {
  const { filter } = await searchParams;
  const dashboardData = await getDashboardData(filter);
  console.log(dashboardData);
  if (!dashboardData || dashboardData.error)
    return (
      <div className="bg-white flex justify-center items-center w-full h-[80vh] text-xl font-medium text-gray-500">
        {dashboardData?.error || "Failed getting dashboard data."}
      </div>
    );
  return (
    <div className="px-3 md:px-10 py-4 flex flex-col gap-10">
      <TopSection dashboardData={dashboardData} filter={filter} />
      <MostAppliedGraphSection
        internshipData={dashboardData.internshipData}
        filter={filter}
      />
      <ApplicationStatusGraphSection
        dashboardData={dashboardData}
        filter={filter}
      />
      <NewApplicantsSection applicantsInfo={dashboardData.applicantsInfo} />
    </div>
  );
}
