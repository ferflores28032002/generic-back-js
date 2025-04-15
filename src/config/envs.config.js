import dotenv from "dotenv";

import env from "env-var";

dotenv.config();

export const envs = {
  app: {
    port: env.get("APP_PORT").default(3000).asPortNumber(),
    env: env.get("NODE_ENV").default("development").asString(),
  },
  db: {
    host: env.get("DB_HOST").required().asString(),
    port: env.get("DB_PORT").default(5432).asPortNumber(),
    user: env.get("DB_USER").required().asString(),
    password: env.get("DB_PASSWORD").required().asString(),
    name: env.get("DB_NAME").required().asString(),
  },
};
