import express, { request, response, Router } from "express";
import petProviderController from "../controllers/PetProviderController";
import authRouter from "./authRoutes";
import petOwnerRouter from "./petOwnerRoutes";
import petProviderRoutes from "./petProviderRoutes";

const router = express.Router();
router.use("/auth", authRouter);
router.use("/pet-owner", petOwnerRouter);
router.use("/pet-provider", petProviderRoutes);

router.use("/", (req, res) => {
  res.status(200).send("The API is Up and Running");
});

export default router;
