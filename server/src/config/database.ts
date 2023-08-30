import { Dialect, Sequelize } from "sequelize";
import { config } from "./";

const postgresConnection = new Sequelize('postgres://drex:k8qdBSkQkLntyAy3ANAcxi1cV7UINslf@dpg-cj49o1aip7vuasjvoog0-a.oregon-postgres.render.com/petcaredb_qcv8', {
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

// console.log(config);

// export const sequelize =
//   config.NODE_ENV === "development" ? mysqlConnection : postgresConnection;

export const sequelize = postgresConnection;
