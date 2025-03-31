import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('\n -----> Connected to database successfully');
    } catch (error) {
        console.log('Error connecting to database', error);
        process.exit(1);
    }
};
