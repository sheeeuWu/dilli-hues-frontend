export function formatImageUrl(url) {
  if (!url) return "/images/placeholder.jpg";

  // Uploaded from local server
  if (url.startsWith("/upload")) {
    return `http://localhost:2807${url}`;
  }

  // Google Drive link (handle multiple formats)
  if (url.includes("drive.google.com")) {
    // Extract file ID from either ?id=... or /d/.../view format
    const idMatch = url.match(/[-\w]{25,}/); // 25+ character Drive file ID
    const fileId = idMatch?.[0];
    return fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : "/images/placeholder.jpg";
  }

  // Already a valid external URL (e.g., Unsplash)
  return url;
}