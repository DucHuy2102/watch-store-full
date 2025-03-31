import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        province: {
            key: String,
            value: String,
        },
        district: {
            key: String,
            value: String,
        },
        ward: {
            key: String,
            value: String,
        },
        fullAddress: String,    
    },
    { timestamps: true }
);

const AddressModel = mongoose.model('Address', addressSchema);
export default AddressModel;
