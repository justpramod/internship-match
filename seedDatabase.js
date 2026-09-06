import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./lib/models/user-model.js";
import CompanyProfile from "./lib/models/companyProfile-model.js";
import StudentProfile from "./lib/models/studentProfile-model.js";
import Internship from "./lib/models/internship-model.js";
import Application from "./lib/models/application-model.js";
import Sector from "./lib/models/sector-model.js";

const MONGODB_URI = "";
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");
}

export async function seedDatabase() {
  await connectToDatabase();
  console.log("🌱 Seeding database...");

  // 1. Clear all collections
  await Promise.all([
    User.deleteMany({}),
    CompanyProfile.deleteMany({}),
    StudentProfile.deleteMany({}),
    Internship.deleteMany({}),
    Application.deleteMany({}),
    Sector.deleteMany({}),
  ]);

  // 2. Create Sectors (25 realistic domains)
  const sectors = await Sector.insertMany([
    { name: "Software Development" },
    { name: "Web Development" },
    { name: "Mobile Development" },
    { name: "Data Science" },
    { name: "Machine Learning" },
    { name: "Artificial Intelligence" },
    { name: "Cybersecurity" },
    { name: "Cloud Computing" },
    { name: "DevOps" },
    { name: "UI/UX Design" },
    { name: "Product Management" },
    { name: "Digital Marketing" },
    { name: "Finance" },
    { name: "Business Analytics" },
    { name: "Blockchain" },
    { name: "Game Development" },
    { name: "Networking" },
    { name: "Embedded Systems" },
    { name: "Robotics" },
    { name: "QA / Testing" },
    { name: "Big Data" },
    { name: "AR/VR" },
    { name: "E-commerce" },
    { name: "EdTech" },
    { name: "HealthTech" },
  ]);

  // 3. Hash password for all users
  const plainPassword = "12345678";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // 4. Create Users (15 companies, 30 students, 2 admins)
  const users = await User.insertMany([
    // Companies (15)
    { email: "hr@google.com", password: hashedPassword, role: "company" },
    { email: "jobs@microsoft.com", password: hashedPassword, role: "company" },
    { email: "careers@amazon.com", password: hashedPassword, role: "company" },
    { email: "hr@spotify.com", password: hashedPassword, role: "company" },
    { email: "hr@tesla.com", password: hashedPassword, role: "company" },
    { email: "talent@netflix.com", password: hashedPassword, role: "company" },
    { email: "recruiting@meta.com", password: hashedPassword, role: "company" },
    { email: "jobs@apple.com", password: hashedPassword, role: "company" },
    { email: "careers@adobe.com", password: hashedPassword, role: "company" },
    { email: "hr@shopify.com", password: hashedPassword, role: "company" },
    { email: "jobs@uber.com", password: hashedPassword, role: "company" },
    { email: "careers@airbnb.com", password: hashedPassword, role: "company" },
    { email: "hr@stripe.com", password: hashedPassword, role: "company" },
    { email: "jobs@twilio.com", password: hashedPassword, role: "company" },
    { email: "careers@datadog.com", password: hashedPassword, role: "company" },
    // Students (30)
    {
      email: "alice.johnson@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "bob.smith@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "charlie.brown@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "david.lee@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "emma.wilson@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "frank.miller@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "grace.taylor@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "henry.anderson@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "isabel.martinez@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "jack.robinson@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "karen.clark@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "liam.rodriguez@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "mia.lewis@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "noah.walker@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "olivia.hall@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "paul.allen@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "quinn.young@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "rose.king@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "sam.wright@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "tina.lopez@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "uri.hill@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "vera.scott@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "will.green@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "xena.adams@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "yara.baker@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "zane.carter@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "amy.patel@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "brian.choi@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "clara.nguyen@example.edu",
      password: hashedPassword,
      role: "student",
    },
    {
      email: "daniel.kim@example.edu",
      password: hashedPassword,
      role: "student",
    },
    // Admins
    {
      email: "admin@internplatform.com",
      password: hashedPassword,
      role: "admin",
    },
    {
      email: "super.admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  ]);

  const companyUsers = users.filter((u) => u.role === "company");
  const studentUsers = users.filter((u) => u.role === "student");

  // 5. Create Company Profiles (company_id references User)
  const companies = await CompanyProfile.insertMany([
    {
      company_id: companyUsers[0]._id,
      name: "Google",
      logo: "",
      website: ["https://google.com"],
      industry: "Technology",
    },
    {
      company_id: companyUsers[1]._id,
      name: "Microsoft",
      logo: "",
      website: ["https://microsoft.com"],
      industry: "Technology",
    },
    {
      company_id: companyUsers[2]._id,
      name: "Amazon",
      logo: "",
      website: ["https://amazon.com"],
      industry: "E-commerce & Cloud",
    },
    {
      company_id: companyUsers[3]._id,
      name: "Spotify",
      logo: "",
      website: ["https://spotify.com"],
      industry: "Music Streaming",
    },
    {
      company_id: companyUsers[4]._id,
      name: "Tesla",
      logo: "",
      website: ["https://tesla.com"],
      industry: "Automotive & Energy",
    },
    {
      company_id: companyUsers[5]._id,
      name: "Netflix",
      logo: "",
      website: ["https://netflix.com"],
      industry: "Entertainment",
    },
    {
      company_id: companyUsers[6]._id,
      name: "Meta",
      logo: "",
      website: ["https://meta.com"],
      industry: "Social Media & VR",
    },
    {
      company_id: companyUsers[7]._id,
      name: "Apple",
      logo: "",
      website: ["https://apple.com"],
      industry: "Consumer Electronics",
    },
    {
      company_id: companyUsers[8]._id,
      name: "Adobe",
      logo: "",
      website: ["https://adobe.com"],
      industry: "Software",
    },
    {
      company_id: companyUsers[9]._id,
      name: "Shopify",
      logo: "",
      website: ["https://shopify.com"],
      industry: "E-commerce",
    },
    {
      company_id: companyUsers[10]._id,
      name: "Uber",
      logo: "",
      website: ["https://uber.com"],
      industry: "Ride Hailing",
    },
    {
      company_id: companyUsers[11]._id,
      name: "Airbnb",
      logo: "",
      website: ["https://airbnb.com"],
      industry: "Hospitality",
    },
    {
      company_id: companyUsers[12]._id,
      name: "Stripe",
      logo: "",
      website: ["https://stripe.com"],
      industry: "Fintech",
    },
    {
      company_id: companyUsers[13]._id,
      name: "Twilio",
      logo: "",
      website: ["https://twilio.com"],
      industry: "Communications",
    },
    {
      company_id: companyUsers[14]._id,
      name: "Datadog",
      logo: "",
      website: ["https://datadog.com"],
      industry: "Monitoring",
    },
  ]);

  // 6. Create Student Profiles (student_id references User, no profile_pic)
  const students = await StudentProfile.insertMany([
    {
      student_id: studentUsers[0]._id,
      name: "Alice Johnson",
      university: "Stanford University",
      address: "Palo Alto, CA",
      major: "Computer Science",
      batch_year: 2026,
      profile_pic: "",
      sector: [sectors[1]._id, sectors[0]._id],
      skills: ["JavaScript", "React", "Node.js"],
      parsed_skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"],
    },
    {
      student_id: studentUsers[1]._id,
      name: "Bob Smith",
      university: "MIT",
      address: "Cambridge, MA",
      major: "Data Science",
      batch_year: 2025,
      sector: [sectors[4]._id, sectors[3]._id],
      skills: ["Python", "Machine Learning"],
      parsed_skills: [
        "Python",
        "Machine Learning",
        "Pandas",
        "NumPy",
        "TensorFlow",
      ],
    },
    {
      student_id: studentUsers[2]._id,
      name: "Charlie Brown",
      university: "UC Berkeley",
      address: "Berkeley, CA",
      major: "Cybersecurity",
      batch_year: 2026,
      sector: [sectors[6]._id, sectors[16]._id],
      skills: ["Network Security", "Linux"],
      parsed_skills: [
        "Cybersecurity",
        "Linux",
        "Wireshark",
        "Firewalls",
        "Encryption",
      ],
    },
    {
      student_id: studentUsers[3]._id,
      name: "David Lee",
      university: "Harvard",
      address: "Cambridge, MA",
      major: "Finance",
      batch_year: 2025,
      sector: [sectors[12]._id, sectors[13]._id],
      skills: ["Excel", "SQL"],
      parsed_skills: ["Excel", "SQL", "Financial Modeling", "VBA", "Power BI"],
    },
    {
      student_id: studentUsers[4]._id,
      name: "Emma Wilson",
      university: "Carnegie Mellon",
      address: "Pittsburgh, PA",
      major: "HCI",
      batch_year: 2026,
      sector: [sectors[9]._id],
      skills: ["Figma", "User Research"],
      parsed_skills: [
        "Figma",
        "User Research",
        "Wireframing",
        "Adobe XD",
        "Usability Testing",
      ],
    },
    {
      student_id: studentUsers[5]._id,
      name: "Frank Miller",
      university: "University of Washington",
      address: "Seattle, WA",
      major: "Cloud Computing",
      batch_year: 2025,
      sector: [sectors[7]._id, sectors[8]._id],
      skills: ["AWS", "Docker"],
      parsed_skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    },
    {
      student_id: studentUsers[6]._id,
      name: "Grace Taylor",
      university: "University of Michigan",
      address: "Ann Arbor, MI",
      major: "Robotics",
      batch_year: 2027,
      sector: [sectors[18]._id],
      skills: ["ROS", "C++"],
      parsed_skills: ["ROS", "C++", "Python", "Control Systems", "Simulation"],
    },
    {
      student_id: studentUsers[7]._id,
      name: "Henry Anderson",
      university: "Georgia Tech",
      address: "Atlanta, GA",
      major: "Game Dev",
      batch_year: 2026,
      sector: [sectors[15]._id],
      skills: ["Unity", "C#"],
      parsed_skills: ["Unity", "C#", "Game Physics", "3D Modeling", "Blender"],
    },
    {
      student_id: studentUsers[8]._id,
      name: "Isabel Martinez",
      university: "UT Austin",
      address: "Austin, TX",
      major: "Business Analytics",
      batch_year: 2025,
      sector: [sectors[13]._id],
      skills: ["SQL", "Tableau"],
      parsed_skills: [
        "SQL",
        "Tableau",
        "Python",
        "Data Visualization",
        "Statistics",
      ],
    },
    {
      student_id: studentUsers[9]._id,
      name: "Jack Robinson",
      university: "Cornell",
      address: "Ithaca, NY",
      major: "Computer Engineering",
      batch_year: 2026,
      sector: [sectors[17]._id],
      skills: ["C", "Embedded Linux"],
      parsed_skills: [
        "C",
        "Embedded Systems",
        "Microcontrollers",
        "RTOS",
        "Linux",
      ],
    },
    {
      student_id: studentUsers[10]._id,
      name: "Karen Clark",
      university: "Princeton",
      address: "Princeton, NJ",
      major: "Economics",
      batch_year: 2025,
      sector: [sectors[12]._id],
      skills: ["R", "Excel"],
      parsed_skills: ["R", "Excel", "Stata", "Econometrics", "Data Analysis"],
    },
    {
      student_id: studentUsers[11]._id,
      name: "Liam Rodriguez",
      university: "Caltech",
      address: "Pasadena, CA",
      major: "Applied Math",
      batch_year: 2026,
      sector: [sectors[4]._id],
      skills: ["Python", "Julia"],
      parsed_skills: [
        "Python",
        "Julia",
        "Statistics",
        "Data Mining",
        "Optimization",
      ],
    },
    {
      student_id: studentUsers[12]._id,
      name: "Mia Lewis",
      university: "Columbia",
      address: "New York, NY",
      major: "Marketing",
      batch_year: 2025,
      sector: [sectors[11]._id],
      skills: ["SEO", "Google Analytics"],
      parsed_skills: [
        "SEO",
        "Google Analytics",
        "Content Marketing",
        "Social Media",
        "Email Marketing",
      ],
    },
    {
      student_id: studentUsers[13]._id,
      name: "Noah Walker",
      university: "UIUC",
      address: "Urbana, IL",
      major: "Information Systems",
      batch_year: 2026,
      sector: [sectors[20]._id],
      skills: ["Spark", "Hadoop"],
      parsed_skills: ["Apache Spark", "Hadoop", "Azure", "Data Lakes", "ETL"],
    },
    {
      student_id: studentUsers[14]._id,
      name: "Olivia Hall",
      university: "UPenn",
      address: "Philadelphia, PA",
      major: "Bioengineering",
      batch_year: 2025,
      sector: [sectors[24]._id],
      skills: ["MATLAB", "Python"],
      parsed_skills: [
        "MATLAB",
        "Python",
        "Biomedical Engineering",
        "Signal Processing",
      ],
    },
    {
      student_id: studentUsers[15]._id,
      name: "Paul Allen",
      university: "USC",
      address: "Los Angeles, CA",
      major: "Film",
      batch_year: 2026,
      sector: [sectors[21]._id],
      skills: ["Premiere Pro", "Blender"],
      parsed_skills: [
        "Premiere Pro",
        "Blender",
        "After Effects",
        "Motion Graphics",
        "AR/VR",
      ],
    },
    {
      student_id: studentUsers[16]._id,
      name: "Quinn Young",
      university: "Northwestern",
      address: "Evanston, IL",
      major: "Journalism",
      batch_year: 2025,
      sector: [sectors[11]._id],
      skills: ["Copywriting", "WordPress"],
      parsed_skills: ["Copywriting", "WordPress", "SEO", "Content Management"],
    },
    {
      student_id: studentUsers[17]._id,
      name: "Rose King",
      university: "University of Florida",
      address: "Gainesville, FL",
      major: "Psychology",
      batch_year: 2026,
      sector: [sectors[10]._id],
      skills: ["User Research", "Survey Design"],
      parsed_skills: [
        "User Research",
        "Surveys",
        "Data Analysis",
        "Qualitative Research",
      ],
    },
    {
      student_id: studentUsers[18]._id,
      name: "Sam Wright",
      university: "UMD",
      address: "College Park, MD",
      major: "Cybersecurity",
      batch_year: 2025,
      sector: [sectors[6]._id],
      skills: ["Penetration Testing", "Metasploit"],
      parsed_skills: [
        "Penetration Testing",
        "Metasploit",
        "Python",
        "Network Security",
      ],
    },
    {
      student_id: studentUsers[19]._id,
      name: "Tina Lopez",
      university: "UC Davis",
      address: "Davis, CA",
      major: "Sustainable Ag",
      batch_year: 2026,
      sector: [sectors[13]._id],
      skills: ["GIS", "R"],
      parsed_skills: ["GIS", "R", "Data Analysis", "Statistics"],
    },
    {
      student_id: studentUsers[20]._id,
      name: "Uri Hill",
      university: "UVA",
      address: "Charlottesville, VA",
      major: "CS",
      batch_year: 2025,
      sector: [sectors[0]._id],
      skills: ["Go", "GraphQL"],
      parsed_skills: ["Go", "GraphQL", "PostgreSQL", "Microservices"],
    },
    {
      student_id: studentUsers[21]._id,
      name: "Vera Scott",
      university: "UNC",
      address: "Chapel Hill, NC",
      major: "Info Science",
      batch_year: 2026,
      sector: [sectors[3]._id],
      skills: ["SQL", "Tableau"],
      parsed_skills: ["SQL", "Tableau", "Python", "Data Visualization"],
    },
    {
      student_id: studentUsers[22]._id,
      name: "Will Green",
      university: "UW Madison",
      address: "Madison, WI",
      major: "Electrical Eng",
      batch_year: 2025,
      sector: [sectors[17]._id],
      skills: ["Arduino", "PCB Design"],
      parsed_skills: [
        "Arduino",
        "PCB Design",
        "C++",
        "Embedded Systems",
        "IoT",
      ],
    },
    {
      student_id: studentUsers[23]._id,
      name: "Xena Adams",
      university: "CU Boulder",
      address: "Boulder, CO",
      major: "Aerospace",
      batch_year: 2026,
      sector: [sectors[18]._id],
      skills: ["MATLAB", "Simulink"],
      parsed_skills: ["MATLAB", "Simulink", "Python", "Control Systems"],
    },
    {
      student_id: studentUsers[24]._id,
      name: "Yara Baker",
      university: "Boston University",
      address: "Boston, MA",
      major: "Public Health",
      batch_year: 2025,
      sector: [sectors[24]._id],
      skills: ["R", "SAS"],
      parsed_skills: ["R", "SAS", "Epidemiology", "Biostatistics"],
    },
    {
      student_id: studentUsers[25]._id,
      name: "Zane Carter",
      university: "Duke",
      address: "Durham, NC",
      major: "CS",
      batch_year: 2026,
      sector: [sectors[1]._id],
      skills: ["Vue.js", "TypeScript"],
      parsed_skills: ["Vue.js", "TypeScript", "JavaScript", "CSS"],
    },
    {
      student_id: studentUsers[26]._id,
      name: "Amy Patel",
      university: "Johns Hopkins",
      address: "Baltimore, MD",
      major: "Biomedical Eng",
      batch_year: 2025,
      sector: [sectors[24]._id],
      skills: ["Python", "Machine Learning"],
      parsed_skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Scikit-learn",
      ],
    },
    {
      student_id: studentUsers[27]._id,
      name: "Brian Choi",
      university: "UCLA",
      address: "Los Angeles, CA",
      major: "Data Science",
      batch_year: 2026,
      sector: [sectors[3]._id],
      skills: ["R", "SQL"],
      parsed_skills: ["R", "SQL", "Data Wrangling", "ggplot2"],
    },
    {
      student_id: studentUsers[28]._id,
      name: "Clara Nguyen",
      university: "Rice University",
      address: "Houston, TX",
      major: "Computer Science",
      batch_year: 2025,
      sector: [sectors[2]._id],
      skills: ["Kotlin", "Android"],
      parsed_skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Firebase"],
    },
    {
      student_id: studentUsers[29]._id,
      name: "Daniel Kim",
      university: "Yale",
      address: "New Haven, CT",
      major: "Economics",
      batch_year: 2026,
      sector: [sectors[12]._id],
      skills: ["Python", "Pandas"],
      parsed_skills: ["Python", "Pandas", "NumPy", "Financial Analysis"],
    },
  ]);

  // 7. Helper functions for internship text blocks
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

  // 8. Create Internships (company_id references User, company_name and logo denormalized)
  const internships = await Internship.insertMany([
    // Google
    {
      title: "Frontend Developer Intern",
      company_id: companyUsers[0]._id,
      company_name: "Google",
      company_logo: "",
      company_location: "Mountain View, CA",
      type: "remote",
      salary: 2000,
      sector: [sectors[1]._id],
      required_skills: ["React", "JavaScript"],
      parsed_required_skills: [
        { skill: "React", weight: 0.95 },
        { skill: "JavaScript", weight: 0.9 },
        { skill: "CSS", weight: 0.7 },
        { skill: "HTML", weight: 0.6 },
        { skill: "Git", weight: 0.5 },
      ],
      job_description: buildJobDescription("Frontend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-08-01"),
    },
    {
      title: "Machine Learning Intern",
      company_id: companyUsers[0]._id,
      company_name: "Google",
      company_logo: "",
      company_location: "Mountain View, CA",
      type: "hybrid",
      salary: 3400,
      sector: [sectors[4]._id],
      required_skills: ["Python", "TensorFlow"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.95 },
        { skill: "TensorFlow", weight: 0.9 },
        { skill: "Deep Learning", weight: 0.85 },
        { skill: "Pandas", weight: 0.7 },
      ],
      job_description: buildJobDescription("Machine Learning Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-15"),
    },
    // Microsoft
    {
      title: "Backend Developer Intern",
      company_id: companyUsers[1]._id,
      company_name: "Microsoft",
      company_logo: "",
      company_location: "Redmond, WA",
      type: "on-site",
      salary: 2600,
      sector: [sectors[0]._id],
      required_skills: ["Node.js", "C#"],
      parsed_required_skills: [
        { skill: "Node.js", weight: 0.9 },
        { skill: "C#", weight: 0.85 },
        { skill: "REST APIs", weight: 0.8 },
        { skill: "SQL", weight: 0.7 },
      ],
      job_description: buildJobDescription("Backend Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 4,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-07-20"),
    },
    {
      title: "Cloud Engineer Intern",
      company_id: companyUsers[1]._id,
      company_name: "Microsoft",
      company_logo: "",
      company_location: "Redmond, WA",
      type: "hybrid",
      salary: 3000,
      sector: [sectors[7]._id],
      required_skills: ["Azure", "Docker"],
      parsed_required_skills: [
        { skill: "Azure", weight: 0.95 },
        { skill: "Docker", weight: 0.9 },
        { skill: "Kubernetes", weight: 0.8 },
        { skill: "CI/CD", weight: 0.7 },
      ],
      job_description: buildJobDescription("Cloud Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-08-05"),
    },
    // Amazon
    {
      title: "Data Analyst Intern",
      company_id: companyUsers[2]._id,
      company_name: "Amazon",
      company_logo: "",
      company_location: "Seattle, WA",
      type: "hybrid",
      salary: 2300,
      sector: [sectors[3]._id],
      required_skills: ["SQL", "Excel"],
      parsed_required_skills: [
        { skill: "SQL", weight: 0.95 },
        { skill: "Excel", weight: 0.85 },
        { skill: "Python", weight: 0.7 },
        { skill: "Tableau", weight: 0.6 },
      ],
      job_description: buildJobDescription("Data Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 5,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-07-10"),
    },
    {
      title: "DevOps Intern",
      company_id: companyUsers[2]._id,
      company_name: "Amazon",
      company_logo: "",
      company_location: "Seattle, WA",
      type: "remote",
      salary: 2800,
      sector: [sectors[8]._id],
      required_skills: ["AWS", "Terraform"],
      parsed_required_skills: [
        { skill: "AWS", weight: 0.95 },
        { skill: "Terraform", weight: 0.9 },
        { skill: "CI/CD", weight: 0.85 },
        { skill: "Docker", weight: 0.8 },
      ],
      job_description: buildJobDescription("DevOps Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-25"),
    },
    // Spotify
    {
      title: "UI/UX Designer Intern",
      company_id: companyUsers[3]._id,
      company_name: "Spotify",
      company_logo: "",
      company_location: "Stockholm, Sweden",
      type: "hybrid",
      salary: 1800,
      sector: [sectors[9]._id],
      required_skills: ["Figma"],
      parsed_required_skills: [
        { skill: "Figma", weight: 0.95 },
        { skill: "User Research", weight: 0.85 },
        { skill: "Wireframing", weight: 0.8 },
        { skill: "Adobe XD", weight: 0.6 },
      ],
      job_description: buildJobDescription("UI/UX Designer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Create user flows and prototypes.",
      ),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-08-10"),
    },
    // Tesla
    {
      title: "Embedded Systems Intern",
      company_id: companyUsers[4]._id,
      company_name: "Tesla",
      company_logo: "",
      company_location: "Palo Alto, CA",
      type: "on-site",
      salary: 3300,
      sector: [sectors[17]._id],
      required_skills: ["C++", "Embedded C"],
      parsed_required_skills: [
        { skill: "C++", weight: 0.95 },
        { skill: "Embedded C", weight: 0.9 },
        { skill: "Microcontrollers", weight: 0.85 },
        { skill: "RTOS", weight: 0.7 },
      ],
      job_description: buildJobDescription("Embedded Systems Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-06-30"),
    },
    // Netflix
    {
      title: "Site Reliability Intern",
      company_id: companyUsers[5]._id,
      company_name: "Netflix",
      company_logo: "",
      company_location: "Los Gatos, CA",
      type: "remote",
      salary: 3200,
      sector: [sectors[8]._id],
      required_skills: ["Python", "AWS"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.9 },
        { skill: "AWS", weight: 0.85 },
        { skill: "Monitoring", weight: 0.8 },
        { skill: "Linux", weight: 0.7 },
      ],
      job_description: buildJobDescription("Site Reliability Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Ensure high availability and performance.",
      ),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-18"),
    },
    // Meta
    {
      title: "Mobile Developer Intern (iOS)",
      company_id: companyUsers[6]._id,
      company_name: "Meta",
      company_logo: "",
      company_location: "Menlo Park, CA",
      type: "hybrid",
      salary: 3100,
      sector: [sectors[2]._id],
      required_skills: ["Swift", "iOS"],
      parsed_required_skills: [
        { skill: "Swift", weight: 0.95 },
        { skill: "iOS", weight: 0.9 },
        { skill: "UIKit", weight: 0.8 },
        { skill: "Core Data", weight: 0.7 },
      ],
      job_description: buildJobDescription("iOS Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-22"),
    },
    // Apple
    {
      title: "AR/VR Developer Intern",
      company_id: companyUsers[7]._id,
      company_name: "Apple",
      company_logo: "",
      company_location: "Cupertino, CA",
      type: "on-site",
      salary: 3500,
      sector: [sectors[21]._id],
      required_skills: ["Unity", "C#"],
      parsed_required_skills: [
        { skill: "Unity", weight: 0.95 },
        { skill: "C#", weight: 0.9 },
        { skill: "ARKit", weight: 0.85 },
        { skill: "3D Modeling", weight: 0.7 },
      ],
      job_description: buildJobDescription("AR/VR Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Build immersive AR experiences.",
      ),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-08-12"),
    },
    // Adobe
    {
      title: "Product Management Intern",
      company_id: companyUsers[8]._id,
      company_name: "Adobe",
      company_logo: "",
      company_location: "San Jose, CA",
      type: "hybrid",
      salary: 2700,
      sector: [sectors[10]._id],
      required_skills: ["Communication", "Market Research"],
      parsed_required_skills: [
        { skill: "Market Research", weight: 0.9 },
        { skill: "Roadmapping", weight: 0.85 },
        { skill: "Agile", weight: 0.8 },
        { skill: "Data Analysis", weight: 0.7 },
      ],
      job_description: buildJobDescription("Product Manager"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Work with engineering and design teams.",
      ),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-08-08"),
    },
    // Shopify
    {
      title: "E-commerce Analyst Intern",
      company_id: companyUsers[9]._id,
      company_name: "Shopify",
      company_logo: "",
      company_location: "Ottawa, Canada",
      type: "remote",
      salary: 2100,
      sector: [sectors[22]._id],
      required_skills: ["SQL", "Excel"],
      parsed_required_skills: [
        { skill: "SQL", weight: 0.9 },
        { skill: "Excel", weight: 0.85 },
        { skill: "Data Visualization", weight: 0.7 },
        { skill: "Python", weight: 0.6 },
      ],
      job_description: buildJobDescription("E-commerce Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 4,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-07-28"),
    },
    // Uber
    {
      title: "Data Science Intern",
      company_id: companyUsers[10]._id,
      company_name: "Uber",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "hybrid",
      salary: 3400,
      sector: [sectors[4]._id],
      required_skills: ["Python", "SQL"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.95 },
        { skill: "SQL", weight: 0.9 },
        { skill: "Machine Learning", weight: 0.85 },
        { skill: "A/B Testing", weight: 0.8 },
      ],
      job_description: buildJobDescription("Data Scientist"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Analyze large datasets to drive decisions.",
      ),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-08-02"),
    },
    // Airbnb
    {
      title: "Full Stack Developer Intern",
      company_id: companyUsers[11]._id,
      company_name: "Airbnb",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 2900,
      sector: [sectors[0]._id, sectors[1]._id],
      required_skills: ["JavaScript", "React", "Node.js"],
      parsed_required_skills: [
        { skill: "JavaScript", weight: 0.9 },
        { skill: "React", weight: 0.85 },
        { skill: "Node.js", weight: 0.8 },
        { skill: "MongoDB", weight: 0.7 },
      ],
      job_description: buildJobDescription("Full Stack Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-07-30"),
    },
    // Stripe
    {
      title: "Security Engineer Intern",
      company_id: companyUsers[12]._id,
      company_name: "Stripe",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 3200,
      sector: [sectors[6]._id],
      required_skills: ["Cybersecurity", "Python"],
      parsed_required_skills: [
        { skill: "Cybersecurity", weight: 0.95 },
        { skill: "Python", weight: 0.9 },
        { skill: "Penetration Testing", weight: 0.85 },
        { skill: "Cryptography", weight: 0.8 },
      ],
      job_description: buildJobDescription("Security Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Help secure payment infrastructure.",
      ),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-08-15"),
    },
    // Twilio
    {
      title: "Developer Relations Intern",
      company_id: companyUsers[13]._id,
      company_name: "Twilio",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "remote",
      salary: 2400,
      sector: [sectors[11]._id],
      required_skills: ["Communication", "JavaScript"],
      parsed_required_skills: [
        { skill: "JavaScript", weight: 0.8 },
        { skill: "Technical Writing", weight: 0.85 },
        { skill: "Public Speaking", weight: 0.7 },
        { skill: "Node.js", weight: 0.6 },
      ],
      job_description: buildJobDescription("Developer Relations"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(
        "Create tutorials and engage with developers.",
      ),
      openings: 2,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-08-20"),
    },
    // Datadog
    {
      title: "Observability Intern",
      company_id: companyUsers[14]._id,
      company_name: "Datadog",
      company_logo: "",
      company_location: "New York, NY",
      type: "hybrid",
      salary: 3000,
      sector: [sectors[8]._id],
      required_skills: ["Python", "Monitoring"],
      parsed_required_skills: [
        { skill: "Python", weight: 0.9 },
        { skill: "Prometheus", weight: 0.85 },
        { skill: "Grafana", weight: 0.8 },
        { skill: "AWS", weight: 0.7 },
      ],
      job_description: buildJobDescription("Observability Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities("Build dashboards and alerts."),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-08-25"),
    },
    // Additional internships to reach 40+
    {
      title: "Game Developer Intern",
      company_id: companyUsers[0]._id,
      company_name: "Google",
      company_logo: "",
      company_location: "Mountain View, CA",
      type: "hybrid",
      salary: 2500,
      sector: [sectors[15]._id],
      required_skills: ["Unity", "C#"],
      parsed_required_skills: [
        { skill: "Unity", weight: 0.95 },
        { skill: "C#", weight: 0.9 },
        { skill: "Game Physics", weight: 0.8 },
      ],
      job_description: buildJobDescription("Game Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-08-18"),
    },
    {
      title: "Blockchain Intern",
      company_id: companyUsers[2]._id,
      company_name: "Amazon",
      company_logo: "",
      company_location: "Seattle, WA",
      type: "remote",
      salary: 3000,
      sector: [sectors[14]._id],
      required_skills: ["Solidity"],
      parsed_required_skills: [
        { skill: "Solidity", weight: 0.95 },
        { skill: "Ethereum", weight: 0.9 },
        { skill: "Smart Contracts", weight: 0.85 },
      ],
      job_description: buildJobDescription("Blockchain Developer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-08-22"),
    },
    {
      title: "Robotics Intern",
      company_id: companyUsers[4]._id,
      company_name: "Tesla",
      company_logo: "",
      company_location: "Palo Alto, CA",
      type: "on-site",
      salary: 3200,
      sector: [sectors[18]._id],
      required_skills: ["ROS", "Python"],
      parsed_required_skills: [
        { skill: "ROS", weight: 0.95 },
        { skill: "Python", weight: 0.9 },
        { skill: "C++", weight: 0.8 },
      ],
      job_description: buildJobDescription("Robotics Engineer"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Experienced",
      isClosed: false,
      application_date: new Date("2026-08-28"),
    },
    {
      title: "Digital Marketing Intern",
      company_id: companyUsers[3]._id,
      company_name: "Spotify",
      company_logo: "",
      company_location: "Stockholm, Sweden",
      type: "remote",
      salary: 1700,
      sector: [sectors[11]._id],
      required_skills: ["SEO", "Content Marketing"],
      parsed_required_skills: [
        { skill: "SEO", weight: 0.9 },
        { skill: "Google Analytics", weight: 0.85 },
        { skill: "Social Media", weight: 0.7 },
      ],
      job_description: buildJobDescription("Digital Marketing Specialist"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 3,
      level: "Beginner",
      isClosed: false,
      application_date: new Date("2026-08-14"),
    },
    {
      title: "Finance Analyst Intern",
      company_id: companyUsers[12]._id,
      company_name: "Stripe",
      company_logo: "",
      company_location: "San Francisco, CA",
      type: "hybrid",
      salary: 2500,
      sector: [sectors[12]._id],
      required_skills: ["Excel", "Financial Modeling"],
      parsed_required_skills: [
        { skill: "Excel", weight: 0.95 },
        { skill: "Financial Modeling", weight: 0.9 },
        { skill: "SQL", weight: 0.7 },
      ],
      job_description: buildJobDescription("Finance Analyst"),
      eligibility: buildEligibility(),
      responsibilities: buildResponsibilities(),
      openings: 2,
      level: "Medium",
      isClosed: false,
      application_date: new Date("2026-08-30"),
    },
  ]);

  // 9. Create Applications (120+ realistic applications)
  const applications = [];
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const numApps = Math.floor(Math.random() * 4) + 3; // 3 to 6
    const shuffledInternships = [...internships].sort(
      () => 0.5 - Math.random(),
    );
    for (let j = 0; j < numApps && j < shuffledInternships.length; j++) {
      const internship = shuffledInternships[j];
      const studentSkillsSet = new Set(
        student.parsed_skills.map((s) => s.toLowerCase()),
      );
      const internshipSkills = internship.parsed_required_skills.map((ps) =>
        ps.skill.toLowerCase(),
      );
      const overlap = internshipSkills.filter((skill) =>
        studentSkillsSet.has(skill),
      ).length;
      const matchScore = Math.min(
        98,
        Math.max(
          40,
          Math.floor((overlap / internshipSkills.length) * 100) +
            Math.floor(Math.random() * 15) -
            7,
        ),
      );
      let status = "pending";
      const rand = Math.random();
      if (rand < 0.2) status = "accepted";
      else if (rand < 0.35) status = "rejected";
      else status = "pending";
      const matched_skills = internshipSkills.filter((skill) =>
        studentSkillsSet.has(skill),
      );
      const applied_date = new Date();
      applied_date.setDate(
        applied_date.getDate() - Math.floor(Math.random() * 60),
      );
      applications.push({
        student_id: student.student_id,
        internship_id: internship._id,
        match_score: matchScore,
        status,
        applied_date,
        matched_skills,
      });
    }
  }
  while (applications.length < 120) {
    const student = students[Math.floor(Math.random() * students.length)];
    const internship =
      internships[Math.floor(Math.random() * internships.length)];
    if (
      !applications.some(
        (app) =>
          app.student_id.equals(student.student_id) &&
          app.internship_id.equals(internship._id),
      )
    ) {
      applications.push({
        student_id: student.student_id,
        internship_id: internship._id,
        match_score: Math.floor(Math.random() * 60) + 30,
        status: ["pending", "accepted", "rejected"][
          Math.floor(Math.random() * 3)
        ],
        applied_date: new Date(
          Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000,
        ),
        matched_skills: [],
      });
    }
  }

  await Application.insertMany(applications);

  console.log(`✅ Seeding complete!`);
  console.log(`   - ${sectors.length} sectors`);
  console.log(
    `   - ${users.length} users (${companyUsers.length} companies, ${studentUsers.length} students, 2 admins)`,
  );
  console.log(`   - ${companies.length} company profiles`);
  console.log(`   - ${students.length} student profiles`);
  console.log(`   - ${internships.length} internships`);
  console.log(`   - ${applications.length} applications`);
}

seedDatabase()
  .then(() => {
    console.log("🌱 Seeding finished, closing connection...");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    mongoose.connection.close();
  });
