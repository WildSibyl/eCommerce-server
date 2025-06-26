import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Product from "./Product.js";

const Order = sequelize.define("Orders", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
    // get: function () {
    //   const json = JSON.parse(this.getDataValue("products"));

    //   return json;
    // },
    // set: async function (val) {
    //   for (let e of val) {
    //     if (typeof e !== "object" || e === null) {
    //       throw new Error("Products need to be a list of objects");
    //     }
    //     if (typeof e.productId !== "number") {
    //       throw new Error("Key productId needs to be a number");
    //     }
    //     if (typeof e.quantity !== "number") {
    //       throw new Error("Key quantity needs to be a number");
    //     }

    //     const productExists = await Product.findByPk(e.productId);
    //     if (!productExists) {
    //       throw new Error(`Product Id ${e.productId} doesn't exist.`);
    //     }
    //   }
    //   return this.setDataValue("products", JSON.stringify(val));
    // },
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
