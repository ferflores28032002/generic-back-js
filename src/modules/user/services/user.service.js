import { connection } from "../../../database/connection.js";

import { UserModel } from "../models/user.model.js";

export const getAllUsers = async () => {
  const result = await connection.query(
    `SELECT * FROM ${UserModel.procedures.getAll}()`
  );
  return result.rows;
};

export const createUser = async ({ name, email }) => {
  const result = await connection.query(
    `SELECT ${UserModel.procedures.create}($1, $2) AS id`,
    [name, email]
  );

  return result.rows[0];
};
