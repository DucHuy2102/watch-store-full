import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDatabase from '../database/connect_Database.js';
import ProductModel from '../models/product.model.js';
import {
    Automatic_Link_Timex,
    Chronograph_Link_Timex,
    Stainless_Steel_Link_Timex,
    Titanium_Link_Timex,
    Digital_Link_Timex,
    Leather_Link_Timex,
    Black_Link_Timex,
    Military_Link_Timex,
    Vintage_Link_Timex,
    Diver_Link_Timex,
    Small_Link_Timex,
    Bracelet_Link_Timex,
    Gold_Link_Timex,
    Silver_Link_Timex,
    Digital_Female_Link_Timex,
    Kids_Link_Timex,
} from './link-timex.js';

dotenv.config();

// const urls = Automatic_Link_Timex;
// const urls = Stainless_Steel_Link_Timex;
// const urls = Chronograph_Link_Timex;
// const urls = Titanium_Link_Timex;
// const urls = Digital_Link_Timex;
// const urls = Leather_Link_Timex;
// const urls = Black_Link_Timex;
// const urls = Military_Link_Timex;
// const urls = Vintage_Link_Timex;
// const urls = Diver_Link_Timex;
// const urls = Small_Link_Timex;
// const urls = Bracelet_Link_Timex;
// const urls = Gold_Link_Timex;
// const urls = Silver_Link_Timex;
// const urls = Digital_Female_Link_Timex;
const urls = Kids_Link_Timex;

function extractNumber(text) {
    if (!text) return null;
    const cleaned = text.replace(/[^\d]/g, '');
    const number = parseInt(cleaned, 10);
    return isNaN(number) ? null : number;
}

async function crawlTimexProduct(page, url) {
    await page.goto(url, { waitUntil: 'networkidle2' });

    return await page.evaluate(() => {
        function normalizeKey(key) {
            return key.replace(/:/g, '').replace(/\//g, '').replace(/\s+/g, '_').toLowerCase();
        }

        const name = document.querySelector('h1.product-details__panel-title')?.textContent?.trim();
        const originPrice = document.querySelector(
            'div.price__sale span.price-item--slashed'
        )?.textContent;
        const sellPrice = document.querySelector(
            'div.price__sale span.price-item--sale'
        )?.textContent;
        const description = document
            .querySelector('.product-description__full p')
            ?.textContent?.trim();

        const specElements = document.querySelectorAll('.product-description__description-group');
        const specs = {};
        specElements.forEach((el) => {
            const key = el
                .querySelector('.product-description__description-term')
                ?.textContent?.trim()
                ?.toLowerCase();
            const value = el
                .querySelector('.product-description__description-detail')
                ?.textContent?.trim();
            if (key && value) specs[normalizeKey(key)] = value;
        });

        const imageElements = document.querySelectorAll('.product-gallery img');
        const images = Array.from(imageElements)
            .map((img) => {
                const src = img.getAttribute('src');
                return src?.startsWith('http') ? src : `https:${src}`;
            })
            .filter((url, i, self) => self.indexOf(url) === i && !url.includes('150x150'));

        return { name, description, originPrice, sellPrice, images, specs };
    });
}

async function runAll() {
    await connectDatabase();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const watchStyle = 'Digital';
    const gender = 'Kid';
    const fallBack_Description =
        'Discover timeless craftsmanship and contemporary design in perfect harmony. This watch embodies the enduring spirit of classic timepieces while embracing modern innovation. Housed within a robust stainless-steel case and adorned with a refined dial, it offers reliable precision through its automatic movement, powered by your motion. A thoughtfully designed strap complements its bold yet sophisticated aesthetic, making it a versatile companion for both everyday wear and special occasions. Meticulously crafted to stand the test of time, this watch is more than an accessory — it’s a statement of character and enduring style.';
    let count = 0;

    for (const url of urls) {
        try {
            console.log(`\n🌐 Crawling: ${url}`);
            const raw = await crawlTimexProduct(page, url);
            console.log('🧩 Data:', raw.name);
            const isBestSeller = count % 2 === 0;
            const isNewArrival = count % 2 !== 0;
            const isSale = !isNewArrival;
            const isLimitedEdition = false;
            count++;

            const product = new ProductModel({
                name: raw.name,
                description: raw.description || fallBack_Description,
                watchStyle,
                gender,
                specifications: {
                    movementType: raw.specs['watch_movement'] || '',
                    waterResistance: raw.specs['water_resistance'] || '',
                    crystalLens: raw.specs['crystal_lens'] || '',
                    caseDiameter: extractNumber(raw.specs['case_diameter']),
                    caseHeight: extractNumber(raw.specs['case_height']),
                    caseMaterial: raw.specs['case_material'] || '',
                    caseColor: raw.specs['case_color'] || '',
                    caseFinish: raw.specs['case_finish'] || '',
                    dialColor: raw.specs['dial_color'] || '',
                    dialMarkings: raw.specs['dial_markings'] || '',
                    strapLugWidth: extractNumber(raw.specs['strap_lug_width']),
                    strapMaterial: raw.specs['strap_material'] || '',
                    strapBuckle: raw.specs['strap_buckle'] || '',
                    batteryType: raw.specs['battery_type'] || '',
                },

                variant: {
                    color: raw.specs['strap_color'] || 'default',
                    sellPrice: extractNumber(raw.sellPrice),
                    originPrice: extractNumber(raw.originPrice) ?? extractNumber(raw.sellPrice),
                    stock: 20,
                    totalSold: count,
                    rating: count + 2,
                    images: raw.images,
                },

                isBestSeller,
                isNewArrival,
                isSale,
                isLimitedEdition,
            });

            const savedProduct = await product.save();
            console.log('✅ Product saved:', savedProduct._id);
        } catch (err) {
            console.error(`❌ Error crawling ${url}:`, err);
        }
    }

    await browser.close();
    await mongoose.disconnect();
    console.log('\n🛑 Done.');
}

runAll();
