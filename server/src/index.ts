import express, { Application } from "express";
import errorHandler from "./handlers/ErrorHandler";
import allRoutes from "./routes";
import httpStatus from "http-status";
import ApiError from "./exceptions/ApiErrorException";
import { config } from "./config";
import  { sequelize } from "./config/database";

const app: Application = express();

const PORT = config.port || 3500;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", allRoutes);

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
  }
};

authenticateDbAndStartServer();
