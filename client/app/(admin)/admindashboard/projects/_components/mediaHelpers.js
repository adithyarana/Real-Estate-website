const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff"];

export const fileExt = (file) => (file?.name || "").split(".").pop()?.toLowerCase() || "";

export const formatBytes = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const imageTypeError = (file, label) => {
  if (!file) return "";
  if (!IMAGE_EXTS.includes(fileExt(file))) {
    return `${label} must be a JPG, PNG, WEBP, GIF, BMP, or TIFF file`;
  }
  return "";
};

export const toVideoEmbedUrl = (value = "") => {
  const url = value.trim();
  if (!url) return "";
  if (/youtube\.com\/embed\/|player\.vimeo\.com\/video\//i.test(url)) return url;

  const yt =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/) ||
    url.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return url;
};

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));

export const compressImageFile = async (file, maxBytes = 8 * 1024 * 1024) => {
  if (!file || !file.type?.startsWith("image/")) return file;
  if (file.type === "image/gif") return file;
  if (file.size <= 1.5 * 1024 * 1024 && file.size <= maxBytes) return file;

  try {
  const bitmap = await createImageBitmap(file);
  const maxWidth = 1920;
  let width = bitmap.width;
  let height = bitmap.height;
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = 0.82;
  let blob = await canvasToBlob(canvas, "image/jpeg", quality);
  while (blob && blob.size > maxBytes && quality > 0.45) {
    quality -= 0.12;
    blob = await canvasToBlob(canvas, "image/jpeg", quality);
  }

  if (!blob) return file;
  const name = file.name.replace(/\.[^.]+$/, ".jpg");
  return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    if (file.size > maxBytes) {
      throw new Error(`${file.name} is too large. Please use a smaller JPG or PNG.`);
    }
    return file;
  }
};
