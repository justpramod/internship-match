"use client";

import handleApplicantResponse from "@/actions/company/handleApplicantResponse";
import ConfirmPopup from "./ConfirmPopup";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResponseSection({ applicantInfo, noRedirect }) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  async function handleResponse(status) {
    setError(null);
    setIsPending(true);
    const res = await handleApplicantResponse(applicantInfo._id, status);
    setIsPending(false);
    if (res.error) {
      setError(res.message);
    }
  }

  const errorInfo = { error, setError };
  const pendingInfo = { isPending, setIsPending };
  return (
    <div className="flex w-full md:w-auto items-center justify-end gap-3 md:gap-4">
      {applicantInfo.status === "pending" ? (
        <div className="flex gap-3 md:gap-6">
          <ConfirmPopup
            value={"Reject"}
            applicantName={applicantInfo.name}
            handleResponse={handleResponse}
            errorInfo={errorInfo}
            pendingInfo={pendingInfo}
          />
          <ConfirmPopup
            value={"Shortlist"}
            applicantName={applicantInfo.name}
            handleResponse={handleResponse}
            errorInfo={errorInfo}
            pendingInfo={pendingInfo}
          />
        </div>
      ) : (
        <div>
          {applicantInfo.status === "accepted" ? (
            <p
              className="font-medium  px-4 rounded py-2"
              style={{ backgroundColor: "#93c5fd" }}
            >
              Shortlisted
            </p>
          ) : (
            <p
              className="font-medium  px-4 rounded py-2"
              style={{ backgroundColor: "#ef8686 " }}
            >
              Rejected
            </p>
          )}
        </div>
      )}
      {!noRedirect && (
        <Link
          href={`/company/applicant/${applicantInfo._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border  flex justify-center items-center py-1 px-3 cursor-pointer"
        >
          <div className="relative h-4 w-4">
            <Image src={"/open-new-icon.svg"} fill alt="open-logo" />
          </div>
        </Link>
      )}
    </div>
  );
}
