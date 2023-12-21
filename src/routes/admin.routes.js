import { Router } from "express";
import { allUser, deleteUser, editUser } from "../controllers/adminController";
import validateAuth from "../helpers/validateAuth";
import {
  allProduct,
  deletProductById,
  editProduct,
  productId,
} from "../controllers/product.controllers";

import validateProduct from "../helpers/validateProduct";

const router = Router();

router.route("/").get(allUser);
router
  .route("/:id")
  .put(validateAuth, editUser)
  .delete(validateAuth, deleteUser);

router.route("/product").get(allProduct);
router
  .route("/product/:id")
  .get(productId)
  .put(validateAuth, validateProduct, editProduct)
  .delete(validateAuth, deletProductById);

export default router;
