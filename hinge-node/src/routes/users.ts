import { Router } from "express";
import { authentication } from "../middleware/authenticated.js";
import { getUser, getUserById, patchUser, postUser } from "../api/users.js";

const router = Router();

// Sign up user
router.post("/users", postUser);

// Get user by email
router.get("/users/:id", authentication, getUserById);

// Get self profile
router.get("/users", authentication, getUser);

router.patch("/users", authentication, patchUser);

export default router;
