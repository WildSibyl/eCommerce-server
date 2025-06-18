import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      throw new ErrorResponse("User with such email exists", 404);
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(201).json(users);
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) throw new ErrorResponse("User not found", 404);
    await user.update({ name, email });
    res.status(201).json({ name, email });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new ErrorResponse("User not found", 404);
    // added User hook to solve the issue of deleting user with orders
    User.addHook("beforeDestroy", async (user) => {
      await Order.destroy({ where: { userId: user.id } });
    });
    await user.destroy();
    res.status(201).json({ message: "User deleted" });
  } catch (err) {
    res.status(300).json({ message: err.message });
  }
};
