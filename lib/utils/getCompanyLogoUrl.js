import { getLocalFileUrl } from "../localStorage";

export default function getCompanyLogoUrl(key) {
  if (!key || key.length === 0)
    return "https://pub-4e224a60371345f9994eb80b6f5ef710.r2.dev/default_company_logo.jpg";
  if (key.startsWith("https")) {
    //default logo
    return key;
  }
  return getLocalFileUrl(key);
}
