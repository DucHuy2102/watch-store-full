import express from 'express';
import { getAllProducts, getProductById } from '../controllers/product.controller.js';

const router = express.Router();

// get all products
router.get('/', getAllProducts);

// get product by id (using params)
router.get('/products/:id', getProductById);

// router.post('/verify-email', verifyEmail);

// router.post('/sign-in', signin);

// router.post('/sign-out', signout);

// router.post('/forgot-password', forgotPassword);

// router.post('/reset-password/:code', resetPassword);

export default router;
