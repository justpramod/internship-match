import Back from "@/components/company/Back";

import getAllSectors from "@/lib/utils/getAllSectors";
import InternshipForm from "./components/InternshipForm";

export default async function NewInternship() {
  const allSectors = await getAllSectors();
  return (
    <div className="felx justify-center px-2 md:px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div className="flex flex-col gap-2">
          <div className="flex text-gray-500 font-medium items-center">
            <Back message={"Back to internships"} />
          </div>
          <div className="flex justify-start">
            <div className="text-3xl font-semibold">Post New Internship</div>
          </div>
        </div>
        <InternshipForm allSectors={allSectors} />
      </div>
    </div>
  );
}
