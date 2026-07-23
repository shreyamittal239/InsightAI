import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/mail.service.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists',
            });
        }

        const user = await User.create({ username, email, password });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'dev-secret',
          
        );
 const verificationLink =`${process.env.FRONTEND_URL || "http://localhost:3000"}/api/auth/verify-email?token=${token}`;
        try {
            await sendEmail({
                to: email,
                subject: 'Welcome to Perplexity!',
                html: `<h1>Welcome, ${username}!</h1>
                <p>Thank you for registering at Perplexity. We're excited to have you on board!</p>
                <p>To get started, please verify your email address by clicking the link below:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you did not register for this account, please ignore this email.</p>
                <p>Best regards,<br/>The Perplexity Team</p>`,
            });
            
        } catch (mailError) {
            console.error('Email sending failed:', mailError.message);
        }

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User registration failed',
            error: error.message,
        });

    }
};

export async function verifyEmail(req, res) {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');

    const user = await User.findOne({ _id: decoded.id, email: decoded.email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or expired token',
            err: 'User not found',
        });
    }

    user.isVerified = true;
    await user.save();
     const html = 
     `
     <h1>Email Verified Successfully</h1>
     <a href=${process.env.FRONTEND_URL || 'http://localhost:3000'}>Go to Login</a>
     <p>Thank you for verifying your email address. Your account is now active.</p>`

     res.send(html);

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email',
            });
        }

        const isPasswordMatch= await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                err:"Incorrect password"
            });
        }

        if( !user.isVerified){
            return res.status(403).json({
                success: false,
                message: 'Email not verified. Please verify your email before logging in.',
            });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, },
            process.env.JWT_SECRET || 'dev-secret',
            {expiresIn: '7d'}
        );

        res.cookie('token', token)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message,
        });
    }
}

export const getMe = async (req, res) => {
     
    const userId = req.user.id;

    
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            user
        });
    
    }
