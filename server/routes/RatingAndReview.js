import { Router } from 'express'
import { ApproveRating, CreateRating, DeleteBulkRating, DeleteRating, GetAllRating } from '../controllers/RatingAndReview.js';

const router = Router();

router.post('/',CreateRating);
router.put('/verify',ApproveRating);
router.get('/all',GetAllRating);
router.delete('/bulk',DeleteBulkRating);
router.delete('/:ratingId',DeleteRating)

export default router;