"use client";
import saveBasicInfoAction from "@/actions/company/saveBasicInfoAction";
import BasicInfoEditSection from "@/app/student/profile/components/BasicInfoEditSection";
import { useActionState, useEffect, useState } from "react";

export default function BasicInfoSection({ basicInfoData }) {
  const [editing, setEditing] = useState(false);

  const editingInfo = { editing, setEditing };

  const [values, setValues] = useState(basicInfoData);
  const [error, setError] = useState(null);
  const [state, formAction, isPending] = useActionState(
    saveBasicInfoAction,
    null,
  );

  const fields = ["name", "industry", "website"];
  const fieldsMap = {
    name: "Company Name",
    industry: "Industry",
    website: "Website",
  };

  const [errorsMap, setErrorsMap] = useState(new Map());

  function handleCancel() {
    setEditing(false);
    setValues(basicInfoData);
    if (error) {
      setError(null);
    }
    setErrorsMap(new Map());
  }

  function handleOnchange(e, item) {
    setValues({ ...values, [item]: e.target.value });
    if (errorsMap.has(item)) {
      const errors = new Map(errorsMap);
      errors.delete(item);
      setErrorsMap(errors);
      if (errors.size === 0) setError(null);
    }
  }

  useEffect(() => {
    if (state?.error) {
      setError(state);
      if (state.errors) {
        const newErrors = new Map();
        state.errors.map((error) => newErrors.set(error.path, error.message));
        setErrorsMap(newErrors);
      }
    } else {
      setEditing(false);
      setError(null);
    }
  }, [state]);

  return (
    <div className="bg-white p-6 rounded flex flex-col gap-3">
      <form className="contents" action={formAction}>
        {" "}
        <div>
          <BasicInfoEditSection
            editingInfo={editingInfo}
            handleCancel={handleCancel}
            isPending={isPending}
            title={"Basic Info"}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <input
            className={`border w-full rounded py-1 px-2 bg-[#f5f6fc] `}
            disabled
            defaultValue={basicInfoData.email}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {fields.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor={item} className="font-medium">
                  {fieldsMap[item]}
                  {editing && item !== "website" && (
                    <span className="text-red-600">*</span>
                  )}
                </label>
                <input
                  className={`border w-full rounded py-1 px-2 ${!editing && "bg-[#f5f6fc] "} ${errorsMap.has(item) && "border-red-400"}`}
                  disabled={!editing}
                  value={values[item]}
                  onChange={(e) => {
                    handleOnchange(e, item);
                  }}
                  name={item}
                  id={item}
                />
                {errorsMap.has(item) && (
                  <p className="text-red-400">{errorsMap.get(item)}</p>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-1">
            <label htmlFor="company_size" className="font-medium">
              Company Size{editing && <span className="text-red-600">*</span>}
            </label>
            <select
              className={`border w-full rounded py-1 px-2 ${!editing && "bg-[#f5f6fc] "} ${errorsMap.has("companySize") && "border-red-400"}`}
              disabled={!editing}
              value={values.companySize}
              onChange={(e) => {
                handleOnchange(e, "companySize");
              }}
              placeholder="--"
              name="companySize"
              id="company_size"
            >
              <option value="">{editing ? "Select" : "--"}</option>
              <option value="1-10">1-10 Employees</option>{" "}
              <option value="10-50">10-50 Employees</option>
              <option value="50-200">50-200 Employees</option>
              <option value="200+">200+ Employees</option>
            </select>{" "}
            {errorsMap.has("companySize") && (
              <p className="text-red-400">{errorsMap.get("companySize")}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="about_company" className="font-medium">
            About Company{editing && <span className="text-red-600">*</span>}
          </label>
          <textarea
            disabled={!editing}
            className={`border w-full rounded py-1 px-2 h-[15vh] ${!editing && "bg-[#f5f6fc] "} ${errorsMap.has("aboutCompany") && "border-red-400 "}`}
            placeholder={
              editing ? "Describe about the company (150 chars min)" : "--"
            }
            id="about_company"
            name="aboutCompany"
            value={values.aboutCompany}
            onChange={(e) => {
              handleOnchange(e, "aboutCompany");
            }}
          />{" "}
          {errorsMap.has("aboutCompany") && (
            <p className="text-red-400">{errorsMap.get("aboutCompany")}</p>
          )}
        </div>
      </form>{" "}
      {error && <p className="text-red-400 text-center mt-2">{error.error}</p>}
    </div>
  );
}
