"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import { deleteLocalFile } from "@/lib/localStorage";

export default async function handleDeleteResumeAction() {
  try {
    const session = await auth();

    if (session?.user?.role !== "student") {
      return { error: "Not logged in as student!" };
    }

    await dbConnect();

    const student = await StudentProfile.findOne({
      student_id: session.user.userId,
    });
    if (!student) {
      return { error: "Not logged in as student!" };
    }

    if (!student.resume_details?.file_key) {
      return { error: "No resume was found." };
    }

    const filePath = student.resume_details.file_key;

    await deleteLocalFile(filePath);
    student.resume_details = null;
    student.parsed_skills = undefined;
    await student.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete the resume." };
  }
}
