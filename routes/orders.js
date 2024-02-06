import express from "express";
import { createOrder, getOrder, updateOrder } from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create
router.post("/create", verifyToken, createOrder);

// Read
router.get("/:id", verifyToken, getOrder);

// Update
router.patch("/:id", verifyToken, updateOrder);

export default router;