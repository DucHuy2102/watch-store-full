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
        variants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductVariant',
            },
        ],
        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
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
        tags: [String],
    },
    { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
