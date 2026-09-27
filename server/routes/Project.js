import { Router } from "express";
import upload from "../middleware/multer.js";
import verifyAdmin from "../middleware/verifyadmin.js";
import {
  ArchiveProject,
  CreateProject,
  DeleteProject,
  GetAllProjectsAdmin,
  GetProjectById,
  GetProjectBySlug,
  GetPublishedProjects,
  UpdateProject,
  UpdateProjectStatus,
} from "../controllers/Project.js";

const router = Router();

const uploadFields = (req, res, next) => {
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "ogImage", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "galleryImages", maxCount: 20 },
    { name: "amenityImages", maxCount: 12 },
    { name: "floorPlanImages", maxCount: 12 },
  ])(req, res, (err) => {
    if (err) {
      const raw = err.message || "File upload failed";
      const tooLarge = /file size too large|file too large|limit/i.test(raw);
      const field = err.field;
      const fieldHint =
        field === "brochure"
          ? "brochure"
          : ["heroImage", "ogImage", "galleryImages", "amenityImages", "floorPlanImages"].includes(field)
            ? field
            : undefined;
      return res.status(400).json({
        success: false,
        message: tooLarge
          ? "A file is too large. Images are compressed automatically. Brochure PDFs can be up to 40 MB. For walkthrough video, paste a YouTube or Vimeo link instead of uploading a video file."
          : raw,
        field: fieldHint === "galleryImages" ? "galleryImages" : fieldHint,
      });
    }
    next();
  });
};

router.get("/published", GetPublishedProjects);
router.get("/slug/:slug", GetProjectBySlug);

router.get("/admin/all", verifyAdmin, GetAllProjectsAdmin);
router.get("/admin/:id", verifyAdmin, GetProjectById);
router.delete("/admin/:id", verifyAdmin, DeleteProject);
router.post("/", verifyAdmin, uploadFields, CreateProject);
router.put("/:id", verifyAdmin, uploadFields, UpdateProject);
router.patch("/:id/status", verifyAdmin, UpdateProjectStatus);
router.delete("/:id/delete", verifyAdmin, DeleteProject);
router.delete("/:id", verifyAdmin, ArchiveProject);

export default router;
