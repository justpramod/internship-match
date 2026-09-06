import InternshipsCard from "./InternshipsCard";
import { getSuggestedInternships } from "@/lib/utils/getSuggestedInternships";
import BackButton from "./BackButton";
import { auth } from "@/lib/auth";

export default async function InternshipsBlock({ search }) {
  const session = await auth();
  const studentLoggedIn = session?.user?.role === "student";
  const internshipsBySector = await getSuggestedInternships(search);
  let error = false;

  if (internshipsBySector.error) {
    error = true;
  }
  return (
    <div className="flex justify-center">
      {" "}
      <div className="w-[95vw] md:w-[80vw] bg-white py-6 pl-4 md:pl-6  rounded shadow-md">
        {search ? (
          <div className="flex gap-1.5 md:gap-3">
            <BackButton />
            <div className=" md:text-2xl font-medium">
              Showing results for &quot;{search}&quot;
            </div>
          </div>
        ) : (
          <div>
            <div className="text-2xl font-medium">
              {studentLoggedIn
                ? "Suggested Internships"
                : "Featured Internships"}
            </div>
            <div>
              <p className="text-gray-500 ml-3">
                {studentLoggedIn
                  ? "Opportunities that match your sectors in your profile."
                  : "Opportunities from various companies across different sectors."}
              </p>
            </div>
          </div>
        )}
        {error ? (
          <div className="flex justify-center items-center  h-[40vh] bg-white rounded-xl text-xl font-medium text-gray-500">
            Error getting the internhsips. Try again.
          </div>
        ) : internshipsBySector.length === 0 ? (
          <div className="flex justify-center items-center  h-[40vh] bg-white rounded-xl text-xl font-medium text-gray-500">
            {search ? "No internsips found." : " No internsips available."}
          </div>
        ) : (
          <div className="flex flex-col gap-6 mt-6">
            {internshipsBySector?.map((item) => {
              return <InternshipsCard key={item._id} internshipInfo={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
