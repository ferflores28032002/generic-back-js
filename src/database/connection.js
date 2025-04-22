import mysql from "mysql2/promise";

import { envs } from "../config/envs.config.js";

export const connection = await mysql.createPool({
  host: envs.db.host,
  port: envs.db.port,
  user: envs.db.user,
  password: envs.db.password,
  database: envs.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
