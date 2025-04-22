import { createRoleDto } from "../dtos/createRoleDto.js";
import { assignRoleDto } from "../dtos/assignRoleDto.js";
import * as roleService from "../services/role.service.js";

export const listRoles = async (_, res) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addRole = async (req, res) => {
  const { isValid, errors, value } = createRoleDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await roleService.createRole(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignRoleToUser = async (req, res) => {
  const { isValid, errors, value } = assignRoleDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await roleService.assignRoleToUser(value);
    return res.status(200).json({ message: "Role assigned" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
