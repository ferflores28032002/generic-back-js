import { Router } from "express";

import {
  addRole,
  listRoles,
  assignRoleToUser,
} from "../controllers/role.controller.js";

const roleRoutes = Router();

roleRoutes.get("/", listRoles);
roleRoutes.post("/", addRole);
roleRoutes.post("/assign", assignRoleToUser);

export default roleRoutes;
