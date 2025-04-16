import path from "path";

import { Router } from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.join(__dirname, "../../swagger.json");
const swaggerJson = JSON.parse(readFileSync(swaggerPath, "utf8"));

const routerSwagger = Router();

routerSwagger.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

export default routerSwagger;
