import { Router } from "express";
import validateAuth from "../helpers/validateAuth";
import validateProduct from "../helpers/validateProduct";
import {
  allProduct,
  deletProductById,
  editProduct,
  newProduct,
  productId,
} from "../controllers/product.controllers";

const router = Router();

router
  .route("/")
  .get(allProduct)
  .post(validateAuth, validateProduct, newProduct);
router
  .route("/:id")
  .delete(validateAuth, deletProductById)
  .put(validateAuth, validateProduct, editProduct)
  .get(productId);

export default router;
