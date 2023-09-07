import express, { Application } from "express";
import errorHandler from "./handlers/ErrorHandler";
import allRoutes from "./routes";
import httpStatus from "http-status";
import ApiError from "./exceptions/ApiErrorException";
import { config } from "./config";
import { sequelize } from "./config/database";
import cors from "cors";
import { credentials } from "./utils/corsCredentials";
import { corsOptions } from "./utils/corsOptions";
import { detectSQLInjectionMiddleware } from "./utils/detectSQLInjection";

// App Entry Point

// Created the Application
const app: Application = express();

// PORT for the Backend
const PORT = config.port || 3500;

// Converts all necessary information to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(credentials);
app.use(cors(corsOptions));

// This is the middle ware that is doing all the checking
app.use(detectSQLInjectionMiddleware);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// Routes for our application
app.use("/", allRoutes);

// If Route does not exist, throw them na error
app.use((_, __, next) => {
  next(new ApiError("Not found", httpStatus.NOT_FOUND));
});

// Sets Error Handlers
app.use(errorHandler.errorConverter);
app.use(errorHandler.errorHandler);

// Synchronize your models with the database
const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");
  } catch (error) {
    console.error("Failed to sync database", error);
  }
};

const authenticateDbAndStartServer = async () => {
  try {
    await sequelize.authenticate();
    await syncModels();
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
      console.log(
        "Connection to the database has been established successfully."
      );
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

authenticateDbAndStartServer();
