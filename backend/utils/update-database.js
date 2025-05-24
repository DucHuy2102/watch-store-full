import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import connectDatabase from '../database/connect_Database.js';
import ProductModel from '../models/product.model.js';
import mongoose from 'mongoose';
import { Automatic_Link_Timex } from './link-timex.js';

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
                gender: 'Men',
            });
            console.log(`✅ Updated gender 'Men' for product: ${product.name}`);
        }
    } catch (error) {
        console.error('❌ Error updating gender:', error);
    } finally {
        mongoose.disconnect();
    }
};

const runUpdateImages = async () => {
    await connectDatabase();
    const products = await ProductModel.find();
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (const link of Automatic_Link_Timex) {
        await page.goto(link, { waitUntil: 'networkidle2' });

        const productName = await page.evaluate(() => {
            return document.querySelector('h1.product-details__panel-title')?.textContent?.trim();
        });

        if (!productName) {
            console.log(`❌ Không lấy được tên sản phẩm ở link: ${link}`);
            continue;
        }

        const product = products.find((p) => p.name.toLowerCase() === productName.toLowerCase());

        if (!product) {
            console.log(`❌ Không tìm thấy sản phẩm cho name: ${productName}`);
            continue;
        }

        const images = await page.evaluate(() => {
            const thumbnailEl = document.querySelector('.product-details__bg-desktop img');
            const subImageEl = document.querySelector(
                '.product-gallery__featured-image-container img'
            );

            const thumbnail = thumbnailEl ? 'https:' + thumbnailEl.getAttribute('src') : null;
            const subImage = subImageEl ? 'https:' + subImageEl.getAttribute('src') : null;

            return { thumbnail, subImage };
        });

        if (!images.thumbnail && !images.subImage) {
            console.log(`❌ Không tìm thấy ảnh cho sản phẩm: ${productName}`);
            continue;
        }

        await ProductModel.findByIdAndUpdate(
            { name: product.name },
            {
                $set: {
                    thumbnail: images.thumbnail,
                    sub_image: images.subImage,
                },
            }
        );

        console.log(`✅ Updated images cho: ${product.name}`);
    }

    await browser.close();
    mongoose.disconnect();
    console.log('🔥 Done update images!');
};

const createProductIndexes = async () => {
    try {
        await connectDatabase();

        // Text index cho search
        await ProductModel.collection.createIndex({ name: 'text', description: 'text' });

        // Index các field query nhiều
        await ProductModel.collection.createIndex({ watchStyle: 1 });
        await ProductModel.collection.createIndex({ 'variant.stock': 1 });
        await ProductModel.collection.createIndex({ gender: 1 });
        await ProductModel.collection.createIndex({ 'specifications.movementType': 1 });
        await ProductModel.collection.createIndex({ 'specifications.caseDiameter': 1 });
        await ProductModel.collection.createIndex({ 'specifications.strapLugWidth': 1 });
        await ProductModel.collection.createIndex({ 'specifications.strapMaterial': 1 });
        await ProductModel.collection.createIndex({ 'specifications.waterResistance': 1 });
        await ProductModel.collection.createIndex({ 'specifications.crystalLens': 1 });

        // Sort thường xuyên
        await ProductModel.collection.createIndex({ createdAt: -1 });

        // Nếu có price thì thêm luôn
        await ProductModel.collection.createIndex({ price: 1 });

        console.log('✅ Đã tạo index cho Product collection.\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating gender:', error);
    } finally {
        mongoose.disconnect();
    }
};

// updateProductRatings();
// updateDefaultVariantId();
// updateProductGender();
// runUpdateImages();
createProductIndexes();
