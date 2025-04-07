import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        description: String,
        gender: String,
        logo: String,
    },
    { timestamps: true }
);

const BrandModel = mongoose.model('Brand', brandSchema);
export default BrandModel;
