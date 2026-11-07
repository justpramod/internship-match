"use client";

import Image from "next/image";
import { useState } from "react";
import ResumeUploadPopup from "./ResumeUploadPopup";
import { getFileSizeKB } from "@/utils/getFileSizeKb";
import ResumeDeleteButton from "./ResumeDeleteButton";
import ResumeViewButton from "./ResumeViewButton";

export default function ResumeSection({ studentResumeDetails }) {
  const [uploadPopup, setUploadPopup] = useState(false);

  console.log("yo", studentResumeDetails);
  if (studentResumeDetails?.file_path) {
    return <div className=" font-medium text-2xl"></div>;
  }
  return (
    <div className="bg-white p-5 rounded w-full flex flex-col gap-4">
      <div className=" font-medium text-2xl">Resume</div>

      {studentResumeDetails?.file_name ? (
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between  bg-[#f5f6fc] md:items-center border rounded py-3 px-3">
          <div className="flex gap-3 items-center">
            <div className="relative h-8 w-8 ">
              <Image src="/file-logo.svg" fill alt="file-icon" />
            </div>
            <div>
              <div className="font-medium">
                {studentResumeDetails.file_name}
              </div>
              <div className="text-gray-600">
                {getFileSizeKB(studentResumeDetails.file_size)}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <div>
              {" "}
              <ResumeDeleteButton />{" "}
            </div>
            <div>
              <ResumeViewButton
                resumeName={studentResumeDetails.file_name}
              />{" "}
            </div>
            <div className=" bg-[#15803d] text-white px-2 py-1 rounded">
              <button
                onClick={() => {
                  setUploadPopup(true);
                }}
              >
                Upload New
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex  bg-[#f5f6fc]  items-center rounded flex-col border text-gray-600 py-1 cursor-pointer hover:opacity-80 select-none active:opacity-60"
          onClick={() => setUploadPopup(true)}
        >
          <div className="relative h-8 w-8 ">
            <Image src="/upload.svg" fill alt="upload-icon" />
          </div>
          <div>Upload your resume </div>
        </div>
      )}

      <ResumeUploadPopup open={uploadPopup} setOpen={setUploadPopup} />
    </div>
  );
}
