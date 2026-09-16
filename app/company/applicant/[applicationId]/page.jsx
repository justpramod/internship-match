import getApplicantInfo from "@/lib/utils/company/getApplicantInfo";
import InfoSection from "./components/InfoSection";
import ResumeSection from "./components/ResumeSection";
import SkillsSection from "./components/SkillsSection";

export default async function ApplicantPage({ params }) {
  const { applicationId } = await params;
  console.log(applicationId);
  let applicantInfo = null;
  const response = await getApplicantInfo(applicationId);

  if (response?.success) applicantInfo = response.applicantInfo;

  if (!applicantInfo)
    return <div>{response?.error || "Failed getting applicants info."}</div>;
  return (
    <div className="flex items-center flex-col gap-5 px-2 md:px-20">
      <InfoSection applicantInfo={applicantInfo} />
      <SkillsSection applicantInfo={applicantInfo} />
      <ResumeSection applicantInfo={applicantInfo} />
    </div>
  );
}
