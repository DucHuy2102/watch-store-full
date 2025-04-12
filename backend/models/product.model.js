import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        variants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductVariant',
            },
        ],
        defaultVariantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductVariant',
        },
        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        movementType: String,
        waterResistance: String,
        crystalLens: String,
        caseDiameter: Number,
        caseHeight: Number,
        caseMaterial: String,
        caseColor: String,
        caseFinish: String,
        dialColor: String,
        dialMarkings: String,
        strapLugWidth: Number,
        strapMaterial: String,
        strapBuckle: String,
        batteryType: String,
        gender: String,

        isSale: {
            type: Boolean,
            default: false,
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },
        isLimitedEdition: {
            type: Boolean,
            default: false,
        },
        minPrice: Number,
        maxPrice: Number,
        rating: Number,
        totalSold: Number,
    },
    { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
