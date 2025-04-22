import { Router } from "express";
import { listModules, addModule } from "../controllers/module.controller.js";

const moduleRoutes = Router();

moduleRoutes.get("/", listModules);
moduleRoutes.post("/", addModule);

export default moduleRoutes;
