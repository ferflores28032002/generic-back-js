import { connection } from "../../../database/connection.js";
import { PermissionModel } from "../models/permission.model.js";

export const getAllPermissions = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${PermissionModel.table}`);
  return rows;
};

export const createPermission = async ({ name, description }) => {
  await connection.query(
    `CALL ${PermissionModel.procedures.create}(?, ?)`,
    [name, description]
  );
};

export const assignPermissionToRole = async ({ role_id, permission_id }) => {
  await connection.query(`CALL sp_assign_permission(?, ?)`, [role_id, permission_id]);
};
