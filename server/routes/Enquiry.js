import { Router } from 'express'
import { CreateEnquiry, DeleteBulkEnquiry, DeleteEnquiry, GetAllEnquiries, UpdateEnquiryStatus } from '../controllers/Enquiry.js';

const router = Router();

router.post('/',CreateEnquiry);
router.put('/status',UpdateEnquiryStatus);
router.get('/all',GetAllEnquiries);
router.delete('/bulk',DeleteBulkEnquiry);
router.delete('/:enquiryId',DeleteEnquiry)

export default router;