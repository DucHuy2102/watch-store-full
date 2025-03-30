import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
