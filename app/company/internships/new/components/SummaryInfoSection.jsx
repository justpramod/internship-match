"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SummaryInfoInputs from "./SummaryInfoInputs";
import SummaryInfoSelects from "./SummaryInfoSelects";
import { errorMessageHandler, getSummarySectionInfo } from "../utils";
export default function SummaryInfoSection({ rawData, errorMessageArray }) {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  console.log(rawData);

  const [originalErrors, setOriginalErrors] = useState(new Map());
  const [error, setError] = useState(new Map());

  useEffect(() => {
    if (errorMessageArray) {
      const errors = new Map(
        errorMessageArray?.map((item) => {
          return [item.field, item.message];
        }),
      );
      setError(errors);
      setOriginalErrors(errors);
    }
  }, [errorMessageArray]);

  const { inputInfo, selectInfo } = getSummarySectionInfo();
  const onChangeHandler = errorMessageHandler(
    error,
    setError,
    originalErrors,
    rawData,
  );
  const errorInfo = {
    error,
    onChangeHandler,
    rawData,
  };

  return (
    <>
      {" "}
      <div className="flex flex-col gap-4 bg-white rounded-xl px-2 md:px-5 mr-5 py-4 ">
        <div className="border-b pb-2 border-gray-200">
          <div></div>
          <div className="text-xl font-semibold">Summary Information</div>
        </div>
        <div className="flex flex-col gap-4">
          <SummaryInfoInputs
            inputInfo={inputInfo.internshipTitle}
            errorInfo={errorInfo}
          />
          <div className="flex flex-col md:flex-row gap-4 ">
            <SummaryInfoInputs
              inputInfo={inputInfo.monthlySalary}
              errorInfo={errorInfo}
            />
            <SummaryInfoSelects selectInfo={selectInfo.level} error={error} />
          </div>
          <div className="flex flex-col md:flex-row gap-4 ">
            {" "}
            <SummaryInfoSelects
              selectInfo={selectInfo.workModel}
              error={error}
            />
            <SummaryInfoInputs
              inputInfo={inputInfo.location}
              errorInfo={errorInfo}
            />
          </div>{" "}
          <div className="flex flex-col md:flex-row gap-4 ">
            {" "}
            <SummaryInfoInputs
              inputInfo={inputInfo.openings}
              errorInfo={errorInfo}
            />
            <div className="w-full">
              <div className="flex flex-col  gap-1 ">
                <div className="text-[1.1rem] font-semibold">
                  Application Deadline
                </div>
                <div className="border rounded ">
                  {" "}
                  <input
                    type="hidden"
                    name="applicationDeadline"
                    value={selectedDate.toISOString()}
                  />
                  <DatePicker
                    className="focus:outline-none focus:ring-0 cursor-pointer"
                    showIcon
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date)}
                    minDate={new Date().setDate(new Date().getDate() + 1)}
                    onKeyDown={(e) => e.preventDefault()}
                    onFocus={(e) => e.target.blur()}
                  />{" "}
                </div>
                <span className="text-sm text-red-400">
                  {error.get("applicationDeadline")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
