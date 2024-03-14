import express from "express";
import {
  getUser,
  getUserOrders,
  updateUser,
  addToCart,
  removeFromCart,
  deleteFromCart,
  addToWishlist,
  removeFromWishlist,
  deleteFromWishlist,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:_id", verifyToken, getUser);
router.get("/:_id/orders", verifyToken, getUserOrders);

// Update
router.patch("/:id", verifyToken, updateUser);
router.patch("/:id/cart/add/:productId", verifyToken, addToCart);
router.patch("/:id/cart/remove/:productId", verifyToken, removeFromCart);
router.patch("/:id/cart/delete/:productId", verifyToken, deleteFromCart);
router.patch("/:id/wishlist/add/:productId", verifyToken, addToWishlist);
router.patch(
  "/:id/wishlist/remove/:productId",
  verifyToken,
  removeFromWishlist
);
router.patch(
  "/:id/wishlist/delete/:productId",
  verifyToken,
  deleteFromWishlist
);

export default router;
