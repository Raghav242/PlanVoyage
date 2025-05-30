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
const PORT = process.env.PORT || 5000;

// Allowed frontend origins (for CORS)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://planvoyage-phi.vercel.app', 
  'http://54.145.128.136:5173',
];

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`❌ Blocked by CORS: ${origin}`);
    return callback(new Error('CORS policy does not allow this origin.'));
  },
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use(pingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', suggestionRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/trip-places', tripPlaceRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
