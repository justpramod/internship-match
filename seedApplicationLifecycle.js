import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./lib/models/user-model.js";
import CompanyProfile from "./lib/models/companyProfile-model.js";
import StudentProfile from "./lib/models/studentProfile-model.js";
import Internship from "./lib/models/internship-model.js";
import Application from "./lib/models/application-model.js";
import Sector from "./lib/models/sector-model.js";

const MONGODB_URI = process.env.db_atlas_uri;
const fixtureEmails = [
  "lifecycle.company@example.com",
  "lifecycle.pending@example.edu",
  "lifecycle.accepted@example.edu",
  "lifecycle.rejected@example.edu",
];

if (!MONGODB_URI) {
  throw new Error("Missing db_atlas_uri environment variable.");
}

async function seedApplicationLifecycle() {
  await mongoose.connect(MONGODB_URI);

  const existingUsers = await User.find({
    email: { $in: fixtureEmails },
  }).select("_id");
  const existingUserIds = existingUsers.map((user) => user._id);

  if (existingUserIds.length > 0) {
    const existingInternships = await Internship.find({
      company_id: { $in: existingUserIds },
    }).select("_id");

    await Promise.all([
      Application.deleteMany({
        $or: [
          { student_id: { $in: existingUserIds } },
          { company_id: { $in: existingUserIds } },
          { internship_id: { $in: existingInternships.map(({ _id }) => _id) } },
        ],
      }),
      Internship.deleteMany({ company_id: { $in: existingUserIds } }),
      CompanyProfile.deleteMany({ company_id: { $in: existingUserIds } }),
      StudentProfile.deleteMany({ student_id: { $in: existingUserIds } }),
      User.deleteMany({ _id: { $in: existingUserIds } }),
    ]);
  }

  const softwareSector = await Sector.findOneAndUpdate(
    { name: "software development" },
    { $setOnInsert: { name: "software development" } },
    { upsert: true, returnDocument: "after" },
  );
  const password = await bcrypt.hash("12345678", 10);
  const [companyUser, pendingStudent, acceptedStudent, rejectedStudent] =
    await User.insertMany([
      {
        email: fixtureEmails[0],
        password,
        role: "company",
      },
      {
        email: fixtureEmails[1],
        password,
        role: "student",
      },
      {
        email: fixtureEmails[2],
        password,
        role: "student",
      },
      {
        email: fixtureEmails[3],
        password,
        role: "student",
      },
    ]);

  await CompanyProfile.create({
    company_id: companyUser._id,
    name: "Lifecycle Labs",
    status: "approved",
    isPendingApproval: false,
    industry: "Software",
    about_company: "A deterministic company fixture for application workflow testing.",
    contact: {
      email: fixtureEmails[0],
      number: "+1 555 0100",
    },
  });

  await StudentProfile.insertMany([
    {
      student_id: pendingStudent._id,
      name: "Pending Applicant",
      university: "Test University",
      major: "Computer Science",
      batch_year: 2027,
      skills: ["JavaScript", "React", "Node.js"],
      parsed_skills: ["JavaScript", "React", "Node.js"],
    },
    {
      student_id: acceptedStudent._id,
      name: "Accepted Applicant",
      university: "Test University",
      major: "Computer Science",
      batch_year: 2027,
      skills: ["JavaScript", "React"],
      parsed_skills: ["JavaScript", "React"],
    },
    {
      student_id: rejectedStudent._id,
      name: "Rejected Applicant",
      university: "Test University",
      major: "Computer Science",
      batch_year: 2027,
      skills: ["JavaScript"],
      parsed_skills: ["JavaScript"],
    },
  ]);

  const internship = await Internship.create({
    title: "Application Lifecycle Test Intern",
    company_id: companyUser._id,
    type: "remote",
    salary: 1500,
    sector: [softwareSector._id],
    required_skills: ["JavaScript", "React"],
    parsed_required_skills: [
      { skill: "JavaScript", weight: 0.9 },
      { skill: "React", weight: 0.8 },
    ],
    job_description: "A deterministic internship used to test the application lifecycle.",
    eligibility: "Open to current students.",
    responsibilities: "Build and test web application features.",
    openings: 2,
    level: "Beginner",
    isClosed: false,
    application_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  await Application.insertMany([
    {
      student_id: pendingStudent._id,
      internship_id: internship._id,
      company_id: companyUser._id,
      match_score: 95,
      status: "pending",
      matched_skills: ["JavaScript", "React"],
    },
    {
      student_id: acceptedStudent._id,
      internship_id: internship._id,
      company_id: companyUser._id,
      match_score: 88,
      status: "accepted",
      matched_skills: ["JavaScript", "React"],
    },
    {
      student_id: rejectedStudent._id,
      internship_id: internship._id,
      company_id: companyUser._id,
      match_score: 65,
      status: "rejected",
      matched_skills: ["JavaScript"],
    },
  ]);

  console.log("Application lifecycle fixture seeded.");
  console.log(`Company login: ${fixtureEmails[0]} / 12345678`);
  console.log(`Pending student login: ${fixtureEmails[1]} / 12345678`);
  console.log(`Accepted student login: ${fixtureEmails[2]} / 12345678`);
  console.log(`Rejected student login: ${fixtureEmails[3]} / 12345678`);
  console.log(`Internship id: ${internship._id}`);
}

seedApplicationLifecycle()
  .catch((error) => {
    console.error("Failed to seed application lifecycle fixture:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
