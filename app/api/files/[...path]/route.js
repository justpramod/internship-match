import { auth } from "@/lib/auth";
import { readLocalFile } from "@/lib/localStorage";
import path from "node:path";

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".webp": "image/webp",
};

export async function GET(request, { params }) {
  const { path: pathSegments } = await params;
  const fileKey = pathSegments.join("/");

  if (fileKey.startsWith("resumes/")) {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  try {
    const file = await readLocalFile(fileKey);
    const extension = fileKey.slice(fileKey.lastIndexOf(".")).toLowerCase();

    return new Response(file, {
      headers: {
        "Content-Type": contentTypes[extension] || "application/octet-stream",
        "Cache-Control": "private, max-age=3600",
        ...(request.nextUrl.searchParams.has("download")
          ? {
              "Content-Disposition": `attachment; filename="${path.basename(
                request.nextUrl.searchParams.get("download"),
              )}"`,
            }
          : {}),
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("File not found", { status: 404 });
  }
}
