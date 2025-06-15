import dotenv from "dotenv";
import prisma from "../libs/prisma.js";
import cloudinary from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/deleteImage.js";

dotenv.config();

function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const AddProperty = async (req, res) => {
  try {
    // Get form data directly from req.body
    const {
      title,
      description,
      type,
      price,
      location,
      address,
      bedrooms,
      bathrooms,
      propertyType,
      area,
      status,
      priorityLevelString,
      additionalData,
      amenities,
      tags,
      region,
      propertySubType,
    } = req.body;

    // Convert priorityLevel to number
    const priorityLevel = parseInt(priorityLevelString) || 0;
    // Validate that files were uploaded
    if (!req.files || !req.files.thumbnail || !req.files.thumbnail[0]) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    const { thumbnail, images } = req.files;

    // Convert stringified arrays to actual arrays
    const parsedLocation = JSON.parse(location || '[]');
    const parsedAmenities = JSON.parse(amenities || '[]');
    const parsedTags = JSON.parse(tags || '[]');

    if (
      !title ||
      !description ||
      !address ||
      !area ||
      !thumbnail ||
      !region
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields required!",
      });
    }

    // Define default values if environment variables are not set
    const propertyTypes = process.env.PROPERTY_TYPE || "COMMERCIAL,INDUSTRIAL,INSTITUTIONAL,RESIDENTIAL";
    const types = process.env.TYPE || "SALE,LEASE,PRE_LEASED";
    const statuses = process.env.PROPERTY_STATUS || "AVAILABLE,SOLD,RENTED,PENDING";

    // Convert to arrays
    const allowedPropertyTypes = propertyTypes.split(',');
    const allowedTypes = types.split(',');
    const allowedStatuses = statuses.split(',');

    if (
      !allowedPropertyTypes.includes(propertyType) ||
      !allowedTypes.includes(type) ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid property type, type, or status",
        allowedTypes: allowedTypes,
        allowedPropertyTypes: allowedPropertyTypes,
        allowedStatuses: allowedStatuses
      });
    }

    const thumbnailUploadPromise = cloudinary.uploader.upload(
      thumbnail[0].path
    );
    const thumbnailResult = await Promise.resolve(thumbnailUploadPromise);

    // Upload multiple images to Cloudinary
    const imageUploadPromises = images?.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const imageResults = await Promise.all(imageUploadPromises);

    // Extract image URLs from Cloudinary response
    const imageUrls = imageResults.map((result) => result.secure_url);

    const propertyData = {
      title,
      pCode: generateSixDigitCode(),
      description,
      type,
      price,
      location: parsedLocation,
      address,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      area,
      region,
      status,
      priorityLevel,
      thumbnail: thumbnailResult?.secure_url,
      images: imageUrls,
      amenities: parsedAmenities,
      tags: parsedTags,
      additionalData,
      propertyType,
      propertySubType,
    };

    console.log("Add property final data", propertyData);

    const property = await prisma.property.create({
      data: propertyData,
    });

    console.log("Add property property ", property);

    return res.status(200).json({
      success: true,
      message: "Property created!",
      data: property,
    });
  } catch (error) {
    console.log("Add properites error - ", error);
    return res.status(499).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const UpdateProperty = async (req, res) => {
  try {
    const { ...data } = req.body;

    const thumbnailFile = req.files?.thumbnail[0] || null;
    const galleryImages = req.files?.images || [];
    const { propertyId } = req.params;

    console.log(thumbnailFile);

    if (!data || !propertyId) {
      return res.stauts(401).json({
        success: false,
        message: "All fields required!",
      });
    }

    const propertyDetails = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });

    //Needed for automatic delete unwanted pics from cloudinary too
    if (data.images) {
      propertyDetails.images.map((img) => {
        if (!data.images.includes(img)) {
          deleteImageFromCloudinary(img);
        }
      });
    }

    if (thumbnailFile) {
      // await deleteImageFromCloudinary(propertyDetails?.thumbnail);
      const thumbnailUploadPromise = cloudinary.uploader.upload(
        thumbnailFile.path
      );
      const thumbnailUploadRes = await Promise.resolve(thumbnailUploadPromise);
      data.thumbnail = thumbnailUploadRes?.secure_url;
    }

    if (galleryImages.length > 0) {
      const imageUploadPromises = galleryImages.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const imageResults = await Promise.all(imageUploadPromises);
      data.images = [...data.images, ...imageResults];
    }

    console.log("Update property data", data);

    const updatedProperty = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: data,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated!",
      data: updatedProperty,
    });
  } catch (error) {
    console.log("Update properites error - ", error);
    return res.status(499).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const GetAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        priorityLevel: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "All properties retrived",
      data: properties,
    });
  } catch (error) {
    console.log("Get properties error - ", error);
    return res.status(499).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const GetPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: {
        id: id,
        // isActive: true,
      },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property retrieved successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const DeleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });

    deleteImageFromCloudinary(property?.thumbnail);
    property.images.forEach((img) => {
      deleteImageFromCloudinary(img);
    });

    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully!",
    });
  } catch (error) {
    console.log("Delete property error - ", error);
    return res.status(499).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// const GetPropertyByid = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const property = prisma.property.findFirst({
//       where: {
//         id: id,
//       },
//     });

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Property retrieved successfully",
//       data: property,
//     });
//   } catch (error) {
//     console.error("Error fetching property:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong!",
//     });
//   }
// };
