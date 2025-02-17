import { Router } from "express";
import { authentication } from "../middleware/authenticated.js";
import { getUser, getUserByEmail, patchUser, postUser } from "../api/users.js";

const app = Router();

// Sign up user
app.post("/users", postUser);

// Get user by email
app.get("/users/:email", authentication, getUserByEmail);

// Get self profile
app.get("/users", authentication, getUser);

app.patch("/users", authentication, patchUser);

export default app;
