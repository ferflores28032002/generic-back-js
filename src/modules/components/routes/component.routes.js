import { Router } from "express";
import {
  listComponents,
  addComponent,
} from "../controllers/component.controller.js";

const componentRoutes = Router();

componentRoutes.get("/", listComponents);
componentRoutes.post("/", addComponent);

export default componentRoutes;
