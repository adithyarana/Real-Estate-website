import express from "express";
import { login } from "../controllers/admin.controller.js";
import { logout } from "../controllers/admin.controller.js";

const router = express.Router();


router.post("/login",login);
router.post("/logout",logout);

export default router;
