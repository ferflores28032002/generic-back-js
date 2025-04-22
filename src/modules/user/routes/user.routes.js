import { Router } from "express";

import {
  addUser,
  getUserAccess,
  listUsers,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.post("/", addUser);
userRoutes.get("/:id/access", getUserAccess);

export default userRoutes;
