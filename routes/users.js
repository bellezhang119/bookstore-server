import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);

// Update
router.patch("/:id", verifyToken, updateUser);

export default router;
