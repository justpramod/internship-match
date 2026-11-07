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
      <div className="w-[95vw] max-w-6xl rounded-2xl border border-slate-200/80 bg-white/90 py-7 pl-4 shadow-xl shadow-slate-900/5 backdrop-blur-sm md:w-[80vw] md:pl-7">
        {search ? (
          <div className="flex gap-1.5 md:gap-3">
            <BackButton />
            <div className="text-lg font-semibold text-slate-950 md:text-2xl">
              Showing results for &quot;{search}&quot;
            </div>
          </div>
        ) : (
          <div>
            <div className="text-2xl font-semibold tracking-tight text-slate-950">
              {studentLoggedIn
                ? "Suggested Internships"
                : "Featured Internships"}
            </div>
            <div>
              <p className="ml-3 mt-1 text-sm text-slate-500">
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
