import { getLocalFileUrl } from "../localStorage";

export async function getProfilePicUrl(key) {
  //get signed url for profile pics
  //
  try {
    if (!key) {
      throw new Error("No key");
    }
    if (key.startsWith("https")) {
      // if key is the default link
      return key;
    }

    return getLocalFileUrl(key);
  } catch (error) {
    console.log(error);
    return "https://pub-4e224a60371345f9994eb80b6f5ef710.r2.dev/profile-pics_default_profile_pic.jpg";
  }
}
