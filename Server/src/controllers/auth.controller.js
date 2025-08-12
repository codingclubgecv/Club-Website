import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';
import dotenv from "dotenv";
dotenv.config();


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, registrationNo, branch, batch, profileImage } = req.body;

        if (!name || !email || !password || !registrationNo || !branch || !batch) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exist" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const isFirstUser = (await User.countDocuments()) === 0;

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            registrationNo,
            branch,
            batch,
            profileImage,
            collegeName: "Government Engineering College, Vaishali",
            verificationToken,
            role: isFirstUser ? "admin" : "student",
        });

        const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
        const html = `
            <h2>Email Verification</h2>
            <p>Hello ${name},</p>
            <p>Please click the link below to verify your email:</p>
            <a href="${verifyLink}">${verifyLink}</a>
        `;
        await sendEmail(email, 'Verify your email', html);

        res.status(201).json({ message: 'User registered! Please check your email to verify' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        console.log('Verification token received:', token); // Debug log

        const user = await User.findOne({
            $or: [
                { verificationToken: token },
                { isVerified: true } // <- allow valid verified user to pass
            ]
        });

        if (!user) {
            console.log('No user found with this token'); // Debug log
            return res.status(400).json({ message: 'Invalid or expired verification link.' });
        }

        console.log('User found:', user.email, 'Current isVerified:', user.isVerified); // Debug log

        // Already verified
        if (user.isVerified) {
            console.log('User already verified'); // Debug log
            return res.status(200).json({ message: 'Email already verified!' });
        }

        // Set user as verified and clear the token
        user.isVerified = true;
        user.verificationToken = null;
        console.log('Attempting to save user with isVerified=true'); // Debug log
        await user.save();
        console.log('User saved successfully'); // Debug log


        // Verify the update in the database
        const updatedUser = await User.findById(user._id);
        console.log('Updated user from DB:', { 
            isVerified: updatedUser.isVerified,
            verificationToken: updatedUser.verificationToken 
        }); // Debug log
        
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error('Error in verifyEmail:', err); // More detailed error log
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const { email, password, loginAs } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Admin not found' });
        if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

        // if (loginAs === 'admin' && user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Only admin can login here' });
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        // res.status(500).json({ message: 'Server error' });
        console.error(err); // log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });
        if (!user.adminVerified) return res.status(403).json({ message: 'Your account is pending admin approval' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const sendOtp = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const now = new Date();
  
      // Reset daily count if it's a new day
      const lastRequestDate = user.otpRequestDate || new Date(0);
      const isSameDay = now.toDateString() === new Date(lastRequestDate).toDateString();
      if (!isSameDay) {
        user.otpRequestCount = 0;
        user.otpRequestDate = now;
      }
  
      // Check if already sent an OTP in the last 10 minutes
      if (user.lastOtpSentAt && now - user.lastOtpSentAt < 10 * 60 * 1000) {
        const minutesLeft = Math.ceil((10 * 60 * 1000 - (now - user.lastOtpSentAt)) / 60000);
        return res.status(429).json({
          message: `Please wait ${minutesLeft} minute(s) before requesting another OTP.`
        });
      }
  
      // Limit OTP requests to 10 per day
      if (user.otpRequestCount >= 10) {
        return res.status(429).json({
          message: 'You have reached the maximum OTP request limit for today.'
        });
      }
  
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
  
      // Update user data
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.lastOtpSentAt = now;
      user.otpRequestCount += 1;
      user.otpRequestDate = now;
      await user.save();
  
      const html = `
        <h2>Your OTP is <h3>${otp}</h3><p>It is valid for 10 minutes.</p></h2>
      `;
  
      await sendEmail(email, 'Your Login OTP', html);
  
      res.status(200).json({ 
        message: 'OTP sent to your email',
        lastOtpSentAt: user.lastOtpSentAt,
        cooldown: 600
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const now = Date.now();

    // Check if user already requested a reset within 24 hours
    if (user.lastResetRequestAt && now - user.lastResetRequestAt.getTime() < 24 * 60 * 60 * 1000) {
      const hoursLeft = Math.ceil(
        (24 * 60 * 60 * 1000 - (now - user.lastResetRequestAt.getTime())) / (60 * 60 * 1000)
      );
      return res.status(429).json({
        message: `You can only request a password reset once every 24 hours. Try again in ${hoursLeft} hour(s).`
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = now + 3600000; // 1 hour
    user.lastResetRequestAt = new Date(now);
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const html = `
      <h3>Reset Your Password</h3>
      <p><a href="${resetLink}">${resetLink}</a></p>
    `;

    await sendEmail(email, 'Reset Your Password', html);
    res.status(200).json({ message: 'Reset link sent to your email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = await bcrypt.hash(newPassword, 10); 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (err) {
        // console.error(err); 
        res.status(500).json({ message: 'Server error' });
    }
};
