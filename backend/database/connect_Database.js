import mongoose from 'mongoose';

export default async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('-----> Connected to database successfully');
    } catch (error) {
        console.log('Error connecting to database', error);
        process.exit(1);
    }
}
