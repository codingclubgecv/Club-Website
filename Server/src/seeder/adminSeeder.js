import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ DB Connection Failed", err));

const createAdmin = async () => {
  try {
    const email = "codingclub.gecv"; 
    const password = "Admin@123"; 

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name: "Club Admin",
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      registrationNo: "ADMIN000",
      branch: "N/A",
      batch: "N/A",
      collegeName: "Government Engineering College, Vaishali",
    });

    await admin.save();
    console.log("✅ Admin created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    mongoose.connection.close();
  }
};

createAdmin();
