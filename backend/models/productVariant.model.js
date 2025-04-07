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
        images: [String],
    },
    { timestamps: true }
);

const ProductVariantModel = mongoose.model('ProductVariant', productVariantSchema);
export default ProductVariantModel;
