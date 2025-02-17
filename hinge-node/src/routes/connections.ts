import { Router } from "express";
import { authentication } from "../middleware/authenticated.js";
import {
  acceptConnection,
  ignoreConnection,
  likeConnection,
  rejectConnection,
} from "../api/connections.js";

const router = Router();

router.post("/connections/ignore", authentication, ignoreConnection);
router.post("/connections/like", authentication, likeConnection);
router.post("/connections/accept", authentication, acceptConnection);
router.post("/connections/reject", authentication, rejectConnection);
