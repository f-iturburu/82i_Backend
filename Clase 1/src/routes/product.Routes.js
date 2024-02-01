import { Router } from "express";
const router = Router();
import {
  getAll,
  getById,
  sortByPrice,
  sortByCategory,
  searchByName,
  create,
  edit,
  findByIdAndDelete,
} from "../controllers/product.Controllers.js";

router.get("/products", getAll);
router.get("/product/:id", getById);
router.get("/product/:order", sortByPrice);
router.get("/product/:category", sortByCategory);
router.get("/product/:name", searchByName);
router.post("/product", create);
router.patch("/product/:id", edit);
router.delete("product/:id", findByIdAndDelete);

export default router;
