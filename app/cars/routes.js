import { Router } from "express";
import {
  createCar,
  deleteCar,
  editCar,
  listCars,
  showCar,
  storeCar,
  updateCar,
} from "./controller.js";

import { checkAuth } from "../auth/controller.js";

export const routes = new Router();

routes.get("/", listCars);
routes.get("/create", createCar);
routes.get("/:id/edit", checkAuth, editCar);
routes.get("/:id/delete", checkAuth, deleteCar);
routes.get("/:id", showCar);

routes.post("/:id", updateCar);
routes.post("/", checkAuth, storeCar);
