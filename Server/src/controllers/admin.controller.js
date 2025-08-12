import User from "../models/User.js";

export const getPendingUsers = async (req, res) => {
    const pendingUsers = await User.find({ adminVerified: false, isVerified: true });
    res.status(200).json(pendingUsers);
};

export const approveUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.adminVerified = true;
    await user.save();
    res.status(200).json({ message: "User approved successfully" });
};


export const rejectUser = async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User rejected and removed" });
};
