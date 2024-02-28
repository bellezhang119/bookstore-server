import express from "express";
import {
  getUser,
  getUserOrders,
  updateUser,
  addRemoveDeleteCart,
  addRemoveDeleteWishlist,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:_id", verifyToken, getUser);
router.get("/:_id/orders", verifyToken, getUserOrders);

// Update
router.patch("/:id", verifyToken, updateUser);
router.patch("/:id/cart/:productId", verifyToken, addRemoveDeleteCart);
router.patch("/:id/wishlist/:productId", verifyToken, addRemoveDeleteWishlist);

export default router;
