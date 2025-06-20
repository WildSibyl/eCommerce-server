import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is important for self-signed certificates
    },
  },
  logging: false,
});

export default sequelize;
