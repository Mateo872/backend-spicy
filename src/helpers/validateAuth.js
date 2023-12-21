import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.SECRET_KEY;

const validateAuth = [
  check("Authorization")
    .notEmpty()
    .withMessage("El encabezado 'Authorization' no puede estar vacio"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.verify(token, secretKey);

      req.id = decoded.id;
      req.role = decoded.role;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token no válido" });
    }
  },
];
export default validateAuth;
