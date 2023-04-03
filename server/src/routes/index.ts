import express, { Router } from "express";
import authRouter from "./authRoutes";
import petOwnerRouter from "./petOwnerRoutes";
import petProviderRoutes from "./petProviderRoutes";

const router = express.Router();

type routeObject = {
  path: string;
  routes: Router;
};

const allRoutes: routeObject[] = [
  {
    path: "/auth",
    routes: authRouter,
  },
  {
    path: "/pet-owner",
    routes: petOwnerRouter,
  },
  {
    path: "/pet-provider",
    routes: petProviderRoutes,
  },
];

allRoutes.map((route) => {
  router.use(route.path, route.routes);
});

export default router;
