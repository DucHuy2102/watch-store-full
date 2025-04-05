import bcryptjs from 'bcryptjs';
import cryptojs from 'crypto-js';

import UserModel from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';
import {
    sendEmail_Confirm_ResetPassword,
    sendEmail_ResetPassword,
    sendEmail_Verification,
    sendEmail_WelcomeToWebsite,
} from '../email/emails.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const normalizedEmail = email.toLowerCase();
        const isUserExist = await UserModel.findOne({
            $or: [{ username }, { email: normalizedEmail }],
        });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists !!!',
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        generateTokenAndSetCookie(res, res._id);

        const savedUser = await newUser.save();
        await sendEmail_Verification(savedUser.email, savedUser.username, verificationToken);

        const { password: pass, ...rest } = savedUser._doc;
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: rest,
        });
    } catch (error) {
        console.log('Error in signup controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in signup controller',
        });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code !!!',
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendEmail_WelcomeToWebsite(user.email, user.username);

        const { password: pass, ...rest } = user._doc;
        res.status(200).json({
            success: true,
            message: 'Email verified successfully!',
            user: rest,
        });
    } catch (error) {
        console.log('Error in verifyEmail controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in verifyEmail controller',
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found !!!',
            });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: 'Your password is incorrect!',
            });
        }

        // if (!user.isVerified) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Please verify your email to login!',
        //     });
        // }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        const { password: pass, ...rest } = user._doc;
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: rest,
        });
    } catch (error) {
        console.log('Error in signin controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in signin controller',
        });
    }
};

export const signout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in',
            });
        } else {
            res.clearCookie('token');
            res.status(200).json({
                success: true,
                message: 'User logged out successfully',
            });
        }
    } catch (error) {
        console.log('Error in signout controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in signout controller',
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email: email.trim() });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found !!!',
            });
        }
        const code = cryptojs.lib.WordArray.random(20).toString(cryptojs.enc.Hex);
        const codeExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

        user.resetPasswordToken = code;
        user.resetPasswordExpiresAt = codeExpiresAt;
        await user.save();

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${code}`;
        await sendEmail_ResetPassword(user.email, user.username, resetPasswordUrl);

        res.status(200).json({
            success: true,
            message: 'Reset password link sent to email',
        });
    } catch (error) {
        console.log('Error in forgotPassword controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in forgotPassword controller',
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { code } = req.params;
        const { password } = req.body;

        const user = await UserModel.findOne({
            resetPasswordToken: code,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset password code',
            });
        }

        user.password = await bcryptjs.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendEmail_Confirm_ResetPassword(user.email, user.username);

        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error) {
        console.log('Error in resetPassword controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in resetPassword controller',
        });
    }
};
