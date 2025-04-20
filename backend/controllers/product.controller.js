import ProductModel from '../models/product.model.js';
import ProductVariantModel from '../models/productVariant.model.js';
import sortProduct from '../utils/sortProduct.js';
import mongoose from 'mongoose';

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            sort = 'createdAt',
            search,
            stockStatus,
            movementType,
            caseDiameter,
            strapLugWidth,
            strapMaterial,
            waterResistance,
            crystalLens,
        } = req.query;

        const filterQuery = {};

        if (search) {
            filterQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const conditions = [];

        // if (stockStatus) filterQuery.stockStatus = { $in: stockStatus.split(',') };
        if (movementType) conditions.push({ movementType: { $in: movementType.split(',') } });
        if (caseDiameter) {
            const diameters = caseDiameter.split(',');
            const diameterConditions = diameters.map((range) => {
                if (range.includes('-')) {
                    const [min, max] = range.split('-').map(Number);
                    return { caseDiameter: { $gte: min, $lte: max } };
                }
                if (range === '29') return { caseDiameter: { $lte: 29 } };
                if (range === '44') return { caseDiameter: { $gte: 44 } };
                return { caseDiameter: Number(range) };
            });
            conditions.push({ $or: diameterConditions });
        }

        if (strapLugWidth) conditions.push({ strapLugWidth: { $in: strapLugWidth.split(',') } });
        if (strapMaterial) conditions.push({ strapMaterial: { $in: strapMaterial.split(',') } });
        if (waterResistance)
            conditions.push({ waterResistance: { $in: waterResistance.split(',') } });
        if (crystalLens) conditions.push({ crystalLens: { $in: crystalLens.split(',') } });

        if (conditions.length > 0) {
            filterQuery.$and = conditions;
        }

        const skip = (page - 1) * limit;
        const totalProducts = await ProductModel.countDocuments(filterQuery);

        const { sortField, sortOrder } = sortProduct(sort);
        const products = await ProductModel.find(filterQuery)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('brandId', 'name')
            .populate('variants');

        if (!products) {
            return res
                .status(404)
                .json({ success: false, message: 'Do not have products in database !!!' });
        }

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / limit),
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

        const product = await ProductModel.findById(id)
            .populate('brandId', 'name')
            .populate('variants');

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
