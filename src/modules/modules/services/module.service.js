import { connection } from "../../../database/connection.js";
import { ModuleModel } from "../models/module.model.js";

export const getAllModules = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${ModuleModel.table}`);
  return rows;
};

export const createModule = async ({ name, path, icon }) => {
  await connection.query(
    `INSERT INTO ${ModuleModel.table} (name, path, icon) VALUES (?, ?, ?)`,
    [name, path, icon]
  );
};
