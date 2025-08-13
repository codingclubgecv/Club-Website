import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },

    role: { type: String, default: "admin" },
    isVerified: { type: Boolean, default: true },
    registrationNo: { type: String, required: true },
    branch: { type: String, required: true },
    batch: { type: String, required: true },
    collegeName: {
        type: String,
        default: ""
    },
    permissions: {
        canApproveUsers: { type: Boolean, default: true },
        canManageAdmins: { type: Boolean, default: false },
        canEditContent: { type: Boolean, default: true },
    },

    lastLogin: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
