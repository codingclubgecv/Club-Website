import User from "../models/User.js";
import Admin from "../models/Admin.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ adminVerified: 1, createdAt: -1 }); 

    const totalUsers = users.length;
    const pendingCount = users.filter(user => !user.adminVerified).length;

    res.status(200).json({
      success: true,
      totalUsers,
      pendingCount,
      users
    });
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    console.log("Fetching pending users..."); // Debug log
    const pendingUsers = await User.find({ adminVerified: false });
    console.log(`Found ${pendingUsers.length} pending users`); // Debug log
    
    if (pendingUsers.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: "No pending users found",
        total: pendingUsers.length,
        users: pendingUsers
        // users: [] 
      });
    }

    res.status(200).json({ success: true, users: pendingUsers });
  } catch (err) {
    console.error("Error fetching pending users:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: err.message 
    });
  }
};


export const approveUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.adminVerified = true;
        await user.save();

        res.status(200).json({ success: true, message: "User approved successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const rejectUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: "User rejected and removed" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    res.status(200).json({ success: true, admin });
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const { name, email, password } = req.body;

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();

    res.status(200).json({ success: true, message: "Admin profile updated successfully" });
  } catch (err) {
    console.error("Error updating admin profile:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};