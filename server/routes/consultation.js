import { Router } from "express";
import { Createconsultation } from "../controllers/Consultation.js";


const router = Router();

router.post('/add', Createconsultation);

export default router