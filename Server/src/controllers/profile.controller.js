import User from "../models/User.js";

/**
 * Get logged-in user's full profile
 */
export const getProfile = async (req, res) => {
    try {
        console.log("[DEBUG] Fetching user profile...");
        const userId = req.user.userId; // From auth middleware

        const user = await User.findById(userId).select("-password"); // Exclude password field

        if (!user) {
            console.warn("[WARN] User not found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("[DEBUG] Profile fetched successfully for", user.email);
        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (err) {
        console.error("[ERROR] getProfile:", err);
        res.status(500).json({ message: "Server error" });
    }
};


/**
 * Update basic profile details (name, about, phone, etc.)
 * Can be called without sending all fields, only changes will be applied.
 */
export const updateBasicInfo = async (req, res) => {
    try {
        console.log("[DEBUG] Updating basic info...");
        const userId = req.user.userId;
        const { name, phone, about, branch, batch, registrationNo, collegeName } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update fields if provided
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (about) user.about = about;
        if (branch) user.branch = branch;
        if (batch) user.batch = batch;
        if (registrationNo) user.registrationNo = registrationNo;
        if (collegeName) user.collegeName = collegeName;

        await user.save();
        console.log("[DEBUG] Basic info updated successfully for", user.email);
        res.status(200).json({ message: "Profile updated", user });
    } catch (err) {
        console.error("[ERROR] updateBasicInfo:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Update profile image
 */
export const updateProfileImage = async (req, res) => {
    try {
        console.log("[DEBUG] Updating profile image...");
        const userId = req.user.userId;
        
        if (!req.file) return res.status(400).json({ message: "No image uploaded" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profileImage = `/uploads/${req.file.filename}`;
        await user.save();

        console.log("[DEBUG] Profile image updated successfully for", user.email);
        res.status(200).json({ message: "Profile image updated", imageUrl: user.profileImage });
    } catch (err) {
        console.error("[ERROR] updateProfileImage:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Update education array
 */
export const updateEducation = async (req, res) => {
    try {
        console.log("[DEBUG] Updating education...");
        const userId = req.user.userId;
        const { education } = req.body; // Expecting an array of objects

        if (!Array.isArray(education)) {
            return res.status(400).json({ message: "Education must be an array" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.education = education;
        await user.save();

        console.log("[DEBUG] Education updated successfully for", user.email);
        res.status(200).json({ message: "Education updated", education: user.education });
    } catch (err) {
        console.error("[ERROR] updateEducation:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Update skills array
 */
export const updateSkills = async (req, res) => {
    try {
        console.log("[DEBUG] Updating skills...");
        const userId = req.user.userId;
        const { skills } = req.body; // Expecting an array of { name, icon }

        if (!Array.isArray(skills)) {
            return res.status(400).json({ message: "Skills must be an array" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.skills = skills;
        await user.save();

        console.log("[DEBUG] Skills updated successfully for", user.email);
        res.status(200).json({ message: "Skills updated", skills: user.skills });
    } catch (err) {
        console.error("[ERROR] updateSkills:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Update social links
 */
export const updateSocialLinks = async (req, res) => {
    try {
        console.log("[DEBUG] Updating social links...");
        const userId = req.user.userId;
        const { github, linkedin, instagram, leetcode, hackerrank, gfg } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.socialLinks = { github, linkedin, instagram, leetcode, hackerrank, gfg };
        await user.save();

        console.log("[DEBUG] Social links updated successfully for", user.email);
        res.status(200).json({ message: "Social links updated", socialLinks: user.socialLinks });
    } catch (err) {
        console.error("[ERROR] updateSocialLinks:", err);
        res.status(500).json({ message: "Server error" });
    }
};
