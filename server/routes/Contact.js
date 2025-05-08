import { Router } from "express";
import { CreateContact, DeleteBulkContact, DeleteContact, GetAllContacts, UpdateContact } from "../controllers/Contact.js";

const router = Router();

router.post('/add',CreateContact);
router.put('/:contactId',UpdateContact);
router.get('/all',GetAllContacts);
router.delete('/bulk',DeleteBulkContact);
router.delete('/:contactId',DeleteContact);

export default router;