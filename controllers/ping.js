import sequelize from "../db/index.js";

export const ping = async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).send("pong");
  } catch (error) {
    console.error("Ping failed:", error);
    res.status(500).send("Ping failed");
  }
};
