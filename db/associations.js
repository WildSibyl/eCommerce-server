import sequelize from "./index.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// Category has many Products
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "RESTRICT", // Prevent deletion if products exist
});

// Product belongs to one Category
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

User.belongsToMany(Product, {
  through: "OrderProducts",
});

Product.belongsToMany(Order, {
  through: "OrderProducts",
});

sequelize.sync();
