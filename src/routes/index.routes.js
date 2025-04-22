import { Router } from "express";

import userRoutes from "../modules/user/routes/user.routes.js";
import roleRoutes from "../modules/role/routes/role.routes.js";
import routerSwagger from "./swaggerDocsRoute.js";
import permissionRoutes from "../modules/permissions/routes/permission.routes.js";
import moduleRoutes from "../modules/modules/routes/module.routes.js";
import submoduleRoutes from "../modules/submodule/routes/submodule.routes.js";
import componentRoutes from "../modules/components/routes/component.routes.js";

const routers = Router();

routers.use("/", routerSwagger);

routers.use("/users", userRoutes);
routers.use("/roles", roleRoutes);
routers.use("/permissions", permissionRoutes);
routers.use("/modules", moduleRoutes);
routers.use("/submodules", submoduleRoutes);
routers.use("/components", componentRoutes);




export default routers;
