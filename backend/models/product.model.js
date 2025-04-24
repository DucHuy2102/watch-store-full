import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        watchStyle: String,
        gender: String,

        specifications: {
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
        },

        variant: {
            color: String,
            sellPrice: Number,
            originPrice: Number,
            stock: Number,
            totalSold: {
                type: Number,
                default: 0,
            },
            rating: {
                type: Number,
                default: 0,
            },
            images: [String],
        },

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
    },
    { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
