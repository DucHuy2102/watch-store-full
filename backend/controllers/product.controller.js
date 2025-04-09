import ProductModel from '../models/product.model.js';
import BrandModel from '../models/brand.model.js';
import ProductVariantModel from '../models/productVariant.model.js';
import sortProduct from '../utils/sortProduct.js';

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            sort = 'createdAt',
            order = 'desc',
            search,
            brand,
            movementType,
            waterResistance,
            caseMaterial,
            dialColor,
            tag,
        } = req.query;

        const filterQuery = {};

        if (search) {
            filterQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (brand) filterQuery.brandId = brand;
        if (movementType) filterQuery.movementType = movementType;
        if (waterResistance) filterQuery.waterResistance = waterResistance;
        if (caseMaterial) filterQuery.caseMaterial = caseMaterial;
        if (dialColor) filterQuery.dialColor = dialColor;
        if (tag) filterQuery.tags = tag;

        const skip = (page - 1) * limit;

        const totalProducts = await ProductModel.countDocuments(filterQuery);

        const { sortField, sortOrder } = sortProduct(sort);
        const products = await ProductModel.find(filterQuery)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('brandId', 'name')
            .populate('variants');

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
export const getProductById = async (req, res) => {};
