import User from "../models/user/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.SECRET_KEY;

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Ya existe un usuario con el correo enviado",
      });
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      name: newUser.name,
      status: newUser.status,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "El usuario no pudo ser creado",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Correo inválido",
      });
    }

    if (req.body.password) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      secretKey
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "No se pudo iniciar sesión",
    });
  }
};

export const auth = async (req, res) => {
  try {
    const id = req.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Token válido", user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token no válido" });
  }
};

export const editUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.id, req.body);

    res.status(200).json({
      message: "El usuario fue editado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "no se pudo editar el usuario" });
  }
};
