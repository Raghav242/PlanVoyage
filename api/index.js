//placeholder for routes, recheck and finalise on this
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/authRoutes.js';
import suggestionRoutes from './src/routes/suggestionRoutes.js';
import pingRoutes from './src/routes/pingRoutes.js';
import placeRoutes from './src/routes/placeRoutes.js';
import planRoutes from './src/routes/planRoutes.js';
import tripPlaceRoutes from './src/routes/tripPlaceRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(pingRoutes);

app.use('/api/auth', authRoutes);
app.use('/api',suggestionRoutes);
app.use('/api/places', placeRoutes);

app.use("/api/plans", planRoutes);

app.use("/api/trip-places", tripPlaceRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
