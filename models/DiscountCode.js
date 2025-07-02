import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const DiscountCode = sequelize.define("DiscountCode", {
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxUsesPerUser: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default DiscountCode;
