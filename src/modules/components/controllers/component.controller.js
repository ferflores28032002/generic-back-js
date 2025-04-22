import { createComponentDto } from "../dtos/createComponentDto.js";
import * as componentService from "../services/component.service.js";

export const listComponents = async (_, res) => {
  try {
    const components = await componentService.getAllComponents();
    return res.json(components);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addComponent = async (req, res) => {
  const { isValid, errors, value } = createComponentDto(req.body);

  if (!isValid) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  try {
    await componentService.createComponent(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
