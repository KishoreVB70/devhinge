import { Router } from "express";
import { authentication } from "../middleware/authenticated.js";
import {
  acceptConnection,
  getConnections,
  getInterestedConnections,
  ignoreConnection,
  likeConnection,
  rejectConnection,
} from "../api/connections.js";

const router = Router();

router.get("/connections/accepted", authentication, getConnections);
router.get("/connections/interested", authentication, getInterestedConnections);

// POST routes
router.post("/ignore/:targetId", authentication, ignoreConnection);
router.post("/interested/:targetId", authentication, likeConnection);
router.post("/accept/:targetId", authentication, acceptConnection);
router.post("/reject/:targetId", authentication, rejectConnection);

export default router;
