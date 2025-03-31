import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// sign up
router.post('/sign-up', signup);

// sign in
router.post('/sign-in', signin);

// sign out
router.post('/sign-out', signout);

export default router;
