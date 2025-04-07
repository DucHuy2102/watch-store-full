import dotenv from 'dotenv';
import connectDatabase from '../database/connect_Database.js';
import BrandModel from '../models/brand.model.js';

dotenv.config();

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

createBrand();
