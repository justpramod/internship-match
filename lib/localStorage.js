import fs from "node:fs/promises";
import path from "node:path";

const storageRoot = path.join(process.cwd(), "attachments");

function getSafePath(fileKey) {
  const resolvedPath = path.resolve(storageRoot, fileKey);
  if (
    resolvedPath !== storageRoot &&
    !resolvedPath.startsWith(`${storageRoot}${path.sep}`)
  ) {
    throw new Error("Invalid file key");
  }
  return resolvedPath;
}

export async function saveLocalFile(fileKey, buffer) {
  const filePath = getSafePath(fileKey);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buffer);
}

export async function deleteLocalFile(fileKey) {
  if (!fileKey) return;
  await fs.rm(getSafePath(fileKey), { force: true });
}

export async function readLocalFile(fileKey) {
  return fs.readFile(getSafePath(fileKey));
}

export function getLocalFileUrl(fileKey, downloadFileName) {
  const url = `/api/files/${fileKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
  if (!downloadFileName) return url;
  return `${url}?download=${encodeURIComponent(downloadFileName)}`;
}
