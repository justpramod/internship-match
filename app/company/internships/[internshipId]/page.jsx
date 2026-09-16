import Back from "@/components/company/Back";
import ApplicationSection from "./components/ApplicantsSection";
import FilterSection from "./components/FilterSection";
import getApplicants from "@/lib/utils/company/getApplicants";
import CloseInternshipSection from "./components/CloseInternshipSection";
import RetriveEmailButton from "./components/RetriveEmailButton";

export default async function InternshipApplicants({ params, searchParams }) {
  const { internshipId } = await params;
  const { sortBy, status } = await searchParams;
  console.log(sortBy, status);
  const { applicantsList, internshipTitle, isClosed } = await getApplicants(
    internshipId,
    sortBy,
    status,
  );
  return (
    <div className="flex justify-center px-4 md:px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div>
          <Back message={"Back to internships"} />{" "}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <p className="text-2xl md:text-3xl font-semibold break-words">
            {" "}
            Applicants for {internshipTitle}{" "}
          </p>
          {isClosed && (
            <span className=" px-2 rounded-xl py-1 text-md font-medium bg-gray-300">
              Closed
            </span>
          )}
        </div>
        <div className="flex justify-end">
          {" "}
          <RetriveEmailButton
            applicantsList={applicantsList}
            internshipTitle={internshipTitle}
          />{" "}
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="order-2 md:order-none flex flex-col gap-6 w-full md:w-auto">
            {applicantsList?.length !== 0 ? (
              applicantsList.map((item, index) => {
                return <ApplicationSection key={index} applicantInfo={item} />;
              })
            ) : (
              <div className="flex bg-white rounded py-4 px-6 justify-center items-center min-h-[30vh] w-full md:w-[65vw]">
                <p className="text-gray-400 font-medium text-lg md:text-xl text-center">
                  {status
                    ? "No Applicants matching the filters found."
                    : "No applicants for this internship."}
                </p>
              </div>
            )}
          </div>
          <div className="order-1 md:order-none w-full flex flex-col gap-4">
            <FilterSection search={{ sortBy, status }} />
            {!isClosed && (
              <CloseInternshipSection internshipId={internshipId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
