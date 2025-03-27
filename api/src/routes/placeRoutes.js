import express from 'express';
import { findNearbyPlaces } from '../controllers/placeController.js';

const router = express.Router();

router.get('/', findNearbyPlaces); // Endpoint: GET /api/places

export default router;
