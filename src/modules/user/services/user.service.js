import { connection } from "../../../database/connection.js";

import { UserModel } from "../models/user.model.js";

export const getAllUsers = async () => {
  const result = await connection.query(`SELECT * FROM USERS`);
  return result.rows;
};

export const createUser = async ({ name, email }) => {
  const result = await connection.query(
    `CALL ${UserModel.procedures.create}($1, $2)`,
    [name, email]
  );

  return result.rows[0];
};
