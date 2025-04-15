import Server from "./server.js";

import { envs } from "./config/envs.config.js";

const server = new Server(envs.app.port);
server.start();
