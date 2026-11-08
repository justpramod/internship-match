import { getLocalFileUrl } from "../localStorage";

export default async function getResumeUrl(
  fileKey,
  contentDisposition = false,
  fileName,
) {
  try {
    if (!fileKey) return { error: true, message: "Resume Key is empty" };

    if (fileKey.startsWith("http")) return fileKey;
    return getLocalFileUrl(fileKey, contentDisposition ? fileName : undefined);
  } catch (error) {
    return { error: true, message: error.message };
  }
}
