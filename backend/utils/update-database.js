import dotenv from 'dotenv';
import connectDatabase from '../database/connect_Database.js';
import BrandModel from '../models/brand.model.js';
import ProductModel from '../models/product.model.js';
import ProductVariantModel from '../models/productVariant.model.js';
import mongoose from 'mongoose';

dotenv.config();

// update brand field in ProductModel
const createBrand = async () => {
    await connectDatabase();

    const menBrands = [
        'Automatic',
        'Chronograph',
        'Digital Watches',
        'Black Watches',
        'Vintage',
        'Stainlss Steel',
        'Titanium',
        'Leather',
        'Military Inspired',
        'Diver Inspired',
    ];

    const womenBrands = ['Small', 'Gold-Tone', 'Digital', 'Bracelet', 'Silver-Tone'];

    for (const brand of menBrands) {
        const newBrand = new BrandModel({
            name: brand,
            gender: 'Men',
            short_description: `Explore our ${brand} collection`,
            description: `${brand} watches from various collections`,
            logo: '',
        });

        await newBrand.save();
        console.log('✅ Brand created successfully:', newBrand);
    }

    for (const brand of womenBrands) {
        const newBrand = new BrandModel({
            name: brand,
            gender: 'Women',
            short_description: `Explore our ${brand} collection`,
            description: `${brand} watches from various collections`,
            logo: '',
        });

        await newBrand.save();
        console.log('✅ Brand created successfully:', newBrand);
    }

    process.exit(0);
};

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

// createBrand();
// updateProductRatings();
// updateDefaultVariantId();
// updateProductGender();
