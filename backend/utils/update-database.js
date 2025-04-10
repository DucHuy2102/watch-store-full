import dotenv from 'dotenv';
import connectDatabase from '../database/connect_Database.js';
import BrandModel from '../models/brand.model.js';
import ProductModel from '../models/product.model.js';

dotenv.config();

// create brand
async function createBrand() {
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
}

// update rating field in product
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

// run code
// createBrand();
updateProductRatings();
