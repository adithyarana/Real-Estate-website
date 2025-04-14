import { Router } from 'express'
import { AddProperty, DeleteProperty, GetAllProperties } from '../controllers/Property.js';
import upload from '../middleware/multer.js'

const router = Router();

const uploadFields = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]);

router.post('/add-property',uploadFields,AddProperty);
router.get('/get-property',GetAllProperties);
router.delete('/delete/:propertyId',DeleteProperty);

export default router;