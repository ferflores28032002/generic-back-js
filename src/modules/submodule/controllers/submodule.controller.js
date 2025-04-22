import { createSubmoduleDto } from "../dtos/createSubmoduleDto.js";
import * as submoduleService from "../services/submodule.service.js";

export const listSubmodules = async (_, res) => {
  try {
    const submodules = await submoduleService.getAllSubmodules();
    return res.json(submodules);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addSubmodule = async (req, res) => {
  const { isValid, errors, value } = createSubmoduleDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await submoduleService.createSubmodule(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
