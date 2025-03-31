import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './database/connect_Database.js';
import setupRoutes from './routes/index.js';

const app = express();
app.use(express.json());
dotenv.config();

// routes
setupRoutes(app);

// connect to database
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
    connectDatabase();
});
