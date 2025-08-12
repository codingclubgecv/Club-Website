import User from "../models/User.js";

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
