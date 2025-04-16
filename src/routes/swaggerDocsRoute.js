import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerJson from "../../swagger.json" assert { type: "json" };

const routerSwagger = Router();

routerSwagger.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

export default routerSwagger;
