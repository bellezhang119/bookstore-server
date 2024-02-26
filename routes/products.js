import express from "express";
import { getProducts, getProduct } from "../controllers/products.js";

const router = express.Router();

// Read
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
