import bcryptjs from 'bcryptjs';
import UserModel from '../models/user.model.js';
import { handleError } from '../utils/handleError.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return next(handleError(400, 'All fields are required'));
        }

        const normalizedEmail = email.toLowerCase();
        const isUserExist = await UserModel.findOne({
            $or: [{ username }, { email: normalizedEmail }],
        });
        if (isUserExist) {
            return next(handleError(400, 'User already exists'));
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
        const { password: pass, ...rest } = savedUser._doc;
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: rest,
        });
    } catch (error) {
        console.log('Error in signup controller', error);
        next(error);
    }
};

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(handleError(400, 'All fields are required'));
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return next(handleError(400, 'User not found'));
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(handleError(400, 'Invalid password'));
        }
        generateTokenAndSetCookie(res, user._id);
        const { password: pass, ...rest } = user._doc;
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: rest,
        });
    } catch (error) {
        console.log('Error in signin controller', error);
        next(error);
    }
};

export const signout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req, res) => {};

export const resetPassword = async (req, res) => {};

export const verifyEmail = async (req, res) => {};

export const resendVerificationEmail = async (req, res) => {};
