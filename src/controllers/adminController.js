import User from "../models/user/user";

export const allUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Los ususarios no fueron encontrado",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const role = req.role;

    if (role == "administrador") {
      const { id } = req.params;
      const userFound = await User.findByIdAndDelete(id);
      if (!userFound) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        message: "Usuario eliminado correctamente",
      });
    } else {
      res.status(401).json({
        message: "No tienes permiso para eliminar este Usuario",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error al eliminar el usuario",
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      image,
      state,
      role,
      favorites,
      cart,
      history,
    } = req.body;

    const userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    userFound.name = name;
    userFound.email = email;
    userFound.password = password;
    userFound.image = image;
    userFound.state = state;
    userFound.role = role;
    userFound.favorites = favorites;
    userFound.cart = cart;
    userFound.history = history;

    await userFound.save();
    res.status(200).json({
      message: "Usuario editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error al editar el usuario",
    });
  }
};
