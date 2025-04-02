import express from "express";
import prisma from "../libs/prisma.js";
import cloudinary from "../utils/cloudinary.js";

export const addProperty = async (req, res) => {
  try {
    console.log("Received request:", req.body);

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const {
      title,
      description,
      location,
      Area,
      propertyType,
      propertySubType,
    } = req.body;

    // // Check if required fields exist
    // if (!title || !description || !price || !location  || !Area || !propertyType || !propertySubType) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const priceFloat = parseFloat(req.body.price); 

    if (isNaN(priceFloat)) {
      return res.status(400).json({ message: "Invalid price format" });
    }

    // Validate Property Type
    if (!["PLOT", "APARTMENT"].includes(propertyType)) {
      return res
        .status(400)
        .json({ message: "Invalid property type. Choose PLOT or APARTMENT." });
    }

    // Validate Property Sub-Type
    if (!["RENT", "BUY"].includes(propertySubType)) {
      return res
        .status(400)
        .json({ message: "Invalid property sub-type. Choose RENT or BUY." });
    }

    // Upload multiple images to Cloudinary
    const imageUploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const imageResults = await Promise.all(imageUploadPromises);

    // Extract image URLs from Cloudinary response
    const imageUrls = imageResults.map((result) => result.secure_url);

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price:priceFloat,
        location,
        images: imageUrls, //Store an array of image URLs in DB
        Area,
        propertyType,
        propertySubType,
      },
    });

    res
      .status(201)
      .json({ message: "property created successfully", newProperty });
  } catch (error) {
    console.log("Error adding the property", error);
    res.status(500).json({ message: "Server error adding property" });
  }
};

// delete property

export const deleteproprty = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received request to delete property with ID:", id);

    // check if the user exists

    const existingProprty = await prisma.property.findUnique({ where: { id } });

    if (!existingProprty) {
      return res.status(404).json({ message: "Property not found" });
    }

    //delete the property
    // await prisma.property.delete({where:{id:parseInt(id)}})
    await prisma.property.delete({ where: { id } });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Error deleting the property" });
  }
};

// get properties 

 export const getproperties = async (req, res) => {
  try {

    const properties = await prisma.property.findMany({
      orderBy:{createdAt:"desc"},
    });
    res.status(200).json(properties); 
    
  } catch (error) {
    console.log("Error Fetching properties",error);
    res.status(500).json({message:"Error Fetching properties"})
  }
 }