import Server from "./server.js";

import { envs } from "./config/envs.config.js";
import { connection } from "./database/connection.js";

const server = new Server(envs.app.port);
server.start();

const main = async () => {
  try {
    await connection.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL database");
    server.start();
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
  }
};

main();
