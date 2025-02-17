import { Router } from "express";
import { login, logout } from "../api/auth.js";

const router = Router();
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.patch("/auth/change-password", changePassword);

export default router;
