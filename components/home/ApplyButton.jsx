"use client";

import { useRouter } from "next/navigation";

export default function ApplyButton({ internshipId, isApplied, isClosed }) {
  const router = useRouter();
  function handleClick() {
    router.push(`/student/internships/${internshipId}`);
  }
  return (
    <button
      onClick={handleClick}
      className={`${isApplied || isClosed ? "bg-[#f5f6fc] border" : "bg-[#15803d] text-white"} cursor-pointer px-2  md:px-3 py-2 rounded-xl select-none `}
    >
      {isApplied ? "View Application" : isClosed ? "View Details" : "Apply Now"}
    </button>
  );
}
