export async function getUploadStats() {
  const response = await fetch("/dashboard/upload-stats");
  return response;
}

export async function getRecentFiles() {
  const response = await fetch("/dashboard/recent-files");
  return response;
}
