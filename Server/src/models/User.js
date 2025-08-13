import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    registrationNo: { type: String, required: true },
    branch: { type: String, required: true },
    batch: { type: String, required: true },
    collegeName: { type: String, default: "Government Engineering College, Vaishali" },
    profileImage: { type: String, default: "" },

    isVerified: { type: Boolean, default: false }, // email verified
    adminVerified: { type: Boolean, default: false }, // admin approval

    role: { type: String, enum: ["student", "lead"], default: "student" },

    otp: String,
    otpExpiry: Date,
    lastOtpSentAt: Date,
    otpRequestCount: { type: Number, default: 0 },
    otpRequestDate: Date,

    lastResetRequestAt: { type: Date, default: null },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
}, { timestamps: true });

export default mongoose.model('User', userSchema);