import { Router } from "express";
import {
  addSubmodule,
  listSubmodules,
} from "../controllers/submodule.controller.js";

const submoduleRoutes = Router();

submoduleRoutes.get("/", listSubmodules);
submoduleRoutes.post("/", addSubmodule);

export default submoduleRoutes;
