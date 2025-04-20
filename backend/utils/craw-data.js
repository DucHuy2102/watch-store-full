/*
    - 
*/

import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDatabase from '../database/connect_Database.js';
import ProductModel from '../models/product.model.js';
import ProductVariantModel from '../models/productVariant.model.js';

dotenv.config();

const urls = [
    'https://timex.com/products/m79-automatic-40mm-synthetic-rubber-strap-watch-tw2w47600',
    'https://timex.com/products/waterbury-metropolitan-automatic-41mm-leather-strap-watch-tw2y23000',
    'https://timex.com/products/waterbury-metropolitan-automatic-41mm-leather-strap-watch-tw2y22900',
    'https://timex.com/products/mk1-automatic-40mm-fabric-strap-watch-tw2y11900',
    'https://timex.com/products/timex-x-peanuts-marlin-automatic-75th-anniversary-edition-40mm-leather-strap-watch-tw2y10000',
    'https://timex.com/products/marlin-automatic-40mm-stainless-steel-bracelet-watch-tw2w93200',
    'https://timex.com/products/timex-marlin-automatic-x-peanuts-snoopy-flying-ace-40mm-leather-strap-watch-tw2w49600',
    'https://timex.com/products/marlin-automatic-40mm-leather-strap-watch-tw2w93100',
    'https://timex.com/products/giorgio-galli-s2ti-swiss-made-automatic-38mm-tw2y27500',
    'https://timex.com/products/expedition-titanium-automatic-41mm-eco-friendly-leather-strap-watch-tw2v54000',
    'https://timex.com/products/m79-automatic-x-peanuts-40mm-stainless-steel-bracelet-watch-tw2w47500',
    'https://timex.com/products/timex-x-peanuts-marlin-automatic-saxophonist-40mm-leather-strap-watch-tw2w68800',
    'https://timex.com/products/marlin-jet-automatic-38mm-fabric-strap-watch-tw2y06300',
    'https://timex.com/products/marlin-automatic-40mm-leather-strap-watch-twh6z4610',
    'https://timex.com/products/marlin-automatic-40mm-leather-strap-watch-tw2w59700',
    'https://timex.com/products/marlin-automatic-40mm-stainless-steel-bracelet-watch-tw2w59200',
    'https://timex.com/products/marlin-automatic-40mm-leather-strap-watch-tw2v44500',
    'https://timex.com/products/marlin-automatic-40mm-fabric-strap-watch-twh6z4710',
    'https://timex.com/products/harborside-coast-automatic-43mm-stainless-steel-bracelet-watch-tw2v72100',
    'https://timex.com/products/marlin-automatic-39mm-stainless-steel-bracelet-watch-tw2w58800',
    'https://timex.com/products/marlin-automatic-40mm-leather-strap-watch-tw2v44600',
    'https://timex.com/products/deepwater-reef-200-titanium-automatic-41mm-synthetic-rubber-strap-watch-tw2w73800',
    'https://timex.com/products/mk1-automatic-40mm-fabric-strap-watch-tw2y07800',
    'https://timex.com/products/timex-automatic-1983-e-line-34mm-leather-strap-watch-tw2y07500',
    'https://timex.com/products/timex-automatic-1983-e-line-34mm-stainless-steel-expansion-band-watch-tw2y07400',
    'https://timex.com/products/timex-automatic-1983-e-line-34mm-stainless-steel-expansion-band-watch-tw2y07300',
    'https://timex.com/products/timex-automatic-1983-e-line-34mm-gold-tone-expansion-band-watch-tw2y07200',
    'https://timex.com/products/marlin-jet-automatic-38mm-fabric-strap-watch-tw2y06400',
    'https://timex.com/products/timex-automatic-1983-e-line-reissue-34mm-stainless-steel-expansion-band-watch-tw2w70800',
    'https://timex.com/products/expedition-gmt-titanium-automatic-41mm-silicone-strap-watch-tw2w53000',
];

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

    const watchStyle = 'Automatic';
    let count = 0;

    for (const url of urls) {
        try {
            console.log(`🌐 Crawling: ${url}`);
            const raw = await crawlTimexProduct(page, url);
            console.log('🧩 Data:', raw.name);
            const isBestSeller = count % 2 === 0;
            const isNewArrival = count % 2 !== 0;
            const isSale = !isNewArrival;
            const isLimitedEdition = false;
            count++;

            const product = new ProductModel({
                name: raw.name,
                description: raw.description,
                watchStyle,
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
                isBestSeller,
                isNewArrival,
                isSale,
                isLimitedEdition,
                sellPrice: extractNumber(raw.sellPrice),
                originPrice: extractNumber(raw.originPrice) ?? extractNumber(raw.sellPrice),
                rating: count + 2,
                totalSold: count,
            });

            const savedProduct = await product.save();
            console.log('✅ Product saved:', savedProduct._id);

            const variant = new ProductVariantModel({
                productId: savedProduct._id,
                color: raw.specs['strap_color'] || 'default',
                sellPrice: extractNumber(raw.sellPrice),
                originPrice: extractNumber(raw.originPrice) ?? extractNumber(raw.sellPrice),
                stock: 10,
                sold: count,
                rating: count + 2,
                images: raw.images,
            });

            await variant.save();
            savedProduct.defaultVariantId = variant._id;
            savedProduct.variants.push(variant._id);
            await savedProduct.save();
            console.log('✅ Variant saved:', variant._id);
        } catch (err) {
            console.error(`❌ Error crawling ${url}:`, err);
        }
    }

    await browser.close();
    await mongoose.disconnect();
    console.log('🛑 Done.');
}

runAll();
