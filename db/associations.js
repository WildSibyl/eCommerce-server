import sequelize from "./index.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import DiscountCode from "../models/DiscountCode.js";
import UserDiscount from "../models/UserDiscount.js";

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

// User has many Orders
Order.belongsTo(User, {
  foreignKey: "userId",
});

// Order has many Products
Order.belongsToMany(Product, { through: "OrderProducts" });
Product.belongsToMany(Order, { through: "OrderProducts" });

// User bought Products
User.belongsToMany(Product, { through: "UserProducts" });
Product.belongsToMany(User, { through: "UserProducts" });

UserDiscount.belongsTo(User, { foreignKey: "userId" });
UserDiscount.belongsTo(DiscountCode, { foreignKey: "discountCodeId" });

sequelize.sync();
