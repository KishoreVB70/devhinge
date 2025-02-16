import { Router } from "express";
import { login } from "../api/login.js";

const router = Router();
router.post("/login", login);

export default router;
