import express from 'express'
import { addProperty } from '../controllers/addproperty.controller.js';
import { deleteproprty } from '../controllers/addproperty.controller.js';
import { getproperties } from '../controllers/addproperty.controller.js';
import verifyadmin from '../middleware/verifyadmin.js'
import upload from '../middleware/multer.middlware.js'
const router = express.Router();

router.post("/add-property" ,verifyadmin, upload.array("images",5), addProperty)  // cloudninary upload the image 
router.get("/get-properties", verifyadmin, getproperties); 
router.delete("/deleteproperty/:id",verifyadmin, deleteproprty)

export default router;