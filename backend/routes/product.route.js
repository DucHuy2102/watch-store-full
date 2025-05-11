import express from 'express';
import {
    getAllProducts,
    getProductById,
    getRelatedProducts,
} from '../controllers/product.controller.js';

const router = express.Router();

// get all products
router.get('/', getAllProducts);

// get related products
router.get('/products-related', getRelatedProducts);

// get product by id (using params)
router.get('/:id', getProductById);

export default router;
