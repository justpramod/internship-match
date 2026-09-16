import CloseInternshipPopup from "./CloseInternshipPopup";

export default function CloseInternshipSection({ internshipId }) {
  return (
    <div className="flex flex-col gap-5 items-start bg-white rounded py-4 px-6 w-full">
      <div className="w-full flex flex-col gap-2">
        <p className="text-xl font-medium">Close Internship</p>
        <div className="flex flex-col gap-2">
          {" "}
          <div className="flex justify-between md:gap-2 items-center ">
            <p> Close to new applicants</p>
            <CloseInternshipPopup internshipId={internshipId} />
          </div>
        </div>
      </div>
    </div>
  );
}
