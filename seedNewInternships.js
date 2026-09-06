import mongoose from "mongoose";
import User from "./lib/models/user-model.js";
import StudentProfile from "./lib/models/studentProfile-model.js";
import Internship from "./lib/models/internship-model.js";
import Application from "./lib/models/application-model.js";
import Sector from "./lib/models/sector-model.js";

// ⚠️ Replace with your actual MongoDB connection string
const MONGODB_URI = "";

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");
}

/**
 * Adds new internships and corresponding applications to the existing database.
 * - Does NOT delete any existing data.
 * - Does NOT create new users or companies.
 * - Uses existing company users and student profiles.
 */
export async function seedNewInternshipsAndApplications() {
  await connectToDatabase();
  console.log("🌱 Adding new internships and applications...");

  // 1. Fetch existing data
  const companyUsers = await User.find({ role: "company" }).lean();
  const studentUsers = await User.find({ role: "student" }).lean();
  const studentProfiles = await StudentProfile.find().lean();
  const sectors = await Sector.find().lean();

  if (companyUsers.length === 0 || studentProfiles.length === 0) {
    throw new Error(
      "No existing companies or students found. Run the original seed first."
    );
  }

  // Map company ID to its index for easy reference
  const companyIdMap = new Map(companyUsers.map((u) => [u._id.toString(), u._id]));

  // Build helper functions for text blocks (same as original seed)
  const buildJobDescription = (role, extra = "") => `
We are looking for an enthusiastic ${role} Intern to join our team.
You will work on real-world projects and collaborate with experienced engineers.
${extra}
This role offers hands-on exposure to production systems and scalable architectures.
`;
  const buildEligibility = () => `
Final-year students or recent graduates in a relevant field.
Strong fundamentals and willingness to learn are required.
Prior project experience is a plus.
`;
  const buildResponsibilities = (specific = "") => `
Collaborate with cross-functional teams to build features.
Write clean, maintainable, and efficient code.
Debug, test, and optimize applications.
Participate in code reviews and technical discussions.
${specific}
Continuously learn and apply new technologies.
`;

  // 2. Define new internships (25 new roles across existing companies)
  // Use sectors from fetched sectors array (index accordingly)
  const newInternships = [
    // Google (companyUsers[0])
    {
      title: "Backend Intern - Google Cloud",
      company_id: companyUsers[0]._id,
      company_name: "Google",
      company_logo: "",
      company_location: "Mountain View, CA",
      type: "remote",
      salary: 2100,
      sector: [sectors[7]._id], // Cloud Computing
      required_skills: ["Python", "Go"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.95 },
        { skill: "Go", weight: 0.9 },
        { skill: "Kubernetes", weight: 0.85 },
        { skill: "Docker", weight: 0.8 },
      ],
      job_description: buildJobDescription("Backend Developer - Cloud"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-15"),
    },
    {
      title: "Frontend Developer Intern - Chrome",
      company_id: companyUsers[0]._id,
      company_name: "Google",
      company_logo: "",
      company_location: "Mountain View, CA",
      type: "hybrid",
      salary: 2200,
      sector: [sectors[1]._id], // Web Development
      required_skills: ["TypeScript", "Angular"],
      parsed_required_skills: [
        { skill: "TypeScript", weight: 0.95 },
        { skill: "Angular", weight: 0.9 },
        { skill: "JavaScript", weight: 0.85 },
        { skill: "CSS", weight: 0.7 },
      ],
      job_description: buildJobDescription("Frontend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-09-20"),
    },
    // Microsoft (companyUsers[1])
    {
      title: "Data Engineer Intern",
      company_id: companyUsers[1]._id,
      company_name: "Microsoft",
      company_logo: "",
      company_location: "Redmond, WA",
      type: "hybrid",
      salary: 2800,
      sector: [sectors[20]._id], // Big Data
      required_skills: ["SQL", "Spark"],
      parsed_required_skills: [
        { skill: "SQL", weight: 0.9 },
        { skill: "Apache Spark", weight: 0.85 },
        { skill: "Python", weight: 0.8 },
        { skill: "Azure", weight: 0.75 },
      ],
      job_description: buildJobDescription("Data Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-10"),
    },
    {
      title: "AI Research Intern",
      company_id: companyUsers[1]._id,
      company_name: "Microsoft",
      company_logo: "",
      company_location: "Redmond, WA",
      type: "remote",
      salary: 3400,
      sector: [sectors[5]._id], // Artificial Intelligence
      required_skills: ["Python", "PyTorch"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.95 },
        { skill: "PyTorch", weight: 0.9 },
        { skill: "Deep Learning", weight: 0.85 },
        { skill: "NLP", weight: 0.8 },
      ],
      job_description: buildJobDescription("AI Research Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-09-25"),
    },
    // Amazon (companyUsers[2])
    {
      title: "Full Stack Intern - Retail",
      company_id: companyUsers[2]._id,
      company_name: "Amazon",
      company_logo: "",
      company_location: "Seattle, WA",
      type: "on-site",
      salary: 2600,
      sector: [sectors[0]._id, sectors[1]._id], // Software & Web Development
      required_skills: ["Java", "React"],
      parsed_required_skills: [
        { skill: "Java", weight: 0.9 },
        { skill: "React", weight: 0.85 },
        { skill: "AWS", weight: 0.8 },
        { skill: "Docker", weight: 0.7 },
      ],
      job_description: buildJobDescription("Full Stack Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 4,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-12"),
    },
    {
      title: "Cybersecurity Intern",
      company_id: companyUsers[2]._id,
      company_name: "Amazon",
      company_logo: "",
      company_location: "Seattle, WA",
      type: "remote",
      salary: 3000,
      sector: [sectors[6]._id], // Cybersecurity
      required_skills: ["Python", "Network Security"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.9 },
        { skill: "Network Security", weight: 0.85 },
        { skill: "Penetration Testing", weight: 0.8 },
        { skill: "AWS", weight: 0.7 },
      ],
      job_description: buildJobDescription("Security Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-18"),
    },
    // Spotify (companyUsers[3])
    {
      title: "Mobile Developer Intern (Android)",
      company_id: companyUsers[3]._id,
      company_name: "Spotify",
      company_logo: "",
      company_location: "Stockholm, Sweden",
      type: "hybrid",
      salary: 2000,
      sector: [sectors[2]._id], // Mobile Development
      required_skills: ["Kotlin", "Android"],
      parsed_required_skills: [
        { skill: "Kotlin", weight: 0.95 },
        { skill: "Android SDK", weight: 0.9 },
        { skill: "Jetpack Compose", weight: 0.8 },
        { skill: "Firebase", weight: 0.7 },
      ],
      job_description: buildJobDescription("Android Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-09-22"),
    },
    {
      title: "Data Science Intern - Recommendations",
      company_id: companyUsers[3]._id,
      company_name: "Spotify",
      company_logo: "",
      company_location: "Stockholm, Sweden",
      type: "remote",
      salary: 3200,
      sector: [sectors[4]._id], // Machine Learning
      required_skills: ["Python", "SQL"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.95 },
        { skill: "SQL", weight: 0.9 },
        { skill: "Machine Learning", weight: 0.85 },
        { skill: "A/B Testing", weight: 0.75 },
      ],
      job_description: buildJobDescription("Data Scientist"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-08"),
    },
    // Tesla (companyUsers[4])
    {
      title: "Robotics Software Intern",
      company_id: companyUsers[4]._id,
      company_name: "Tesla",
      company_logo: "",
      company_location: "Palo Alto, CA",
      type: "on-site",
      salary: 3400,
      sector: [sectors[18]._id], // Robotics
      required_skills: ["C++", "ROS"],
      parsed_required_skills: [
        { skill: "C++", weight: 0.95 },
        { skill: "ROS", weight: 0.9 },
        { skill: "Python", weight: 0.8 },
        { skill: "Control Systems", weight: 0.75 },
      ],
      job_description: buildJobDescription("Robotics Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-09-30"),
    },
    {
      title: "Battery Data Analyst Intern",
      company_id: companyUsers[4]._id,
      company_name: "Tesla",
      company_logo: "",
      company_location: "Palo Alto, CA",
      type: "hybrid",
      salary: 2700,
      sector: [sectors[13]._id], // Business Analytics
      required_skills: ["SQL", "Python"],
      parsed_required_skills: [
        { skill: "SQL", weight: 0.9 },
        { skill: "Python", weight: 0.85 },
        { skill: "Data Visualization", weight: 0.8 },
        { skill: "Statistics", weight: 0.7 },
      ],
      job_description: buildJobDescription("Data Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-14"),
    },
    // Netflix (companyUsers[5])
    {
      title: "Backend Streaming Intern",
      company_id: companyUsers[5]._id,
      company_name: "Netflix",
      company_logo: "",
      company_location: "Los Gatos, CA",
      type: "remote",
      salary: 3300,
      sector: [sectors[0]._id], // Software Development
      required_skills: ["Java", "Spring Boot"],
      parsed_required_skills: [
        { skill: "Java", weight: 0.95 },
        { skill: "Spring Boot", weight: 0.9 },
        { skill: "Microservices", weight: 0.85 },
        { skill: "AWS", weight: 0.7 },
      ],
      job_description: buildJobDescription("Backend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-09-05"),
    },
    // Meta (companyUsers[6])
    {
      title: "VR Software Intern",
      company_id: companyUsers[6]._id,
      company_name: "Meta",
      company_logo: "",
      company_location: "Menlo Park, CA",
      type: "hybrid",
      salary: 3200,
      sector: [sectors[21]._id], // AR/VR
      required_skills: ["C#", "Unity"],
      parsed_required_skills: [
        { skill: "C#", weight: 0.9 },
        { skill: "Unity", weight: 0.85 },
        { skill: "VR Development", weight: 0.8 },
        { skill: "3D Math", weight: 0.7 },
      ],
      job_description: buildJobDescription("VR Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-16"),
    },
    // Apple (companyUsers[7])
    {
      title: "iOS Frameworks Intern",
      company_id: companyUsers[7]._id,
      company_name: "Apple",
      company_logo: "",
      company_location: "Cupertino, CA",
      type: "on-site",
      salary: 3600,
      sector: [sectors[2]._id], // Mobile Development
      required_skills: ["Swift", "iOS"],
      parsed_required_skills: [
        { skill: "Swift", weight: 0.95 },
        { skill: "iOS", weight: 0.9 },
        { skill: "SwiftUI", weight: 0.85 },
        { skill: "Xcode", weight: 0.7 },
      ],
      job_description: buildJobDescription("iOS Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-11"),
    },
    // Adobe (companyUsers[8])
    {
      title: "UX Research Intern",
      company_id: companyUsers[8]._id,
      company_name: "Adobe",
      company_logo: "",
      company_location: "San Jose, CA",
      type: "hybrid",
      salary: 2500,
      sector: [sectors[9]._id], // UI/UX Design
      required_skills: ["Figma", "User Research"],
      parsed_required_skills: [
        { skill: "Figma", weight: 0.9 },
        { skill: "User Research", weight: 0.85 },
        { skill: "Usability Testing", weight: 0.8 },
        { skill: "Wireframing", weight: 0.7 },
      ],
      job_description: buildJobDescription("UX Researcher"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-09-19"),
    },
    // Shopify (companyUsers[9])
    {
      title: "Backend Developer Intern - Payments",
      company_id: companyUsers[9]._id,
      company_name: "Shopify",
      company_logo: "",
      company_location: "Ottawa, Canada",
      type: "remote",
      salary: 2300,
      sector: [sectors[0]._id], // Software Development
      required_skills: ["Ruby on Rails", "PostgreSQL"],
      parsed_required_skills: [
        { skill: "Ruby", weight: 0.9 },
        { skill: "Rails", weight: 0.85 },
        { skill: "PostgreSQL", weight: 0.8 },
        { skill: "GraphQL", weight: 0.7 },
      ],
      job_description: buildJobDescription("Backend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-07"),
    },
    // Uber (companyUsers[10])
    {
      title: "Mobile Developer Intern (Cross-Platform)",
      company_id: companyUsers[10]._id,
      company_name: "Uber",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "hybrid",
      salary: 3000,
      sector: [sectors[2]._id], // Mobile Development
      required_skills: ["Flutter", "Dart"],
      parsed_required_skills: [
        { skill: "Flutter", weight: 0.95 },
        { skill: "Dart", weight: 0.9 },
        { skill: "Firebase", weight: 0.8 },
        { skill: "Mobile UI", weight: 0.7 },
      ],
      job_description: buildJobDescription("Mobile Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-13"),
    },
    // Airbnb (companyUsers[11])
    {
      title: "Data Visualization Intern",
      company_id: companyUsers[11]._id,
      company_name: "Airbnb",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 2800,
      sector: [sectors[3]._id], // Data Science
      required_skills: ["Tableau", "SQL"],
      parsed_required_skills: [
        { skill: "Tableau", weight: 0.9 },
        { skill: "SQL", weight: 0.85 },
        { skill: "Python", weight: 0.75 },
        { skill: "Data Storytelling", weight: 0.7 },
      ],
      job_description: buildJobDescription("Data Visualization Specialist"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-09-21"),
    },
    // Stripe (companyUsers[12])
    {
      title: "Fintech Backend Intern",
      company_id: companyUsers[12]._id,
      company_name: "Stripe",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 3100,
      sector: [sectors[0]._id], // Software Development
      required_skills: ["Node.js", "TypeScript"],
      parsed_required_skills: [
        { skill: "Node.js", weight: 0.9 },
        { skill: "TypeScript", weight: 0.85 },
        { skill: "PostgreSQL", weight: 0.8 },
        { skill: "GraphQL", weight: 0.7 },
      ],
      job_description: buildJobDescription("Backend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-17"),
    },
    // Twilio (companyUsers[13])
    {
      title: "Communications API Intern",
      company_id: companyUsers[13]._id,
      company_name: "Twilio",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 2500,
      sector: [sectors[0]._id], // Software Development
      required_skills: ["Node.js", "REST APIs"],
      parsed_required_skills: [
        { skill: "Node.js", weight: 0.9 },
        { skill: "REST APIs", weight: 0.85 },
        { skill: "PostgreSQL", weight: 0.75 },
        { skill: "Webhooks", weight: 0.7 },
      ],
      job_description: buildJobDescription("API Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-09-09"),
    },
    // Datadog (companyUsers[14])
    {
      title: "Monitoring Infrastructure Intern",
      company_id: companyUsers[14]._id,
      company_name: "Datadog",
      company_logo: "",
      company_location: "New York, NY",
      type: "hybrid",
      salary: 2900,
      sector: [sectors[8]._id], // DevOps
      required_skills: ["Go", "Kubernetes"],
      parsed_required_skills: [
        { skill: "Go", weight: 0.9 },
        { skill: "Kubernetes", weight: 0.85 },
        { skill: "Prometheus", weight: 0.8 },
        { skill: "AWS", weight: 0.7 },
      ],
      job_description: buildJobDescription("DevOps Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-23"),
    },
    // Additional new roles to round out
    {
      title: "Product Analyst Intern",
      company_id: companyUsers[6]._id, // Meta
      company_name: "Meta",
      company_logo: "",
      company_location: "Menlo Park, CA",
      type: "hybrid",
      salary: 2700,
      sector: [sectors[13]._id], // Business Analytics
      required_skills: ["SQL", "Excel"],
      parsed_required_skills: [
        { skill: "SQL", weight: 0.9 },
        { skill: "Excel", weight: 0.8 },
        { skill: "A/B Testing", weight: 0.75 },
        { skill: "Python", weight: 0.65 },
      ],
      job_description: buildJobDescription("Product Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-09-28"),
    },
    {
      title: "Gameplay Programmer Intern",
      company_id: companyUsers[0]._id, // Google (Stadia maybe)
      company_name: "Google",
      company_logo: "",
      company_location: "Mountain View, CA",
      type: "hybrid",
      salary: 2800,
      sector: [sectors[15]._id], // Game Development
      required_skills: ["C++", "Unreal Engine"],
      parsed_required_skills: [
        { skill: "C++", weight: 0.95 },
        { skill: "Unreal Engine", weight: 0.9 },
        { skill: "Game Physics", weight: 0.8 },
        { skill: "3D Math", weight: 0.7 },
      ],
      job_description: buildJobDescription("Game Programmer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-09-26"),
    },
    {
      title: "Blockchain Developer Intern",
      company_id: companyUsers[12]._id, // Stripe
      company_name: "Stripe",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 3200,
      sector: [sectors[14]._id], // Blockchain
      required_skills: ["Solidity", "Ethereum"],
      parsed_required_skills: [
        { skill: "Solidity", weight: 0.9 },
        { skill: "Ethereum", weight: 0.85 },
        { skill: "Smart Contracts", weight: 0.8 },
        { skill: "Node.js", weight: 0.6 },
      ],
      job_description: buildJobDescription("Blockchain Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-09-29"),
    },
  ];

  // 3. Insert new internships
  const insertedInternships = await Internship.insertMany(newInternships);
  console.log(`✅ Inserted ${insertedInternships.length} new internships.`);

  // 4. Generate new applications for these internships
  const applications = [];

  for (const studentProfile of studentProfiles) {
    // Each student applies to 3-5 of the new internships (random selection)
    const numApps = Math.floor(Math.random() * 3) + 3; // 3 to 5
    const shuffledInternships = [...insertedInternships].sort(
      () => 0.5 - Math.random()
    );

    for (let j = 0; j < Math.min(numApps, shuffledInternships.length); j++) {
      const internship = shuffledInternships[j];
      const studentSkillsSet = new Set(
        (studentProfile.parsed_skills || []).map((s) => s.toLowerCase())
      );
      const internshipSkills = internship.parsed_required_skills.map((ps) =>
        ps.skill.toLowerCase()
      );
      const overlap = internshipSkills.filter((skill) =>
        studentSkillsSet.has(skill)
      ).length;

      // Calculate match score (similar to original logic)
      const matchScore = Math.min(
        98,
        Math.max(
          30,
          Math.floor((overlap / internshipSkills.length) * 100) +
          Math.floor(Math.random() * 15) -
          7
        )
      );

      // Random status: 20% accepted, 15% rejected, rest pending
      let status = "pending";
      const rand = Math.random();
      if (rand < 0.2) status = "accepted";
      else if (rand < 0.35) status = "rejected";

      const matched_skills = internshipSkills.filter((skill) =>
        studentSkillsSet.has(skill)
      );

      // Random applied date within last 30 days
      const applied_date = new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      );

      applications.push({
        student_id: studentProfile.student_id,
        internship_id: internship._id,
        match_score: matchScore,
        status,
        applied_date,
        matched_skills,
      });
    }
  }

  // Insert applications
  await Application.insertMany(applications);
  console.log(`✅ Inserted ${applications.length} new applications.`);

  console.log("🌱 New data seeding complete!");
  console.log(`   - ${insertedInternships.length} internships added`);
  console.log(`   - ${applications.length} applications added`);
}

// Execute the function
seedNewInternshipsAndApplications()
  .then(() => {
    console.log("🌱 Script finished, closing connection...");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    mongoose.connection.close();
  });