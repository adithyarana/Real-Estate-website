import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../utils/cloudinary.js'

// console.log(cloudinary)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "realestate_properties",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
// console.log("hello")
const upload = multer({ storage });
// console.log("hello1")

export default upload;
