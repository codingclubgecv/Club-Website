import express from "express";
import protect from "../middlewares/userMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
    getProfile,
    updateBasicInfo,
    updateProfileImage,
    updateEducation,
    updateSkills,
    updateSocialLinks
} from "../controllers/profile.controller.js";

const router = express.Router();

// All routes are protected
router.get("/profile", protect, getProfile);
router.put("/update-basic", protect, updateBasicInfo);
router.put("/update-image", protect, upload.single("profileImage"), updateProfileImage);
router.put("/update-education", protect, updateEducation);
router.put("/update-skills", protect, updateSkills);
router.put("/update-social", protect, updateSocialLinks);

export default router;
