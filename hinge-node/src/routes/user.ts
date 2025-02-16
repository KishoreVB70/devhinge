import { Router } from "express";
import { authentication } from "../middleware/authenticated.js";
import { getUser, getUserSelf, patchUser, postUser } from "../api/user.js";

const app = Router();
// Get user by email
app.get("/user/:email", authentication, getUser);

// Get self profile
app.get("/user", authentication, getUserSelf);

app.post("/user", postUser);

app.patch("/user", authentication, patchUser);
export default app;
