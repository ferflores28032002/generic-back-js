import { Router } from "express";

import { addUser, listUsers } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", listUsers);

userRoutes.post("/", addUser);

export default userRoutes;
