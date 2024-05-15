import User from "../user/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // si no hay usuario
    !user && res.status(400).json("¡Credenciales incorrectas!");

    // si es el mismo usuario, entonces comparar contraseña
    const validate = await bcrypt.compare(req.body.password, user.password);
    // si no es válido
    !validate && res.status(400).json("¡Credenciales incorrectas!");

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};
