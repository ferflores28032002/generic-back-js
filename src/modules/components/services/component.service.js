import { connection } from "../../../database/connection.js";
import { ComponentModel } from "../models/component.model.js";

export const getAllComponents = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${ComponentModel.table}`);
  return rows;
};

export const createComponent = async ({ name, type, module_id, submodule_id }) => {
  await connection.query(
    `CALL ${ComponentModel.procedures.create}(?, ?, ?, ?)`,
    [name, type, module_id, submodule_id]
  );
};
