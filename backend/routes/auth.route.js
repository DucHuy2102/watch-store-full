import express from 'express';
import {
    verifyEmail,
    forgotPassword,
    resetPassword,
    signin,
    signout,
    signup,
} from '../controllers/auth.controller.js';

const router = express.Router();

// sign up
router.post('/sign-up', signup);

// verify email after sign up
router.post('/verify-email', verifyEmail);

// sign in using username and password
router.post('/sign-in', signin);

// sign out
router.post('/sign-out', signout);

// forgot password
router.post('/forgot-password', forgotPassword);

// reset password
router.post('/reset-password/:code', resetPassword);

export default router;
