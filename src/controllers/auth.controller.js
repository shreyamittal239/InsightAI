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
            { expiresIn: '7d' }
        );

        try {
            await sendEmail({
                to: email,
                subject: 'Welcome to Perplexity!',
                html: `<h1>Welcome, ${username}!</h1>
                <p>Thank you for registering at Perplexity. We're excited to have you on board!</p>
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