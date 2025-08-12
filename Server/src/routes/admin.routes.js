import express from "express";
import { getPendingUsers, approveUser, rejectUser } from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { loginAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/pending-users", protect, adminOnly, getPendingUsers);
router.put("/approve/:userId", protect, adminOnly, approveUser);
router.delete("/reject/:userId", protect, adminOnly, rejectUser);

export default router;
