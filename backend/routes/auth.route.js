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

router.post('/sign-up', signup);

router.post('/verify-email', verifyEmail);

router.post('/sign-in', signin);

router.post('/sign-out', signout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:code', resetPassword);

export default router;
