import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const UserDiscount = sequelize.define("UserDiscount", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discountCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default UserDiscount;
