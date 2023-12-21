import { check } from "express-validator";
import resultValidate from "./resultValidate";

const validateUser = [
  check("name")
    .notEmpty()
    .withMessage("El campo 'name' no puede estar vacio")
    .isLength({ min: 3, max: 30 })
    .withMessage("El campo 'name' debe tener entre 3 y 30 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El campo 'email' no puede estar vacio")
    .isEmail()
    .withMessage("El campo 'email' debe ser un email valido")
    .isLength({ max: 30 })
    .withMessage("El campo 'email' debe tener menos de 30 caracteres"),
  check("role")
    .notEmpty()
    .withMessage("El campo 'role' no puede estar vacio")
    .isIn(["user", "admin"])
    .withMessage("El campo 'role' debe ser 'user' o 'admin'"),
  check("state")
    .notEmpty()
    .withMessage("El campo 'state' no puede estar vacio")
    .isBoolean()
    .withMessage("El campo 'state' debe ser booleano"),
  check("favorites")
    .notEmpty()
    .withMessage("El campo 'favorites' no puede estar vacio"),
  check("cart").notEmpty().withMessage("El campo 'cart' no puede estar vacio"),
  check("history")
    .notEmpty()
    .withMessage("El campo 'history' no puede estar vacio"),

  resultValidate,
];
export default validateUser;
