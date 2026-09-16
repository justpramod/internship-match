export const dynamic = "force-dynamic";
import getReleasedInternships from "@/lib/utils/company/getReleasedInternships";
import Link from "next/link";
import ReleasedIternshipCard from "./ReleasedInternhsipCard";

export default async function Internships() {
  const releasedInternships = await getReleasedInternships();

  if (releasedInternships.error) return <div>error</div>;
  return (
    <div className="felx justify-center px-2 md:px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div className="flex justify-start">
          <div className="text-2xl font-semibold">Manage Internships</div>
        </div>
        <div>
          <div className="flex items-center justify-between bg-white py-6 px-6 rounded ">
            <div className="text-xl font-semibold">Post New Internhsip</div>
            <div>
              <Link href="internships/new">
                {" "}
                <button className="bg-[#2762ea] text-white py-2 px-8 rounded hover:opacity-80 active:opacity-60   cursor-pointer">
                  Post Internship
                </button>
              </Link>
            </div>
          </div>{" "}
        </div>
        <div>
          <div className="flex flex-col  items-left bg-white py-6 px-2 md:px-6 rounded gap-9">
            <div className="font-medium text-2xl">Released Internships</div>
            <div className="flex flex-col gap-6">
              {releasedInternships.map((internshipInfo, index) => {
                return (
                  <ReleasedIternshipCard
                    key={index}
                    internshipInfo={internshipInfo}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
