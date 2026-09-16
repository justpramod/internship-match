import Image from "next/image";
import ResumeDownloadButton from "./ResumeDownloadButton";

export default function ResumeSection({ applicantInfo }) {
  const resumeUrl = applicantInfo.resumeUrl;
  const fileName = applicantInfo.fileName;
  const resumeUrlDownload = applicantInfo.resumeUrlDownload;

  return (
    <div className="w-full">
      {" "}
      <div className="flex w-full flex-col sm:flex-row gap-4 items-start sm:items-center bg-white rounded py-4 px-4 md:px-6 justify-between">
        {" "}
        <div
          className="flex gap-2 items-center
          "
        >
          {" "}
          <div className="relative h-8 w-8 ">
            <Image src="/file-logo.svg" fill alt="file-icon" />
          </div>
          <p className="font-medium break-all">{fileName}</p>
        </div>
        <div>
          <ResumeDownloadButton
            resumeUrl={resumeUrlDownload}
            fileName={fileName}
          />
        </div>
      </div>
      <div className="w-full flex justify-center my-4">
        {resumeUrl ? (
          <iframe
            className="w-full md:w-1/2 h-[80vh] md:h-[110vh]"
            src={`${resumeUrl}#toolbar=0`}
          ></iframe>
        ) : (
          <div className="w-full bg-white rounded text-xl font-medium text-gray-400 flex justify-center items-center h-[20vh]">
            Failed to get applicant&apos;s resume
          </div>
        )}
      </div>
    </div>
  );
}
