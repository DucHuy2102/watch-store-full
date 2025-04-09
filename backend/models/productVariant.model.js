import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        color: String,
        sellPrice: Number,
        originPrice: Number,
        stock: Number,
        sold: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        images: [String],
    },
    { timestamps: true }
);

const ProductVariantModel = mongoose.model('ProductVariant', productVariantSchema);
export default ProductVariantModel;
