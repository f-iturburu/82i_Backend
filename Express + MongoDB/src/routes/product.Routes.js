import { Router } from "express";
import {
  createProduct,
  getAll,
  getById,
  deleteById,
} from "../controllers/product.controllers.js";

const router = Router();

router.post("/product", createProduct);
router.get("/products", getAll);
router.get("/product/:id", getById);
router.delete("/product/:id", deleteById);

export default router;
