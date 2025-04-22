import Server from "./server.js";
import { envs } from "./config/envs.config.js";
import { connection } from "./database/connection.js";

const server = new Server(envs.app.port);

const main = async () => {
  try {
    const [rows] = await connection.query("SELECT NOW()");
    console.log("✅ Connected to MySQL database:", rows[0]);
    server.start();
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
  }
};

main();
