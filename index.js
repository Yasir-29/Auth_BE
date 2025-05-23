import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter.js';
import authController from './controllers/authController.js';



dotenv.config();


const app = express();
app.use(cors());
app.use(helmet())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://127.0.0.1:27017/Auth_be').then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});


const PORT = process.env.PORT || 3000;
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.json('Hello Worlds!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});