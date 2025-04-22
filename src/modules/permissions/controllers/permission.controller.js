import { createPermissionDto } from "../dtos/createPermissionDto.js";
import { assignPermissionDto } from "../dtos/assignPermissionDto.js";
import * as permissionService from "../services/permission.service.js";

export const listPermissions = async (_, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    return res.json(permissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addPermission = async (req, res) => {
  const { isValid, errors, value } = createPermissionDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await permissionService.createPermission(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignPermissionToRole = async (req, res) => {
  const { isValid, errors, value } = assignPermissionDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await permissionService.assignPermissionToRole(value);
    return res.status(200).json({ message: "Permission assigned" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
