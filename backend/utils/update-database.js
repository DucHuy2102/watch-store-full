import dotenv from 'dotenv';
import connectDatabase from '../database/connect_Database.js';
import ProductModel from '../models/product.model.js';
import ProductVariantModel from '../models/productVariant.model.js';
import mongoose from 'mongoose';

dotenv.config();

// update rating field in ProductModel
const updateProductRatings = async () => {
    await connectDatabase();

    try {
        const products = await ProductModel.find();
        for (let i = 0; i < products.length; i++) {
            const rating = (i + 1) * 3;
            await ProductModel.findByIdAndUpdate(products[i]._id, {
                rating: rating,
            });
            console.log(`✅ Updated rating = ${rating} for product: ${products[i].name}`);
        }
        console.log('🔥 Done updating ratings!');
    } catch (error) {
        console.error('❌ Error updating ratings:', error);
    } finally {
        mongoose.disconnect();
    }
};

// update defaultVariantId field in ProductModel
const updateDefaultVariantId = async () => {
    await connectDatabase();

    try {
        const products = await ProductModel.find().populate('variants');

        for (const product of products) {
            if (!product.variants || product.variants.length === 0) continue;

            const defaultVariant = product.variants[0];

            await ProductModel.findByIdAndUpdate(product._id, {
                defaultVariantId: defaultVariant._id,
            });

            console.log(
                `✅ Set defaultVariantId = ${defaultVariant._id} for product: ${product.name}`
            );
        }

        console.log('🔥 Done setting defaultVariantId!');
    } catch (error) {
        console.error('❌ Error setting defaultVariantId:', error);
    } finally {
        mongoose.disconnect();
    }
};

// add gender field in ProductModel
const updateProductGender = async () => {
    await connectDatabase();

    try {
        const products = await ProductModel.find();

        for (const product of products) {
            await ProductModel.findByIdAndUpdate(product._id, {
                gender: 'Male',
            });
            console.log(`✅ Updated gender 'Male' for product: ${product.name}`);
        }
    } catch (error) {
        console.error('❌ Error updating gender:', error);
    } finally {
        mongoose.disconnect();
    }
};

// updateProductRatings();
// updateDefaultVariantId();
// updateProductGender();
