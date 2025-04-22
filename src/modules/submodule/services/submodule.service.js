import { connection } from "../../../database/connection.js";
import { SubmoduleModel } from "../models/submodule.model.js";

export const getAllSubmodules = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${SubmoduleModel.table}`);
  return rows;
};

export const createSubmodule = async ({ module_id, name, path, icon }) => {
  await connection.query(
    `CALL ${SubmoduleModel.procedures.create}(?, ?, ?, ?)`,
    [module_id, name, path, icon]
  );
};
