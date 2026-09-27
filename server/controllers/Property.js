import dotenv from "dotenv";
import prisma from "../libs/prisma.js";
import { deleteImageFromCloudinary } from "../utils/deleteImage.js";

dotenv.config();

function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function parseMaybeJson(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function fileUrl(file) {
  return file?.path || file?.secure_url || null;
}

function optionalInt(value) {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
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
      projectId,
      virtualTourUrl,
    } = req.body;

    // Add some logging to debug
    console.log("Prisma client:", prisma);
    console.log("Prisma property model:", prisma.property);

    // Convert priorityLevel to number (form sends priorityLevel)
    const priorityLevel =
      optionalInt(req.body.priorityLevel ?? priorityLevelString) || 0;
    // Validate that files were uploaded
    if (!req.files || !req.files.thumbnail || !req.files.thumbnail[0]) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    const { thumbnail, images } = req.files;

    // Convert stringified arrays to actual arrays
    const parsedLocation = parseMaybeJson(location, {});
    const parsedAmenities = parseMaybeJson(amenities, []);
    const parsedTags = parseMaybeJson(tags, []);
    const parsedAdditionalData = parseMaybeJson(additionalData, undefined);

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

    const thumbnailUrl = fileUrl(thumbnail[0]);
    const imageUrls = (images || []).map(fileUrl).filter(Boolean);

    const propertyData = {
      title,
      pCode: generateSixDigitCode(),
      description,
      type,
      price,
      location: parsedLocation,
      address,
      bedrooms: optionalInt(bedrooms),
      bathrooms: optionalInt(bathrooms),
      area,
      region,
      status,
      priorityLevel,
      thumbnail: thumbnailUrl,
      images: imageUrls,
      amenities: parsedAmenities,
      tags: parsedTags,
      propertyType,
      propertySubType,
      virtualTourUrl: virtualTourUrl || null,
    };

    if (parsedAdditionalData !== undefined) {
      propertyData.additionalData = parsedAdditionalData;
    }

    if (projectId) {
      propertyData.projectId = projectId;
    }

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
    const { propertyId } = req.params;
    const body = req.body || {};

    if (!propertyId) {
      return res.status(401).json({
        success: false,
        message: "All fields required!",
      });
    }

    const propertyDetails = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });

    if (!propertyDetails) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const thumbnailFile = req.files?.thumbnail?.[0] || null;
    const galleryImages = req.files?.images || [];

    const parsedLocation = parseMaybeJson(body.location, propertyDetails.location);
    const parsedAmenities = parseMaybeJson(body.amenities, propertyDetails.amenities);
    const parsedTags = parseMaybeJson(body.tags, propertyDetails.tags);
    const parsedAdditionalData = parseMaybeJson(
      body.additionalData,
      propertyDetails.additionalData
    );
    const existingImages = parseMaybeJson(
      body.existingImages,
      propertyDetails.images || []
    );

    if (Array.isArray(propertyDetails.images)) {
      propertyDetails.images.forEach((img) => {
        if (!existingImages.includes(img)) {
          deleteImageFromCloudinary(img);
        }
      });
    }

    const data = {
      title: body.title ?? propertyDetails.title,
      description: body.description ?? propertyDetails.description,
      type: body.type ?? propertyDetails.type,
      price: body.price ?? propertyDetails.price,
      location: parsedLocation,
      address: body.address ?? propertyDetails.address,
      bedrooms:
        body.bedrooms !== undefined ? optionalInt(body.bedrooms) : propertyDetails.bedrooms,
      bathrooms:
        body.bathrooms !== undefined ? optionalInt(body.bathrooms) : propertyDetails.bathrooms,
      area: body.area ?? propertyDetails.area,
      region: body.region ?? propertyDetails.region,
      status: body.status ?? propertyDetails.status,
      priorityLevel:
        optionalInt(body.priorityLevel ?? body.priorityLevelString) ??
        propertyDetails.priorityLevel,
      amenities: parsedAmenities,
      tags: parsedTags,
      additionalData: parsedAdditionalData,
      propertyType: body.propertyType ?? propertyDetails.propertyType,
      propertySubType: body.propertySubType ?? propertyDetails.propertySubType,
      virtualTourUrl: body.virtualTourUrl ?? propertyDetails.virtualTourUrl,
    };

    if (body.projectId) {
      data.projectId = body.projectId;
    }

    if (thumbnailFile) {
      data.thumbnail = fileUrl(thumbnailFile);
    }

    const newImageUrls = galleryImages.map(fileUrl).filter(Boolean);
    data.images = [...existingImages, ...newImageUrls];

    const updatedProperty = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data,
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

    if(!property){
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

   if(property?.thumbnail){
    await deleteImageFromCloudinary(property.thumbnail);

   }

   const imageDeletionPromises = property.images.map((img) =>
    deleteImageFromCloudinary(img)
  );
  await Promise.all(imageDeletionPromises);

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
