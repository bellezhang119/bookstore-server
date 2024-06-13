import express from "express";
import {
  getUser,
  getUserOrders,
  updateUser,
  addWishlistToCart,
  getUserCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  deleteFromWishlist,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:_id", verifyToken, getUser);
router.get("/:_id/orders", verifyToken, getUserOrders);
router.get("/:_id/cart", verifyToken, getUserCart);
router.get("/:_id/wishlist", verifyToken, getUserWishlist);

// Update
router.patch("/:_id", verifyToken, updateUser);
router.patch("/:_id/cart/add/wishlist", verifyToken, addWishlistToCart);
router.patch("/:_id/cart/add/:productId", verifyToken, addToCart);
router.patch("/:_id/cart/remove/:productId", verifyToken, removeFromCart);
router.patch("/:_id/cart/delete/:productId", verifyToken, deleteFromCart);
router.patch("/:_id/wishlist/add/:productId", verifyToken, addToWishlist);
router.patch(
  "/:_id/wishlist/remove/:productId",
  verifyToken,
  removeFromWishlist
);
router.patch(
  "/:_id/wishlist/delete/:productId",
  verifyToken,
  deleteFromWishlist
);

export default router;
