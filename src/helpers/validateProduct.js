import { check } from "express-validator";
import resultValidate from "./resultValidate";

const validateProduct = [
  check("name")
    .notEmpty()
    .withMessage("El campo 'name' no puede estar vacio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El campo 'name' debe tener entre 3 y 100 caracteres"),
  check("imageOne")
    .notEmpty()
    .withMessage("El campo 'imageOne' no puede estar vacio"),
  check("imageTwo")
    .notEmpty()
    .withMessage("El campo 'imageTwo' no puede estar vacio"),
  check("imageThree")
    .notEmpty()
    .withMessage("El campo 'imageThree' no puede estar vacio"),
  check("price")
    .notEmpty()
    .withMessage("El campo 'price' no puede estar vacio")
    .isNumeric()
    .withMessage("El campo 'price' debe ser numerico")
    .isLength({ min: 0 })
    .withMessage("El campo 'price' debe ser mayor a 0"),
  check("description")
    .notEmpty()
    .withMessage("El campo 'description' no puede estar vacio")
    .isLength({ min: 3, max: 300 })
    .withMessage("El campo 'description' debe tener entre 3 y 300 caracteres"),
  check("stock")
    .notEmpty()
    .withMessage("El campo 'stock' no puede estar vacio")
    .isNumeric()
    .withMessage("El campo 'stock' debe ser numerico")
    .isLength({ min: 0 })
    .withMessage("El campo 'stock' debe ser mayor a 0"),
  check("category")
    .notEmpty()
    .withMessage("El campo 'category' no puede estar vacio"),
  check("sizes")
    .notEmpty()
    .withMessage("El campo 'sizes' no puede estar vacio"),
  resultValidate,
];

export default validateProduct;
