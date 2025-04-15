import pkg from "pg";

import { envs } from "../config/envs.config.js";

const { Pool } = pkg;

export const connection = new Pool({
  host: envs.db.host,
  port: envs.db.port,
  user: envs.db.user,
  password: envs.db.password,
  database: envs.db.name,
});
