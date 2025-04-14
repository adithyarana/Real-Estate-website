import cloudinary from "./cloudinary.js";

function getPublicIdFromUrl(url) {
    const parts = url.split("/");
    const versionIndex = parts.findIndex((p) => p.startsWith("v"));
    const publicIdParts = parts.slice(versionIndex + 1);
    let publicId = publicIdParts.join("/");
  
    // Remove file extension
    publicId = publicId.replace(/\.[^/.]+$/, "");
  
    return publicId;
  }


  export const deleteImageFromCloudinary = async(secure_url) => {
    try {
        console.log("Secure url",secure_url)
        const publicId = getPublicIdFromUrl(secure_url);

        const res =  await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("Error while delete image",error);
    }
  }