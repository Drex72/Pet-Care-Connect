import { Dialect, Sequelize } from "sequelize";
import { config } from "./";

const postgresConnection = new Sequelize(config.postgresUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Allows self-signed SSL certificates
    },
  },
});
const mysqlConnection = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "mysql" as Dialect,
  }
);

export const sequelize = postgresConnection;
