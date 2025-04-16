import { Router } from "express";

import userRoutes from "../modules/user/routes/user.routes.js";
import routerSwagger from "./swaggerDocsRoute.js";

const routers = Router();

routers.use("/users", userRoutes);
routers.use("/", routerSwagger);

export default routers;
