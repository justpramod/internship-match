"use client";

import saveLocationAndContact from "@/actions/company/saveLocationAndContactAction";
import BasicInfoEditSection from "@/app/student/profile/components/BasicInfoEditSection";
import { useActionState, useEffect, useState } from "react";

export default function LocationAndContactSection({ locationContactData }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(locationContactData);
  const [state, formAction, isPending] = useActionState(
    saveLocationAndContact,
    null,
  );
  const [error, setError] = useState(null);
  const fields = [
    "streetAddress",
    "city",
    "province",
    "country",
    "contactNumber",
    "contactEmail",
  ];
  const fieldsMap = {
    streetAddress: "Street Address",
    city: "City",
    province: "Province",
    country: "Country",
    contactNumber: "Contact Number",
    contactEmail: "Contact Email",
  };

  const [errorsMap, setErrorsMap] = useState(new Map());

  function handleCancel() {
    setEditing(false);
    setValues(locationContactData);
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
    <div className="bg-white p-6 rounded w-full flex flex-col gap-2">
      <form className="contents" action={formAction}>
        {" "}
        <BasicInfoEditSection
          editingInfo={{ editing, setEditing }}
          isPending={isPending}
          handleCancel={handleCancel}
          title="Location & Contact"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 justify-between">
          {fields.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-1 ">
                <label htmlFor={item} className="font-medium">
                  {fieldsMap[item]}
                  {editing && <span className="text-red-600">*</span>}
                </label>
                <input
                  id={item}
                  name={item}
                  className={`border ${editing ? "bg-white" : "bg-[#f5f6fc]"}  rounded py-1 px-2  w-full ${errorsMap.has(item) && "border-red-400"}`}
                  disabled={item === "email" ? true : !editing || isPending}
                  value={values[item]}
                  onChange={(e) => {
                    handleOnchange(e, item);
                  }}
                  placeholder="--"
                />
                {errorsMap.has(item) && (
                  <p className="text-red-400">{errorsMap.get(item)}</p>
                )}
              </div>
            );
          })}
        </div>
      </form>
      {error && <p className="text-red-400 text-center mt-2">{error.error}</p>}
    </div>
  );
}
