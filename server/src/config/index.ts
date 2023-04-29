import * as dotenv from "dotenv";

dotenv.config();

type configType = {
  port: number;
  dbName: string;
  dbUserName: string;
  dbHost: string;
  dbPassword: string;
  env: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  postgresUrl: string;
  sendGridKey: string;
  awsAccessKey: string;
  awsSecretKey: string;
  NODE_ENV: "development" | "production";
};
export const config = Object.freeze({
  port: 8000,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  env: "development",
  accessTokenSecret: "Damilola&12",
  refreshTokenSecret: "Damilola&123",
  postgresUrl: process.env.POSTGRES_URL,
  sendGridKey: process.env.SEND_GRID_API_KEY,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  NODE_ENV: process.env.NODE_ENV,
} as configType);
