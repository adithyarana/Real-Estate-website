import fs from "fs";
import os from "os";
import path from "path";
import { pipeline } from "stream/promises";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const MAX_FILE_BYTES = 50 * 1024 * 1024;
const CHUNKED_THRESHOLD = 8 * 1024 * 1024;

const getUploadOptions = (file) => {
  const original = (file.originalname || "file").replace(/\s+/g, "_");
  const base = original.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 80);
  const publicId = `${Date.now()}-${base || "file"}`;
  const mime = file.mimetype || "";
  const isPdf = mime === "application/pdf" || original.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    return {
      folder: "realestate_properties/brochures",
      resource_type: "raw",
      public_id: publicId,
      format: "pdf",
    };
  }

  if (mime.startsWith("video/")) {
    return {
      folder: "realestate_properties/videos",
      resource_type: "video",
      public_id: publicId,
    };
  }

  return {
    folder: "realestate_properties",
    resource_type: "image",
    public_id: publicId,
    quality: "auto:good",
  };
};

const uploadToCloudinary = (tempPath, options, size) =>
  new Promise((resolve, reject) => {
    const payload = {
      ...options,
      timeout: 180000,
      chunk_size: 6_000_000,
    };
    const method =
      size > CHUNKED_THRESHOLD || options.resource_type === "raw" || options.resource_type === "video"
        ? "upload_large"
        : "upload";
    cloudinary.uploader[method](tempPath, payload, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

const cloudinaryStorage = {
  _handleFile(req, file, cb) {
    const tempPath = path.join(
      os.tmpdir(),
      `kr-upload-${Date.now()}-${Math.random().toString(36).slice(2)}`
    );

    (async () => {
      await pipeline(file.stream, fs.createWriteStream(tempPath));
      const { size } = await fs.promises.stat(tempPath);
      const options = getUploadOptions(file);
      const result = await uploadToCloudinary(tempPath, options, size);
      cb(null, {
        path: result.secure_url,
        filename: result.public_id,
        originalname: file.originalname,
        resource_type: result.resource_type || options.resource_type,
        bytes: result.bytes,
      });
    })()
      .catch((err) => {
        err.field = file.fieldname;
        cb(err);
      })
      .finally(() => {
        fs.unlink(tempPath, () => {});
      });
  },
  _removeFile(req, file, cb) {
    if (!file.filename) return cb();
    cloudinary.uploader.destroy(
      file.filename,
      { resource_type: file.resource_type || "image" },
      () => cb()
    );
  },
};

const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: MAX_FILE_BYTES, files: 50 },
});

export default upload;
