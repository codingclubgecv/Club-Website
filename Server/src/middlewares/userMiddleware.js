import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Make sure the file has a .js extension in ES modules

// Middleware to check authentication
const protect = async (req, res, next) => {
    let token;

    try {
        // 1️⃣ Token Authorization header me check karo
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 2️⃣ Agar token nahi mila to error
        if (!token) {
            return res.status(401).json({ message: "Not authorized, token missing" });
        }

        // 3️⃣ Token verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ DB se user fetch karo
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // 5️⃣ Request object me user attach karo
        req.user = user;
        next();

    } catch (err) {
        console.error("Auth middleware error:", err.message);
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

export default protect;