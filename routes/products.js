import express from "express";
import { getProducts } from "../controllers/products.js";

const router = express.Router();

// Read
router.get("/", getProducts);

