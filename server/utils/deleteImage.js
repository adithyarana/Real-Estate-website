import cloudinary from "./cloudinary.js";

function getPublicIdFromUrl(url) {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    const start = uploadIndex >= 0 ? uploadIndex + 1 : parts.findIndex((p) => /^v\d+$/.test(p)) + 1;
    const publicIdParts = parts.slice(Math.max(start, 0)).filter((p) => !/^v\d+$/.test(p));
    let publicId = publicIdParts.join("/");

    if (!url.includes("/raw/")) {
      publicId = publicId.replace(/\.[^/.]+$/, "");
    }

    return publicId;
  }

  const resourceTypeFromUrl = (url = "") => {
    if (url.includes("/raw/")) return "raw";
    if (url.includes("/video/")) return "video";
    return "image";
  };

  export const deleteImageFromCloudinary = async(secure_url) => {
    try {
        const publicId = getPublicIdFromUrl(secure_url);
        await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceTypeFromUrl(secure_url),
        });
    } catch (error) {
        console.log("Error while delete image",error);
    }
  }