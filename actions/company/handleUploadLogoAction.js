"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import { deleteLocalFile, saveLocalFile } from "@/lib/localStorage";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export default async function handleUploadLogoAction(prevVal, formData) {
  try {
    const session = await auth();
    if (session?.user.role !== "company") {
      return { error: "Not logged in as company!" };
    }

    const image = formData.get("file");
    if (!image) {
      return { error: "Upload a image!" };
    }
    if (image.type !== "image/jpeg") {
      return { error: "Only .jpg format is supported!" };
    }
    if (image.size > 1024 * 2 * 1024) {
      return { error: "File size should be less than 2MB!" };
    }

    const bytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(bytes);

    await dbConnect();
    const companyId = session.user.userId;

    //resize and compress the image

    const compressedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 512, height: 512, fit: "inside" }) //resize
      .jpeg({ quality: 80 }) //compress
      .toBuffer();

    const uniqueKey = `company-logo/${Date.now()}-${image.name}`;
    await saveLocalFile(uniqueKey, compressedImageBuffer);

    //save the image url to db
    //
    const company = await CompanyProfile.findOne({ company_id: companyId });

    if (!company) {
      return { error: "Company not found!" };
    }

    const previousLogoKey = company.logo;

    company.logo = uniqueKey;
    company.save();
    revalidatePath("/company/profile");

    try {
      //donot disturb the upload process if deletion of previous logo fails.
      console.log(previousLogoKey);
      if (previousLogoKey && !previousLogoKey.startsWith("http"))
        await deleteLocalFile(previousLogoKey);
    } catch (error) {
      console.log(error);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed uploading the logo." };
  }
}
