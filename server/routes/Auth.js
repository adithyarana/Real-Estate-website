import express from "express";
import { login } from "../controllers/Auth.js";
import { logout } from "../controllers/Auth.js";

const router = express.Router();


router.post("/login",login);
router.post("/logout",logout);

export default router;
