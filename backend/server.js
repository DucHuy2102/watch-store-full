import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDatabase from './database/connect_Database.js';
import setupRoutes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
dotenv.config();

// routes
setupRoutes(app);

// connect to database
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDatabase();
    console.log(`\n✅ Server is running on port:${PORT}`);
});
