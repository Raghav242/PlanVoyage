import express from "express";
import { getSuggestions, addSuggestion, getSingleSuggestion, deleteSuggestion, updateSuggestion } from "../controllers/suggestionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /suggestions - List all trip suggestions (Public)
router.get("/suggestions", getSuggestions);

// GET /suggestions/:suggestionId - Get a single suggestion (Public)
router.get("/suggestions/:suggestionId", getSingleSuggestion);

// POST /suggestions - Add a new trip suggestion (Protected)
router.post("/suggestions", authMiddleware, addSuggestion);

// DELETE /suggestions/:suggestionId - Delete a trip suggestion (Protected)
router.delete("/suggestions/:suggestionId", authMiddleware, deleteSuggestion);

// PUT /suggestions/:suggestionId - Update a trip suggestion (Protected)
router.put("/suggestions/:suggestionId", authMiddleware, updateSuggestion);


export default router;

