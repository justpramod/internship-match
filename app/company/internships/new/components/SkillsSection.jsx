"use client";

import { AddSkillsPopup } from "@/app/student/profile/components/AddSkillsPopup";
import { useState } from "react";

export default function SkillsSection({ error }) {
  const [skills, setSkills] = useState([]);

  function handleAddSkill(value) {
    setSkills([...skills, value]);
  }
  function handleDeleteSkill(skillIndex) {
    const updatedSkills = skills.filter((item, index) => index != skillIndex);
    setSkills(updatedSkills);
  }

  function checkSkillsLength() {
    if (skills.length === 0) return true;
    let flag = false;

    skills.map((item) => {
      if (item.length < 4) flag = true;
    });
    return flag;
  }
  return (
    <div className="flex flex-col gap-1 ">
      <div className="text-[1.1rem] font-semibold">Skills</div>
      <div
        className={`flex justify-between md:gap-2 border py-1 px-2 md:pl-2 md:pr-5 ${error.get("requiredSkills") && checkSkillsLength() && "border-red-400 focus:outline-none"}`}
      >
        <input
          type="hidden"
          name="requiredSkills"
          value={JSON.stringify(skills)}
        />
        <div className="flex flex-wrap items-center">
          {" "}
          {skills.length === 0 ? (
            <div className="text-gray-400 ">
              Add required skills for the internship.
            </div>
          ) : (
            skills.map((item, index) => (
              <div
                className="flex items-center gap-2 bg-[#f5f6fc] rounded-xl px-2 py-1 font-medium"
                key={index}
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(index)}
                  className="hover:opacity-70  cursor-pointer text-gray-600 rounded-full bg-gray-500 w-5 text-xs h-5 flex justify-center items-center text-white"
                >
                  {" "}
                  x
                </button>
              </div>
            ))
          )}
        </div>

        <AddSkillsPopup
          handleAddSkill={handleAddSkill}
          currentSkills={skills}
        />
      </div>
      <span className="text-sm text-red-400">
        {checkSkillsLength() && error.get("requiredSkills")}
      </span>
    </div>
  );
}
