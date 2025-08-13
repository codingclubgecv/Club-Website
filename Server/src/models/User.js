import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  instagram: String,
  leetcode: String,
  hackerrank: String,
  gfg: String
}, { _id: false });

const skillsSchema = new mongoose.Schema({
  name: String,
  icon: String 
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    registrationNo: { type: String, required: true },
    branch: { type: String, required: true },
    batch: { type: String, required: true },
    collegeName: { type: String, default: "Government Engineering College, Vaishali" },
    profileImage: { type: String, default: "" },

    
    phone: String,
    about: { type: String, maxlength: 300 },
    education: [educationSchema],
    skills: [skillsSchema],
    socialLinks: socialLinksSchema,

    isVerified: { type: Boolean, default: false },
    adminVerified: { type: Boolean, default: false },
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
