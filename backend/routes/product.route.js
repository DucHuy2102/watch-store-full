import express from 'express';
import { getAllProducts, getProductById } from '../controllers/product.controller.js';

const router = express.Router();

// get all products
router.get('/', getAllProducts);

// get product by id (using params)
router.get('/:id', getProductById);

export default router;
