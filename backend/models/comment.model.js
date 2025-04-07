import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: String,
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        title: String,
        content: String,
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
