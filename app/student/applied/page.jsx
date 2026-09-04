export const dynamic = "force-dynamic";
import SearchBar from "@/components/SearchBar";
import InternshipCardApplied from "./internshipCardApplied";
import getAppliedInternships from "@/lib/utils/getAppliedInternships";
import BackButton from "@/components/home/BackButton";
import getCompanyLogoUrl from "@/lib/utils/getCompanyLogoUrl";

export default async function AppliedPage({ searchParams }) {
  const { search } = await searchParams;
  const appliedInternhsips = await getAppliedInternships(search);

  let error = false;
  if (!appliedInternhsips || appliedInternhsips.error) error = true;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 mt-3 px-2 md:px-0">
        <div className="flex justify-left">
          <div className="w-full md:w-[70vw]">
            <div className="ml-1">
              {" "}
              <p className="text-2xl font-semibold">Applied Internships</p>
              <p className="text-gray-600">
                Track the status of your Internships applications.
              </p>
            </div>
          </div>
        </div>
        <div className="flex md:gap-[5vw] w-full md:w-[70vw] ">
          {!error && (
            <div className="w-full flex justify-center">
              <div className="w-full md:w-[70vw] pl-2 md:pl-0">
                <SearchBar
                  placeholder={"Search by role, skills, or sectors..."}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex  flex-col justify-center  gap-10">
          {" "}
          <div className="flex justify-start w-full">
            {search && (
              <div className="flex gap-3">
                <BackButton />
                <div className=" font-medium">
                  Showing results for &quot;{search}&quot;
                </div>
              </div>
            )}
          </div>{" "}
          {(error || appliedInternhsips.length === 0) && (
            <div className="flex w-full justify-center items-center text-center md:w-[65vw] h-[40vh] bg-white rounded-xl text-xl font-medium text-gray-500">
              {error
                ? appliedInternhsips.error
                : "You have'nt applied to any internships yet."}
            </div>
          )}
          {!error &&
            appliedInternhsips?.map((internshipData, index) => {
              const company_logo = getCompanyLogoUrl(
                internshipData.internship.company_logo,
              );
              return (
                <InternshipCardApplied
                  key={index}
                  internshipData={internshipData}
                  companyLogo={company_logo}
                />
              );
            })}
          <div className=" flex flex-col gap-9  w-[65vw]"></div>
        </div>
      </div>
    </div>
  );
}
