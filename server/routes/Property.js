import { Router } from 'express'
import { AddProperty, DeleteProperty, GetAllProperties, GetPropertyById, UpdateProperty } from '../controllers/Property.js';
import upload from '../middleware/multer.js'

const router = Router();

const uploadFields = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]);

router.post('/',uploadFields,AddProperty);
router.get('/all',GetAllProperties);
router.delete('/:propertyId',DeleteProperty);
router.put('/:propertyId',uploadFields,UpdateProperty)
router.get('/:id',GetPropertyById);


export default router;