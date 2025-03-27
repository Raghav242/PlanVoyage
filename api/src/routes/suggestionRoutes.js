import express from "express";
import { getSuggestions, addSuggestion } from "../controllers/suggestionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//GET /suggestions - List all trip suggestions (Public)
router.get("/suggestions", getSuggestions);

//POST /suggestions - Add a new trip suggestion (Protected)
router.post("/suggestions", authMiddleware, addSuggestion);

export default router;
