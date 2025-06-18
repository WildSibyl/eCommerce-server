import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Category from "./Category.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0,
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Categories",
      key: "id",
    },
  },
});

// optional: define association
Product.belongsTo(Category, { foreignKey: "categoryId" });

export default Product;
