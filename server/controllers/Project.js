import prisma from "../libs/prisma.js";
import { deleteImageFromCloudinary } from "../utils/deleteImage.js";

const LISTING_SELECT = {
  id: true,
  name: true,
  slug: true,
  location: true,
  startingPrice: true,
  configurations: true,
  heroImage: true,
  shortDescription: true,
  projectType: true,
  status: true,
  featured: true,
  developer: true,
  createdAt: true,
};

const parseJson = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const toBool = (value) => value === true || value === "true" || value === "on";

const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fileUrl = (file) => file?.path || file?.secure_url || null;

const uniqueSlug = async (base, excludeId) => {
  let slug = slugify(base) || `project-${Date.now()}`;
  let suffix = 0;
  while (true) {
    const candidate = suffix ? `${slug}-${suffix}` : slug;
    const existing = await prisma.project.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
  }
};

const collectMediaUrls = (project) => {
  const urls = [];
  if (project.heroImage) urls.push(project.heroImage);
  if (project.ogImage) urls.push(project.ogImage);
  if (project.brochureUrl) urls.push(project.brochureUrl);
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  gallery.forEach((item) => item?.url && urls.push(item.url));
  const amenityImages = Array.isArray(project.amenityImages) ? project.amenityImages : [];
  amenityImages.forEach((item) => item?.url && urls.push(item.url));
  const floorPlans = Array.isArray(project.floorPlans) ? project.floorPlans : [];
  floorPlans.forEach((item) => item?.image && urls.push(item.image));
  return urls;
};

const buildProjectPayload = async (req, existing = null) => {
  const body = req.body || {};
  const files = req.files || {};

  const name = body.name?.trim();
  if (!name) {
    const error = new Error("Project name is required");
    error.status = 400;
    throw error;
  }

  const slug = await uniqueSlug(body.slug || name, existing?.id);
  const highlights = parseJson(body.highlights, existing?.highlights || []);
  const amenities = parseJson(body.amenities, existing?.amenities || []);
  const nearby = parseJson(body.nearby, existing?.nearby || {});

  const existingGallery = parseJson(body.existingGallery, existing?.gallery || []);
  const newGalleryCategories = parseJson(body.newGalleryCategories, []);
  const newGallery = (files.galleryImages || []).map((file, index) => ({
    url: fileUrl(file),
    category: newGalleryCategories[index] || "project",
  }));
  const gallery = [...existingGallery, ...newGallery].filter((item) => item?.url);

  const existingAmenityImages = parseJson(
    body.existingAmenityImages,
    existing?.amenityImages || []
  );
  const newAmenityImages = (files.amenityImages || []).map((file) => ({
    url: fileUrl(file),
  }));
  const amenityImages = [...existingAmenityImages, ...newAmenityImages].filter(
    (item) => item?.url
  );

  const floorPlansMeta = parseJson(body.floorPlans, existing?.floorPlans || []);
  const floorPlanFiles = files.floorPlanImages || [];
  let fileCursor = 0;
  const floorPlans = floorPlansMeta.map((plan) => {
    const next = { ...plan };
    const shouldAssignFile = next.replaceImage || !next.image;
    if (shouldAssignFile && floorPlanFiles[fileCursor]) {
      next.image = fileUrl(floorPlanFiles[fileCursor]);
      fileCursor += 1;
    }
    delete next.replaceImage;
    delete next.file;
    return next;
  });

  const heroImage = fileUrl(files.heroImage?.[0]) || body.heroImage || existing?.heroImage || null;
  const ogImage = fileUrl(files.ogImage?.[0]) || body.ogImage || existing?.ogImage || heroImage;
  const brochureUrl =
    fileUrl(files.brochure?.[0]) || body.brochureUrl || existing?.brochureUrl || null;

  const status = body.status || existing?.status || "DRAFT";
  if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
    const error = new Error("Invalid project status");
    error.status = 400;
    throw error;
  }

  return {
    name,
    slug,
    location: body.location || "",
    developer: body.developer || null,
    shortDescription: body.shortDescription || null,
    description: body.description || null,
    startingPrice: body.startingPrice || null,
    priceRange: body.priceRange || null,
    configurations: body.configurations || null,
    projectType: body.projectType || null,
    possession: body.possession || null,
    constructionStatus: body.constructionStatus || null,
    highlights,
    amenities,
    heroImage,
    gallery,
    amenityImages,
    floorPlans,
    brochureUrl,
    videoUrl: body.videoUrl || null,
    address: body.address || null,
    latitude: body.latitude || null,
    longitude: body.longitude || null,
    mapsUrl: body.mapsUrl || null,
    nearby,
    reraNumber: body.reraNumber || null,
    legalInfo: body.legalInfo || null,
    seoTitle: body.seoTitle || null,
    seoDescription: body.seoDescription || null,
    ogImage,
    status,
    featured: toBool(body.featured),
    updatedAt: new Date(),
  };
};

export const GetPublishedProjects = async (req, res) => {
  try {
    const featuredOnly = req.query.featured === "true";
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 50);

    const where = { status: "PUBLISHED" };
    if (featuredOnly) where.featured = true;

    let projects = await prisma.project.findMany({
      where,
      select: LISTING_SELECT,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    if (featuredOnly && projects.length < limit) {
      const extra = await prisma.project.findMany({
        where: {
          status: "PUBLISHED",
          id: { notIn: projects.map((p) => p.id) },
        },
        select: LISTING_SELECT,
        orderBy: { createdAt: "desc" },
        take: limit - projects.length,
      });
      projects = [...projects, ...extra];
    }

    return res.status(200).json({
      success: true,
      message: "Projects retrieved",
      data: projects,
    });
  } catch (error) {
    console.log("Get published projects error", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const GetProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        properties: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            pCode: true,
            thumbnail: true,
            price: true,
            area: true,
            bedrooms: true,
            region: true,
          },
          take: 8,
        },
      },
    });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.log("Get project by slug error", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const GetAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        ...LISTING_SELECT,
        reraNumber: true,
        brochureUrl: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
    });
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log("Get all projects admin error", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.log("Get project by id error", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const CreateProject = async (req, res) => {
  try {
    const data = await buildProjectPayload(req);
    const project = await prisma.project.create({ data });
    return res.status(200).json({
      success: true,
      message: "Project created!",
      data: project,
    });
  } catch (error) {
    console.log("Create project error", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const UpdateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const data = await buildProjectPayload(req, existing);
    const previousUrls = collectMediaUrls(existing);
    const nextUrls = collectMediaUrls({ ...existing, ...data });
    const removed = previousUrls.filter((url) => url && !nextUrls.includes(url));
    await Promise.all(removed.map((url) => deleteImageFromCloudinary(url).catch(() => null)));

    const project = await prisma.project.update({ where: { id }, data });
    return res.status(200).json({
      success: true,
      message: "Project updated!",
      data: project,
    });
  } catch (error) {
    console.log("Update project error", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const UpdateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, featured } = req.body;
    const data = { updatedAt: new Date() };
    if (status) {
      if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
      data.status = status;
    }
    if (featured !== undefined) data.featured = toBool(featured);

    const project = await prisma.project.update({ where: { id }, data });
    return res.status(200).json({ success: true, message: "Project status updated", data: project });
  } catch (error) {
    console.log("Update project status error", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const ArchiveProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: { status: "ARCHIVED", updatedAt: new Date() },
    });
    return res.status(200).json({
      success: true,
      message: "Project archived",
      data: project,
    });
  } catch (error) {
    console.log("Archive project error", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const DeleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.project.findUnique({
      where: { id },
      include: {
        properties: { select: { id: true } },
        enquiries: { select: { id: true } },
      },
    });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    for (const property of existing.properties) {
      await prisma.property.update({
        where: { id: property.id },
        data: { Project: { disconnect: true } },
      });
    }
    for (const enquiry of existing.enquiries) {
      await prisma.enquiry.update({
        where: { id: enquiry.id },
        data: { Project: { disconnect: true } },
      });
    }

    await prisma.project.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.log("Delete project error", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete project",
    });
  }
};
