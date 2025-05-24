import ProductModel from '../models/product.model.js';
import sortProduct from '../utils/sortProduct.js';
import mongoose from 'mongoose';
import redis from '../utils/redis.js';

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 18,
            sort = 'createdAt',
            search,
            style,
            stockStatus,
            gender,
            movementType,
            caseDiameter,
            strapLugWidth,
            strapMaterial,
            waterResistance,
            crystalLens,
        } = req.query;

        const filterQuery = {};

        if (search) {
            filterQuery.$text = { $search: search };
        }

        const conditions = [];

        if (style) {
            conditions.push({ watchStyle: { $regex: style, $options: 'i' } });
        }

        if (stockStatus) {
            const statuses = stockStatus.split(',');
            const stockConditions = statuses
                .map((status) => {
                    if (status === 'in-stock') return { 'variant.stock': { $gt: 0 } };
                    if (status === 'out-of-stock') return { 'variant.stock': 0 };
                    return null;
                })
                .filter(Boolean);
            if (stockConditions.length > 0) {
                conditions.push({ $or: stockConditions });
            }
        }

        if (gender) {
            if (gender === 'Men' || gender === 'Women') {
                conditions.push({ gender });
            } else {
                conditions.push({ gender: 'Kid' });
            }
        }

        if (movementType)
            conditions.push({
                'specifications.movementType': { $in: movementType.split(',') },
            });

        if (caseDiameter) {
            const diameters = caseDiameter.split(',');
            const diameterConditions = diameters.map((range) => {
                if (range.includes('-')) {
                    const [min, max] = range.split('-').map(Number);
                    return { 'specifications.caseDiameter': { $gte: min, $lte: max } };
                }
                if (range === '29') return { 'specifications.caseDiameter': { $lte: 29 } };
                if (range === '44') return { 'specifications.caseDiameter': { $gte: 44 } };
                return { 'specifications.caseDiameter': Number(range) };
            });
            conditions.push({ $or: diameterConditions });
        }

        if (strapLugWidth)
            conditions.push({
                'specifications.strapLugWidth': { $in: strapLugWidth.split(',') },
            });

        if (strapMaterial)
            conditions.push({
                'specifications.strapMaterial': { $in: strapMaterial.split(',') },
            });

        if (waterResistance)
            conditions.push({
                'specifications.waterResistance': { $in: waterResistance.split(',') },
            });

        if (crystalLens)
            conditions.push({
                'specifications.crystalLens': { $in: crystalLens.split(',') },
            });

        if (conditions.length > 0) {
            filterQuery.$and = conditions;
        }

        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 18;
        const skip = (pageNum - 1) * limitNum;

        const totalProducts = await ProductModel.countDocuments(filterQuery);

        const { sortField, sortOrder } = sortProduct(sort);
        const products = await ProductModel.find(filterQuery)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limitNum);

        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'Do not have products in database !!!',
            });
        }

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: pageNum,
            totalPages: Math.ceil(totalProducts / limitNum),
            products,
        });
    } catch (error) {
        console.log('Error in getAllProducts controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in getAllProducts controller',
        });
    }
};

// get product by id (using params)
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found !!!' });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.log('Error in getProductById controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in getProductById controller',
        });
    }
};

// get related products
export const getRelatedProducts = async (req, res) => {
    try {
        const { watchStyle } = req.query;
        const products = await ProductModel.find({
            watchStyle: watchStyle ?? 'Automatic',
        });

        if (!products) {
            return res
                .status(404)
                .json({ success: false, message: 'Do not have related products !!!' });
        }

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log('Error in getRelatedProducts controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in getRelatedProducts controller',
        });
    }
};

// get search suggestions
export const getSearchSuggestions = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ success: false, message: 'Missing query param' });
        }

        const cacheKey = `search:${query}`;
        const cachedSuggestions = await redis.get(cacheKey);
        if (cachedSuggestions) {
            return res.status(200).json({
                success: true,
                suggestions: JSON.parse(cachedSuggestions),
                cached: true,
            });
        }

        const suggestions = await ProductModel.find({
            name: { $regex: query, $options: 'i' },
        }).select('name');

        const uniqueResults = [];
        const seenNames = new Set();

        for (const prod of suggestions) {
            if (!seenNames.has(prod.name)) {
                uniqueResults.push(prod);
                seenNames.add(prod.name);
            }
        }

        if (!uniqueResults.length) {
            return res.status(404).json({
                success: false,
                message: 'Do not have search suggestions !!!',
            });
        }

        await redis.set(cacheKey, JSON.stringify(uniqueResults), 'EX', 300);

        res.status(200).json({
            success: true,
            suggestions: uniqueResults,
            cached: false,
        });
    } catch (error) {
        console.log('Error in getSearchSuggestions controller', error);
        res.status(500).json({
            success: false,
            message: 'Error in getSearchSuggestions controller',
        });
    }
};
