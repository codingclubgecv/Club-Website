import express from "express";
import {
    getPendingUsers, approveUser, rejectUser, getAllUsers, getAdminProfile, updateAdminProfile
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { loginAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/profile", protect, adminOnly, getAdminProfile);
router.put("/update-profile", protect, adminOnly, updateAdminProfile);

router.get("/pending-users", protect, adminOnly, getPendingUsers);
router.get("/all-users", protect, adminOnly, getAllUsers);
router.put("/approve/:userId", protect, adminOnly, approveUser);
router.delete("/reject/:userId", protect, adminOnly, rejectUser);

export default router;
