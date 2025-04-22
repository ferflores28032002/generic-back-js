import { createModuleDto } from "../dtos/createModuleDto.js";
import * as moduleService from "../services/module.service.js";

export const listModules = async (_, res) => {
  try {
    const modules = await moduleService.getAllModules();
    return res.json(modules);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addModule = async (req, res) => {
  const { isValid, errors, value } = createModuleDto(req.body);

  if (!isValid) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  try {
    await moduleService.createModule(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
