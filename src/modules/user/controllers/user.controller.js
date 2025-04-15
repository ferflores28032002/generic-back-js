import { createUserDto } from "../dtos/createUserDto.js";

import * as userService from "../services/user.service.js";

export const listUsers = async (req, res) => {
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
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await userService.createUser(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
