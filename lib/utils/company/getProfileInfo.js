import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import getCompanyLogoUrl from "../getCompanyLogoUrl";

export default async function getProfileInfo() {
  try {
    //get company id form session
    const session = await auth();
    if (session?.user?.role !== "company") {
      return { error: "Login first  to view your profile." };
    }
    const companyId = session.user.userId;

    if (!companyId) return { error: "Login first to view your profile." };

    await dbConnect();

    const company = await CompanyProfile.findOne({
      company_id: companyId,
    })
      .populate("company_id")
      .lean();
    if (!company) return { error: "Login first to view your profile." };

    const basicInfoData = {
      email: company.company_id.email,
      name: company.name,
      industry: company.industry || "",
      website: company.website || "",
      companySize: company.company_size || "",
      aboutCompany: company.about_company || "",
    };
    const locationContactData = {
      streetAddress: company.location?.street_address || "",
      city: company.location?.city || "",
      province: company.location?.province || "",
      country: company.location?.country || "",
      contactNumber: company.contact?.number || "",
      contactEmail: company.contact?.email || "",
    };

    const socialLinksData = {
      linkedin: company.social_links?.linkedin || "",
      x: company.social_links?.x || "",
      facebook: company.social_links?.facebook || "",
    };

    const logoUrl = getCompanyLogoUrl(company.logo);

    return { basicInfoData, locationContactData, socialLinksData, logoUrl };
  } catch (error) {
    console.log(error);
    return { error: "Failed to get profile info. Try again." };
  }
}
