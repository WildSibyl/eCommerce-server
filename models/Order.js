import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import { generateOrderId } from "../utils/generateOrderId.js";

const Order = sequelize.define("Orders", {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => generateOrderId(), // Generates a unique order ID
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  shipping: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  billing: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  fee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discountCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // pending, paid, failed, etc.
  },
  stripePaymentIntentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//await sequelize.sync({ alter: true });

export default Order;
