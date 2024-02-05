import express from "express";
import { getUser, getUserOrders, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/orders", verifyToken, getUserOrders);

// Update
router.patch("/:id", verifyToken, updateUser);


export default router;
