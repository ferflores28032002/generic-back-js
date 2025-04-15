import { Router } from "express";

import userRoutes from "../modules/user/routes/user.routes.js";

const routers = Router();

routers.use("/users", userRoutes);

export default routers;
