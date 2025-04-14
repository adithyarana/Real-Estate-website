import dotenv from "dotenv";
import prisma from "../libs/prisma.js";
import cloudinary from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/deleteImage.js";

dotenv.config();

export const AddProperty = async(req,res) => {
    try {

        // console.log("Add property data ",req.body);
        // console.log("Add property data ",req.files);

        const {title,description,type,price,location,address,bedrooms,bathrooms,propertyType,area,status,priorityLevel,amenities,tags} = req.body;
        const {thumbnail ,images} = req.files;
        
        const parsedLocation = JSON.parse(location);
        const parsedAmenities = JSON.parse(amenities);
        const parsedTags = JSON.parse(tags);

        if(!title || !description || !location || !address || !area || !thumbnail){
            return res.stauts(401).json({
                success: false,
                message: "All fields required!"
            });
        }


        if(!process.env.PROPERTY_TYPE.includes(propertyType) || !process.env.TYPE.includes(type) || !process.env.PROPERTY_STATUS.includes(status)){
            return res.status(401).josn({
                success: false,
                message: "All fields required!"
            });
        }

        const thumbnailUploadPromise = cloudinary.uploader.upload(thumbnail[0].path);
        const thumbnailResult = await Promise.resolve(thumbnailUploadPromise);

        // Upload multiple images to Cloudinary
        const imageUploadPromises = images.map((file) =>
              cloudinary.uploader.upload(file.path)
        );
        const imageResults = await Promise.all(imageUploadPromises);

            // Extract image URLs from Cloudinary response
        const imageUrls = imageResults.map((result) => result.secure_url);

        const propertyData = {
            title,
            description,
            type,
            price,
            location:parsedLocation,
            address,
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            area,
            status,
            priorityLevel,
            thumbnail: thumbnailResult?.secure_url,
            images: imageUrls,
            amenities: parsedAmenities,
            tags: parsedTags,
            propertyType,
        };

        console.log("Add property final data",propertyData);

        const property = await prisma.property.create({
            data:propertyData
        });

        console.log("Add property property ",property);

        return res.status(200).json({
            success: true,
            message: "Property created!",
            data: property
        });

    } catch (error) {
        console.log("Add properites error - ",error)
        return res.status(499).json({
            success: false,
            message: "Something went wrong!"
        });
    }
}


export const GetAllProperties = async(req,res) => {
    try {
        
        const properties = await prisma.property.findMany({    
        });

        return res.status(200).json({
            success: true,
            message: "All properties retrived",
            data: properties
        })

    } catch (error) {
        console.log("Get properties error - ",error)
        return res.status(499).json({
            success: false,
            message: "Something went wrong!"
        });
    }
}

export const DeleteProperty = async(req,res) => {
    try {
        const { propertyId } = req.params;

        const property = await prisma.property.findFirst({
            where:{
                id: propertyId
            }
        });

        deleteImageFromCloudinary(property?.thumbnail);
        property.images.forEach(img => {
            deleteImageFromCloudinary(img)
        });

        await prisma.property.delete({
            where:{
                id: propertyId
            }
        });
        
        return res.status(200).json({
            success: true,
            message: "Property deleted successfully!"
        })

    } catch (error) {
        console.log("Delete property error - ",error)
        return res.status(499).json({
            success: false,
            message: "Something went wrong!"
        });
    }
}