//placeholder for routes, recheck and finalise on this


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import planRoutes from './routes/planRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/suggestions', suggestionRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
