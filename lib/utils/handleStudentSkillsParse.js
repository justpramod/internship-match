import StudentProfile from "../models/studentProfile-model";
import { readLocalFile } from "../localStorage";
import callGeminiStudent from "./callGeminiStudent";
import { getGeminiStudentPrompt } from "./getGeminiPrompt";
import parseResumePdf from "./parseResumePdf";
const { default: CustomError } = require("@/utils/CustomError");

export default async function handleStudentSkillsParse(
  studentProfileId,
  buffer,
  studentSkills,
  fileKey,
) {
  try {
    let byteArray;
    if (!buffer) {
      if (!fileKey) throw new CustomError("file key not found.");
      byteArray = await readLocalFile(fileKey);
    } else {
      byteArray = new Uint8Array(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength,
      );
    }

    const parsedResume = await parseResumePdf(byteArray);

    if (parsedResume?.error)
      throw new CustomError("Failed parsing the resume.");
    const { systemPrompt, prompt } = getGeminiStudentPrompt(
      parsedResume,
      studentSkills,
    );
    const parsedSkills = await callGeminiStudent(systemPrompt, prompt);
    console.log(parsedSkills);

    if (parsedSkills.error) throw new CustomError("Failed calling gemini.");

    const student = await StudentProfile.findOneAndUpdate(
      { _id: studentProfileId },
      {
        $set: { parsed_skills: parsedSkills },
        $unset: { "resume_details.parse_status": "" },
      },
    );
    return { success: true, parsedSkills };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
