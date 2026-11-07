"use client";

import handleCompanyStatusAction from "@/actions/admin/handleCompanyStatusAction";
import ConfirmPopup from "@/components/admin/ConfirmPopup";


import Link from "next/link";
import { useState } from "react";

export default function ResponseSection({ status, companyId, companyName, allResponse = false }) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const errorInfo = { error, setError }
  const pendingInfo = { isPending: loading, setIsPending: setLoading }


  let actionsMap = { pending: [], approved: [], rejected: [], blacklisted: [], notApplied: [] }
  if (!allResponse) {
    actionsMap.approved = ["View"]
    actionsMap.rejected = ["View"]
    actionsMap.blacklisted = ["View"]
    actionsMap.notApplied = ["View"]
  }




  actionsMap.pending.push("Approve", "Reject")
  actionsMap.approved.push("Blacklist")

  actionsMap.blacklisted.push("Unblacklist")
  actionsMap.notApplied.push("Blacklist")

  if (allResponse) {

    actionsMap.pending.push("Blacklist")
  }


  const handleAction = (action) => {
    setLoading(true);
    const res = handleCompanyStatusAction(companyId, action);
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return false;
    }
    else {
      setError(null);
      return true
    }

  };

  return (
    <div className="flex justify-center">
      <div className=" flex justify-between items-center gap-4 " style={{ width: actionsMap[status].length > 2 ? "25vw" : "15vw" }}>
        {actionsMap[status].map((action) => {
          const trigger = { value: action, color: getTriggerBackgroundColor(action), textColor: action === "Reject" || action === "Blacklist" ? "red" : action === "Approve" ? "white" : undefined }
          const message = {
            title: `Confirm ${action === "Approve" ? "Approval" : action === "Reject" ? "Rejection" : action === "Blacklist" ? "Blacklisting" : action === "Unblacklist" ? "Unblacklisting" : ""} `,
            value: `Are you sure you want to ${action.toLowerCase()}`,
            unit: companyName ? ` ${companyName}` : " this company",
          }


          return action === "View" ? (
            <Link
              key={action}
              href={`/admin/companies/${companyId}`}
              className="flex border  items-center hover:opacity-70 active:opacity-50 transition-all duration-100 ease-in-out h-10  cursor-pointer rounded px-6 py-1 max-w-fit"
            >
              {action}
            </Link>
          ) : (
            <ConfirmPopup
              key={action}
              trigger={trigger}
              message={message}
              handleResponse={handleAction}
              errorInfo={errorInfo}
              pendingInfo={pendingInfo} />

          )
        })}
      </div></div>
  );
}

function getTriggerBackgroundColor(action) {
  switch (action) {


    case "Unblacklist":
      return "#ffffff";
    case "Approve":
      return "#15803d";
    case "Reject":
      return "#fff0f0";
    default:
      return "#eff0f3";
  }
}