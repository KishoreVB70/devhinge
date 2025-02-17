import { Router } from "express";
import { authentication } from "../middleware/authenticated.js";
import {
  acceptConnection,
  ignoreConnection,
  likeConnection,
  rejectConnection,
} from "../api/connections.js";

const router = Router();

router.post("/connections/ignore/:targedId", authentication, ignoreConnection);
router.post(
  "/connections/interested/:targedId",
  authentication,
  likeConnection
);
router.post("/connections/accept/:targedId", authentication, acceptConnection);
router.post("/connections/reject/:targedId", authentication, rejectConnection);
