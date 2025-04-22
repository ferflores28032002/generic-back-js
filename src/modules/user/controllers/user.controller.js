import * as userService from "../services/user.service.js";
import { createUserDto } from "../dtos/createUserDto.js";

export const listUsers = async (_, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const { isValid, errors, value } = createUserDto(req.body);

  if (!isValid) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  try {
    await userService.createUser(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAccess = async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const result = await userService.getUserAccessStructure(userId);
    return res.json(result[0].user_access_json);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const testJest = (_, res) => {
  return res.status(200).json({ message: "pong!" });
};
