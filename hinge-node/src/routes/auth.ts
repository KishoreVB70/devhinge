import { Router } from "express";
import { changePassword, login, logout } from "../api/auth.js";
import { authentication } from "../middleware/authenticated.js";

const router = Router();
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.patch("/auth/change-password", authentication, changePassword);

export default router;
